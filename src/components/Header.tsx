import React from 'react';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header: React.FC = () => {
  return (
    <header className="bg-slate-900/95 backdrop-blur-sm border-b border-slate-800 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-blue-400" />
            <span className="text-xl font-bold text-white">Secure  Assess</span>
          </Link>
          
          <nav className="flex items-center space-x-6">
            <Link to="/">
              <Button variant="ghost" className="text-slate-300 hover:text-white">
                Home
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>);

};

export default Header;