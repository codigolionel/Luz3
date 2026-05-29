import Index from "./pages/Index.tsx";

const App = () => (
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

export default App;
