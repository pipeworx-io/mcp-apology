# mcp-apology

apology MCP — wraps StupidAPIs (requires X-API-Key)

Part of the [Pipeworx](https://pipeworx.io) open MCP gateway.

## Tools

| Tool | Description |
|------|-------------|
| `apology_generate` | Personal apologies at every sincerity level. relationship=ex generates anyway. We warned you. |

## Quick Start

Add to your MCP client config:

```json
{
  "mcpServers": {
    "apology": {
      "url": "https://gateway.pipeworx.io/apology/mcp"
    }
  }
}
```

Or use the CLI:

```bash
npx pipeworx use apology
```

## License

MIT
