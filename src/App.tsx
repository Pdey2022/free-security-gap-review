import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HomePage from '@/pages/HomePage';
import NotFound from '@/pages/NotFound';
import './App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient} data-id="i4bt4r9h9" data-path="src/App.tsx">
      <TooltipProvider data-id="u465nunpt" data-path="src/App.tsx">
        <Router data-id="r85jfqg5t" data-path="src/App.tsx">
          <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900" data-id="lhlchtek0" data-path="src/App.tsx">
            <Header data-id="njpxxovbc" data-path="src/App.tsx" />
            <main data-id="1rx0vb5r2" data-path="src/App.tsx">
              <Routes data-id="7s02t52nv" data-path="src/App.tsx">
                <Route path="/" element={<HomePage data-id="s7zd949ln" data-path="src/App.tsx" />} data-id="6of4ufn98" data-path="src/App.tsx" />
                <Route path="*" element={<NotFound data-id="2s5p7dnks" data-path="src/App.tsx" />} data-id="uvr5bva8p" data-path="src/App.tsx" />
              </Routes>
            </main>
            <Footer data-id="irhf8futa" data-path="src/App.tsx" />
          </div>
          <Toaster data-id="ujbfrkspp" data-path="src/App.tsx" />
        </Router>
      </TooltipProvider>
    </QueryClientProvider>);

}

export default App;