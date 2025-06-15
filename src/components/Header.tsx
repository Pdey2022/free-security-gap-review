import React, { useState, useEffect } from 'react';
import { Shield, Menu, X, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState<{Name?: string;Email?: string;} | null>(null);

  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const { data, error } = await window.ezsite.apis.getUserInfo();
      if (error) {
        setIsLoggedIn(false);
        setUserInfo(null);
      } else {
        setIsLoggedIn(true);
        setUserInfo(data);
      }
    } catch (error) {
      setIsLoggedIn(false);
      setUserInfo(null);
    }
  };

  const handleLogout = async () => {
    try {
      const { error } = await window.ezsite.apis.logout();
      if (error) {
        console.error('Logout error:', error);
      }

      setIsLoggedIn(false);
      setUserInfo(null);

      toast({
        title: "Logged out successfully",
        description: "You have been signed out of your account."
      });

      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: "Logout failed",
        description: "There was an error logging you out. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <header className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="bg-white/10 p-2 rounded-lg">
              <Shield className="w-8 h-8 text-blue-200" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">DeyLabs Security</h1>
              <p className="text-sm text-blue-200">Security Assessment Platform</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-blue-100 hover:text-white transition-colors duration-200 font-medium">
              Assessment
            </Link>
            <a href="#" className="text-blue-100 hover:text-white transition-colors duration-200 font-medium">
              Reports
            </a>
            <a href="#" className="text-blue-100 hover:text-white transition-colors duration-200 font-medium">
              Resources
            </a>
            <a href="#" className="text-blue-100 hover:text-white transition-colors duration-200 font-medium">
              Support
            </a>

            {/* Authentication Buttons */}
            <div className="flex items-center space-x-4 ml-8">
              {isLoggedIn ?
              <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-blue-200" />
                    <span className="text-sm text-blue-100">
                      {userInfo?.Name || userInfo?.Email?.split('@')[0] || 'User'}
                    </span>
                  </div>
                  <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="border-blue-300 text-blue-100 hover:bg-blue-700 hover:text-white">

                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </div> :

              <>
                  <Link to="/signin">
                    <Button
                    variant="ghost"
                    size="sm"
                    className="text-blue-100 hover:bg-white/10 hover:text-white">

                      Sign In
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button
                    variant="outline"
                    size="sm"
                    className="border-blue-300 text-blue-100 hover:bg-blue-700 hover:text-white">

                      Sign Up
                    </Button>
                  </Link>
                </>
              }
            </div>
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
              <Link
              to="/"
              className="text-blue-100 hover:text-white transition-colors duration-200 font-medium py-2"
              onClick={() => setIsMenuOpen(false)}>

                Assessment
              </Link>
              <a href="#" className="text-blue-100 hover:text-white transition-colors duration-200 font-medium py-2">
                Reports
              </a>
              <a href="#" className="text-blue-100 hover:text-white transition-colors duration-200 font-medium py-2">
                Resources
              </a>
              <a href="#" className="text-blue-100 hover:text-white transition-colors duration-200 font-medium py-2">
                Support
              </a>
              
              {/* Mobile Authentication */}
              <div className="border-t border-blue-700 pt-4 space-y-3">
                {isLoggedIn ?
              <>
                    <div className="flex items-center space-x-2 py-2">
                      <User className="w-4 h-4 text-blue-200" />
                      <span className="text-sm text-blue-100">
                        {userInfo?.Name || userInfo?.Email?.split('@')[0] || 'User'}
                      </span>
                    </div>
                    <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="border-blue-300 text-blue-100 hover:bg-blue-700 hover:text-white w-full">

                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </Button>
                  </> :

              <>
                    <Link to="/signin" onClick={() => setIsMenuOpen(false)}>
                      <Button
                    variant="ghost"
                    size="sm"
                    className="text-blue-100 hover:bg-white/10 hover:text-white w-full">

                        Sign In
                      </Button>
                    </Link>
                    <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                      <Button
                    variant="outline"
                    size="sm"
                    className="border-blue-300 text-blue-100 hover:bg-blue-700 hover:text-white w-full">

                        Sign Up
                      </Button>
                    </Link>
                  </>
              }
              </div>
            </nav>
          </div>
        }
      </div>
    </header>);

};

export default Header;