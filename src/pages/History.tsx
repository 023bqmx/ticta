import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, FileText, GraduationCap, Building, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const History = () => {
  const navigate = useNavigate();

  // Mock data for saved records
  const savedRecords = [
    {
      id: 1,
      type: 'student',
      typeName: 'นักเรียน',
      fullName: 'นาย สมชาย ใจดี',
      savedDate: '2024-01-15',
      savedTime: '14:30',
      icon: GraduationCap,
      color: 'bg-blue-100 text-blue-800',
      borderColor: 'border-blue-200'
    },
    {
      id: 2,
      type: 'employee',
      typeName: 'พนักงาน',
      fullName: 'นางสาว สุดา พิมพา',
      savedDate: '2024-01-10',
      savedTime: '10:15',
      icon: Building,
      color: 'bg-green-100 text-green-800',
      borderColor: 'border-green-200'
    },
    {
      id: 3,
      type: 'general',
      typeName: 'บุคคลทั่วไป',
      fullName: 'นาย วิชัย รักดี',
      savedDate: '2024-01-08',
      savedTime: '16:45',
      icon: User,
      color: 'bg-purple-100 text-purple-800',
      borderColor: 'border-purple-200'
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'student':
        return GraduationCap;
      case 'employee':
        return Building;
      case 'general':
        return User;
      default:
        return FileText;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-main">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate('/dashboard')}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                กลับ
              </Button>
              <div className="flex items-center space-x-2">
                <Clock className="h-8 w-8 text-primary" />
                <span className="text-2xl font-bold text-primary">ประวัติการบันทึกข้อมูล</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              ประวัติการบันทึกข้อมูล
            </h1>
            <p className="text-gray-600">
              ดูประวัติการบันทึกข้อมูลทั้งหมดของคุณ
            </p>
          </div>

          {savedRecords.length === 0 ? (
            <Card className="bg-gradient-card border-0 shadow-xl">
              <CardContent className="text-center py-12">
                <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  ยังไม่มีข้อมูลที่บันทึก
                </h3>
                <p className="text-gray-600 mb-6">
                  คุณยังไม่ได้บันทึกข้อมูลใดๆ เลย
                </p>
                <Button onClick={() => navigate('/dashboard')}>
                  เริ่มบันทึกข้อมูล
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  ข้อมูลที่บันทึกทั้งหมด ({savedRecords.length} รายการ)
                </h2>
              </div>

              <div className="grid gap-6">
                {savedRecords.map((record) => {
                  const IconComponent = record.icon;
                  return (
                    <Card key={record.id} className={`bg-gradient-card border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${record.borderColor} border-l-4`}>
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`p-2 rounded-full ${record.color}`}>
                              <IconComponent className="h-5 w-5" />
                            </div>
                            <div>
                              <CardTitle className="text-lg font-semibold">
                                {record.fullName}
                              </CardTitle>
                              <CardDescription>
                                ประเภท: {record.typeName}
                              </CardDescription>
                            </div>
                          </div>
                          <Badge variant="secondary" className={record.color}>
                            {record.typeName}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>วันที่บันทึก: {formatDate(record.savedDate)}</span>
                            </div>
                            <span>เวลา: {record.savedTime} น.</span>
                          </div>
                          <div className="flex space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => navigate(`/${record.type}`)}
                            >
                              ดูข้อมูล
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => navigate(`/${record.type}`)}
                            >
                              แก้ไข
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Summary Stats */}
              <Card className="bg-gradient-card border-0 shadow-xl mt-8">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-center">
                    สรุปข้อมูลที่บันทึก
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        {savedRecords.filter(r => r.type === 'student').length}
                      </div>
                      <div className="text-sm text-blue-800">นักเรียน</div>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {savedRecords.filter(r => r.type === 'employee').length}
                      </div>
                      <div className="text-sm text-green-800">พนักงาน</div>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">
                        {savedRecords.filter(r => r.type === 'general').length}
                      </div>
                      <div className="text-sm text-purple-800">บุคคลทั่วไป</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default History;