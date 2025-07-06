
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Database, Search, Settings, User, Plus, Edit, Trash2, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [personalData, setPersonalData] = useState([
    { id: 1, type: 'ข้อมูลทั่วไป', title: 'ข้อมูลส่วนตัว', content: 'ชื่อ: นาย สมชาย ใจดี', lastModified: '2024-01-15' },
    { id: 2, type: 'ข้อมูลการติดต่อ', title: 'เบอร์โทรศัพท์', content: '081-234-5678', lastModified: '2024-01-14' },
    { id: 3, type: 'ข้อมูลการทำงาน', title: 'บริษัท', content: 'บริษัท ABC จำกัด', lastModified: '2024-01-13' },
  ]);

  const [newData, setNewData] = useState({
    type: '',
    title: '',
    content: ''
  });

  const handleAddData = () => {
    if (newData.type && newData.title && newData.content) {
      const newItem = {
        id: personalData.length + 1,
        type: newData.type,
        title: newData.title,
        content: newData.content,
        lastModified: new Date().toISOString().split('T')[0]
      };
      setPersonalData([...personalData, newItem]);
      setNewData({ type: '', title: '', content: '' });
    }
  };

  const handleDeleteData = (id: number) => {
    setPersonalData(personalData.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-main">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Database className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-primary">Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={() => navigate('/search')}>
                <Search className="h-4 w-4 mr-2" />
                ค้นหา
              </Button>
              <Button variant="outline" onClick={() => navigate('/settings')}>
                <Settings className="h-4 w-4 mr-2" />
                ตั้งค่า
              </Button>
              <Button variant="outline" onClick={() => navigate('/')}>
                ออกจากระบบ
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">ยินดีต้อนรับ!</h2>
          <p className="text-gray-600">จัดการข้อมูลส่วนบุคคลของคุณได้ที่นี่</p>
        </div>

        <Tabs defaultValue="data" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="data" className="flex items-center space-x-2">
              <Database className="h-4 w-4" />
              <span>ข้อมูลของฉัน</span>
            </TabsTrigger>
            <TabsTrigger value="add" className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>เพิ่มข้อมูล</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>ความปลอดภัย</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="data" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>ข้อมูลส่วนบุคคล</span>
                </CardTitle>
                <CardDescription>
                  ข้อมูลทั้งหมดที่คุณเก็บไว้ในระบบ
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {personalData.map((item) => (
                    <Card key={item.id} className="bg-gradient-card">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <Badge variant="secondary">{item.type}</Badge>
                              <span className="text-sm text-gray-500">
                                แก้ไขล่าสุด: {item.lastModified}
                              </span>
                            </div>
                            <h4 className="font-semibold text-lg">{item.title}</h4>
                            <p className="text-gray-600 mt-1">{item.content}</p>
                          </div>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="ghost">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              onClick={() => handleDeleteData(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="add" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>เพิ่มข้อมูลใหม่</CardTitle>
                <CardDescription>
                  เพิ่มข้อมูลส่วนบุคคลใหม่เข้าสู่ระบบ
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="type">ประเภทข้อมูล</Label>
                  <Input
                    id="type"
                    placeholder="เช่น ข้อมูลทั่วไป, ข้อมูลการติดต่อ, ข้อมูลการทำงาน"
                    value={newData.type}
                    onChange={(e) => setNewData({...newData, type: e.target.value})}
                  />
                </div>
                
                <div>
                  <Label htmlFor="title">หัวข้อ</Label>
                  <Input
                    id="title"
                    placeholder="หัวข้อของข้อมูล"
                    value={newData.title}
                    onChange={(e) => setNewData({...newData, title: e.target.value})}
                  />
                </div>
                
                <div>
                  <Label htmlFor="content">เนื้อหา</Label>
                  <Textarea
                    id="content"
                    placeholder="รายละเอียดของข้อมูล"
                    value={newData.content}
                    onChange={(e) => setNewData({...newData, content: e.target.value})}
                    rows={4}
                  />
                </div>
                
                <Button onClick={handleAddData} className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  เพิ่มข้อมูล
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>การรักษาความปลอดภัย</span>
                </CardTitle>
                <CardDescription>
                  ตั้งค่าความปลอดภัยและการป้องกันข้อมูล
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div>
                    <h4 className="font-semibold text-green-800">ระบบป้องกัน AI</h4>
                    <p className="text-sm text-green-600">เปิดใช้งานแล้ว</p>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    ใช้งานอยู่
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <div>
                    <h4 className="font-semibold text-blue-800">การยืนยันตัวตน OTP</h4>
                    <p className="text-sm text-blue-600">ยืนยันแล้วด้วยเบอร์โทร</p>
                  </div>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    ยืนยันแล้ว
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                  <div>
                    <h4 className="font-semibold text-purple-800">การเข้ารหัสข้อมูล</h4>
                    <p className="text-sm text-purple-600">ข้อมูลถูกเข้ารหัสแบบ End-to-End</p>
                  </div>
                  <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                    ปลอดภัย
                  </Badge>
                </div>

                <Button variant="outline" className="w-full">
                  ตั้งค่าความปลอดภัยเพิ่มเติม
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
