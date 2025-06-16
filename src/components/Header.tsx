import React from 'react';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header: React.FC = () => {
  return (
    <header className="bg-slate-900/95 backdrop-blur-sm border-b border-slate-800 sticky top-0 z-50" data-id="jjpq6cri2" data-path="src/components/Header.tsx">
      <div className="container mx-auto px-4 py-4" data-id="7ok4ry05p" data-path="src/components/Header.tsx">
        <div className="flex items-center justify-between" data-id="6ba0j633d" data-path="src/components/Header.tsx">
          <Link to="/" className="flex items-center space-x-2" data-id="c287l2z3y" data-path="src/components/Header.tsx">
            <Shield className="h-8 w-8 text-blue-400" data-id="rpkp4pbe7" data-path="src/components/Header.tsx" />
            <span className="text-xl font-bold text-white" data-id="lz06n7mo3" data-path="src/components/Header.tsx">Secure  Assess</span>
          </Link>
          
          <nav className="flex items-center space-x-6" data-id="7ethwib35" data-path="src/components/Header.tsx">
            <Link to="/" data-id="3umz6ww5a" data-path="src/components/Header.tsx">
              <Button variant="ghost" className="text-slate-300 hover:text-white" data-id="1cxv61uwj" data-path="src/components/Header.tsx">
                Home
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>);

};

export default Header;