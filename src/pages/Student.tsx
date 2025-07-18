import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, GraduationCap, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";

const Student = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    // ข้อมูลส่วนตัว
    fullName: '',
    nickname: '',
    birthDate: '',
    gender: '',
    nationality: '',
    religion: '',
    address: '',
    phone: '',
    email: '',
    
    // ข้อมูลการศึกษา
    studentId: '',
    studentNumber: '',
    grade: '',
    program: '',
    previousSchool: '',
    academicResult: '',
    
    // ข้อมูลครอบครัว
    parentName: '',
    parentOccupation: '',
    parentRelation: '',
    parentPhone: '',
    
    // ข้อมูลสุขภาพ
    weight: '',
    height: '',
    chronicDisease: '',
    allergies: '',
    drugAllergies: '',
    
    // ข้อมูลอื่นๆ
    interests: '',
    talents: '',
    specialSkills: '',
    futureGoals: '',
    currentProblems: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    // ตรวจสอบข้อมูลที่จำเป็น
    const requiredFields = ['fullName', 'birthDate', 'gender', 'email'];
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
      description: "ข้อมูลนักเรียนถูกบันทึกเรียบร้อยแล้ว",
    });
    
    // นำทางกลับไปหน้า Dashboard
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
                <GraduationCap className="h-8 w-8 text-blue-600" />
                <span className="text-2xl font-bold text-primary">ข้อมูลนักเรียน</span>
              </div>
            </div>
            <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700">
              <Save className="h-4 w-4 mr-2" />
              บันทึกข้อมูล
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* ข้อมูลส่วนตัว */}
          <Card className="bg-gradient-card border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-blue-800">
                หมวดข้อมูลส่วนตัว
              </CardTitle>
              <CardDescription>
                ข้อมูลพื้นฐานส่วนบุคคลของนักเรียน
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

              <div className="grid md:grid-cols-3 gap-6">
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
                  <Label htmlFor="gender">เพศ *</Label>
                  <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="เลือกเพศ" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">ชาย</SelectItem>
                      <SelectItem value="female">หญิง</SelectItem>
                      <SelectItem value="other">อื่นๆ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="nationality">สัญชาติ</Label>
                  <Input
                    id="nationality"
                    value={formData.nationality}
                    onChange={(e) => handleInputChange('nationality', e.target.value)}
                    placeholder="เช่น ไทย"
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="religion">ศาสนา</Label>
                  <Input
                    id="religion"
                    value={formData.religion}
                    onChange={(e) => handleInputChange('religion', e.target.value)}
                    placeholder="เช่น พุทธ"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="email">อีเมล *</Label>
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
                <Label htmlFor="phone">เบอร์โทรศัพท์</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="08X-XXX-XXXX"
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>

          {/* ข้อมูลการศึกษา */}
          <Card className="bg-gradient-card border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-green-800">
                หมวดข้อมูลการศึกษา
              </CardTitle>
              <CardDescription>
                ข้อมูลการศึกษาและผลการเรียน
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="studentId">เลขประจำตัวนักเรียน</Label>
                  <Input
                    id="studentId"
                    value={formData.studentId}
                    onChange={(e) => handleInputChange('studentId', e.target.value)}
                    placeholder="เลขประจำตัวนักเรียน"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="studentNumber">เลขที่</Label>
                  <Input
                    id="studentNumber"
                    value={formData.studentNumber}
                    onChange={(e) => handleInputChange('studentNumber', e.target.value)}
                    placeholder="เลขที่ในชั้นเรียน"
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="grade">ระดับชั้น</Label>
                  <Select value={formData.grade} onValueChange={(value) => handleInputChange('grade', value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="เลือกระดับชั้น" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="m1">ม.1</SelectItem>
                      <SelectItem value="m2">ม.2</SelectItem>
                      <SelectItem value="m3">ม.3</SelectItem>
                      <SelectItem value="m4">ม.4</SelectItem>
                      <SelectItem value="m5">ม.5</SelectItem>
                      <SelectItem value="m6">ม.6</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="program">แผนการเรียน</Label>
                  <Input
                    id="program"
                    value={formData.program}
                    onChange={(e) => handleInputChange('program', e.target.value)}
                    placeholder="เช่น วิทย์-คณิต"
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="previousSchool">โรงเรียนเดิม (ถ้ามี)</Label>
                <Input
                  id="previousSchool"
                  value={formData.previousSchool}
                  onChange={(e) => handleInputChange('previousSchool', e.target.value)}
                  placeholder="ชื่อโรงเรียนเดิม"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="academicResult">ผลการเรียน</Label>
                <Textarea
                  id="academicResult"
                  value={formData.academicResult}
                  onChange={(e) => handleInputChange('academicResult', e.target.value)}
                  placeholder="ผลการเรียนหรือเกรดเฉลี่ย"
                  rows={3}
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>

          {/* ข้อมูลครอบครัว */}
          <Card className="bg-gradient-card border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-purple-800">
                ข้อมูลครอบครัว
              </CardTitle>
              <CardDescription>
                ข้อมูลผู้ปกครองและครอบครัว
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="parentName">ชื่อผู้ปกครอง</Label>
                  <Input
                    id="parentName"
                    value={formData.parentName}
                    onChange={(e) => handleInputChange('parentName', e.target.value)}
                    placeholder="ชื่อ-นามสกุลผู้ปกครอง"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="parentOccupation">อาชีพผู้ปกครอง</Label>
                  <Input
                    id="parentOccupation"
                    value={formData.parentOccupation}
                    onChange={(e) => handleInputChange('parentOccupation', e.target.value)}
                    placeholder="อาชีพของผู้ปกครอง"
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="parentRelation">ความสัมพันธ์กับนักเรียน</Label>
                  <Select value={formData.parentRelation} onValueChange={(value) => handleInputChange('parentRelation', value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="เลือกความสัมพันธ์" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="father">บิดา</SelectItem>
                      <SelectItem value="mother">มารดา</SelectItem>
                      <SelectItem value="guardian">ผู้ปกครอง</SelectItem>
                      <SelectItem value="other">อื่นๆ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="parentPhone">เบอร์ติดต่อผู้ปกครอง</Label>
                  <Input
                    id="parentPhone"
                    value={formData.parentPhone}
                    onChange={(e) => handleInputChange('parentPhone', e.target.value)}
                    placeholder="08X-XXX-XXXX"
                    className="mt-1"
                  />
                </div>
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
                ข้อมูลสุขภาพและการแพทย์
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="weight">น้ำหนัก (กก.)</Label>
                  <Input
                    id="weight"
                    value={formData.weight}
                    onChange={(e) => handleInputChange('weight', e.target.value)}
                    placeholder="น้ำหนักในหน่วยกิโลกรัม"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="height">ส่วนสูง (ซม.)</Label>
                  <Input
                    id="height"
                    value={formData.height}
                    onChange={(e) => handleInputChange('height', e.target.value)}
                    placeholder="ส่วนสูงในหน่วยเซนติเมตร"
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="chronicDisease">โรคประจำตัว</Label>
                <Textarea
                  id="chronicDisease"
                  value={formData.chronicDisease}
                  onChange={(e) => handleInputChange('chronicDisease', e.target.value)}
                  placeholder="โรคประจำตัวที่มี (ถ้าไม่มีให้ระบุ ไม่มี)"
                  rows={2}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="allergies">ภูมิแพ้</Label>
                <Textarea
                  id="allergies"
                  value={formData.allergies}
                  onChange={(e) => handleInputChange('allergies', e.target.value)}
                  placeholder="สิ่งที่แพ้ (ถ้าไม่มีให้ระบุ ไม่มี)"
                  rows={2}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="drugAllergies">ประวัติการแพ้ยา</Label>
                <Textarea
                  id="drugAllergies"
                  value={formData.drugAllergies}
                  onChange={(e) => handleInputChange('drugAllergies', e.target.value)}
                  placeholder="ยาที่แพ้ (ถ้าไม่มีให้ระบุ ไม่มี)"
                  rows={2}
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>

          {/* ข้อมูลอื่นๆ */}
          <Card className="bg-gradient-card border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-orange-800">
                ข้อมูลอื่นๆ
              </CardTitle>
              <CardDescription>
                ข้อมูลเพิ่มเติมเกี่ยวกับความสนใจและเป้าหมาย
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="interests">ความสนใจ</Label>
                <Textarea
                  id="interests"
                  value={formData.interests}
                  onChange={(e) => handleInputChange('interests', e.target.value)}
                  placeholder="สิ่งที่สนใจ งานอดิเรก"
                  rows={3}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="talents">ความถนัด</Label>
                <Textarea
                  id="talents"
                  value={formData.talents}
                  onChange={(e) => handleInputChange('talents', e.target.value)}
                  placeholder="ความถนัดและสิ่งที่ทำได้ดี"
                  rows={3}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="specialSkills">ความสามารถพิเศษ</Label>
                <Textarea
                  id="specialSkills"
                  value={formData.specialSkills}
                  onChange={(e) => handleInputChange('specialSkills', e.target.value)}
                  placeholder="ความสามารถพิเศษที่มี"
                  rows={3}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="futureGoals">เป้าหมายในอนาคต</Label>
                <Textarea
                  id="futureGoals"
                  value={formData.futureGoals}
                  onChange={(e) => handleInputChange('futureGoals', e.target.value)}
                  placeholder="เป้าหมายและแผนการในอนาคต"
                  rows={3}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="currentProblems">ปัญหาที่กำลังเผชิญ</Label>
                <Textarea
                  id="currentProblems"
                  value={formData.currentProblems}
                  onChange={(e) => handleInputChange('currentProblems', e.target.value)}
                  placeholder="ปัญหาหรือความท้าทายที่กำลังเผชิญ"
                  rows={3}
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-center space-x-4">
            <Button variant="outline" onClick={() => navigate('/dashboard')}>
              ยกเลิก
            </Button>
            <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700">
              <Save className="h-4 w-4 mr-2" />
              บันทึกข้อมูล
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Student;