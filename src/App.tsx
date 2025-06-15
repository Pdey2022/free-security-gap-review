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
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ResetPassword from "./pages/ResetPassword";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const queryClient = new QueryClient();

const App = () =>
<QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <div className="min-h-screen flex flex-col">
        <Toaster />
        <BrowserRouter>
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/resetpassword" element={<ResetPassword />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/register" element={<AdminRegister />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/onauthsuccess" element={<OnAuthSuccess />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </BrowserRouter>
      </div>
    </TooltipProvider>
  </QueryClientProvider>;


export default App;