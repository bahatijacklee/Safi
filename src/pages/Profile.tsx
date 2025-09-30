import { useParams } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  Eye, 
  Heart, 
  DollarSign, 
  Palette,
  MapPin,
  Calendar,
  Globe,
  Instagram,
  Twitter,
  Edit
} from 'lucide-react';
import { motion } from 'framer-motion';

// Mock user data for demo
const profileData = {
  id: 1,
  name: "Amara Johnson",
  location: "Lagos, Nigeria",
  bio: "Digital artist and creative director from Lagos, Nigeria. Passionate about blending traditional African art with modern digital techniques. My work explores themes of identity, culture, and the intersection of technology and humanity.",
  website: "amarajohnson.com",
  joinedDate: "June 2023",
  stats: {
    works: 45,
    followers: 1250,
    following: 340,
    totalViews: 125000,
    totalLikes: 8900,
    tipsReceived: 2450,
    worksCreated: 45
  },
  socialLinks: {
    instagram: "@amara.creates",
    twitter: "@amarajohnson",
    behance: "amarajohnson"
  }
};

export default function Profile() {
  const { userId } = useParams();
  const { user } = useAuthStore();
  
  // Check if this is the current user's profile
  const isOwnProfile = user?.id === userId;

  const StatCard = ({ title, value, icon: Icon, color }: any) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{typeof value === 'number' ? value.toLocaleString() : value}</p>
          </div>
          <div className={`p-3 rounded-full ${color}`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Profile Header with Gradient Background */}
      <motion.div 
        className="relative h-80 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 h-full flex items-end pb-8">
          <motion.div 
            className="flex items-end space-x-6 text-white relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Avatar className="h-32 w-32 ring-4 ring-white/50">
              <AvatarImage src={user?.avatar} alt={profileData.name} />
              <AvatarFallback className="bg-primary text-primary-foreground text-4xl">
                {profileData.name[0]}
              </AvatarFallback>
            </Avatar>
            <div className="pb-4">
              <h1 className="text-4xl font-bold mb-2">{profileData.name}</h1>
              <div className="flex items-center space-x-2 text-white/90">
                <MapPin className="h-4 w-4" />
                <span>{profileData.location}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 py-8">
        {/* Profile Stats */}
        <motion.div 
          className="grid grid-cols-3 gap-6 -mt-16 mb-8 relative z-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="bg-background/95 backdrop-blur">
            <CardContent className="p-6 text-center">
              <p className="text-3xl font-bold">{profileData.stats.works}</p>
              <p className="text-sm text-muted-foreground">Works</p>
            </CardContent>
          </Card>
          <Card className="bg-background/95 backdrop-blur">
            <CardContent className="p-6 text-center">
              <p className="text-3xl font-bold">{profileData.stats.followers.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Followers</p>
            </CardContent>
          </Card>
          <Card className="bg-background/95 backdrop-blur">
            <CardContent className="p-6 text-center">
              <p className="text-3xl font-bold">{profileData.stats.following}</p>
              <p className="text-sm text-muted-foreground">Following</p>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <motion.div 
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">About</h2>
                  {isOwnProfile && (
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  )}
                </div>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {profileData.bio}
                </p>

                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <a href="#" className="text-primary hover:underline">
                      {profileData.website}
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Joined {profileData.joinedDate}</span>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex space-x-4 mt-6">
                  <Button variant="outline" size="sm">
                    <Instagram className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Twitter className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Globe className="h-4 w-4" />
                  </Button>
                </div>

                {!isOwnProfile && (
                  <Button className="w-full mt-6 safi-hero-gradient text-primary-foreground">
                    Follow
                  </Button>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Stats and Activity */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {/* Detailed Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <StatCard
                title="Total Views"
                value={profileData.stats.totalViews}
                icon={Eye}
                color="bg-blue-600"
              />
              <StatCard
                title="Total Likes"
                value={profileData.stats.totalLikes}
                icon={Heart}
                color="bg-red-600"
              />
              <StatCard
                title="Tips Received"
                value={`$${profileData.stats.tipsReceived}`}
                icon={DollarSign}
                color="bg-green-600"
              />
              <StatCard
                title="Works Created"
                value={profileData.stats.worksCreated}
                icon={Palette}
                color="bg-purple-600"
              />
            </div>

            {/* Recent Works Preview */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Recent Works</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div 
                      key={i}
                      className="aspect-square bg-gradient-to-br from-orange-400 via-red-500 to-pink-500 rounded-lg hover:scale-105 transition-transform cursor-pointer"
                    />
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  View All Works
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}