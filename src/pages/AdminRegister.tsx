import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, UserPlus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AdminRegister = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setIsLoading(true);

    try {
      console.log('Attempting admin registration...', { email });
      const { error } = await window.ezsite.apis.register({ email, password });

      if (error) {
        throw new Error(error);
      }

      console.log('Admin registration successful');
      toast({
        title: "Registration Successful",
        description: "Please check your email to verify your account, then login."
      });

      navigate('/admin/login');
    } catch (error) {
      console.error('Admin registration error:', error);
      setError(error instanceof Error ? error.message : 'Registration failed');
      toast({
        title: "Registration Failed",
        description: "Please try again with different credentials",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4" data-id="de9lwntur" data-path="src/pages/AdminRegister.tsx">
      <Card className="w-full max-w-md" data-id="tv1cecc7w" data-path="src/pages/AdminRegister.tsx">
        <CardHeader className="text-center" data-id="r811slxps" data-path="src/pages/AdminRegister.tsx">
          <div className="flex justify-center mb-4" data-id="ocvqwob7e" data-path="src/pages/AdminRegister.tsx">
            <div className="bg-blue-600 p-3 rounded-full" data-id="qhz6ma2sc" data-path="src/pages/AdminRegister.tsx">
              <Shield className="h-8 w-8 text-white" data-id="sq9arzk5c" data-path="src/pages/AdminRegister.tsx" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold" data-id="0tcl6ynt0" data-path="src/pages/AdminRegister.tsx">Admin Registration</CardTitle>
          <CardDescription data-id="vudebhigh" data-path="src/pages/AdminRegister.tsx">
            Create an admin account to manage security recommendations
          </CardDescription>
        </CardHeader>
        <CardContent data-id="oja7dm3g2" data-path="src/pages/AdminRegister.tsx">
          <form onSubmit={handleRegister} className="space-y-4" data-id="xg4omycg9" data-path="src/pages/AdminRegister.tsx">
            {error &&
            <Alert variant="destructive" data-id="f02g9jdw0" data-path="src/pages/AdminRegister.tsx">
                <AlertDescription data-id="uglhsve8w" data-path="src/pages/AdminRegister.tsx">{error}</AlertDescription>
              </Alert>
            }
            
            <div className="space-y-2" data-id="zdnedypri" data-path="src/pages/AdminRegister.tsx">
              <Label htmlFor="email" data-id="gjhlidrme" data-path="src/pages/AdminRegister.tsx">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading} data-id="y61rp128u" data-path="src/pages/AdminRegister.tsx" />

            </div>
            
            <div className="space-y-2" data-id="iksy7njn1" data-path="src/pages/AdminRegister.tsx">
              <Label htmlFor="password" data-id="bcohlxxas" data-path="src/pages/AdminRegister.tsx">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                minLength={6} data-id="rjms46cqy" data-path="src/pages/AdminRegister.tsx" />

            </div>
            
            <div className="space-y-2" data-id="ve90ktw7f" data-path="src/pages/AdminRegister.tsx">
              <Label htmlFor="confirmPassword" data-id="lh835bcna" data-path="src/pages/AdminRegister.tsx">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={isLoading}
                minLength={6} data-id="jd6puwsoo" data-path="src/pages/AdminRegister.tsx" />

            </div>
            
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading} data-id="dbu41wjtm" data-path="src/pages/AdminRegister.tsx">

              {isLoading ?
              <div className="flex items-center gap-2" data-id="gfln363kl" data-path="src/pages/AdminRegister.tsx">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" data-id="dxtqzoezp" data-path="src/pages/AdminRegister.tsx"></div>
                  Creating Account...
                </div> :

              <div className="flex items-center gap-2" data-id="a0i5tmb4l" data-path="src/pages/AdminRegister.tsx">
                  <UserPlus className="h-4 w-4" data-id="0931piphx" data-path="src/pages/AdminRegister.tsx" />
                  Create Admin Account
                </div>
              }
            </Button>
            
            <div className="text-center" data-id="2e1d14cho" data-path="src/pages/AdminRegister.tsx">
              <Button
                type="button"
                variant="link"
                onClick={() => navigate('/admin/login')}
                disabled={isLoading} data-id="mmols98zg" data-path="src/pages/AdminRegister.tsx">

                Already have an account? Sign in
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>);

};

export default AdminRegister;