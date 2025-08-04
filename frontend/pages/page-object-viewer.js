import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Layout from "../components/Layout";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

const langMap = {
  Java: "java",
  "C#": "csharp",
  Python: "python",
  JavaScript: "javascript",
  TypeScript: "typescript",
};

export default function PageObjectViewer() {
  const router = useRouter();
  const { code, language, framework, poType } = router.query;
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typeof code === "string") {
      setResult(decodeURIComponent(code));
    }
  }, [code]);

  const handleDownload = () => {
    const blob = new Blob([result], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `PageObject.${language === "C#" ? "cs" : language === "Java" ? "java" : language === "Python" ? "py" : language === "TypeScript" ? "ts" : "js"}`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg border border-brand-primary">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-extrabold text-teal-600" style={{ color: "#1E8F8E" }}>Page Object Class</h2>
            <div className="text-sm" style={{ color: "#1E8F8E" }}>
              <span className="font-bold">Framework:</span> {framework || "?"} &nbsp;|&nbsp;
              <span className="font-bold">Language:</span> {language || "?"} &nbsp;|&nbsp;
              <span className="font-bold">Type:</span> {poType || "?"}
            </div>
          </div>
        </div>
        <div className="border rounded-lg border-brand-primary mb-4">
          <MonacoEditor
            height="400px"
            defaultLanguage={langMap[language] || "java"}
            theme="vs-dark"
            value={result}
            onChange={setResult}
            options={{
              fontSize: 15,
              minimap: { enabled: false },
              wordWrap: "on",
            }}
          />
        </div>
        <div className="flex gap-4">
          <button
            className="bg-brand-primary hover:bg-brand-dark text-white px-5 py-2 rounded shadow"
            onClick={handleDownload}
            disabled={!result}
          >
            Download Code
          </button>
          <button
            className="bg-gray-300 text-brand-dark px-5 py-2 rounded shadow"
            onClick={handleCopy}
            disabled={!result}
          >
            {copied ? "Copied!" : "Copy to Clipboard"}
          </button>
        </div>
      </div>
    </Layout>
  );
}
