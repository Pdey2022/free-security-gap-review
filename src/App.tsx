import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import AdminRegister from "./pages/AdminRegister";
import AdminDashboard from "./pages/AdminDashboard";
import OnAuthSuccess from "./pages/OnAuthSuccess";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const queryClient = new QueryClient();

const App = () =>
<QueryClientProvider client={queryClient} data-id="2dhz2m0ul" data-path="src/App.tsx">
    <TooltipProvider data-id="hcbn3mqu3" data-path="src/App.tsx">
      <div className="min-h-screen flex flex-col" data-id="jei6sv20h" data-path="src/App.tsx">
        <Toaster data-id="d935wog3c" data-path="src/App.tsx" />
        <BrowserRouter data-id="p22euu5k3" data-path="src/App.tsx">
          <Header data-id="c1fs43wah" data-path="src/App.tsx" />
          <main className="flex-1" data-id="tdxjg9qp3" data-path="src/App.tsx">
            <Routes data-id="9o1jamp3q" data-path="src/App.tsx">
              <Route path="/" element={<HomePage data-id="n6e38lw64" data-path="src/App.tsx" />} data-id="1u7mwjh3j" data-path="src/App.tsx" />
              <Route path="/admin/login" element={<AdminLogin data-id="icyvhn74w" data-path="src/App.tsx" />} data-id="dbi3f5vm1" data-path="src/App.tsx" />
              <Route path="/admin/register" element={<AdminRegister data-id="53ake8wbd" data-path="src/App.tsx" />} data-id="zisb2amrs" data-path="src/App.tsx" />
              <Route path="/admin/dashboard" element={<AdminDashboard data-id="5gi4t4j61" data-path="src/App.tsx" />} data-id="uzkth5c2m" data-path="src/App.tsx" />
              <Route path="/onauthsuccess" element={<OnAuthSuccess data-id="6oj898fuw" data-path="src/App.tsx" />} data-id="9nm69o6ir" data-path="src/App.tsx" />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound data-id="lnsmqexkc" data-path="src/App.tsx" />} data-id="uiufr3o7a" data-path="src/App.tsx" />
            </Routes>
          </main>
          <Footer data-id="6t3gr5mig" data-path="src/App.tsx" />
        </BrowserRouter>
      </div>
    </TooltipProvider>
  </QueryClientProvider>;


export default App;