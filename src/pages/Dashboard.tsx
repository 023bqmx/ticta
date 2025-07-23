
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, Building, User, FileText, Clock, PlusCircle, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { TutorialModal } from '@/components/TutorialModal';

const Dashboard = () => {
  const navigate = useNavigate();
  const [showTutorial, setShowTutorial] = useState(false);

  const userTypes = [
    {
      id: 'student',
      title: 'ประเภทนักเรียน',
      description: 'สำหรับนักเรียนและนักศึกษา',
      icon: GraduationCap,
      color: 'bg-blue-500 hover:bg-blue-600',
      route: '/student'
    },
    {
      id: 'employee',
      title: 'ประเภทพนักงานบริษัท',
      description: 'สำหรับพนักงานและเจ้าหน้าที่',
      icon: Building,
      color: 'bg-green-500 hover:bg-green-600',
      route: '/employee'
    },
    {
      id: 'general',
      title: 'ประเภทบุคคลทั่วไป',
      description: 'สำหรับประชาชนทั่วไป',
      icon: User,
      color: 'bg-purple-500 hover:bg-purple-600',
      route: '/general'
    },
    {
      id: 'template',
      title: 'สร้างเทมเพลตเอง',
      description: 'สร้างฟอร์มข้อมูลตามต้องการ',
      icon: PlusCircle,
      color: 'bg-orange-500 hover:bg-orange-600',
      route: '/template'
    }
  ];

  const handleTypeSelect = (route: string) => {
    navigate(route);
  };

  return (
    <div className="min-h-screen bg-gradient-main">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FileText className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-primary">MY DATA</span>
            </div>
            <div className="flex items-center space-x-2">
              <ThemeToggle />
              <Button variant="outline" onClick={() => navigate('/history')}>
                <Clock className="h-4 w-4 mr-2" />
                ประวัติการบันทึก
              </Button>
              <Button variant="outline" onClick={() => navigate('/')}>
                ออกจากระบบ
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            เลือกประเภทข้อมูลของคุณ
          </h1>
          <p className="text-xl text-gray-600">
            เลือกประเภทที่เหมาะสมกับตัวคุณเพื่อกรอกข้อมูลที่เกี่ยวข้อง
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {userTypes.map((type) => {
            const IconComponent = type.icon;
            return (
              <Card key={type.id} className="bg-gradient-card border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <CardHeader className="text-center pb-6">
                  <div className={`w-16 h-16 ${type.color} rounded-full flex items-center justify-center mx-auto mb-4 text-white`}>
                    <IconComponent className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-xl font-semibold">
                    {type.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {type.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Button 
                    className={`w-full h-12 text-lg ${type.color} text-white border-0`}
                    onClick={() => handleTypeSelect(type.route)}
                  >
                    เลือกประเภทนี้
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </main>

      {/* Tutorial Button */}
      <div className="fixed bottom-6 right-6">
        <Button
          onClick={() => setShowTutorial(true)}
          className="rounded-full h-12 w-12 shadow-lg"
          variant="default"
        >
          <HelpCircle className="h-5 w-5" />
        </Button>
      </div>

      {/* Tutorial Modal */}
      <TutorialModal open={showTutorial} onOpenChange={setShowTutorial} />
    </div>
  );
};

export default Dashboard;
