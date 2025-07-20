import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save, ExternalLink } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { saveRecord } from '@/lib/recordUtils';

interface TemplateField {
  id: string;
  label: string;
  type: 'text' | 'number' | 'email' | 'tel' | 'name' | 'age' | 'idcard' | 'phone';
  required: boolean;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
}

interface Template {
  id: string;
  name: string;
  fields: TemplateField[];
  createdAt: string;
}

const SharedTemplate = () => {
  const { templateId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [template, setTemplate] = useState<Template | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (templateId) {
      loadTemplate();
    }
  }, [templateId]);

  const loadTemplate = () => {
    const templates = JSON.parse(localStorage.getItem('custom_templates') || '[]');
    const foundTemplate = templates.find((t: Template) => t.id === templateId);
    if (foundTemplate) {
      setTemplate(foundTemplate);
      // Initialize form data
      const initialData: Record<string, string> = {};
      foundTemplate.fields.forEach((field: TemplateField) => {
        initialData[field.id] = '';
      });
      setFormData(initialData);
    }
  };

  const handleInputChange = (fieldId: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [fieldId]: value
    }));
  };

  const validateField = (field: TemplateField, value: string): string | null => {
    if (field.required && !value.trim()) {
      return `${field.label} เป็นข้อมูลที่จำเป็น`;
    }

    if (field.maxLength && value.length > field.maxLength) {
      return `${field.label} ต้องไม่เกิน ${field.maxLength} ตัวอักษร`;
    }

    switch (field.type) {
      case 'name':
        if (value && !/^[ก-๙a-zA-Z\s]+$/.test(value)) {
          return `${field.label} ต้องเป็นตัวอักษรไทยหรืออังกฤษเท่านั้น`;
        }
        break;
      
      case 'age':
        if (value) {
          const age = Number(value);
          if (isNaN(age) || age < 1 || age > 120) {
            return `${field.label} ต้องเป็นตัวเลข 1-120`;
          }
        }
        break;
      
      case 'idcard':
        if (value && (!/^\d{13}$/.test(value))) {
          return `${field.label} ต้องเป็นเลขบัตรประชาชน 13 หลัก`;
        }
        break;
      
      case 'phone':
        if (value && (!/^0\d{9}$/.test(value))) {
          return `${field.label} ต้องเป็นเบอร์โทรศัพท์ 10 หลัก เริ่มด้วย 0`;
        }
        break;
      
      case 'number':
        if (value && isNaN(Number(value))) {
          return `${field.label} ต้องเป็นตัวเลขเท่านั้น`;
        }
        break;
      
      case 'email':
        if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return `${field.label} ต้องเป็นรูปแบบอีเมลที่ถูกต้อง`;
        }
        break;
      
      case 'tel':
        if (value && !/^[0-9+\-\s()]*$/.test(value)) {
          return `${field.label} ต้องเป็นเบอร์โทรศัพท์ที่ถูกต้อง`;
        }
        break;
    }

    return null;
  };

  const handleSubmit = () => {
    if (!template) return;

    // Validate all fields
    const errors: string[] = [];
    template.fields.forEach(field => {
      const error = validateField(field, formData[field.id] || '');
      if (error) {
        errors.push(error);
      }
    });

    if (errors.length > 0) {
      toast({
        title: "ข้อผิดพลาด",
        description: errors[0],
        variant: "destructive"
      });
      return;
    }

    // Get the first field as name for display
    const firstFieldValue = formData[template.fields[0]?.id] || 'ไม่ระบุ';

    // Save record
    saveRecord({
      type: 'template' as any,
      typeName: template.name,
      fullName: firstFieldValue,
      savedDate: new Date().toISOString().split('T')[0],
      savedTime: new Date().toTimeString().split(' ')[0].substring(0, 5),
      data: formData,
      templateId: template.id
    });

    setIsSubmitted(true);
    toast({
      title: "สำเร็จ",
      description: "บันทึกข้อมูลเรียบร้อยแล้ว"
    });
  };

  if (!template) {
    return (
      <div className="min-h-screen bg-gradient-main flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">ไม่พบเทมเพลต</h2>
          <p className="text-gray-600 mb-4">เทมเพลตนี้อาจถูกลบหรือไม่มีอยู่</p>
        </div>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-main flex items-center justify-center">
        <Card className="bg-white/90 backdrop-blur-sm max-w-md w-full mx-4">
          <CardHeader className="text-center">
            <CardTitle className="text-green-600">บันทึกข้อมูลสำเร็จ!</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p>ข้อมูลของคุณถูกบันทึกในเทมเพลต "{template.name}" เรียบร้อยแล้ว</p>
            <p className="text-sm text-gray-600">
              ขอบคุณที่กรอกข้อมูล เจ้าของเทมเพลตจะสามารถดูข้อมูลของคุณได้
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-main">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <ExternalLink className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-bold text-primary">กรอกข้อมูล: {template.name}</h1>
            </div>
            <Button onClick={handleSubmit}>
              <Save className="h-4 w-4 mr-2" />
              บันทึกข้อมูล
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Card className="bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>{template.name}</CardTitle>
            <p className="text-gray-600">กรุณากรอกข้อมูลตามฟิลด์ด้านล่าง</p>
          </CardHeader>
          <CardContent className="space-y-6">
            {template.fields.map((field) => (
              <div key={field.id} className="space-y-2">
                <Label htmlFor={field.id}>
                  {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </Label>
                <Input
                  id={field.id}
                  type={field.type === 'name' || field.type === 'age' || field.type === 'idcard' || field.type === 'phone' ? 'text' : field.type}
                  value={formData[field.id] || ''}
                  onChange={(e) => handleInputChange(field.id, e.target.value)}
                  maxLength={
                    field.type === 'idcard' ? 13 
                    : field.type === 'phone' ? 10
                    : field.type === 'age' ? 3
                    : field.maxLength
                  }
                  placeholder={
                    field.type === 'email' ? 'example@email.com'
                    : field.type === 'tel' ? '0812345678'
                    : field.type === 'phone' ? '0812345678'
                    : field.type === 'idcard' ? '1234567890123'
                    : field.type === 'age' ? '25'
                    : field.type === 'name' ? 'ชื่อของคุณ'
                    : field.type === 'number' ? 'ตัวเลข'
                    : `ใส่${field.label}`
                  }
                />
                {(field.type === 'idcard' || field.type === 'phone' || field.maxLength) && (
                  <div className="text-sm text-gray-500">
                    {formData[field.id]?.length || 0}/
                    {field.type === 'idcard' ? 13 : field.type === 'phone' ? 10 : field.maxLength} ตัวอักษร
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default SharedTemplate;