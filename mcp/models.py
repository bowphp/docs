from typing import TypedDict

class DocFile(TypedDict):
  name: str
  path: str
  full_path: str

class SearchResult(TypedDict):
  name: str
  title: str
  path: str
  match_count: int
  excerpts: list[str]
