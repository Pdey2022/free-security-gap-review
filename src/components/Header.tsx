import React from 'react';
import { Shield, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white shadow-lg" data-id="4zipc01jj" data-path="src/components/Header.tsx">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-id="bddonziy7" data-path="src/components/Header.tsx">
        <div className="flex justify-between items-center py-4" data-id="3uq29b713" data-path="src/components/Header.tsx">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3" data-id="w5p8zccsu" data-path="src/components/Header.tsx">
            <div className="bg-white/10 p-2 rounded-lg" data-id="suiu2txas" data-path="src/components/Header.tsx">
              <Shield className="w-8 h-8 text-blue-200" data-id="enewscp29" data-path="src/components/Header.tsx" />
            </div>
            <div data-id="s3g7jje7p" data-path="src/components/Header.tsx">
              <h1 className="text-xl font-bold tracking-tight" data-id="lahu1vrfp" data-path="src/components/Header.tsx">DeyLabs Secuiry</h1>
              <p className="text-sm text-blue-200" data-id="l7z7olryx" data-path="src/components/Header.tsx">Security Assessment Platform</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8" data-id="idrvmxi6l" data-path="src/components/Header.tsx">
            <a href="#" className="text-blue-100 hover:text-white transition-colors duration-200 font-medium" data-id="06q1fzkde" data-path="src/components/Header.tsx">
              Assessment
            </a>
            <a href="#" className="text-blue-100 hover:text-white transition-colors duration-200 font-medium" data-id="98ten10g7" data-path="src/components/Header.tsx">
              Reports
            </a>
            <a href="#" className="text-blue-100 hover:text-white transition-colors duration-200 font-medium" data-id="zqgr7n2la" data-path="src/components/Header.tsx">
              Resources
            </a>
            <a href="#" className="text-blue-100 hover:text-white transition-colors duration-200 font-medium" data-id="o68wa3w62" data-path="src/components/Header.tsx">
              Support
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden text-white hover:bg-white/10"
            onClick={() => setIsMenuOpen(!isMenuOpen)} data-id="7qp0944i5" data-path="src/components/Header.tsx">

            {isMenuOpen ? <X className="w-6 h-6" data-id="n80woehya" data-path="src/components/Header.tsx" /> : <Menu className="w-6 h-6" data-id="oapi5w7x1" data-path="src/components/Header.tsx" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen &&
        <div className="md:hidden py-4 border-t border-blue-700" data-id="629roi8q6" data-path="src/components/Header.tsx">
            <nav className="flex flex-col space-y-3" data-id="pp4yje7om" data-path="src/components/Header.tsx">
              <a href="#" className="text-blue-100 hover:text-white transition-colors duration-200 font-medium py-2" data-id="hi5uaw2xv" data-path="src/components/Header.tsx">
                Assessment
              </a>
              <a href="#" className="text-blue-100 hover:text-white transition-colors duration-200 font-medium py-2" data-id="5fwsjx27h" data-path="src/components/Header.tsx">
                Reports
              </a>
              <a href="#" className="text-blue-100 hover:text-white transition-colors duration-200 font-medium py-2" data-id="v6tl5z9zp" data-path="src/components/Header.tsx">
                Resources
              </a>
              <a href="#" className="text-blue-100 hover:text-white transition-colors duration-200 font-medium py-2" data-id="nqt6yswm3" data-path="src/components/Header.tsx">
                Support
              </a>
            </nav>
          </div>
        }
      </div>
    </header>);

};

export default Header;