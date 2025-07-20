import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Save } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { saveRecord, getRecordById } from '@/lib/recordUtils';

interface TemplateField {
  id: string;
  label: string;
  type: 'text' | 'number' | 'email' | 'tel';
  required: boolean;
  maxLength?: number;
}

interface Template {
  id: string;
  name: string;
  fields: TemplateField[];
  createdAt: string;
}

const TemplateForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { templateId, recordId } = useParams();
  const [template, setTemplate] = useState<Template | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isViewMode, setIsViewMode] = useState(false);

  useEffect(() => {
    if (templateId) {
      loadTemplate();
    }
    if (recordId) {
      loadRecord();
    }
  }, [templateId, recordId]);

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

  const loadRecord = () => {
    if (recordId) {
      const record = getRecordById(recordId);
      if (record && record.data) {
        setFormData(record.data);
        setIsViewMode(true);
      }
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

    if (field.type === 'number' && value && isNaN(Number(value))) {
      return `${field.label} ต้องเป็นตัวเลขเท่านั้น`;
    }

    if (field.type === 'email' && value && !value.includes('@')) {
      return `${field.label} ต้องเป็นรูปแบบอีเมลที่ถูกต้อง`;
    }

    if (field.type === 'tel' && value && !/^[0-9+\-\s()]*$/.test(value)) {
      return `${field.label} ต้องเป็นเบอร์โทรศัพท์ที่ถูกต้อง`;
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

    if (isViewMode && recordId) {
      // Update existing record
      const { updateRecord } = require('@/lib/recordUtils');
      updateRecord(recordId, formData);
      toast({
        title: "สำเร็จ",
        description: "อัปเดตข้อมูลเรียบร้อยแล้ว"
      });
    } else {
      // Save new record
      saveRecord({
        type: 'template' as any,
        typeName: template.name,
        fullName: firstFieldValue,
        savedDate: new Date().toISOString().split('T')[0],
        savedTime: new Date().toTimeString().split(' ')[0].substring(0, 5),
        data: formData,
        templateId: template.id
      });

      toast({
        title: "สำเร็จ",
        description: "บันทึกข้อมูลเรียบร้อยแล้ว"
      });
    }

    navigate('/history');
  };

  if (!template) {
    return (
      <div className="min-h-screen bg-gradient-main flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">ไม่พบเทมเพลต</h2>
          <Button onClick={() => navigate('/template-list')}>กลับไปรายการเทมเพลต</Button>
        </div>
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
              <Button variant="outline" onClick={() => navigate(isViewMode ? '/history' : '/template-list')}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                กลับ
              </Button>
              <h1 className="text-2xl font-bold text-primary">
                {isViewMode ? 'ดูข้อมูล' : 'กรอกข้อมูล'}: {template.name}
              </h1>
            </div>
            <Button onClick={handleSubmit}>
              <Save className="h-4 w-4 mr-2" />
              {isViewMode ? 'อัปเดตข้อมูล' : 'บันทึกข้อมูล'}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Card className="bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>{template.name}</CardTitle>
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
                  type={field.type}
                  value={formData[field.id] || ''}
                  onChange={(e) => handleInputChange(field.id, e.target.value)}
                  maxLength={field.maxLength}
                  placeholder={
                    field.type === 'email' ? 'ตอบ example@email.com'
                    : field.type === 'tel' ? 'ตอบ 0812345678'
                    : field.type === 'number' ? 'ตอบเป็นตัวเลข'
                    : `ตอบ${field.label}`
                  }
                />
                {field.maxLength && (
                  <div className="text-sm text-gray-500">
                    {formData[field.id]?.length || 0}/{field.maxLength} ตัวอักษร
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

export default TemplateForm;