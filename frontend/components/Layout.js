import { useRouter } from "next/router";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

const UserIcon = () => (
  <svg fill="#AAAAAA" viewBox="0 0 20 20" width={28} height={28}>
    <circle cx="10" cy="6.5" r="4.5"/>
    <ellipse cx="10" cy="15.5" rx="7" ry="4"/>
  </svg>
);

const BackIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="#1E8F8E" viewBox="0 0 20 20" width={28} height={28}>
    <path d="M11 15l-5-5 5-5v10z" />
  </svg>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="#888" viewBox="0 0 24 24" width={22} height={22}>
    <path d="M18.3 5.71a1 1 0 00-1.41 0L12 10.59 7.11 5.7a1 1 0 00-1.41 1.42l4.89 4.89-4.89 4.88a1 1 0 101.41 1.42l4.89-4.89 4.89 4.89a1 1 0 001.41-1.42l-4.89-4.88 4.89-4.89a1 1 0 000-1.41z"/>
  </svg>
);

export default function Layout({ children }) {
  const router = useRouter();
  const { pathname } = router;
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();

  // Close the panel if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  function handleMenuClick(path) {
    setMenuOpen(false);
    if (path) router.push(path);
  }

  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      <header className="w-full flex items-center justify-between bg-white border-b border-gray-200 px-6 py-3 shadow-sm mb-6">
        {/* Left: Logo + Title */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => router.push("/dashboard")}
        >
          <Image src="/logo.svg" alt="Logo" width={36} height={36} priority />
          <span className="text-xl font-extrabold tracking-wide" style={{ color: '#1E8F8E' }}>
            Page Object Generator
          </span>
        </div>
        {/* Right: Back icon (except dashboard) + User icon */}
        <div className="flex items-center space-x-4 relative">
          {pathname !== "/dashboard" && (
            <button
              onClick={() => router.back()}
              title="Go Back"
              className="rounded-full bg-gray-100 hover:bg-brand-primary/10 p-1 flex items-center"
            >
              <BackIcon />
            </button>
          )}
          {/* User Icon with dropdown menu */}
          <span className="rounded-full bg-gray-100 p-1 cursor-pointer" onClick={() => setMenuOpen(v => !v)}>
            <UserIcon />
          </span>
          {menuOpen && (
            <div
              ref={menuRef}
              className="absolute top-12 right-0 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-20"
              style={{ minWidth: 220 }}
            >
              <div className="flex justify-between items-center border-b border-gray-100 px-4 py-3 text-brand-dark">
                <div>
                  <div className="font-semibold text-base mb-1">Admin</div>
                  <div className="text-xs text-gray-500">admin@example.com</div>
                </div>
                <button
                  className="ml-2 p-1 hover:bg-gray-200 rounded"
                  aria-label="Close"
                  onClick={() => setMenuOpen(false)}
                >
                  <CloseIcon />
                </button>
              </div>
              <button
                className="w-full text-left px-4 py-2 text-teal-700 hover:bg-gray-50 font-medium"
                onClick={() => handleMenuClick("/ai-settings")}
              >
                AI Settings
              </button>
              <button
                className="w-full text-left px-4 py-2 text-gray-500 hover:bg-gray-100"
                onClick={() => setMenuOpen(false)}
              >
                Close
              </button>
            </div>
          )}
        </div>
      </header>
      <main>
        {children}
      </main>
    </div>
  );
}
