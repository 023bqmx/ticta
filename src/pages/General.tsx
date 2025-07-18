import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, User, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";

const General = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    // ข้อมูลทั่วไป
    fullName: '',
    nickname: '',
    nationalId: '',
    passportNumber: '',
    birthDate: '',
    
    // ข้อมูลการติดต่อ
    address: '',
    phone: '',
    email: '',
    
    // ข้อมูลการทำงาน
    employmentInfo: '',
    workHistory: '',
    position: '',
    salary: '',
    workContact: '',
    
    // ข้อมูลทางการเงิน
    bankAccount: '',
    creditCardInfo: '',
    transactionHistory: '',
    
    // ข้อมูลสุขภาพ
    medicalHistory: '',
    chronicDisease: '',
    drugAllergies: '',
    
    // ข้อมูลการศึกษา
    education: '',
    field: '',
    degree: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    const requiredFields = ['fullName', 'nationalId', 'birthDate'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      toast({
        title: "กรุณากรอกข้อมูลให้ครบถ้วน",
        description: "มีข้อมูลที่จำเป็นยังไม่ได้กรอก",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "บันทึกข้อมูลสำเร็จ",
      description: "ข้อมูลบุคคลทั่วไปถูกบันทึกเรียบร้อยแล้ว",
    });
    
    navigate('/dashboard');
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
                <User className="h-8 w-8 text-purple-600" />
                <span className="text-2xl font-bold text-primary">ข้อมูลบุคคลทั่วไป</span>
              </div>
            </div>
            <Button onClick={handleSubmit} className="bg-purple-600 hover:bg-purple-700">
              <Save className="h-4 w-4 mr-2" />
              บันทึกข้อมูล
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* ข้อมูลทั่วไป */}
          <Card className="bg-gradient-card border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-blue-800">
                ข้อมูลทั่วไป
              </CardTitle>
              <CardDescription>
                ข้อมูลพื้นฐานส่วนบุคคล
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="fullName">ชื่อ-นามสกุล *</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    placeholder="เช่น นาย สมชาย ใจดี"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="nickname">ชื่อเล่น</Label>
                  <Input
                    id="nickname"
                    value={formData.nickname}
                    onChange={(e) => handleInputChange('nickname', e.target.value)}
                    placeholder="เช่น ชาย"
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="nationalId">เลขประจำตัวประชาชน *</Label>
                  <Input
                    id="nationalId"
                    value={formData.nationalId}
                    onChange={(e) => handleInputChange('nationalId', e.target.value)}
                    placeholder="X-XXXX-XXXXX-XX-X"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="passportNumber">เลขหนังสือเดินทาง</Label>
                  <Input
                    id="passportNumber"
                    value={formData.passportNumber}
                    onChange={(e) => handleInputChange('passportNumber', e.target.value)}
                    placeholder="หมายเลขหนังสือเดินทาง"
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="birthDate">วันเดือนปีเกิด *</Label>
                <Input
                  id="birthDate"
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => handleInputChange('birthDate', e.target.value)}
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>

          {/* ข้อมูลการติดต่อ */}
          <Card className="bg-gradient-card border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-green-800">
                ข้อมูลการติดต่อ
              </CardTitle>
              <CardDescription>
                ข้อมูลสำหรับการติดต่อ
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="address">ที่อยู่</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="ที่อยู่ปัจจุบัน"
                  rows={3}
                  className="mt-1"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="phone">เบอร์โทรศัพท์</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="08X-XXX-XXXX"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="email">อีเมล</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="example@email.com"
                    className="mt-1"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* ข้อมูลการทำงาน */}
          <Card className="bg-gradient-card border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-purple-800">
                ข้อมูลการทำงาน
              </CardTitle>
              <CardDescription>
                ข้อมูลเกี่ยวกับการทำงาน
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="employmentInfo">ข้อมูลการจ้างงาน</Label>
                <Textarea
                  id="employmentInfo"
                  value={formData.employmentInfo}
                  onChange={(e) => handleInputChange('employmentInfo', e.target.value)}
                  placeholder="ข้อมูลการจ้างงานปัจจุบัน"
                  rows={3}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="workHistory">ประวัติการทำงาน</Label>
                <Textarea
                  id="workHistory"
                  value={formData.workHistory}
                  onChange={(e) => handleInputChange('workHistory', e.target.value)}
                  placeholder="ประวัติการทำงานที่ผ่านมา"
                  rows={3}
                  className="mt-1"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="position">ตำแหน่ง</Label>
                  <Input
                    id="position"
                    value={formData.position}
                    onChange={(e) => handleInputChange('position', e.target.value)}
                    placeholder="ตำแหน่งงานปัจจุบัน"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="salary">เงินเดือน</Label>
                  <Input
                    id="salary"
                    value={formData.salary}
                    onChange={(e) => handleInputChange('salary', e.target.value)}
                    placeholder="เงินเดือนปัจจุบัน"
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="workContact">ข้อมูลการติดต่อในที่ทำงาน</Label>
                <Textarea
                  id="workContact"
                  value={formData.workContact}
                  onChange={(e) => handleInputChange('workContact', e.target.value)}
                  placeholder="ข้อมูลการติดต่อในที่ทำงาน"
                  rows={3}
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>

          {/* ข้อมูลทางการเงิน */}
          <Card className="bg-gradient-card border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-orange-800">
                ข้อมูลทางการเงิน
              </CardTitle>
              <CardDescription>
                ข้อมูลเกี่ยวกับการเงิน
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="bankAccount">เลขที่บัญชีธนาคาร</Label>
                <Input
                  id="bankAccount"
                  value={formData.bankAccount}
                  onChange={(e) => handleInputChange('bankAccount', e.target.value)}
                  placeholder="เลขที่บัญชีธนาคาร"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="creditCardInfo">ข้อมูลบัตรเครดิต</Label>
                <Textarea
                  id="creditCardInfo"
                  value={formData.creditCardInfo}
                  onChange={(e) => handleInputChange('creditCardInfo', e.target.value)}
                  placeholder="ข้อมูลบัตรเครดิต"
                  rows={3}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="transactionHistory">ข้อมูลการทำธุรกรรม</Label>
                <Textarea
                  id="transactionHistory"
                  value={formData.transactionHistory}
                  onChange={(e) => handleInputChange('transactionHistory', e.target.value)}
                  placeholder="ประวัติการทำธุรกรรม"
                  rows={3}
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>

          {/* ข้อมูลสุขภาพ */}
          <Card className="bg-gradient-card border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-red-800">
                ข้อมูลสุขภาพ
              </CardTitle>
              <CardDescription>
                ข้อมูลเกี่ยวกับสุขภาพ
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="medicalHistory">ประวัติการรักษา</Label>
                <Textarea
                  id="medicalHistory"
                  value={formData.medicalHistory}
                  onChange={(e) => handleInputChange('medicalHistory', e.target.value)}
                  placeholder="ประวัติการรักษาพยาบาล"
                  rows={3}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="chronicDisease">โรคประจำตัว</Label>
                <Textarea
                  id="chronicDisease"
                  value={formData.chronicDisease}
                  onChange={(e) => handleInputChange('chronicDisease', e.target.value)}
                  placeholder="โรคประจำตัว (ถ้ามี)"
                  rows={3}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="drugAllergies">ข้อมูลการแพ้ยา</Label>
                <Textarea
                  id="drugAllergies"
                  value={formData.drugAllergies}
                  onChange={(e) => handleInputChange('drugAllergies', e.target.value)}
                  placeholder="ข้อมูลการแพ้ยา (ถ้ามี)"
                  rows={3}
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>

          {/* ข้อมูลการศึกษา */}
          <Card className="bg-gradient-card border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-indigo-800">
                ข้อมูลการศึกษา
              </CardTitle>
              <CardDescription>
                ข้อมูลเกี่ยวกับการศึกษา
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="education">สถานศึกษา</Label>
                <Input
                  id="education"
                  value={formData.education}
                  onChange={(e) => handleInputChange('education', e.target.value)}
                  placeholder="ชื่อสถานศึกษา"
                  className="mt-1"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="field">สาขาที่ศึกษา</Label>
                  <Input
                    id="field"
                    value={formData.field}
                    onChange={(e) => handleInputChange('field', e.target.value)}
                    placeholder="สาขาหรือคณะที่ศึกษา"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="degree">วุฒิการศึกษา</Label>
                  <Input
                    id="degree"
                    value={formData.degree}
                    onChange={(e) => handleInputChange('degree', e.target.value)}
                    placeholder="วุฒิการศึกษาสูงสุด"
                    className="mt-1"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default General;