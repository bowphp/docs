# Bow Framework Docs MCP Server

A Model Context Protocol (MCP) server that provides access to Bow Framework documentation.

## Features

- **list_docs**: List all available documentation files
- **read_doc**: Read specific documentation content
- **search_docs**: Search across all documentation
- **get_doc_structure**: Get documentation categories and structure

## Installation

```bash
cd docs/mcp
pip install -r requirements.txt
```

Or with uv:

```bash
cd docs/mcp
uv pip install -r requirements.txt
```

## Usage

### VS Code Configuration

Add to your `.vscode/settings.json`:

```json
{
  "mcp": {
    "servers": {
      "bowphp-docs": {
        "type": "stdio",
        "command": "python",
        "args": ["${workspaceFolder}/docs/mcp/server.py"]
      }
    }
  }
}
```

### Running Manually

```bash
python server.py
```

### With Docker

Build the Docker image:

```bash
cd docs/mcp
docker build -t bowphp-docs-mcp .
```

Run with documentation mounted:

```bash
docker run -i --rm \
  -v $(pwd)/../docs:/app/docs:ro \
  -v $(pwd)/../versioned_docs:/app/versioned_docs:ro \
  -v $(pwd)/../sidebars.json:/app/sidebars.json:ro \
  -e DOCS_ROOT=/app \
  bowphp-docs-mcp
```

For VS Code with Docker, update your settings:

```json
{
  "mcp": {
    "servers": {
      "bowphp-docs": {
        "type": "stdio",
        "command": "docker",
        "args": [
          "run", "-i", "--rm",
          "-v", "${workspaceFolder}/docs/docs:/app/docs:ro",
          "-v", "${workspaceFolder}/docs/versioned_docs:/app/versioned_docs:ro",
          "-v", "${workspaceFolder}/docs/sidebars.json:/app/sidebars.json:ro",
          "-e", "DOCS_ROOT=/app",
          "bowphp-docs-mcp"
        ]
      }
    }
  }
}
```

## Available Tools

### list_docs

List all documentation files.

```json
{
  "name": "list_docs",
  "arguments": {
    "version": "4.x"
  }
}
```

### read_doc

Read a specific documentation file.

```json
{
  "name": "read_doc",
  "arguments": {
    "name": "installation",
    "version": ""
  }
}
```

### search_docs

Search documentation content.

```json
{
  "name": "search_docs",
  "arguments": {
    "query": "middleware",
    "version": ""
  }
}
```

### get_doc_structure

Get the documentation structure from sidebars.

```json
{
  "name": "get_doc_structure",
  "arguments": {}
}
```

## Resources

The server also exposes documentation as MCP resources with URIs like:

- `bowphp://docs/installation`
- `bowphp://docs/routing`
- `bowphp://docs/database`
