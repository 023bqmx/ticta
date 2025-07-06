
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Settings as SettingsIcon, Palette, Shield, Bell, ArrowLeft, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [orgSettings, setOrgSettings] = useState({
    name: 'บริษัท ABC จำกัด',
    logo: '',
    primaryColor: '#3b82f6',
    secondaryColor: '#64748b',
    welcomeMessage: 'ยินดีต้อนรับสู่ระบบจัดเก็บข้อมูลของเรา',
    loginPageTitle: 'เข้าสู่ระบบ - บริษัท ABC จำกัด'
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    aiProtection: true,
    dataEncryption: true,
    loginNotifications: true,
    sessionTimeout: '30'
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    dataAccessAlerts: true,
    systemUpdates: true
  });

  const handleSaveSettings = () => {
    console.log('Saving settings:', { orgSettings, securitySettings, notificationSettings });
    toast({
      title: "บันทึกการตั้งค่าสำเร็จ",
      description: "การตั้งค่าทั้งหมดได้รับการบันทึกแล้ว",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-main">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate('/dashboard')}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                กลับ
              </Button>
              <SettingsIcon className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-primary">ตั้งค่า</h1>
            </div>
            <Button onClick={handleSaveSettings}>
              <Save className="h-4 w-4 mr-2" />
              บันทึกการตั้งค่า
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">การตั้งค่าระบบ</h2>
          <p className="text-gray-600">ปรับแต่งระบบให้เหมาะสมกับองค์กรของคุณ</p>
        </div>

        <Tabs defaultValue="organization" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="organization" className="flex items-center space-x-2">
              <Palette className="h-4 w-4" />
              <span>องค์กร</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>ความปลอดภัย</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center space-x-2">
              <Bell className="h-4 w-4" />
              <span>การแจ้งเตือน</span>
            </TabsTrigger>
            <TabsTrigger value="advanced" className="flex items-center space-x-2">
              <SettingsIcon className="h-4 w-4" />
              <span>ขั้นสูง</span>
            </TabsTrigger>
          </TabsList>

          {/* Organization Settings */}
          <TabsContent value="organization" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>การตั้งค่าองค์กร</CardTitle>
                <CardDescription>
                  ปรับแต่งรูปลักษณ์และข้อความสำหรับองค์กรของคุณ
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="orgName">ชื่อองค์กร</Label>
                    <Input
                      id="orgName"
                      value={orgSettings.name}
                      onChange={(e) => setOrgSettings({...orgSettings, name: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="loginTitle">หัวข้อหน้า Login</Label>
                    <Input
                      id="loginTitle"
                      value={orgSettings.loginPageTitle}
                      onChange={(e) => setOrgSettings({...orgSettings, loginPageTitle: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="welcomeMsg">ข้อความต้อนรับ</Label>
                  <Textarea
                    id="welcomeMsg"
                    rows={3}
                    value={orgSettings.welcomeMessage}
                    onChange={(e) => setOrgSettings({...orgSettings, welcomeMessage: e.target.value})}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="primaryColor">สีหลัก</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="primaryColor"
                        type="color"
                        value={orgSettings.primaryColor}
                        onChange={(e) => setOrgSettings({...orgSettings, primaryColor: e.target.value})}
                        className="w-16 h-10"
                      />
                      <Input
                        value={orgSettings.primaryColor}
                        onChange={(e) => setOrgSettings({...orgSettings, primaryColor: e.target.value})}
                        className="flex-1"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="secondaryColor">สีรอง</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="secondaryColor"
                        type="color"
                        value={orgSettings.secondaryColor}
                        onChange={(e) => setOrgSettings({...orgSettings, secondaryColor: e.target.value})}
                        className="w-16 h-10"
                      />
                      <Input
                        value={orgSettings.secondaryColor}
                        onChange={(e) => setOrgSettings({...orgSettings, secondaryColor: e.target.value})}
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="logoUpload">โลโก้องค์กร</Label>
                  <Input
                    id="logoUpload"
                    type="file"
                    accept="image/*"
                    className="mt-1"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    รองรับไฟล์ PNG, JPG ขนาดไม่เกิน 2MB
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Preview */}
            <Card>
              <CardHeader>
                <CardTitle>ตัวอย่างหน้า Login</CardTitle>
                <CardDescription>
                  ดูตัวอย่างหน้า Login ที่ปรับแต่งแล้ว
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div 
                  className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center"
                  style={{ 
                    backgroundColor: `${orgSettings.primaryColor}15`,
                    borderColor: orgSettings.primaryColor
                  }}
                >
                  <h3 
                    className="text-2xl font-bold mb-4"
                    style={{ color: orgSettings.primaryColor }}
                  >
                    {orgSettings.loginPageTitle}
                  </h3>
                  <p className="text-gray-600 mb-4">{orgSettings.welcomeMessage}</p>
                  <div 
                    className="inline-block px-6 py-2 rounded-lg text-white"
                    style={{ backgroundColor: orgSettings.primaryColor }}
                  >
                    ปุ่มเข้าสู่ระบบ
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>การตั้งค่าความปลอดภัย</CardTitle>
                <CardDescription>
                  จัดการระบบรักษาความปลอดภัยและการป้องกันข้อมูล
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">การยืนยันตัวตนสองขั้นตอน</h4>
                    <p className="text-sm text-gray-600">เพิ่มความปลอดภัยด้วย OTP</p>
                  </div>
                  <Switch 
                    checked={securitySettings.twoFactorAuth}
                    onCheckedChange={(checked) => 
                      setSecuritySettings({...securitySettings, twoFactorAuth: checked})
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">ระบบป้องกัน AI</h4>
                    <p className="text-sm text-gray-600">ป้องกันการเข้าถึงจาก AI อื่น</p>
                  </div>
                  <Switch 
                    checked={securitySettings.aiProtection}
                    onCheckedChange={(checked) => 
                      setSecuritySettings({...securitySettings, aiProtection: checked})
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">การเข้ารหัสข้อมูล</h4>
                    <p className="text-sm text-gray-600">เข้ารหัสข้อมูลแบบ End-to-End</p>
                  </div>
                  <Switch 
                    checked={securitySettings.dataEncryption}
                    onCheckedChange={(checked) => 
                      setSecuritySettings({...securitySettings, dataEncryption: checked})
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">แจ้งเตือนการเข้าสู่ระบบ</h4>
                    <p className="text-sm text-gray-600">แจ้งเตือนเมื่อมีการเข้าสู่ระบบใหม่</p>
                  </div>
                  <Switch 
                    checked={securitySettings.loginNotifications}
                    onCheckedChange={(checked) => 
                      setSecuritySettings({...securitySettings, loginNotifications: checked})
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="sessionTimeout">เวลาหมดอายุ Session (นาที)</Label>
                  <Select 
                    value={securitySettings.sessionTimeout} 
                    onValueChange={(value) => 
                      setSecuritySettings({...securitySettings, sessionTimeout: value})
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 นาที</SelectItem>
                      <SelectItem value="30">30 นาที</SelectItem>
                      <SelectItem value="60">1 ชั่วโมง</SelectItem>
                      <SelectItem value="120">2 ชั่วโมง</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>การตั้งค่าการแจ้งเตือน</CardTitle>
                <CardDescription>
                  จัดการการแจ้งเตือนและการสื่อสาร
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">การแจ้งเตือนทางอีเมล</h4>
                    <p className="text-sm text-gray-600">รับการแจ้งเตือนผ่านอีเมล</p>
                  </div>
                  <Switch 
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={(checked) => 
                      setNotificationSettings({...notificationSettings, emailNotifications: checked})
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">การแจ้งเตือนทาง SMS</h4>
                    <p className="text-sm text-gray-600">รับการแจ้งเตือนผ่าน SMS</p>
                  </div>
                  <Switch 
                    checked={notificationSettings.smsNotifications}
                    onCheckedChange={(checked) => 
                      setNotificationSettings({...notificationSettings, smsNotifications: checked})
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">แจ้งเตือนการเข้าถึงข้อมูล</h4>
                    <p className="text-sm text-gray-600">แจ้งเตือนเมื่อมีการเข้าถึงข้อมูล</p>
                  </div>
                  <Switch 
                    checked={notificationSettings.dataAccessAlerts}
                    onCheckedChange={(checked) => 
                      setNotificationSettings({...notificationSettings, dataAccessAlerts: checked})
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">อัพเดทระบบ</h4>
                    <p className="text-sm text-gray-600">รับข่าวสารการอัพเดทระบบ</p>
                  </div>
                  <Switch 
                    checked={notificationSettings.systemUpdates}
                    onCheckedChange={(checked) => 
                      setNotificationSettings({...notificationSettings, systemUpdates: checked})
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Advanced Settings */}
          <TabsContent value="advanced" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>การตั้งค่าขั้นสูง</CardTitle>
                <CardDescription>
                  การตั้งค่าสำหรับผู้ใช้ขั้นสูง
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h4 className="font-semibold text-yellow-800 mb-2">การสำรองข้อมูล</h4>
                  <p className="text-sm text-yellow-700 mb-4">
                    สำรองข้อมูลอัตโนมัติทุกวันในเวลา 02:00 น.
                  </p>
                  <Button variant="outline" size="sm">
                    ตั้งค่าการสำรองข้อมูล
                  </Button>
                </div>

                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <h4 className="font-semibold text-red-800 mb-2">ลบข้อมูลทั้งหมด</h4>
                  <p className="text-sm text-red-700 mb-4">
                    ลบข้อมูลทั้งหมดในระบบ การกระทำนี้ไม่สามารถย้อนกลับได้
                  </p>
                  <Button variant="destructive" size="sm">
                    ลบข้อมูลทั้งหมด
                  </Button>
                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">ส่งออกข้อมูล</h4>
                  <p className="text-sm text-blue-700 mb-4">
                    ส่งออกข้อมูลทั้งหมดในรูปแบบ JSON หรือ CSV
                  </p>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      ส่งออก JSON
                    </Button>
                    <Button variant="outline" size="sm">
                      ส่งออก CSV
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Settings;
