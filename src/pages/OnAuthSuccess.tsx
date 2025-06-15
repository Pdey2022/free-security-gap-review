import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

const OnAuthSuccess = () => {
  const [countdown, setCountdown] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate('/admin/login');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-green-600">
            Registration Successful!
          </CardTitle>
          <CardDescription>
            Your account has been successfully verified and is ready to use.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            You will be automatically redirected to the login page in:
          </p>
          <div className="text-4xl font-bold text-blue-600 mb-4">
            {countdown}
          </div>
          <p className="text-sm text-gray-500">
            If you are not redirected automatically, please click{' '}
            <button 
              onClick={() => navigate('/admin/login')}
              className="text-blue-600 hover:underline"
            >
              here
            </button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnAuthSuccess;