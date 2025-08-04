import { useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Layout from "../components/Layout";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

const frameworks = ["Selenium", "Playwright", "Appium"];
const languages = ["Java", "C#", "Python", "JavaScript", "TypeScript"];
const poTypes = ["Page Object Model (POM)", "Page Factory"];

function isValidHTML(input) {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(input, "text/html");
    return Array.from(doc.body.childNodes).length > 0;
  } catch {
    return false;
  }
}

export default function DomToPom() {
  const [framework, setFramework] = useState("");
  const [language, setLanguage] = useState("");
  const [poType, setPoType] = useState("");
  const [dom, setDom] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleGenerate = () => {
    setError("");
    if (!framework || !language || !poType) {
      setError("Please select framework, language, and page object type.");
      return;
    }
    if (!dom.trim()) {
      setError("Please paste your DOM/HTML.");
      return;
    }
    if (!isValidHTML(dom)) {
      setError("Invalid HTML/DOM. Please check your input.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const code = 
`// [Demo Output]
// Page Object for ${framework} in ${language} (${poType})
// Paste your DOM above and wire up backend for real code generation!`;

      setLoading(false);

      router.push({
        pathname: "/page-object-viewer",
        query: {
          code: encodeURIComponent(code),
          language,
          framework,
          poType,
        },
      });
    }, 900);
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg border border-brand-primary">
        <h2 className="text-2xl font-extrabold mb-2" style={{ color: "#16283C" }}>
          Page Object via DOM
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block font-semibold mb-1" style={{ color: "#1E8F8E" }}>Framework</label>
            <select
              className="w-full border border-brand-primary p-2 rounded text-brand-dark bg-white focus:border-brand-primary focus:ring-2 focus:ring-brand-primary"
              value={framework}
              onChange={(e) => setFramework(e.target.value)}
            >
              <option value="">Select Framework</option>
              {frameworks.map((fw) => (
                <option key={fw} value={fw}>{fw}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-1" style={{ color: "#1E8F8E" }}>Language</label>
            <select
              className="w-full border border-brand-primary p-2 rounded text-brand-dark bg-white focus:border-brand-primary focus:ring-2 focus:ring-brand-primary"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="">Select Language</option>
              {languages.map((lang) => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-1" style={{ color: "#1E8F8E" }}>POM Type</label>
            <select
              className="w-full border border-brand-primary p-2 rounded text-brand-dark bg-white focus:border-brand-primary focus:ring-2 focus:ring-brand-primary"
              value={poType}
              onChange={(e) => setPoType(e.target.value)}
            >
              <option value="">Select POM Type</option>
              {poTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-2" style={{ color: "#1E8F8E" }}>
            DOM/HTML Input
            <span className="ml-2 text-brand-neutral text-xs align-middle">(Paste the HTML or DOM markup of your page)</span>
          </label>
          <div className="border rounded-lg border-brand-primary">
            <MonacoEditor
              height="180px"
              defaultLanguage="html"
              theme="vs-dark"
              value={dom}
              onChange={setDom}
              options={{
                fontSize: 14,
                minimap: { enabled: false },
                wordWrap: "on",
              }}
            />
          </div>
        </div>
        {error && <div className="text-red-600 text-xs mb-3">{error}</div>}
        <button
          className={`bg-brand-primary hover:bg-brand-dark text-white px-6 py-2 rounded font-bold shadow mt-2 ${loading ? "opacity-60" : ""}`}
          onClick={handleGenerate}
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Page Object"}
        </button>
      </div>
    </Layout>
  );
}
