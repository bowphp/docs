FROM python:3.12-slim

LABEL maintainer="Bow Framework Team"
LABEL description="MCP Server for Bow Framework Documentation"

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy MCP server files
COPY server.py .
COPY types.py .

# Documentation will be mounted as volume
# Mount points:
#   /app/docs - main documentation
#   /app/versioned_docs - versioned documentation
#   /app/sidebars.json - sidebar configuration

# MCP servers communicate via stdin/stdout
ENTRYPOINT ["python", "server.py"]
