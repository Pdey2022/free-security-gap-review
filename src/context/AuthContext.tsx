import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from '@/hooks/use-toast';

interface User {
  ID: number;
  Name: string;
  Email: string;
  CreateTime: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAdmin: boolean;
  login: (email: string, password: string, isAdminLogin?: boolean) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  sendResetEmail: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const { data, error } = await window.ezsite.apis.getUserInfo();
      if (!error && data) {
        setUser(data);
        // Check if user is admin based on email domain or specific logic
        setIsAdmin(data.Email.includes('admin') || data.Email.endsWith('@admin.com'));
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string, isAdminLogin = false) => {
    try {
      setIsLoading(true);
      const { error } = await window.ezsite.apis.login({ email, password });
      
      if (error) {
        throw new Error(error);
      }

      // Get user info after successful login
      const { data: userData, error: userError } = await window.ezsite.apis.getUserInfo();
      if (userError) {
        throw new Error(userError);
      }

      setUser(userData);
      setIsAdmin(isAdminLogin || userData.Email.includes('admin') || userData.Email.endsWith('@admin.com'));
      
      toast({
        title: "Login Successful",
        description: `Welcome back, ${userData.Name}!`,
      });
    } catch (error) {
      toast({
        title: "Login Failed",
        description: error instanceof Error ? error.message : "Please check your credentials and try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      setIsLoading(true);
      const { error } = await window.ezsite.apis.register({ email, password });
      
      if (error) {
        throw new Error(error);
      }

      toast({
        title: "Registration Successful",
        description: "Please check your email to verify your account.",
      });
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      const { error } = await window.ezsite.apis.logout();
      if (error) {
        throw new Error(error);
      }
      
      setUser(null);
      setIsAdmin(false);
      
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
    } catch (error) {
      toast({
        title: "Logout Failed",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      });
    }
  };

  const sendResetEmail = async (email: string) => {
    try {
      const { error } = await window.ezsite.apis.sendResetPwdEmail({ email });
      if (error) {
        throw new Error(error);
      }
      
      toast({
        title: "Reset Email Sent",
        description: "Please check your email for password reset instructions.",
      });
    } catch (error) {
      toast({
        title: "Failed to Send Reset Email",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const resetPassword = async (token: string, password: string) => {
    try {
      const { error } = await window.ezsite.apis.resetPassword({ token, password });
      if (error) {
        throw new Error(error);
      }
      
      toast({
        title: "Password Reset Successful",
        description: "Your password has been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Password Reset Failed",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const value = {
    user,
    isLoading,
    isAdmin,
    login,
    register,
    logout,
    sendResetEmail,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};