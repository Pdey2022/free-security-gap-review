import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      console.log('Attempting admin login...', { email });
      const { error } = await window.ezsite.apis.login({ email, password });

      if (error) {
        throw new Error(error);
      }

      // Check if user is admin by getting user info
      const { data: userInfo, error: userError } = await window.ezsite.apis.getUserInfo();

      if (userError) {
        throw new Error(userError);
      }

      // For now, any logged-in user can access admin (you can modify this logic)
      console.log('Admin login successful', userInfo);

      localStorage.setItem('adminAuth', 'true');
      toast({
        title: "Admin Login Successful",
        description: "Welcome to the admin dashboard!"
      });

      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Admin login error:', error);
      setError(error instanceof Error ? error.message : 'Login failed');
      toast({
        title: "Login Failed",
        description: "Invalid credentials or access denied",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-600 p-3 rounded-full">
              <Shield className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
          <CardDescription>
            Access the security recommendations management system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            {error &&
            <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            }
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading} />

            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading} />

            </div>
            
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}>

              {isLoading ?
              <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Signing in...
                </div> :

              <div className="flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  Sign In
                </div>
              }
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>);

};

export default AdminLogin;