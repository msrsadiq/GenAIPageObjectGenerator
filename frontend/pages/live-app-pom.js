import { useState } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";

const frameworks = ["Selenium", "Playwright", "Appium"];
const languages = ["Java", "C#", "Python", "JavaScript", "TypeScript"];
const poTypes = ["Page Object Model (POM)", "Page Factory"];

// Basic URL validation
function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;  
  }
}

export default function LiveAppPom() {
  const [url, setUrl] = useState("");
  const [framework, setFramework] = useState("");
  const [language, setLanguage] = useState("");
  const [poType, setPoType] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleGenerate = () => {
    setError("");
    if (!url || !framework || !language || !poType) {
      setError("Please fill in all fields.");
      return;
    }
    if (!isValidUrl(url)) {
      setError("Please enter a valid URL (starting with http:// or https://).");
      return;
    }
    setLoading(true);

    // Simulate backend code gen (replace with API call in future)
    setTimeout(() => {
      const code = 
`// [Demo Output]
// Page Object for ${framework} in ${language} (${poType})
// Generated from live app URL: ${url}
// (Wire up backend for real code generation!)`;
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
        <h2 className="text-2xl font-extrabold mb-2 text-teal-600" style={{ color: "#1E8F8E" }}>
          Page Object for Live App
        </h2>
        <div className="text-base mb-8" style={{ color: "#16283C" }}>
          Provide the URL of your live web application (login required).  
          Select framework, language, and POM type to generate the page object.  
          <br />
          <span className="text-xs text-brand-neutral">(You’ll be prompted to authenticate after clicking Generate in the final version.)</span>
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1" style={{ color: "#1E8F8E" }}>
            Live Application URL
          </label>
          <input
            className="w-full border border-brand-primary p-2 rounded text-brand-dark bg-white focus:border-brand-primary focus:ring-2 focus:ring-brand-primary"
            type="url"
            placeholder="https://your-live-app.com"
            value={url}
            onChange={e => setUrl(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block font-semibold mb-1" style={{ color: "#1E8F8E" }}>Framework</label>
            <select
              className="w-full border border-brand-primary p-2 rounded text-brand-dark bg-white focus:border-brand-primary focus:ring-2 focus:ring-brand-primary"
              value={framework}
              onChange={e => setFramework(e.target.value)}
            >
              <option value="">Select Framework</option>
              {frameworks.map(fw => (
                <option key={fw} value={fw}>{fw}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-1" style={{ color: "#1E8F8E" }}>Language</label>
            <select
              className="w-full border border-brand-primary p-2 rounded text-brand-dark bg-white focus:border-brand-primary focus:ring-2 focus:ring-brand-primary"
              value={language}
              onChange={e => setLanguage(e.target.value)}
            >
              <option value="">Select Language</option>
              {languages.map(lang => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-1" style={{ color: "#1E8F8E" }}>POM Type</label>
            <select
              className="w-full border border-brand-primary p-2 rounded text-brand-dark bg-white focus:border-brand-primary focus:ring-2 focus:ring-brand-primary"
              value={poType}
              onChange={e => setPoType(e.target.value)}
            >
              <option value="">Select POM Type</option>
              {poTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
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
