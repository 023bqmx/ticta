import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Mail, Copy, CheckCircle } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface ContactModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ContactModal({ open, onOpenChange }: ContactModalProps) {
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);
  const { toast } = useToast();

  const emails = [
    "bombeamlazer@gmail.com",
    "qkabkab@gmail.com", 
    "winpawin2704@gmail.com"
  ];

  const copyEmail = async (email: string) => {
    try {
      await navigator.clipboard.writeText(email);
      setCopiedEmail(email);
      toast({
        title: "คัดลอกแล้ว",
        description: `คัดลอกอีเมล ${email} เรียบร้อยแล้ว`,
      });
      setTimeout(() => setCopiedEmail(null), 2000);
    } catch (err) {
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถคัดลอกอีเมลได้",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-4">
            ติดต่อขอความช่วยเหลือ
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="text-center">
            <p className="text-muted-foreground mb-6">
              หากคุณมีปัญหาหรือข้อสงสัยเกี่ยวกับการใช้งาน สามารถติดต่อเราได้ที่อีเมลด้านล่าง
            </p>
          </div>

          <div className="space-y-3">
            {emails.map((email, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <span className="text-sm font-mono">{email}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyEmail(email)}
                  className="h-8 w-8 p-0"
                >
                  {copiedEmail === email ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            ))}
          </div>

          <div className="text-center text-sm text-muted-foreground mt-6">
            <p>เราจะตอบกลับภายใน 24 ชั่วโมง</p>
          </div>

          <div className="flex justify-center pt-4">
            <Button onClick={() => onOpenChange(false)} className="px-8">
              ปิด
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}