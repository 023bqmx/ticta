import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Building, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { saveRecord } from "@/lib/recordUtils";

const Employee = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    // ข้อมูลส่วนบุคคล
    fullName: '',
    nationalId: '',
    birthDate: '',
    address: '',
    phone: '',
    email: '',
    healthInfo: '',
    familyInfo: '',
    
    // ข้อมูลการทำงาน
    position: '',
    startDate: '',
    workHistory: '',
    education: '',
    performanceReview: '',
    trainingHistory: '',
    contract: '',
    leaveHistory: '',
    disciplinaryRecord: '',
    
    // ข้อมูลการติดต่อ
    contactAddress: '',
    contactPhone: '',
    contactEmail: '',
    emergencyContact: '',
    
    // ข้อมูลการเงิน
    bankAccount: '',
    taxInfo: '',
    socialSecurityInfo: '',
    salaryInfo: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    const requiredFields = ['fullName', 'nationalId', 'birthDate', 'position', 'startDate'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      toast({
        title: "กรุณากรอกข้อมูลให้ครบถ้วน",
        description: "มีข้อมูลที่จำเป็นยังไม่ได้กรอก",
        variant: "destructive"
      });
      return;
    }

    // บันทึกข้อมูลลงประวัติ
    const currentDate = new Date();
    saveRecord({
      type: 'employee',
      typeName: 'พนักงาน',
      fullName: formData.fullName,
      savedDate: currentDate.toISOString().split('T')[0],
      savedTime: currentDate.toTimeString().split(' ')[0].substring(0, 5),
      data: formData
    });

    toast({
      title: "บันทึกข้อมูลสำเร็จ",
      description: "ข้อมูลพนักงานถูกบันทึกเรียบร้อยแล้ว",
    });
    
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-main">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Building className="h-8 w-8 text-green-600" />
              <span className="text-2xl font-bold text-primary">ข้อมูลพนักงาน</span>
            </div>
            <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
              <Save className="h-4 w-4 mr-2" />
              บันทึกข้อมูล
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* ข้อมูลส่วนบุคคล */}
          <Card className="bg-gradient-card border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-blue-800">
                ข้อมูลส่วนบุคคล
              </CardTitle>
              <CardDescription>
                ข้อมูลพื้นฐานส่วนบุคคลของพนักงาน
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
                  <Label htmlFor="nationalId">เลขประจำตัวประชาชน *</Label>
                  <Input
                    id="nationalId"
                    value={formData.nationalId}
                    onChange={(e) => handleInputChange('nationalId', e.target.value)}
                    placeholder="X-XXXX-XXXXX-XX-X"
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
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

              <div>
                <Label htmlFor="healthInfo">ข้อมูลด้านสุขภาพ (ถ้ามี)</Label>
                <Textarea
                  id="healthInfo"
                  value={formData.healthInfo}
                  onChange={(e) => handleInputChange('healthInfo', e.target.value)}
                  placeholder="ข้อมูลสุขภาพที่เกี่ยวข้อง"
                  rows={3}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="familyInfo">ข้อมูลเกี่ยวกับครอบครัว (ถ้ามี)</Label>
                <Textarea
                  id="familyInfo"
                  value={formData.familyInfo}
                  onChange={(e) => handleInputChange('familyInfo', e.target.value)}
                  placeholder="ข้อมูลครอบครัวที่เกี่ยวข้อง"
                  rows={3}
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>

          {/* ข้อมูลการทำงาน */}
          <Card className="bg-gradient-card border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-green-800">
                ข้อมูลการทำงาน
              </CardTitle>
              <CardDescription>
                ข้อมูลเกี่ยวกับการทำงานและประสิทธิภาพ
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="position">ตำแหน่งงาน *</Label>
                  <Input
                    id="position"
                    value={formData.position}
                    onChange={(e) => handleInputChange('position', e.target.value)}
                    placeholder="ตำแหน่งงานปัจจุบัน"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="startDate">วันที่เริ่มงาน *</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => handleInputChange('startDate', e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="workHistory">ประวัติการทำงาน</Label>
                <Textarea
                  id="workHistory"
                  value={formData.workHistory}
                  onChange={(e) => handleInputChange('workHistory', e.target.value)}
                  placeholder="ประวัติการทำงานที่ผ่านมา"
                  rows={4}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="education">ประวัติการศึกษา</Label>
                <Textarea
                  id="education"
                  value={formData.education}
                  onChange={(e) => handleInputChange('education', e.target.value)}
                  placeholder="วุฒิการศึกษาและสถานศึกษา"
                  rows={3}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="performanceReview">ผลการประเมินการทำงาน</Label>
                <Textarea
                  id="performanceReview"
                  value={formData.performanceReview}
                  onChange={(e) => handleInputChange('performanceReview', e.target.value)}
                  placeholder="ผลการประเมินประสิทธิภาพการทำงาน"
                  rows={3}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="trainingHistory">ข้อมูลการฝึกอบรม</Label>
                <Textarea
                  id="trainingHistory"
                  value={formData.trainingHistory}
                  onChange={(e) => handleInputChange('trainingHistory', e.target.value)}
                  placeholder="ประวัติการฝึกอบรมและพัฒนา"
                  rows={3}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="contract">สัญญาจ้างงาน</Label>
                <Textarea
                  id="contract"
                  value={formData.contract}
                  onChange={(e) => handleInputChange('contract', e.target.value)}
                  placeholder="รายละเอียดสัญญาจ้างงาน"
                  rows={3}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="leaveHistory">ประวัติการลา, ขาด, มาสาย</Label>
                <Textarea
                  id="leaveHistory"
                  value={formData.leaveHistory}
                  onChange={(e) => handleInputChange('leaveHistory', e.target.value)}
                  placeholder="ประวัติการลา การขาด และการมาสาย"
                  rows={3}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="disciplinaryRecord">ข้อมูลการลงโทษทางวินัย (ถ้ามี)</Label>
                <Textarea
                  id="disciplinaryRecord"
                  value={formData.disciplinaryRecord}
                  onChange={(e) => handleInputChange('disciplinaryRecord', e.target.value)}
                  placeholder="ประวัติการลงโทษทางวินัย"
                  rows={3}
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>

          {/* ข้อมูลการติดต่อ */}
          <Card className="bg-gradient-card border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-purple-800">
                ข้อมูลการติดต่อ
              </CardTitle>
              <CardDescription>
                ข้อมูลสำหรับการติดต่อและกรณีฉุกเฉิน
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="contactAddress">ที่อยู่สำหรับติดต่อ</Label>
                <Textarea
                  id="contactAddress"
                  value={formData.contactAddress}
                  onChange={(e) => handleInputChange('contactAddress', e.target.value)}
                  placeholder="ที่อยู่สำหรับติดต่อ"
                  rows={3}
                  className="mt-1"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="contactPhone">เบอร์โทรศัพท์สำหรับติดต่อ</Label>
                  <Input
                    id="contactPhone"
                    value={formData.contactPhone}
                    onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                    placeholder="08X-XXX-XXXX"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="contactEmail">อีเมลสำหรับติดต่อ</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                    placeholder="contact@email.com"
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="emergencyContact">ข้อมูลผู้ติดต่อกรณีฉุกเฉิน</Label>
                <Textarea
                  id="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                  placeholder="ชื่อ-นามสกุล ความสัมพันธ์ และเบอร์โทรศัพท์"
                  rows={3}
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>

          {/* ข้อมูลการเงิน */}
          <Card className="bg-gradient-card border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-orange-800">
                ข้อมูลการเงิน
              </CardTitle>
              <CardDescription>
                ข้อมูลเกี่ยวกับการเงินและการจ่ายเงิน
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
                <Label htmlFor="taxInfo">ข้อมูลการหักภาษี ณ ที่จ่าย</Label>
                <Textarea
                  id="taxInfo"
                  value={formData.taxInfo}
                  onChange={(e) => handleInputChange('taxInfo', e.target.value)}
                  placeholder="ข้อมูลการหักภาษี"
                  rows={3}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="socialSecurityInfo">ข้อมูลการหักประกันสังคม</Label>
                <Textarea
                  id="socialSecurityInfo"
                  value={formData.socialSecurityInfo}
                  onChange={(e) => handleInputChange('socialSecurityInfo', e.target.value)}
                  placeholder="ข้อมูลการประกันสังคม"
                  rows={3}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="salaryInfo">ข้อมูลการจ่ายเงินเดือน</Label>
                <Textarea
                  id="salaryInfo"
                  value={formData.salaryInfo}
                  onChange={(e) => handleInputChange('salaryInfo', e.target.value)}
                  placeholder="ข้อมูลเงินเดือนและสวัสดิการ"
                  rows={3}
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Employee;