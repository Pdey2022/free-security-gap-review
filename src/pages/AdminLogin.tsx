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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4" data-id="00y6djmam" data-path="src/pages/AdminLogin.tsx">
      <Card className="w-full max-w-md" data-id="vzatq4yq7" data-path="src/pages/AdminLogin.tsx">
        <CardHeader className="text-center" data-id="rut1uzc9s" data-path="src/pages/AdminLogin.tsx">
          <div className="flex justify-center mb-4" data-id="8z7u2s3v6" data-path="src/pages/AdminLogin.tsx">
            <div className="bg-blue-600 p-3 rounded-full" data-id="208kl3arg" data-path="src/pages/AdminLogin.tsx">
              <Shield className="h-8 w-8 text-white" data-id="hqwvs30m4" data-path="src/pages/AdminLogin.tsx" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold" data-id="gngjuocjz" data-path="src/pages/AdminLogin.tsx">Admin Login</CardTitle>
          <CardDescription data-id="xujb5w6py" data-path="src/pages/AdminLogin.tsx">
            Access the security recommendations management system
          </CardDescription>
        </CardHeader>
        <CardContent data-id="fbyge8qcj" data-path="src/pages/AdminLogin.tsx">
          <form onSubmit={handleLogin} className="space-y-4" data-id="zzsdd7n3l" data-path="src/pages/AdminLogin.tsx">
            {error &&
            <Alert variant="destructive" data-id="54cw82ndf" data-path="src/pages/AdminLogin.tsx">
                <AlertDescription data-id="83liev8eb" data-path="src/pages/AdminLogin.tsx">{error}</AlertDescription>
              </Alert>
            }
            
            <div className="space-y-2" data-id="74sxm41bu" data-path="src/pages/AdminLogin.tsx">
              <Label htmlFor="email" data-id="a9yjtysez" data-path="src/pages/AdminLogin.tsx">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading} data-id="wly3w161a" data-path="src/pages/AdminLogin.tsx" />

            </div>
            
            <div className="space-y-2" data-id="n1vpfdyjp" data-path="src/pages/AdminLogin.tsx">
              <Label htmlFor="password" data-id="xqota320o" data-path="src/pages/AdminLogin.tsx">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading} data-id="442s41abn" data-path="src/pages/AdminLogin.tsx" />

            </div>
            
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading} data-id="fss5wnvhy" data-path="src/pages/AdminLogin.tsx">

              {isLoading ?
              <div className="flex items-center gap-2" data-id="7orz1lrf8" data-path="src/pages/AdminLogin.tsx">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" data-id="87hkf51j2" data-path="src/pages/AdminLogin.tsx"></div>
                  Signing in...
                </div> :

              <div className="flex items-center gap-2" data-id="prwwaysrz" data-path="src/pages/AdminLogin.tsx">
                  <Lock className="h-4 w-4" data-id="w3hyphebh" data-path="src/pages/AdminLogin.tsx" />
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