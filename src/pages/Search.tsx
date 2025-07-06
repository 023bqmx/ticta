
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search as SearchIcon, Filter, Database, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [searchResults, setSearchResults] = useState([
    { id: 1, type: 'ข้อมูลทั่วไป', title: 'ข้อมูลส่วนตัว', content: 'ชื่อ: นาย สมชาย ใจดี', lastModified: '2024-01-15', relevance: 95 },
    { id: 2, type: 'ข้อมูลการติดต่อ', title: 'เบอร์โทรศัพท์', content: '081-234-5678', lastModified: '2024-01-14', relevance: 88 },
    { id: 3, type: 'ข้อมูลการทำงาน', title: 'บริษัท', content: 'บริษัท ABC จำกัด', lastModified: '2024-01-13', relevance: 75 },
  ]);

  const handleSearch = () => {
    console.log('Searching for:', searchQuery, 'Type:', filterType);
    // TODO: Implement actual search functionality
  };

  const filteredResults = searchResults.filter(item => {
    const matchesQuery = searchQuery === '' || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = filterType === 'all' || item.type === filterType;
    
    return matchesQuery && matchesType;
  });

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
              <SearchIcon className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-primary">ค้นหาข้อมูล</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">ค้นหาข้อมูลของคุณ</h2>
          <p className="text-gray-600">ค้นหาและกรองข้อมูลส่วนบุคคลได้อย่างรวดเร็ว</p>
        </div>

        {/* Search Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <SearchIcon className="h-5 w-5" />
              <span>ค้นหา</span>
            </CardTitle>
            <CardDescription>
              กรอกคำค้นหาและเลือกประเภทข้อมูลที่ต้องการ
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <div className="flex-1">
                <Input
                  placeholder="ค้นหาข้อมูล..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-12 text-lg"
                />
              </div>
              
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full md:w-48 h-12">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="เลือกประเภท" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">ทุกประเภท</SelectItem>
                  <SelectItem value="ข้อมูลทั่วไป">ข้อมูลทั่วไป</SelectItem>
                  <SelectItem value="ข้อมูลการติดต่อ">ข้อมูลการติดต่อ</SelectItem>
                  <SelectItem value="ข้อมูลการทำงาน">ข้อมูลการทำงาน</SelectItem>
                </SelectContent>
              </Select>
              
              <Button onClick={handleSearch} className="h-12 px-8">
                <SearchIcon className="h-4 w-4 mr-2" />
                ค้นหา
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Search Results */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Database className="h-5 w-5" />
                <span>ผลการค้นหา</span>
              </div>
              <Badge variant="secondary">
                {filteredResults.length} รายการ
              </Badge>
            </CardTitle>
            <CardDescription>
              ผลการค้นหาเรียงตามความเกี่ยวข้อง
            </CardDescription>
          </CardHeader>
          <CardContent>
            {filteredResults.length === 0 ? (
              <div className="text-center py-12">
                <SearchIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">ไม่พบข้อมูล</h3>
                <p className="text-gray-500">ลองค้นหาด้วยคำอื่นหรือเปลี่ยนตัวกรอง</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredResults.map((item) => (
                  <Card key={item.id} className="bg-gradient-card hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge variant="secondary">{item.type}</Badge>
                            <Badge variant="outline" className="text-green-600 border-green-300">
                              {item.relevance}% ความเกี่ยวข้อง
                            </Badge>
                            <span className="text-sm text-gray-500">
                              แก้ไขล่าสุด: {item.lastModified}
                            </span>
                          </div>
                          <h4 className="font-semibold text-lg mb-1">{item.title}</h4>
                          <p className="text-gray-600">{item.content}</p>
                        </div>
                        <Button size="sm" variant="outline">
                          ดูรายละเอียด
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Search Tips */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>เคล็ดลับการค้นหา</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <h4 className="font-semibold mb-2">การค้นหาแบบพื้นฐาน:</h4>
                <ul className="space-y-1">
                  <li>• ใช้คำหลักสำคัญ</li>
                  <li>• ค้นหาได้ทั้งภาษาไทยและอังกฤษ</li>
                  <li>• ไม่ต้องใส่เครื่องหมายคำพูด</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">การกรองข้อมูล:</h4>
                <ul className="space-y-1">
                  <li>• เลือกประเภทข้อมูลเพื่อค้นหาที่ละเอียด</li>
                  <li>• ใช้ตัวกรองเพื่อลดผลการค้นหา</li>
                  <li>• ผลการค้นหาเรียงตามความเกี่ยวข้อง</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Search;
