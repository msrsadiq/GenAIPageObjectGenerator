import { useState, useEffect } from "react";
import Layout from "../components/Layout";

export default function AISettings() {
  // Load from localStorage (or from backend in future)
  const [openaiKey, setOpenaiKey] = useState("");
  const [perplexityKey, setPerplexityKey] = useState("");
  const [claudeKey, setClaudeKey] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setOpenaiKey(localStorage.getItem("OPENAI_API_KEY") || "");
    setPerplexityKey(localStorage.getItem("PERPLEXITY_API_KEY") || "");
    setClaudeKey(localStorage.getItem("CLAUDE_API_KEY") || "");
  }, []);

  function handleSave(e) {
    e.preventDefault();
    localStorage.setItem("OPENAI_API_KEY", openaiKey.trim());
    localStorage.setItem("PERPLEXITY_API_KEY", perplexityKey.trim());
    localStorage.setItem("CLAUDE_API_KEY", claudeKey.trim());
    setSaved(true);
    setTimeout(() => setSaved(false), 1400);
  }

  return (
    <Layout>
      <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg border border-brand-primary">
        <h2 className="text-2xl font-extrabold mb-2 text-teal-600" style={{ color: "#1E8F8E" }}>
          AI Integration Settings
        </h2>
        <div className="mb-4 text-base" style={{ color: "#16283C" }}>
          <ul className="list-disc ml-5 text-sm mb-2">
            <li>
              <b>ChatGPT (OpenAI):</b> Enter your{" "}
              <a
                href="https://platform.openai.com/api-keys"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-teal-600"
              >
                OpenAI API Key
              </a>{" "}
              for paid access. If left blank, the app will use a free/shared key (if available).
            </li>
            <li>
              <b>Perplexity:</b> Enter your{" "}
              <a
                href="https://platform.perplexity.ai/account/api"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-teal-600"
              >
                Perplexity API Key
              </a>
              . If blank, the app will use free access (if supported).
            </li>
            <li>
              <b>Claude (Anthropic):</b> Enter your{" "}
              <a
                href="https://console.anthropic.com/settings/keys"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-teal-600"
              >
                Claude API Key
              </a>
              . If blank, the app will use free access (if supported).
            </li>
          </ul>
          <div className="text-xs text-brand-neutral mb-2">
            (Keys are stored only in your browser. You can change them anytime.)
          </div>
        </div>
        <form onSubmit={handleSave}>
          <div className="mb-4">
            <label className="block font-semibold mb-1" style={{ color: "#1E8F8E" }}>
              ChatGPT (OpenAI) API Key
            </label>
            <input
              className="w-full border border-brand-primary p-2 rounded text-brand-dark bg-white focus:border-brand-primary focus:ring-2 focus:ring-brand-primary"
              type="password"
              placeholder="sk-..."
              value={openaiKey}
              onChange={e => setOpenaiKey(e.target.value)}
              autoComplete="off"
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-1" style={{ color: "#1E8F8E" }}>
              Perplexity API Key
            </label>
            <input
              className="w-full border border-brand-primary p-2 rounded text-brand-dark bg-white focus:border-brand-primary focus:ring-2 focus:ring-brand-primary"
              type="password"
              placeholder="pplx-..."
              value={perplexityKey}
              onChange={e => setPerplexityKey(e.target.value)}
              autoComplete="off"
            />
          </div>
          <div className="mb-6">
            <label className="block font-semibold mb-1" style={{ color: "#1E8F8E" }}>
              Claude (Anthropic) API Key
            </label>
            <input
              className="w-full border border-brand-primary p-2 rounded text-brand-dark bg-white focus:border-brand-primary focus:ring-2 focus:ring-brand-primary"
              type="password"
              placeholder="sk-ant-..."
              value={claudeKey}
              onChange={e => setClaudeKey(e.target.value)}
              autoComplete="off"
            />
          </div>
          <button
            className="bg-brand-primary hover:bg-brand-dark text-white px-6 py-2 rounded font-bold shadow"
            type="submit"
          >
            Save Settings
          </button>
          {saved && (
            <span className="ml-4 text-green-600 font-semibold">Saved!</span>
          )}
        </form>
      </div>
    </Layout>
  );
}
