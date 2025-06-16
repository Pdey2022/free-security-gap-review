import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Shield, LogOut, User, UserCheck, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger } from
'@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAdmin, logout, isLoading } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const getInitials = (name: string) => {
    return name.
    split(' ').
    map((word) => word.charAt(0)).
    join('').
    toUpperCase().
    slice(0, 2);
  };

  // Don't show header on auth pages
  const isAuthPage = ['/login', '/register', '/forgot-password', '/resetpassword', '/onauthsuccess'].includes(location.pathname);

  if (isAuthPage) {
    return null;
  }

  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                SecureAssess
              </h1>
              <p className="text-xs text-gray-500 leading-none">Security Assessment Platform</p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors hover:text-blue-600 ${
              location.pathname === '/' ? 'text-blue-600' : 'text-gray-700'}`
              }>

              Dashboard
            </Link>
            {user &&
            <>
                <span className="text-sm text-gray-400">|</span>
                <span className="text-sm text-gray-600">
                  {isAdmin ? 'Admin Portal' : 'Security Assessment'}
                </span>
              </>
            }
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {isLoading ?
            <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div> :
            user ?
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white">
                        {getInitials(user.Name)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none flex items-center gap-2">
                        {user.Name}
                        {isAdmin &&
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-purple-100 to-blue-100 text-purple-800">
                            <UserCheck className="w-3 h-3 mr-1" />
                            Admin
                          </span>
                      }
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.Email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  
                  {isAdmin &&
                <>
                      <DropdownMenuItem className="cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Admin Settings</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </>
                }
                  
                  <DropdownMenuItem className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                  className="cursor-pointer text-red-600 focus:text-red-600"
                  onClick={handleLogout}>

                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu> :

            <div className="flex items-center space-x-2">
                <Button variant="ghost" asChild className="text-gray-700 hover:text-blue-600">
                  <Link to="/login">Sign In</Link>
                </Button>
                <Button asChild className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <Link to="/register">Get Started</Link>
                </Button>
              </div>
            }
          </div>
        </div>
      </div>
    </header>);

};

export default Header;