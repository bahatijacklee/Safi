import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Filter, 
  Search, 
  Grid3X3, 
  List, 
  TrendingUp, 
  Clock, 
  Star,
  Image as ImageIcon,
  Music,
  Video,
  Palette
} from 'lucide-react';
import ContentCard from '@/components/ContentCard';
import Footer from '@/components/Footer';
import { useContentStore, Content } from '@/store/contentStore';

// Import generated images
import creator1Avatar from '@/assets/creator-1.jpg';
import creator2Avatar from '@/assets/creator-2.jpg';
import creator3Avatar from '@/assets/creator-3.jpg';
import artwork1 from '@/assets/artwork-1.jpg';

// Mock data - in real app, this would come from API
const mockContents: Content[] = [
  {
    id: '1',
    title: 'Afrofuturistic Dreams',
    description: 'A vibrant digital painting exploring themes of technology and African heritage',
    type: 'image',
    url: artwork1,
    creator: {
      id: '1',
      name: 'Amara Okafor',
      avatar: creator1Avatar,
      isVerified: true
    },
    likes: 234,
    comments: 45,
    isLiked: false,
    isSaved: false,
    createdAt: '2024-01-15T10:00:00Z',
    tags: ['digital-art', 'afrofuturism', 'colorful'],
    royaltyPercentage: 10,
    isMinted: true,
    price: 0.5
  },
  {
    id: '2',
    title: 'Highlife Fusion',
    description: 'Traditional Ghanaian Highlife meets modern Afrobeats in this energetic track',
    type: 'audio',
    url: '/api/placeholder/audio.mp3',
    creator: {
      id: '2',
      name: 'Kofi Asante',
      avatar: creator2Avatar,
      isVerified: true
    },
    likes: 567,
    comments: 89,
    isLiked: true,
    isSaved: false,
    createdAt: '2024-01-14T15:30:00Z',
    tags: ['music', 'highlife', 'afrobeats'],
    royaltyPercentage: 15
  },
  {
    id: '3',
    title: 'Lagos Street Life',
    description: 'A cinematic short film capturing the vibrant energy of Lagos streets',
    type: 'video',
    url: '/api/placeholder/video.mp4',
    thumbnail: creator3Avatar,
    creator: {
      id: '3',
      name: 'Zara Mbeki',
      avatar: creator3Avatar,
      isVerified: false
    },
    likes: 189,
    comments: 23,
    isLiked: false,
    isSaved: true,
    createdAt: '2024-01-13T09:15:00Z',
    tags: ['video', 'documentary', 'lagos', 'street-photography'],
    royaltyPercentage: 20,
    isMinted: false
  },
  // Add more mock content...
];

export default function Feed() {
  const { contents, filters, setContents, updateFilters } = useContentStore();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // In real app, fetch from API based on filters
    setContents(mockContents);
  }, [setContents, filters]);

  const filteredContents = contents.filter(content => {
    const matchesType = filters.type === 'all' || content.type === filters.type;
    const matchesSearch = searchQuery === '' || 
      content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      content.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      content.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesType && matchesSearch;
  });

  const filterOptions = [
    { key: 'all', label: 'All', icon: Palette },
    { key: 'image', label: 'Art', icon: ImageIcon },
    { key: 'audio', label: 'Music', icon: Music },
    { key: 'video', label: 'Video', icon: Video }
  ] as const;

  const categoryOptions = [
    { key: 'trending', label: 'Trending', icon: TrendingUp },
    { key: 'new', label: 'New', icon: Clock },
    { key: 'featured', label: 'Featured', icon: Star }
  ] as const;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card/50 backdrop-blur-sm sticky top-16 z-40">
        <div className="container px-4 py-4">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Title and Search */}
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-bold mb-2">
                Explore <span className="gradient-text">Creative Works</span>
              </h1>
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search art, music, videos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* View Controls */}
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Filters */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="sticky top-32 space-y-6">
              {/* Content Type Filter */}
              <div>
                <h3 className="font-semibold mb-3">Content Type</h3>
                <div className="space-y-2">
                  {filterOptions.map((option) => (
                    <Button
                      key={option.key}
                      variant={filters.type === option.key ? 'default' : 'ghost'}
                      className="w-full justify-start"
                      onClick={() => updateFilters({ type: option.key })}
                    >
                      <option.icon className="h-4 w-4 mr-2" />
                      {option.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <h3 className="font-semibold mb-3">Category</h3>
                <div className="space-y-2">
                  {categoryOptions.map((option) => (
                    <Button
                      key={option.key}
                      variant={filters.category === option.key ? 'default' : 'ghost'}
                      className="w-full justify-start"
                      onClick={() => updateFilters({ category: option.key })}
                    >
                      <option.icon className="h-4 w-4 mr-2" />
                      {option.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Popular Tags */}
              <div>
                <h3 className="font-semibold mb-3">Popular Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {['afrofuturism', 'portrait', 'afrobeats', 'documentary', 'digital-art', 'photography'].map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="cursor-pointer hover:bg-primary/20 text-xs"
                      onClick={() => setSearchQuery(tag)}
                    >
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Results Info */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-muted-foreground">
                {filteredContents.length} {filteredContents.length === 1 ? 'result' : 'results'}
                {searchQuery && ` for "${searchQuery}"`}
              </p>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">Sort by:</span>
                <Button variant="ghost" size="sm" className="text-sm">
                  Most Recent
                </Button>
              </div>
            </div>

            {/* Content Grid */}
            <motion.div
              className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-1'
              }`}
              layout
            >
              {filteredContents.map((content) => (
                <ContentCard
                  key={content.id}
                  content={content}
                  className={viewMode === 'list' ? 'flex flex-row max-w-none' : ''}
                />
              ))}
            </motion.div>

            {/* Load More */}
            {filteredContents.length > 0 && (
              <div className="text-center mt-12">
                <Button variant="outline" size="lg">
                  Load More Content
                </Button>
              </div>
            )}

            {/* Empty State */}
            {filteredContents.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No content found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your filters or search terms
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery('');
                    updateFilters({ type: 'all', category: 'trending' });
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}