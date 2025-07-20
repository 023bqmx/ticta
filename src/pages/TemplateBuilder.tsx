import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, Plus, ArrowLeft, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";

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

const TemplateBuilder = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [templateName, setTemplateName] = useState('');
  const [fields, setFields] = useState<TemplateField[]>([]);

  const addField = () => {
    const newField: TemplateField = {
      id: Date.now().toString(),
      label: '',
      type: 'text',
      required: false
    };
    setFields([...fields, newField]);
  };

  const updateField = (id: string, updates: Partial<TemplateField>) => {
    setFields(fields.map(field => 
      field.id === id ? { ...field, ...updates } : field
    ));
  };

  const removeField = (id: string) => {
    setFields(fields.filter(field => field.id !== id));
  };

  const saveTemplate = () => {
    if (!templateName.trim()) {
      toast({
        title: "ข้อผิดพลาด",
        description: "กรุณาใส่ชื่อเทมเพลต",
        variant: "destructive"
      });
      return;
    }

    if (fields.length === 0) {
      toast({
        title: "ข้อผิดพลาด", 
        description: "กรุณาเพิ่มฟิลด์อย่างน้อย 1 ฟิลด์",
        variant: "destructive"
      });
      return;
    }

    const emptyLabels = fields.filter(field => !field.label.trim());
    if (emptyLabels.length > 0) {
      toast({
        title: "ข้อผิดพลาด",
        description: "กรุณาใส่ชื่อฟิลด์ให้ครบทุกฟิลด์",
        variant: "destructive"
      });
      return;
    }

    const template: Template = {
      id: Date.now().toString(),
      name: templateName,
      fields: fields,
      createdAt: new Date().toISOString()
    };

    // Save to localStorage
    const existingTemplates = JSON.parse(localStorage.getItem('custom_templates') || '[]');
    const updatedTemplates = [template, ...existingTemplates];
    localStorage.setItem('custom_templates', JSON.stringify(updatedTemplates));

    toast({
      title: "สำเร็จ",
      description: "บันทึกเทมเพลตเรียบร้อยแล้ว"
    });

    navigate('/template-list');
  };

  return (
    <div className="min-h-screen bg-gradient-main">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={() => navigate('/dashboard')}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                กลับ
              </Button>
              <h1 className="text-2xl font-bold text-primary">สร้างเทมเพลต</h1>
            </div>
            <Button onClick={saveTemplate}>
              <Save className="h-4 w-4 mr-2" />
              บันทึกเทมเพลต
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Card className="bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>ข้อมูลเทมเพลต</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Template Name */}
            <div className="space-y-2">
              <Label htmlFor="templateName">ชื่อเทมเพลต</Label>
              <Input
                id="templateName"
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
                placeholder="ใส่ชื่อเทมเพลต เช่น ข้อมูลสมาชิก, แบบสำรวจ, ใบสมัคร"
              />
            </div>

            {/* Fields */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-lg font-semibold">ฟิลด์ข้อมูล</Label>
                <Button variant="outline" onClick={addField}>
                  <Plus className="h-4 w-4 mr-2" />
                  เพิ่มฟิลด์
                </Button>
              </div>

              {fields.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  ยังไม่มีฟิลด์ข้อมูล กดปุ่ม "เพิ่มฟิลด์" เพื่อเริ่มต้น
                </div>
              ) : (
                <div className="space-y-4">
                  {fields.map((field, index) => (
                    <Card key={field.id} className="p-4">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                        <div className="space-y-2">
                          <Label>ชื่อฟิลด์</Label>
                          <Input
                            value={field.label}
                            onChange={(e) => updateField(field.id, { label: e.target.value })}
                            placeholder="เช่น ชื่อ, อายุ, อีเมล"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>ประเภทข้อมูล</Label>
                          <Select value={field.type} onValueChange={(value: any) => updateField(field.id, { type: value })}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="text">ข้อความ</SelectItem>
                              <SelectItem value="number">ตัวเลข</SelectItem>
                              <SelectItem value="email">อีเมล</SelectItem>
                              <SelectItem value="tel">เบอร์โทรศัพท์</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {(field.type === 'text' || field.type === 'number' || field.type === 'tel') && (
                          <div className="space-y-2">
                            <Label>จำกัดจำนวนตัวอักษร</Label>
                            <Input
                              type="number"
                              value={field.maxLength || ''}
                              onChange={(e) => updateField(field.id, { maxLength: e.target.value ? parseInt(e.target.value) : undefined })}
                              placeholder="ไม่จำกัด"
                              min="1"
                            />
                          </div>
                        )}

                        <div className="flex items-center space-x-2">
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => removeField(field.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default TemplateBuilder;