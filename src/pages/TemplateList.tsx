import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Plus, Edit, Trash2, FileText, Users, Share2, Copy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";

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

const TemplateList = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [templates, setTemplates] = useState<Template[]>([]);

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = () => {
    const saved = localStorage.getItem('custom_templates');
    const templates = saved ? JSON.parse(saved) : [];
    setTemplates(templates);
  };

  const deleteTemplate = (id: string) => {
    const updatedTemplates = templates.filter(template => template.id !== id);
    localStorage.setItem('custom_templates', JSON.stringify(updatedTemplates));
    setTemplates(updatedTemplates);
    
    toast({
      title: "สำเร็จ",
      description: "ลบเทมเพลตเรียบร้อยแล้ว"
    });
  };

  const getUsageCount = (templateId: string) => {
    const records = JSON.parse(localStorage.getItem('saved_records') || '[]');
    return records.filter((record: any) => record.templateId === templateId).length;
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'text': return 'bg-blue-100 text-blue-800';
      case 'number': return 'bg-green-100 text-green-800';
      case 'email': return 'bg-purple-100 text-purple-800';
      case 'tel': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeName = (type: string) => {
    switch (type) {
      case 'text': return 'ข้อความ';
      case 'name': return 'ชื่อ';
      case 'age': return 'อายุ';
      case 'number': return 'ตัวเลข';
      case 'idcard': return 'บัตรประชาชน';
      case 'phone': return 'เบอร์โทร';
      case 'email': return 'อีเมล';
      case 'tel': return 'เบอร์โทรทั่วไป';
      default: return type;
    }
  };

  const generateShareLink = (templateId: string) => {
    const baseUrl = window.location.origin;
    const shareUrl = `${baseUrl}/shared/template/${templateId}`;
    
    navigator.clipboard.writeText(shareUrl).then(() => {
      toast({
        title: "สำเร็จ",
        description: "คัดลอกลิงค์แชร์เรียบร้อยแล้ว"
      });
    }).catch(() => {
      toast({
        title: "ข้อผิดพลาด", 
        description: "ไม่สามารถคัดลอกลิงค์ได้",
        variant: "destructive"
      });
    });
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
              <h1 className="text-2xl font-bold text-primary">เทมเพลตของฉัน</h1>
            </div>
            <Button onClick={() => navigate('/template/create')}>
              <Plus className="h-4 w-4 mr-2" />
              สร้างเทมเพลตใหม่
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {templates.length === 0 ? (
          <div className="text-center py-16">
            <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-600 mb-2">ยังไม่มีเทมเพลต</h2>
            <p className="text-gray-500 mb-6">สร้างเทมเพลตแรกของคุณเพื่อเริ่มต้นการใช้งาน</p>
            <Button onClick={() => navigate('/template/create')}>
              <Plus className="h-4 w-4 mr-2" />
              สร้างเทมเพลตใหม่
            </Button>
          </div>
        ) : (
          <div className="grid gap-6">
            {templates.map((template) => (
              <Card key={template.id} className="bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl">{template.name}</CardTitle>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                        <span>สร้างเมื่อ: {new Date(template.createdAt).toLocaleDateString('th-TH')}</span>
                        <span className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          ใช้งาน {getUsageCount(template.id)} ครั้ง
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" onClick={() => navigate(`/template/form/${template.id}`)}>
                        <FileText className="h-4 w-4 mr-2" />
                        กรอกข้อมูล
                      </Button>
                      <Button variant="outline" onClick={() => generateShareLink(template.id)} title="แชร์เทมเพลตให้ผู้อื่นกรอกข้อมูล">
                        <Share2 className="h-4 w-4 mr-2" />
                        แชร์
                      </Button>
                      <Button variant="outline" onClick={() => navigate(`/template/edit/${template.id}`)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="destructive" onClick={() => deleteTemplate(template.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div>
                    <h4 className="font-semibold mb-3">ฟิลด์ข้อมูล ({template.fields.length} ฟิลด์)</h4>
                    <div className="flex flex-wrap gap-2">
                      {template.fields.map((field) => (
                        <Badge key={field.id} className={getTypeColor(field.type)}>
                          {field.label} ({getTypeName(field.type)})
                          {field.maxLength && ` - ${field.maxLength} ตัวอักษร`}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default TemplateList;