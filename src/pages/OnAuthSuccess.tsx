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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4" data-id="u0n6oqrb8" data-path="src/pages/OnAuthSuccess.tsx">
      <Card className="w-full max-w-md text-center" data-id="q8zo2xyvo" data-path="src/pages/OnAuthSuccess.tsx">
        <CardHeader data-id="cchqkklch" data-path="src/pages/OnAuthSuccess.tsx">
          <div className="flex justify-center mb-4" data-id="cgwxj7eaq" data-path="src/pages/OnAuthSuccess.tsx">
            <CheckCircle className="h-16 w-16 text-green-600" data-id="at3alkc05" data-path="src/pages/OnAuthSuccess.tsx" />
          </div>
          <CardTitle className="text-2xl font-bold text-green-600" data-id="uqf5uk8x5" data-path="src/pages/OnAuthSuccess.tsx">
            Registration Successful!
          </CardTitle>
          <CardDescription data-id="2s53a7y5d" data-path="src/pages/OnAuthSuccess.tsx">
            Your account has been successfully verified and is ready to use.
          </CardDescription>
        </CardHeader>
        <CardContent data-id="ih23zqvxe" data-path="src/pages/OnAuthSuccess.tsx">
          <p className="text-gray-600 mb-4" data-id="8qqlzzm77" data-path="src/pages/OnAuthSuccess.tsx">
            You will be automatically redirected to the login page in:
          </p>
          <div className="text-4xl font-bold text-blue-600 mb-4" data-id="qzhxo2egk" data-path="src/pages/OnAuthSuccess.tsx">
            {countdown}
          </div>
          <p className="text-sm text-gray-500" data-id="i4sqm4shk" data-path="src/pages/OnAuthSuccess.tsx">
            If you are not redirected automatically, please click{' '}
            <button
              onClick={() => navigate('/admin/login')}
              className="text-blue-600 hover:underline" data-id="fzrqhbz7t" data-path="src/pages/OnAuthSuccess.tsx">

              here
            </button>
          </p>
        </CardContent>
      </Card>
    </div>);

};

export default OnAuthSuccess;