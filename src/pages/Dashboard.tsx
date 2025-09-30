import { useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Footer from '@/components/Footer';
import UploadMintModal from '@/components/UploadMintModal';
import WithdrawModal from '@/components/WithdrawModal';
import { 
  Eye, 
  Heart, 
  DollarSign, 
  Users, 
  Upload,
  TrendingUp,
  Award,
  Plus,
  Wallet,
  Clock,
  Gift
} from 'lucide-react';
import { motion } from 'framer-motion';

// Mock data for demo
const statsData = {
  totalViews: 45200,
  totalLikes: 8900,
  totalTips: 2450,
  followers: 1250
};

const uploadsData = [
  {
    id: 1,
    title: "Sunset City Dreams",
    views: 12500,
    likes: 890,
    tips: 125,
    thumbnail: "/placeholder.svg"
  }
];

export default function Dashboard() {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState("uploads");
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);

  const StatCard = ({ title, value, icon: Icon, color, trend }: any) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="hover:shadow-lg transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">{title}</p>
              <div className="flex items-center space-x-2">
                <p className="text-2xl font-bold">{typeof value === 'number' ? value.toLocaleString() : value}</p>
                {trend && (
                  <Badge variant="secondary" className="text-xs">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {trend}
                  </Badge>
                )}
              </div>
            </div>
            <div className={`p-3 rounded-full ${color}`}>
              <Icon className="h-6 w-6 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        {/* Welcome Header */}
        <motion.div 
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16 ring-4 ring-primary/20">
              <AvatarImage src={user?.avatar} alt={user?.name} />
              <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                {user?.name?.[0]?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold">Welcome back, {user?.name || 'Creator'}</h1>
              <p className="text-lg text-muted-foreground">Manage your creative content and earnings</p>
            </div>
          </div>
          
          <Button 
            className="safi-hero-gradient text-primary-foreground"
            onClick={() => setIsUploadModalOpen(true)}
          >
            <Upload className="mr-2 h-4 w-4" />
            Upload Content
          </Button>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Views"
            value={statsData.totalViews}
            icon={Eye}
            color="bg-blue-600"
            trend="+12%"
          />
          <StatCard
            title="Total Likes"
            value={statsData.totalLikes}
            icon={Heart}
            color="bg-red-600"
            trend="+8%"
          />
          <StatCard
            title="Total Tips"
            value={`$${statsData.totalTips}`}
            icon={DollarSign}
            color="bg-green-600"
            trend="+15%"
          />
          <StatCard
            title="Followers"
            value={statsData.followers}
            icon={Users}
            color="bg-purple-600"
            trend="+5%"
          />
        </div>

        {/* Content Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="uploads" className="flex items-center space-x-2">
                <Upload className="h-4 w-4" />
                <span>My Uploads</span>
                <Badge variant="secondary" className="ml-1">1</Badge>
              </TabsTrigger>
              <TabsTrigger value="followers" className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>Followers</span>
                <Badge variant="secondary" className="ml-1">1250</Badge>
              </TabsTrigger>
              <TabsTrigger value="earnings" className="flex items-center space-x-2">
                <DollarSign className="h-4 w-4" />
                <span>Earnings</span>
                <Badge variant="secondary" className="ml-1">$2,450</Badge>
              </TabsTrigger>
              <TabsTrigger value="certificates" className="flex items-center space-x-2">
                <Award className="h-4 w-4" />
                <span>Certificates</span>
                <Badge variant="secondary" className="ml-1">12</Badge>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="uploads" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {uploadsData.map((upload) => (
                  <Card key={upload.id} className="hover:shadow-lg transition-shadow">
                    <div className="aspect-video bg-gradient-to-br from-orange-400 via-red-500 to-pink-500 rounded-t-lg relative overflow-hidden">
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <div className="text-center text-white">
                          <h3 className="text-lg font-semibold">{upload.title}</h3>
                          <p className="text-sm opacity-90">Digital Art</p>
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Eye className="h-4 w-4" />
                          <span>{upload.views.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Heart className="h-4 w-4" />
                          <span>{upload.likes.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <DollarSign className="h-4 w-4" />
                          <span>${upload.tips}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {/* Add New Upload Card */}
                <Card className="hover:shadow-lg transition-shadow border-dashed">
                  <CardContent className="aspect-video flex items-center justify-center p-4">
                    <div className="text-center">
                      <Plus className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                      <p className="text-muted-foreground">Upload new content</p>
                      <Button variant="outline" className="mt-2">
                        Add Content
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="followers" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Followers</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Follower management coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="earnings" className="mt-6">
              <div className="space-y-6">
                {/* Earnings Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Available Balance */}
                  <Card className="bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-green-900 dark:text-green-100">Available Balance</h3>
                        <Wallet className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                      <p className="text-3xl font-bold text-green-700 dark:text-green-400 mb-4">
                        ${statsData.totalTips.toFixed(2)}
                      </p>
                      <Button 
                        className="w-full bg-green-600 hover:bg-green-700 text-white"
                        onClick={() => setIsWithdrawModalOpen(true)}
                      >
                        Withdraw Funds
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Total Earnings */}
                  <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-blue-900 dark:text-blue-100">Total Earnings</h3>
                        <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <p className="text-3xl font-bold text-blue-700 dark:text-blue-400">
                        ${statsData.totalTips.toFixed(2)}
                      </p>
                    </CardContent>
                  </Card>

                  {/* Pending Withdrawals */}
                  <Card className="bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-yellow-900 dark:text-yellow-100">Pending Withdrawals</h3>
                        <Clock className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                      </div>
                      <p className="text-3xl font-bold text-yellow-700 dark:text-yellow-400">
                        $0.00
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Earnings */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Earnings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Tip Transaction */}
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                            <Gift className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <p className="font-semibold">Tip</p>
                            <p className="text-sm text-muted-foreground">From Sarah M. • 15/01/2024</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-green-600 dark:text-green-400">+$25.50</p>
                          <Badge variant="secondary" className="text-xs">completed</Badge>
                        </div>
                      </div>

                      {/* Sale Transaction */}
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                            <DollarSign className="h-5 w-5 text-green-600 dark:text-green-400" />
                          </div>
                          <div>
                            <p className="font-semibold">Sale</p>
                            <p className="text-sm text-muted-foreground">From Art Collector • 14/01/2024</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-green-600 dark:text-green-400">+$150.00</p>
                          <Badge variant="secondary" className="text-xs">completed</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="certificates" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Your Certificates</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Certificate management coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
      
      <UploadMintModal 
        isOpen={isUploadModalOpen} 
        onClose={() => setIsUploadModalOpen(false)} 
      />
      
      <WithdrawModal 
        isOpen={isWithdrawModalOpen} 
        onClose={() => setIsWithdrawModalOpen(false)}
        availableBalance={statsData.totalTips}
      />
      
      <Footer />
    </div>
  );
}