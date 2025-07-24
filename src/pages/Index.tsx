
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Database, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LoginModal from '@/components/LoginModal';

const Index = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    setShowLoginModal(true);
  };

  const handleLoginSuccess = () => {
    setShowLoginModal(false);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-main">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Database className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-primary">MY DATA</span>
          </div>
          <Button variant="outline" onClick={handleGetStarted}>
            เข้าสู่ระบบ
          </Button>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            ระบบจัดเก็บข้อมูล
            <span className="text-primary block">ที่ปลอดภัยที่สุด</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            เก็บ จัดการ และค้นหาข้อมูลส่วนบุคคลของคุณได้อย่างปลอดภัย 
            พร้อมระบบยืนยันตัวตนและการป้องกันขั้นสูง
          </p>
        </div>

        {/* Login Section */}
        <div className="max-w-md mx-auto mb-16">
          <Card className="bg-gradient-card border-0 shadow-xl animate-pulse-gentle">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">เริ่มต้นใช้งาน</CardTitle>
              <CardDescription>เลือกวิธีการเข้าสู่ระบบ</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              
                <Button 
                  className="w-full h-12 text-lg"
                  onClick={handleGetStarted}
                >
                  เข้าสู่ระบบ
                </Button>
              
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="bg-gradient-card border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in">
            <CardHeader className="text-center">
              <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>ความปลอดภัยสูง</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-center">
                ระบบป้องกัน AI และการเข้าถึงโดยไม่ได้รับอนุญาต 
                พร้อมการยืนยันตัวตนหลายขั้นตอน
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in">
            <CardHeader className="text-center">
              <Database className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>จัดเก็บและค้นหา</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-center">
                เก็บข้อมูลส่วนบุคคลอย่างเป็นระบบ 
                ค้นหาและแก้ไขข้อมูลได้ง่ายและรวดเร็ว
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in">
            <CardHeader className="text-center">
              <Users className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>ใช้งานหลากหลาย</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-center">
                เหมาะสำหรับบุคคล โรงเรียน และองค์กร 
                พร้อมการปรับแต่งหน้าตาตามความต้องการ
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center animate-fade-in">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            พร้อมเริ่มต้นแล้ว?
          </h2>
          <p className="text-gray-600 mb-8">
            สร้างบัญชีและเริ่มใช้งานระบบจัดเก็บข้อมูลที่ปลอดภัยได้เลย
          </p>
          <Button 
            size="lg" 
            className="text-lg px-8 py-3"
            onClick={handleGetStarted}
          >
            เริ่มใช้งานฟรี
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/50 backdrop-blur-sm border-t mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2025 My Data. สงวนลิขสิทธิ์ทุกประการ</p>
          </div>
        </div>
      </footer>

      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)}
        onOTPRequest={handleLoginSuccess}
      />
    </div>
  );
};

export default Index;
