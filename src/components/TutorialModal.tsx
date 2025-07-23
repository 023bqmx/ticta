import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle, FileText, PlusCircle, Save, History } from "lucide-react";

interface TutorialModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TutorialModal({ open, onOpenChange }: TutorialModalProps) {
  const steps = [
    {
      number: 1,
      title: "เลือกเทมเพลตที่คุณต้องการ",
      description: "จาก 3 เทมเพลตหลัก หรือเลือก 'สร้างฟอร์มใหม่' เพื่อปรับแต่งเอง",
      icon: FileText
    },
    {
      number: 2,
      title: "เริ่มกรอกข้อมูล",
      description: "กรอกข้อมูลลงในฟอร์มที่เลือก",
      icon: PlusCircle
    },
    {
      number: 3,
      title: "บันทึกข้อมูล",
      description: "กดปุ่ม 'บันทึก' เพื่อเก็บข้อมูลของคุณ",
      icon: Save
    },
    {
      number: 4,
      title: "ดูประวัติการบันทึก",
      description: "สามารถกดเข้าไปดูประวัติการบันทึกข้อมูลของคุณได้",
      icon: History
    }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-4">
            แนะนำการใช้งาน
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="text-center">
            <p className="text-muted-foreground leading-relaxed">
              เว็บไซต์นี้คือเครื่องมือที่ช่วยให้คุณเก็บข้อมูลสำคัญได้อย่างเป็นระบบและง่ายดาย 
              ไม่ว่าจะเป็นข้อมูลส่วนตัว, ข้อมูลการเรียน, ข้อมูลการทำงาน, หรือข้อมูลใดๆ 
              ที่คุณต้องการเก็บไว้ในที่เดียว และที่สำคัญคือคุณสามารถเลือกใช้เทมเพลตสำเร็จรูป
              ที่เหมาะกับความต้องการของคุณ หรือจะสร้างฟอร์มขึ้นมาเองก็ได้
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-center mb-4">
              ขั้นตอนการใช้งานง่าย ๆ อยู่ 4 ขั้นตอน
            </h3>
            
            {steps.map((step) => {
              const IconComponent = step.icon;
              return (
                <div key={step.number} className="flex items-start space-x-4 p-4 rounded-lg bg-muted/50">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                    {step.number}
                  </div>
                  <div className="flex-shrink-0">
                    <IconComponent className="h-6 w-6 text-primary mt-1" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1">{step.title}</h4>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center pt-4">
            <Button onClick={() => onOpenChange(false)} className="px-8">
              <CheckCircle className="h-4 w-4 mr-2" />
              เข้าใจแล้ว
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}