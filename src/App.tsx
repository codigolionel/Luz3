import Index from "./pages/Index.tsx";

import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    // If the browser lands on a mistaken relative path like `/linel.com.ar`,
    // normalize back to `/` and drop any hash.
    const { pathname, search } = window.location;
    const normalizedPath = pathname.replace(/\/+$/, "");
    if (normalizedPath === "/linel.com.ar") {
      window.history.replaceState(null, "", `/${search}`);
    }
  }, []);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-md focus:bg-white focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-chocolate focus:shadow-lg focus:ring-2 focus:ring-rose"
      >
        Saltar al contenido
      </a>
      <Index />
    </>
  );
};

export default App;
