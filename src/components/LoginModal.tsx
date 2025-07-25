
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOTPRequest: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onOTPRequest }) => {
  const handleGoogleLogin = () => {
    console.log('Google login clicked');
    // TODO: Implement Google login
    onOTPRequest();
  };

  const handleSignUp = () => {
    console.log('Sign up clicked');
    // TODO: Implement Google account selector
    onOTPRequest();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">เข้าสู่ระบบ</DialogTitle>
          <DialogDescription className="text-center">
            เลือกวิธีการเข้าสู่ระบบที่คุณต้องการ
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Google Login Button */}
          
          <Button
    onClick={() => { window.location.href = "/auth/google"; }}
    variant="outline"
    className="w-full h-12 text-lg border-2 hover:bg-red-50"
>
  <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
  เข้าสู่ระบบด้วย Google
</Button>

          <div className="text-center text-sm text-gray-600">
            ยังไม่มีบัญชี?{' '}
            <button 
              onClick={handleSignUp}
              className="text-primary hover:underline"
            >
              ทดลองบัญชีฟรี
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
