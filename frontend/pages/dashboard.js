import Layout from "../components/Layout";
import { useRouter } from "next/router";

const options = [
  {
    label: "Page Object via DOM",
    description: "Paste HTML/DOM and generate page object.",
    path: "/dom-to-pom",
    disabled: false,
  },
  {
    label: "Page Object for Static Web App",
    description: "Provide a URL to a static web app (no login).",
    path: "/static-web-pom",
    disabled: false,
  },
  {
    label: "Page Object for Live App",
    description: "Interact with a live app (login required).",
    path: "/live-app-pom",
    disabled: false,
  },
  {
    label: "Page Object for Android App",
    description: "Android App POM (coming soon).",
    path: "#",
    disabled: true,
  },
  {
    label: "Page Object for iOS App",
    description: "iOS App POM (coming soon).",
    path: "#",
    disabled: true,
  },
];

export default function Dashboard() {
  const router = useRouter();

  return (
    <Layout>
      <div className="min-h-[80vh] flex flex-col items-center justify-start py-8">
        <h1 className="text-4xl font-extrabold mb-2 text-teal-600" style={{ color: "#1E8F8E" }}>
          Page Object Generator
        </h1>
        <h2 className="text-lg mb-10 font-medium" style={{ color: "#16283C" }}>
          Build Page Objects for Selenium, Playwright, Appium & more
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-3xl">
          {options.map((option) => (
            <button
              key={option.label}
              className={`
                p-6 rounded-2xl border-2 shadow-lg text-left transition focus:outline-none relative
                ${option.disabled
                  ? "bg-gray-100 border-gray-200 cursor-not-allowed opacity-50"
                  : "bg-white border-brand-primary hover:bg-brand-primary/10 cursor-pointer"
                }
              `}
              onClick={() =>
                !option.disabled && router.push(option.path)
              }
              disabled={option.disabled}
            >
              <div className="text-2xl font-extrabold mb-1" style={{ color: "#16283C" }}>
                {option.label}
              </div>
              <div className="text-base" style={{ color: "#1E8F8E" }}>
                {option.description}
              </div>
              {option.disabled && (
                <div className="text-xs text-orange-400 mt-4">Coming soon</div>
              )}
            </button>
          ))}
        </div>
      </div>
    </Layout>
  );
}
