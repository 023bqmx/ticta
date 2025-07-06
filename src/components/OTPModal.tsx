
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from 'react-router-dom';

interface OTPModalProps {
  isOpen: boolean;
  onClose: () => void;
  phoneNumber: string;
}

const OTPModal: React.FC<OTPModalProps> = ({ isOpen, onClose, phoneNumber }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setCanResend(true);
    }
  }, [isOpen, countdown]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerifyOTP = () => {
    const otpCode = otp.join('');
    if (otpCode.length !== 6) {
      toast({
        title: "กรุณากรอกรหัส OTP ให้ครบ",
        description: "รหัส OTP ต้องมี 6 หลัก",
        variant: "destructive",
      });
      return;
    }

    // Simulate OTP verification
    console.log('Verifying OTP:', otpCode);
    toast({
      title: "ยืนยันสำเร็จ!",
      description: "เข้าสู่ระบบเรียบร้อยแล้ว",
    });
    
    onClose();
    navigate('/dashboard');
  };

  const handleResendOTP = () => {
    console.log('Resending OTP to:', phoneNumber);
    setCountdown(60);
    setCanResend(false);
    setOtp(['', '', '', '', '', '']);
    toast({
      title: "ส่งรหัส OTP ใหม่แล้ว",
      description: `รหัส OTP ใหม่ถูกส่งไปยัง ${phoneNumber}`,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">ยืนยันรหัส OTP</DialogTitle>
          <DialogDescription className="text-center">
            รหัส OTP ถูกส่งไปยัง <span className="font-semibold">{phoneNumber}</span>
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          <div>
            <Label className="text-center block mb-4">กรอกรหัส OTP 6 หลัก</Label>
            <div className="flex justify-center space-x-2">
              {otp.map((digit, index) => (
                <Input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-12 text-center text-xl font-bold"
                  maxLength={1}
                />
              ))}
            </div>
          </div>

          <Button 
            onClick={handleVerifyOTP}
            className="w-full h-12 text-lg"
          >
            ยืนยันรหัส OTP
          </Button>

          <div className="text-center">
            {canResend ? (
              <Button 
                variant="link" 
                onClick={handleResendOTP}
                className="text-primary"
              >
                ส่งรหัส OTP ใหม่
              </Button>
            ) : (
              <p className="text-sm text-gray-600">
                ส่งรหัสใหม่ได้ในอีก {countdown} วินาที
              </p>
            )}
          </div>

          <div className="text-center text-xs text-gray-500">
            ไม่ได้รับรหัส OTP?{' '}
            <button 
              className="text-primary hover:underline"
              onClick={() => {
                onClose();
                // Navigate back to login
              }}
            >
              เปลี่ยนเบอร์โทรศัพท์
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OTPModal;
