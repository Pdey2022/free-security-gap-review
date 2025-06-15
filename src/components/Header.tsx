import React from 'react';
import { Shield, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <div className="bg-white/10 p-2 rounded-lg">
              <Shield className="w-8 h-8 text-blue-200" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">DeyLabs Security</h1>
              <p className="text-sm text-blue-200">Security Assessment Platform</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-blue-100 hover:text-white transition-colors duration-200 font-medium">
              Assessment
            </a>
            <a href="#" className="text-blue-100 hover:text-white transition-colors duration-200 font-medium">
              Reports
            </a>
            <a href="#" className="text-blue-100 hover:text-white transition-colors duration-200 font-medium">
              Resources
            </a>
            <a href="#" className="text-blue-100 hover:text-white transition-colors duration-200 font-medium">
              Support
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden text-white hover:bg-white/10"
            onClick={() => setIsMenuOpen(!isMenuOpen)}>

            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen &&
        <div className="md:hidden py-4 border-t border-blue-700">
            <nav className="flex flex-col space-y-3">
              <a href="#" className="text-blue-100 hover:text-white transition-colors duration-200 font-medium py-2">
                Assessment
              </a>
              <a href="#" className="text-blue-100 hover:text-white transition-colors duration-200 font-medium py-2">
                Reports
              </a>
              <a href="#" className="text-blue-100 hover:text-white transition-colors duration-200 font-medium py-2">
                Resources
              </a>
              <a href="#" className="text-blue-100 hover:text-white transition-colors duration-200 font-medium py-2">
                Support
              </a>
            </nav>
          </div>
        }
      </div>
    </header>);

};

export default Header;