#!/usr/bin/env python3
"""
Bow Framework Documentation MCP Server

A Model Context Protocol server that provides access to Bow Framework documentation.
"""

import os
import re
import json
from pathlib import Path
from typing import Any

from mcp.server import Server
from mcp.server.stdio import stdio_server
from mcp.types import (
  Tool,
  TextContent,
  Resource,
  ResourceTemplate,
)

# Initialize server
server = Server("bowphp-docs")

# Documentation paths (can be overridden via environment variables)
DOCS_ROOT = Path(os.environ.get("DOCS_ROOT", Path(__file__).parent.parent))
DOCS_PATH = DOCS_ROOT / "docs"
VERSIONED_DOCS_PATH = DOCS_ROOT / "versioned_docs"


def get_doc_files(path: Path) -> list[dict[str, Any]]:
  """Get all documentation files from a directory."""
  files = []
  if path.exists():
    for file in path.rglob("*.mdx"):
      relative_path = file.relative_to(DOCS_ROOT)
      files.append({
        "name": file.stem,
        "path": str(relative_path),
        "full_path": str(file),
      })
    for file in path.rglob("*.md"):
      relative_path = file.relative_to(DOCS_ROOT)
      files.append({
        "name": file.stem,
        "path": str(relative_path),
        "full_path": str(file),
      })
  return files


def extract_frontmatter(content: str) -> dict[str, str]:
  """Extract YAML frontmatter from MDX content."""
  frontmatter = {}
  match = re.match(r"^---\s*\n(.*?)\n---\s*\n", content, re.DOTALL)
  if match:
    for line in match.group(1).split("\n"):
      if ":" in line:
        key, value = line.split(":", 1)
        frontmatter[key.strip()] = value.strip().strip('"\'')
  return frontmatter


def strip_frontmatter(content: str) -> str:
  """Remove YAML frontmatter from content."""
  return re.sub(r"^---\s*\n.*?\n---\s*\n", "", content, flags=re.DOTALL)


@server.list_tools()
async def list_tools() -> list[Tool]:
  """List available tools."""
  return [
    Tool(
      name="list_docs",
      description="List all available Bow Framework documentation files",
      inputSchema={
        "type": "object",
        "properties": {
          "version": {
            "type": "string",
            "description": "Documentation version (e.g., '4.x', '3.x'). Leave empty for latest.",
          }
        },
      },
    ),
    Tool(
      name="read_doc",
      description="Read the content of a specific documentation file",
      inputSchema={
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "description": "Name of the documentation file (e.g., 'installation', 'routing', 'database')",
          },
          "version": {
            "type": "string",
            "description": "Documentation version. Leave empty for latest.",
          },
        },
        "required": ["name"],
      },
    ),
    Tool(
      name="search_docs",
      description="Search for a term across all Bow Framework documentation",
      inputSchema={
        "type": "object",
        "properties": {
          "query": {
            "type": "string",
            "description": "Search query (case-insensitive)",
          },
          "version": {
            "type": "string",
            "description": "Documentation version to search. Leave empty for latest.",
          },
        },
        "required": ["query"],
      },
    ),
    Tool(
      name="get_doc_structure",
      description="Get the documentation structure and categories from sidebars",
      inputSchema={
        "type": "object",
        "properties": {},
      },
    ),
  ]


@server.call_tool()
async def call_tool(name: str, arguments: dict[str, Any]) -> list[TextContent]:
  """Handle tool calls."""

  if name == "list_docs":
    version = arguments.get("version", "")
    if version:
      docs_dir = VERSIONED_DOCS_PATH / f"version-{version}"
    else:
      docs_dir = DOCS_PATH

    files = get_doc_files(docs_dir)
    if not files:
      return [TextContent(type="text", text=f"No documentation found for version: {version or 'latest'}")]

    result = f"# Bow Framework Documentation ({version or 'latest'})\n\n"
    result += f"Found {len(files)} documentation files:\n\n"
    for f in sorted(files, key=lambda x: x["name"]):
      result += f"- **{f['name']}** ({f['path']})\n"

    return [TextContent(type="text", text=result)]

  elif name == "read_doc":
    doc_name = arguments.get("name", "")
    version = arguments.get("version", "")

    if not doc_name:
      return [TextContent(type="text", text="Error: Document name is required")]

    if version:
      docs_dir = VERSIONED_DOCS_PATH / f"version-{version}"
    else:
      docs_dir = DOCS_PATH

    # Try both .mdx and .md extensions
    doc_path = docs_dir / f"{doc_name}.mdx"
    if not doc_path.exists():
      doc_path = docs_dir / f"{doc_name}.md"

    if not doc_path.exists():
      return [TextContent(type="text", text=f"Documentation not found: {doc_name}")]

    content = doc_path.read_text(encoding="utf-8")
    frontmatter = extract_frontmatter(content)
    body = strip_frontmatter(content)

    title = frontmatter.get("title", doc_name.replace("-", " ").title())
    result = f"# {title}\n\n"
    result += f"**File:** {doc_path.relative_to(DOCS_ROOT)}\n\n"
    result += "---\n\n"
    result += body

    return [TextContent(type="text", text=result)]

  elif name == "search_docs":
    query = arguments.get("query", "")
    version = arguments.get("version", "")

    if not query:
      return [TextContent(type="text", text="Error: Search query is required")]

    if version:
      docs_dir = VERSIONED_DOCS_PATH / f"version-{version}"
    else:
      docs_dir = DOCS_PATH

    files = get_doc_files(docs_dir)
    results = []
    pattern = re.compile(re.escape(query), re.IGNORECASE)

    for f in files:
      file_path = Path(f["full_path"])
      content = file_path.read_text(encoding="utf-8")
      matches = list(pattern.finditer(content))

      if matches:
        frontmatter = extract_frontmatter(content)
        title = frontmatter.get("title", f["name"])
        excerpts = []

        for match in matches[:3]:  # Limit to 3 excerpts per file
          start = max(0, match.start() - 50)
          end = min(len(content), match.end() + 50)
          excerpt = content[start:end].replace("\n", " ").strip()
          if start > 0:
            excerpt = "..." + excerpt
          if end < len(content):
            excerpt = excerpt + "..."
          excerpts.append(excerpt)

        results.append({
          "name": f["name"],
          "title": title,
          "path": f["path"],
          "match_count": len(matches),
          "excerpts": excerpts,
        })

    if not results:
      return [TextContent(type="text", text=f"No results found for: {query}")]

    output = f"# Search Results for '{query}'\n\n"
    output += f"Found matches in {len(results)} files:\n\n"

    for r in sorted(results, key=lambda x: x["match_count"], reverse=True):
      output += f"## {r['title']}\n"
      output += f"**File:** {r['path']} | **Matches:** {r['match_count']}\n\n"
      for excerpt in r["excerpts"]:
        output += f"> {excerpt}\n\n"

    return [TextContent(type="text", text=output)]

  elif name == "get_doc_structure":
    sidebars_path = DOCS_ROOT / "sidebars.json"

    if not sidebars_path.exists():
      return [TextContent(type="text", text="Sidebars configuration not found")]

    sidebars = json.loads(sidebars_path.read_text(encoding="utf-8"))

    output = "# Bow Framework Documentation Structure\n\n"

    if "docs" in sidebars:
      for category, items in sidebars["docs"].items():
        output += f"## {category}\n"
        for item in items:
          if isinstance(item, str):
            output += f"- {item}\n"
          elif isinstance(item, dict):
            output += f"- {item.get('label', item.get('id', 'Unknown'))}\n"
        output += "\n"

    return [TextContent(type="text", text=output)]

  return [TextContent(type="text", text=f"Unknown tool: {name}")]


@server.list_resources()
async def list_resources() -> list[Resource]:
  """List available documentation resources."""
  resources = []
  files = get_doc_files(DOCS_PATH)

  for f in files:
    file_path = Path(f["full_path"])
    content = file_path.read_text(encoding="utf-8")
    frontmatter = extract_frontmatter(content)
    title = frontmatter.get("title", f["name"])

    resources.append(
      Resource(
        uri=f"bowphp://docs/{f['name']}",
        name=title,
        description=f"Bow Framework documentation: {title}",
        mimeType="text/markdown",
      )
    )

  return resources


@server.read_resource()
async def read_resource(uri: str) -> str:
  """Read a documentation resource."""
  # Parse URI: bowphp://docs/{name}
  if uri.startswith("bowphp://docs/"):
    doc_name = uri.replace("bowphp://docs/", "")

    doc_path = DOCS_PATH / f"{doc_name}.mdx"
    if not doc_path.exists():
      doc_path = DOCS_PATH / f"{doc_name}.md"

    if doc_path.exists():
      content = doc_path.read_text(encoding="utf-8")
      return strip_frontmatter(content)

  raise ValueError(f"Resource not found: {uri}")


@server.list_resource_templates()
async def list_resource_templates() -> list[ResourceTemplate]:
  """List resource templates."""
  return [
    ResourceTemplate(
      uriTemplate="bowphp://docs/{name}",
      name="Bow Framework Documentation",
      description="Access Bow Framework documentation by name",
    ),
  ]


async def main():
  """Run the MCP server."""
  async with stdio_server() as (read_stream, write_stream):
    await server.run(
      read_stream,
      write_stream,
      server.create_initialization_options(),
    )


if __name__ == "__main__":
  import asyncio
  asyncio.run(main())
