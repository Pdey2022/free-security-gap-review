import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const OnAuthSuccessPage: React.FC = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate('/login');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
        <CardContent className="pt-8 pb-8">
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="p-4 bg-gradient-to-br from-green-600 to-blue-600 rounded-full animate-pulse">
                <CheckCircle2 className="h-12 w-12 text-white" />
              </div>
            </div>
            
            <div className="space-y-2">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Email Verified!
              </h1>
              <p className="text-lg text-gray-700">
                Your account has been successfully verified.
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-gray-600">
                Thank you for confirming your email address. Your account is now active and ready to use.
              </p>
              
              <div className="flex items-center justify-center space-x-2 text-blue-600">
                <span className="text-sm">Redirecting to login in</span>
                <span className="font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {countdown}
                </span>
                <span className="text-sm">seconds</span>
                <ArrowRight className="h-4 w-4 animate-bounce" />
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-green-600 to-blue-600 h-2 rounded-full transition-all duration-1000 ease-out"
                  style={{
                    width: `${(5 - countdown) / 5 * 100}%`
                  }}>
                </div>
              </div>
            </div>

            <p className="text-xs text-gray-500 mt-6">
              You can now sign in to access your security assessment dashboard.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>);

};

export default OnAuthSuccessPage;