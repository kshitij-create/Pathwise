"use client";

import Script from "next/script";

declare global {
  interface Window {
    UnicornStudio?: { init: () => void; isInitialized?: boolean };
  }
}

export function AuraBackground() {
  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.29/dist/unicornStudio.umd.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (typeof window !== "undefined" && window.UnicornStudio && typeof window.UnicornStudio.init === "function" && !window.UnicornStudio.isInitialized) {
            window.UnicornStudio.init();
            window.UnicornStudio.isInitialized = true;
          }
        }}
      />
      <div
        className="aura-background-component fixed top-0 w-full h-screen -z-10 opacity-50 brightness-75"
        data-alpha-mask="80"
        style={{
          maskImage: "linear-gradient(to bottom, transparent, black 0%, black 80%, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, black 0%, black 80%, transparent)",
        }}
      >
        <div className="aura-background-component top-0 w-full -z-10 absolute h-full">
          <div
            data-us-project="inzENTvhzS9plyop7Z6g"
            className="absolute w-full h-full left-0 top-0 -z-10"
          />
        </div>
      </div>
    </>
  );
}
