import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Users2, Award, Heart, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

// Import generated images
import creator1Avatar from '@/assets/creator-1.jpg';
import creator2Avatar from '@/assets/creator-2.jpg';
import creator3Avatar from '@/assets/creator-3.jpg';
import featuredWork1 from '@/assets/featured-work-1.jpg';
import featuredWork2 from '@/assets/featured-work-2.jpg';
import featuredWork3 from '@/assets/featured-work-3.jpg';

interface Creator {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  followers: number;
  totalLikes: number;
  totalViews: number;
  isVerified: boolean;
  speciality: string;
  featuredWork: string;
}

const featuredCreators: Creator[] = [
  {
    id: '1',
    name: 'Amara Okafor',
    avatar: creator1Avatar,
    bio: 'Digital artist exploring Afrofuturism through vibrant illustrations',
    followers: 12500,
    totalLikes: 45000,
    totalViews: 125000,
    isVerified: true,
    speciality: 'Digital Art',
    featuredWork: featuredWork1
  },
  {
    id: '2',
    name: 'Kofi Asante',
    avatar: creator2Avatar,
    bio: 'Musician blending traditional Highlife with modern Afrobeats',
    followers: 8300,
    totalLikes: 32000,
    totalViews: 89000,
    isVerified: true,
    speciality: 'Music',
    featuredWork: featuredWork2
  },
  {
    id: '3',
    name: 'Zara Mbeki',
    avatar: creator3Avatar,
    bio: 'Photographer capturing the beauty of everyday African life',
    followers: 15200,
    totalLikes: 67000,
    totalViews: 203000,
    isVerified: true,
    speciality: 'Photography',
    featuredWork: featuredWork3
  },
];

export default function FeaturedCreators() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Meet Our <span className="gradient-text">Featured Creators</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Talented artists from across Africa are sharing their creativity and 
            building communities on Safi.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCreators.map((creator, index) => (
            <motion.div
              key={creator.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="creator-card group">
                <CardContent className="p-0">
                  {/* Featured Work Background */}
                  <div className="relative h-40 overflow-hidden rounded-t-2xl">
                    <img 
                      src={creator.featuredWork} 
                      alt={`${creator.name}'s work`}
                      className="w-full h-full object-cover group-hover:scale-105 safi-transition"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    
                    {/* Speciality Badge */}
                    <Badge className="absolute top-4 right-4 bg-background/90 text-foreground">
                      {creator.speciality}
                    </Badge>
                  </div>

                  {/* Creator Info */}
                  <div className="p-6">
                    {/* Avatar and Name */}
                    <div className="flex items-center space-x-4 mb-4">
                      <Avatar className="h-16 w-16 ring-4 ring-background shadow-lg">
                        <AvatarImage src={creator.avatar} alt={creator.name} />
                        <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                          {creator.name[0]}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-bold text-lg">{creator.name}</h3>
                          {creator.isVerified && (
                            <Award className="h-5 w-5 text-primary" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {creator.bio}
                        </p>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                          <Users2 className="h-4 w-4 text-primary mr-1" />
                          <span className="font-semibold text-sm">
                            {creator.followers > 1000 
                              ? `${(creator.followers / 1000).toFixed(1)}K` 
                              : creator.followers}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">Followers</p>
                      </div>
                      
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                          <Heart className="h-4 w-4 text-red-500 mr-1" />
                          <span className="font-semibold text-sm">
                            {creator.totalLikes > 1000 
                              ? `${(creator.totalLikes / 1000).toFixed(1)}K` 
                              : creator.totalLikes}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">Likes</p>
                      </div>
                      
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                          <Eye className="h-4 w-4 text-blue-500 mr-1" />
                          <span className="font-semibold text-sm">
                            {creator.totalViews > 1000 
                              ? `${(creator.totalViews / 1000).toFixed(1)}K` 
                              : creator.totalViews}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">Views</p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-2">
                      <Link to={`/profile/${creator.id}`} className="flex-1">
                        <Button variant="outline" className="w-full">
                          View Profile
                        </Button>
                      </Link>
                      <Button className="safi-accent-gradient text-accent-foreground">
                        Follow
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Link to="/creators">
            <Button 
              size="lg" 
              variant="outline" 
              className="px-8 border-primary/20 hover:bg-primary/5"
            >
              Discover More Creators
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}