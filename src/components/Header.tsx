import React from 'react';
import { Shield, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white shadow-lg" data-id="lgqygpmyc" data-path="src/components/Header.tsx">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-id="cofzdsl1p" data-path="src/components/Header.tsx">
        <div className="flex justify-between items-center py-4" data-id="2rhhzgngq" data-path="src/components/Header.tsx">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3" data-id="im9wbjqcd" data-path="src/components/Header.tsx">
            <div className="bg-white/10 p-2 rounded-lg" data-id="px7dq9epe" data-path="src/components/Header.tsx">
              <Shield className="w-8 h-8 text-blue-200" data-id="ckxcc13x6" data-path="src/components/Header.tsx" />
            </div>
            <div data-id="nqvsgq7go" data-path="src/components/Header.tsx">
              <h1 className="text-xl font-bold tracking-tight" data-id="z7gti2sng" data-path="src/components/Header.tsx">DeyLabs Security</h1>
              <p className="text-sm text-blue-200" data-id="f8gor4ykm" data-path="src/components/Header.tsx">Security Assessment Platform</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8" data-id="9vvlk4uub" data-path="src/components/Header.tsx">
            <a href="#" className="text-blue-100 hover:text-white transition-colors duration-200 font-medium" data-id="hd93talvv" data-path="src/components/Header.tsx">
              Assessment
            </a>
            <a href="#" className="text-blue-100 hover:text-white transition-colors duration-200 font-medium" data-id="8zjixkuwd" data-path="src/components/Header.tsx">
              Reports
            </a>
            <a href="#" className="text-blue-100 hover:text-white transition-colors duration-200 font-medium" data-id="i0pnlf78b" data-path="src/components/Header.tsx">
              Resources
            </a>
            <a href="#" className="text-blue-100 hover:text-white transition-colors duration-200 font-medium" data-id="53gh34tpj" data-path="src/components/Header.tsx">
              Support
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden text-white hover:bg-white/10"
            onClick={() => setIsMenuOpen(!isMenuOpen)} data-id="inef13m1a" data-path="src/components/Header.tsx">

            {isMenuOpen ? <X className="w-6 h-6" data-id="8ili30tyf" data-path="src/components/Header.tsx" /> : <Menu className="w-6 h-6" data-id="3cbr0sdbx" data-path="src/components/Header.tsx" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen &&
        <div className="md:hidden py-4 border-t border-blue-700" data-id="9v86bwz4f" data-path="src/components/Header.tsx">
            <nav className="flex flex-col space-y-3" data-id="gnrxxvaon" data-path="src/components/Header.tsx">
              <a href="#" className="text-blue-100 hover:text-white transition-colors duration-200 font-medium py-2" data-id="ky5y42wgi" data-path="src/components/Header.tsx">
                Assessment
              </a>
              <a href="#" className="text-blue-100 hover:text-white transition-colors duration-200 font-medium py-2" data-id="2ttnmqa4o" data-path="src/components/Header.tsx">
                Reports
              </a>
              <a href="#" className="text-blue-100 hover:text-white transition-colors duration-200 font-medium py-2" data-id="kzgtpdx8x" data-path="src/components/Header.tsx">
                Resources
              </a>
              <a href="#" className="text-blue-100 hover:text-white transition-colors duration-200 font-medium py-2" data-id="x5co8mum0" data-path="src/components/Header.tsx">
                Support
              </a>
            </nav>
          </div>
        }
      </div>
    </header>);

};

export default Header;