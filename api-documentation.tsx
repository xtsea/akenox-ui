"use client"

import { useState, useRef, useEffect } from "react"
import { Copy, ArrowRight, Check, Search, Loader2 } from "lucide-react"
import Image from "next/image"

export default function ApiDocumentation() {
  const [copied, setCopied] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showResponse, setShowResponse] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedEndpoint, setSelectedEndpoint] = useState("/api/v1/json/all")
  const [responseJson, setResponseJson] = useState<ApiResponse | null>(null)
  const sidebarRef = useRef<HTMLDivElement>(null)
  const [isHomeLoading, setIsHomeLoading] = useState(true);

  // Simulate loading for 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsHomeLoading(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  interface ApiResponse {
    result: string;
    generated_at: string;
    processing_time: number;
    model: string;
    parameters: {
      prompt: string;
      style: string;
      visual: string;
    };
  }

  const endpoints = [
    // Downloader
    { method: "GET", name: "Example JSON", path: "/api/v1/json/all", category: "Custom" },
    { method: "GET", name: "Facebook", path: "/api/v1/dl/fb", category: "Downloader" },
    { method: "GET", name: "Instagram", path: "/api/v1/dl/instagram-v4", category: "Downloader" },
    { method: "GET", name: "Twitter", path: "/api/v1/dl/twitter-v3", category: "Downloader" },
    { method: "GET", name: "Tiktok", path: "/api/v1/dl/tiktok-v2", category: "Downloader" },
    { method: "GET", name: "Snapsave", path: "/api/v1/dl/snapsave", category: "Downloader" },
    { method: "GET", name: "Xnxx", path: "/api/v1/dl/xnxx", category: "Downloader" },
    // AI
    { method: "GET", name: "Lu Jawa", path: "/api/v1/ai/akenox/lu-sunda", category: "AI" },
    { method: "GET", name: "Google Gemini", path: "/api/v1/ai/google-gemini", category: "AI" },
    { method: "GET", name: "Qwen Turbo", path: "/api/v1/ai/alibaba/qwen-turbo-latest", category: "AI" },
    { method: "GET", name: "Qwen 8B Chat", path: "/api/v1/ai/qwen/qwen1.5-1.8b-chat", category: "AI" },
    { method: "GET", name: "Deepseek Qwen", path: "/api/v1/ai/deepseek/deepseek-r1-distill-qwen-32b", category: "AI" },
    // Federation
    { method: "POST", name: "Federation NewFed", path: "/api/v2/federation/newfed", category: "Federation" },
    { method: "POST", name: "Federation SubFed", path: "/api/v2/federation/subfed", category: "Federation" },
    { method: "GET", name: "Federation GetFed UIID", path: "/api/v2/federation/getfed/{uuid}", category: "Federation" },
    { method: "GET", name: "Federation Bans", path: "/api/v2/federation/ban", category: "Federation" },
  ]

  const parametersMapping: { [key: string]: { name: string; type: string; required: boolean; description: string; }[] } = {
    "/api/v1/json/all": [
      { name: "null", type: "string", required: false, description: "null" },
    ],
    // AI
    "/api/v1/ai/akenox/lu-sunda": [
      { name: "query", type: "string", required: true, description: "Query ask for AI" },
      { name: "x-api-key", type: "string", required: true, description: "Headers API key from: @aknuserbot" },
    ],
    "/api/v1/ai/google-gemini": [
      { name: "query", type: "string", required: true, description: "Query ask for Google AI" },
      { name: "x-api-key", type: "string", required: true, description: "Headers API key from: @aknuserbot" },
    ],
    "/api/v1/ai/alibaba/qwen-turbo-latest": [
      { name: "query", type: "string", required: true, description: "Query ask for Qwen Turbo AI" },
      { name: "system_prompt", type: "string", required: false, description: "System Prompt Custom" },
      { name: "x-api-key", type: "string", required: true, description: "Headers API key from: @aknuserbot" },
    ],
    "/api/v1/ai/qwen/qwen1.5-1.8b-chat": [
      { name: "query", type: "string", required: true, description: "Query ask for Qwen 8B Chat AI" },
      { name: "system_prompt", type: "string", required: false, description: "System Prompt Custom" },
      { name: "x-api-key", type: "string", required: true, description: "Headers API key from: @aknuserbot" },
    ],
    "/api/v1/ai/deepseek/deepseek-r1-distill-qwen-32b": [
      { name: "query", type: "string", required: true, description: "Query ask for Deepseek Qwen AI" },
      { name: "system_prompt", type: "string", required: false, description: "System Prompt Custom" },
      { name: "x-api-key", type: "string", required: true, description: "Headers API key from: @aknuserbot" },
    ],
    // Downloader
    "/api/v1/dl/fb": [
      { name: "url", type: "string", required: true, description: "Link facebook" },
      { name: "x-api-key", type: "string", required: true, description: "Headers API key from: @aknuserbot" },
    ],
    "/api/v1/dl/instagram-v4": [
      { name: "url", type: "string", required: true, description: "Link instgram and version v4" },
      { name: "x-api-key", type: "string", required: true, description: "Headers API key from: @aknuserbot" },
    ],
    "/api/v1/dl/twitter-v3": [
      { name: "url", type: "string", required: true, description: "Link Twitter and version v3" },
      { name: "x-api-key", type: "string", required: true, description: "Headers API key from: @aknuserbot" },
    ],
    "/api/v1/dl/tiktok-v2": [
      { name: "url", type: "string", required: true, description: "Link Tiktok and version v2" },
      { name: "x-api-key", type: "string", required: true, description: "Headers API key from: @aknuserbot" },
    ],
    "/api/v1/dl/snapsave": [
      { name: "url", type: "string", required: true, description: "Link Here" },
      { name: "x-api-key", type: "string", required: true, description: "Headers API key from: @aknuserbot" },
    ],
    "/api/v1/dl/xnxx": [
      { name: "url", type: "string", required: true, description: "Link Here" },
      { name: "x-api-key", type: "string", required: true, description: "Headers API key from: @aknuserbot" },
    ],
    // Federation
    "/api/v2/federation/newfed": [
      { name: "name", type: "string", required: true, description: "Federation Name" },
      { name: "owner", type: "string", required: true, description: "Federation Owner: user id" },
      { name: "x-api-key", type: "string", required: true, description: "Headers API key from: @aknuserbot" },
    ],
    "/api/v2/federation/subfed": [
      { name: "parent_uuid", type: "string", required: true, description: "Federation UUID (required json)" },
      { name: "child_uuid", type: "string", required: true, description: "Federation Child UUID (required json)" },
      { name: "x-api-key", type: "string", required: true, description: "Headers API key from: @aknuserbot" },
    ],
    "/api/v2/federation/getfed/{uuid}": [
      { name: "uuid", type: "string", required: true, description: "Federation UUID path" },
      { name: "x-api-key", type: "string", required: true, description: "Headers API key from: @aknuserbot" },
    ],
    "/api/v2/federation/ban": [
      { name: "federation_uuid", type: "string", required: true, description: "Federation UUID" },
      { name: "user_id", type: "number", required: true, description: "Federation user_id" },
      { name: "x-api-key", type: "string", required: true, description: "Headers API key from: @aknuserbot" },
    ],
  }

  const handleCopyCurl = () => {
    try {
      navigator.clipboard.writeText(
        `curl -X GET "https://randydev-ryu-js.hf.space${selectedEndpoint}"`,
      )
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  const handleTryApi = async () => {
    setIsLoading(true)
    setShowResponse(false)
    setShowSuccess(false)

    try {
      const response = await fetch(`https://randydev-ryu-js.hf.space${selectedEndpoint}`)
      const data = await response.json()
      setResponseJson(data)
      setShowResponse(true)
      setShowSuccess(true)

      // Reset success state after 2 seconds
      setTimeout(() => {
        setShowSuccess(false)
      }, 2000)

      // Clear response after 10 seconds
      setTimeout(() => {
        setShowResponse(false)
        setResponseJson(null)
      }, 10000)
    } catch (error) {
      console.error("API call failed: ", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleEndpointSelect = (path: string) => {
    setSelectedEndpoint(path)
    setShowResponse(false)
    setResponseJson(null)
  }

  const filteredEndpoints = endpoints.filter((endpoint) =>
    endpoint.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Get the selected endpoint's method
  const selectedEndpointMethod = endpoints.find((e) => e.path === selectedEndpoint)?.method || "GET"

  // Get the parameters for the selected endpoint
  const parameters = parametersMapping[selectedEndpoint] || []

function EndpointItem({ endpoint, selectedEndpoint, onSelect }) {
  return (
    <div
      className={`flex items-center gap-2 p-2 rounded-md cursor-pointer group ${
        selectedEndpoint === endpoint.path ? "bg-[#1a2234]" : "hover:bg-[#1a2234]/50"
      }`}
      onClick={() => onSelect(endpoint.path)}
    >
      <button
        className={`text-xs px-2 py-0.5 rounded ${
          endpoint.method === "GET"
            ? "bg-emerald-500/20 text-emerald-500"
            : "bg-blue-500/20 text-blue-500"
        }`}
      >
        {endpoint.method}
      </button>
      <span
        className={`text-sm ${
          selectedEndpoint === endpoint.path ? "text-white" : "text-gray-300 group-hover:text-white"
        }`}
      >
        {endpoint.name}
      </span>
    </div>
  );
}

  return (
    <div className="min-h-screen bg-[#0B1121] text-gray-200">
      {isHomeLoading ? (
        <div className="flex items-center justify-center h-screen">
          <Loader2 size={48} className="animate-spin text-gray-500" />
        </div>
      ) : (
        <div className="flex h-screen">
          {/* Sidebar */}
          <div className="w-80 flex flex-col bg-[#0B1121] border-r border-[#1a2234]">
            <div className="p-4">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                  <Image
                    src="https://img.freepik.com/premium-vector/modern-classic-vintage-retro-theme-logo-template-design-with-ornament-lettering_329705-666.jpg"
                    alt="Logo"
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                </div>
                <h1 className="text-xl">
                  <span className="text-[#38bdf8]">AkenoX</span> <span className="text-[#4ade80]">API</span>
                </h1>
              </div>

              <h2 className="text-[#38bdf8] mb-4">API Endpoints</h2>

              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search endpoints..."
                  className="w-full bg-[#1a2234] border border-[#334155] rounded-md py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-[#38bdf8]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="overflow-y-auto flex-1 p-4 pt-0" ref={sidebarRef}>
              <div className="space-y-1">
                <h3 className="text-sm font-semibold mb-2 text-gray-400">Custom</h3>
                {filteredEndpoints
                  .filter(endpoint => endpoint.category === "Custom")
                  .map((endpoint, index) => (
                    <EndpointItem
                      key={index}
                      endpoint={endpoint}
                      selectedEndpoint={selectedEndpoint}
                      onSelect={handleEndpointSelect}
                      />
                  ))}

                <h3 className="text-sm font-semibold mb-2 text-gray-400">AI</h3>
                {filteredEndpoints
                  .filter(endpoint => endpoint.category === "AI")
                  .map((endpoint, index) => (
                    <EndpointItem
                      key={index}
                      endpoint={endpoint}
                      selectedEndpoint={selectedEndpoint}
                      onSelect={handleEndpointSelect}
                      />
                  ))}

                <h3 className="text-sm font-semibold mb-2 text-gray-400">Downloader</h3>
                {filteredEndpoints
                  .filter(endpoint => endpoint.category === "Downloader")
                  .map((endpoint, index) => (
                    <EndpointItem
                      key={index}
                      endpoint={endpoint}
                      selectedEndpoint={selectedEndpoint}
                      onSelect={handleEndpointSelect}
                      />
                  ))}

                <h3 className="text-sm font-semibold mb-2 text-gray-400">Federation</h3>
                {filteredEndpoints
                  .filter(endpoint => endpoint.category === "Federation")
                  .map((endpoint, index) => (
                    <EndpointItem
                      key={index}
                      endpoint={endpoint}
                      selectedEndpoint={selectedEndpoint}
                      onSelect={handleEndpointSelect}
                      />
                  ))}

              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto p-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <span
                  className={`px-3 py-1 rounded text-sm ${selectedEndpointMethod === "GET"
                      ? "bg-emerald-500/20 text-emerald-500"
                      : "bg-blue-500/20 text-blue-500"
                    }`}
                >
                  {selectedEndpointMethod}
                </span>
                <div className="flex items-center">
                  <span className="text-[#38bdf8]">{selectedEndpoint}</span>
                  {/* <span className="text-[#38bdf8]">{selectedEndpoint.split("/").slice(2).join("/")}</span> */}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={handleCopyCurl}
                  className={`flex items-center gap-2 ${copied ? "bg-blue-500/30" : "bg-blue-500/10 hover:bg-blue-500/20"
                    } text-[#38bdf8] py-2 px-4 rounded-md transition-all duration-300`}
                >
                  {copied ? <Check size={18} /> : <Copy size={18} />}
                  {copied ? "Copied!" : "Copy Curl"}
                </button>
                <button
                  onClick={handleTryApi}
                  className={`flex items-center gap-2 ${isLoading || showSuccess ? "bg-emerald-500/30" : "bg-emerald-500/10 hover:bg-emerald-500/20"
                    } text-emerald-500 py-2 px-4 rounded-md transition-all duration-300`}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : showSuccess ? (
                    <Check size={18} />
                  ) : (
                    <ArrowRight size={18} />
                  )}
                  {isLoading ? "Loading..." : showSuccess ? "Success!" : "Try API"}
                </button>
              </div>
            </div>

            <p className="text-gray-400 mb-8">Get API key from @aknuserbot</p>

            <h2 className="text-[#38bdf8] text-lg mb-4">Parameters</h2>
            <div className="bg-[#1a2234] border border-[#334155] rounded-md mb-8 p-4">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#334155]">
                    <th className="text-left p-4 text-gray-400">Name</th>
                    <th className="text-left p-4 text-gray-400">Type</th>
                    <th className="text-left p-4 text-gray-400">Required</th>
                    <th className="text-left p-4 text-gray-400">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#334155]">
                  {parameters.map((param, index) => (
                    <tr key={index}>
                      <td className="p-4">{param.name}</td>
                      <td className="p-4 text-gray-400">{param.type}</td>
                      <td className="p-4 text-left">{param.required ? "✓" : "✗"}</td>
                      <td className="p-4 text-gray-400">{param.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2 className="text-[#38bdf8] text-lg mb-4">Example Response</h2>

            {showResponse && (
              <div className="mt-8">
                <h2 className="text-[#38bdf8] text-lg mb-4">Live Response</h2>
                <div className="bg-[#1e1e1e] rounded-lg p-4 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <span className="text-gray-400 text-xs">Live Response</span>
                  </div>
                  <pre className="text-sm text-gray-200 font-hack">
                    <code>
                      {JSON.stringify(responseJson, null, 2)}
                    </code>
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      <footer className="text-center py-4 text-gray-500">
        &copy; 2025 AkenoX API. All rights reserved.
      </footer>
    </div>
  )
}
