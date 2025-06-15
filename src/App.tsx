import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const queryClient = new QueryClient();

const App = () =>
<QueryClientProvider client={queryClient} data-id="anz0r96m0" data-path="src/App.tsx">
    <TooltipProvider data-id="u8531dp4u" data-path="src/App.tsx">
      <div className="min-h-screen flex flex-col" data-id="h3lz17u68" data-path="src/App.tsx">
        <Toaster data-id="h1j8dyprl" data-path="src/App.tsx" />
        <BrowserRouter data-id="sblaq1v8g" data-path="src/App.tsx">
          <Header data-id="nnytkady2" data-path="src/App.tsx" />
          <main className="flex-1" data-id="wkkpows1h" data-path="src/App.tsx">
            <Routes data-id="7ptzt7ikw" data-path="src/App.tsx">
              <Route path="/" element={<HomePage data-id="2d5tvhhvd" data-path="src/App.tsx" />} data-id="tkhy0d5t0" data-path="src/App.tsx" />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound data-id="bmxubgo3m" data-path="src/App.tsx" />} data-id="ytkf7sdvb" data-path="src/App.tsx" />
            </Routes>
          </main>
          <Footer data-id="ahw5kbtti" data-path="src/App.tsx" />
        </BrowserRouter>
      </div>
    </TooltipProvider>
  </QueryClientProvider>;


export default App;