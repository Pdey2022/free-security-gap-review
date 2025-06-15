import React from 'react';
import { Shield, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-2 rounded-lg">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">SecureAssess</h1>
              <p className="text-sm text-gray-500">Cybersecurity Assessment Platform</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#assessment" className="text-gray-700 hover:text-blue-600 font-medium">
              Assessment
            </a>
            <a href="#results" className="text-gray-700 hover:text-blue-600 font-medium">
              Results
            </a>
            <a href="#recommendations" className="text-gray-700 hover:text-blue-600 font-medium">
              Recommendations
            </a>
            <Button variant="outline" size="sm">
              Help
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-3">
              <a href="#assessment" className="text-gray-700 hover:text-blue-600 font-medium px-2 py-1">
                Assessment
              </a>
              <a href="#results" className="text-gray-700 hover:text-blue-600 font-medium px-2 py-1">
                Results
              </a>
              <a href="#recommendations" className="text-gray-700 hover:text-blue-600 font-medium px-2 py-1">
                Recommendations
              </a>
              <Button variant="outline" size="sm" className="w-fit">
                Help
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;