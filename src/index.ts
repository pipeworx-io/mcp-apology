interface McpToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, unknown>;
    required?: string[];
  };
}

interface McpToolExport {
  tools: McpToolDefinition[];
  callTool: (name: string, args: Record<string, unknown>) => Promise<unknown>;
}

/**
 * apology MCP — wraps StupidAPIs (requires X-API-Key)
 *
 * Personal apologies at every sincerity level. relationship=ex generates anyway. W
 */


const API_KEY = '6e0ddbe88486dc354370290979829dc892b0386bd789ae5a';

const tools: McpToolExport['tools'] = [
  {
    name: 'apology_generate',
    description: 'Personal apologies at every sincerity level. relationship=ex generates anyway. We warned you.',
    inputSchema: {
      type: 'object' as const,
      properties: {"offense": {"type": "string"}, "relationship": {"type": "string", "enum": ["partner", "friend", "parent", "coworker", "boss", "ex", "vendor", "mom", "investor", "self"]}, "sincerity": {"type": "string", "enum": ["genuine", "performative", "tactical", "none", "desperate"]}, "medium": {"type": "string", "enum": ["text", "email", "in_person", "voicemail"]}},
      required: ["offense"],
    },
  },
];

async function callApi(url: string, args: Record<string, unknown>): Promise<unknown> {
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(args)) {
    if (v !== undefined && v !== null && v !== '') {
      params.set(k, String(v));
    }
  }
  const fullUrl = params.toString() ? url + '?' + params.toString() : url;
  const res = await fetch(fullUrl, {
    headers: { 'X-API-Key': API_KEY },
  });
  if (!res.ok) throw new Error('apology API error: ' + res.status);
  return res.json();
}

async function callTool(name: string, args: Record<string, unknown>): Promise<unknown> {
  switch (name) {
    case 'apology_generate':
      return callApi('https://api.stupidapis.com/apology/generate', args);
    default:
      throw new Error('Unknown tool: ' + name);
  }
}

export default { tools, callTool } satisfies McpToolExport;
