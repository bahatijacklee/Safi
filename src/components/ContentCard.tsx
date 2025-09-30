import { useState } from 'react';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Bookmark, 
  MoreHorizontal,
  Play,
  Volume2,
  VolumeX,
  Award
} from 'lucide-react';
import { Content } from '@/store/contentStore';
import { useContentStore } from '@/store/contentStore';
import { Link } from 'react-router-dom';

interface ContentCardProps {
  content: Content;
  className?: string;
}

export default function ContentCard({ content, className = "" }: ContentCardProps) {
  const { likeContent, saveContent } = useContentStore();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    likeContent(content.id);
  };

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    saveContent(content.id);
  };

  const renderMediaPreview = () => {
    switch (content.type) {
      case 'image':
        return (
          <div className="aspect-square bg-muted rounded-lg overflow-hidden">
            <img
              src={content.url}
              alt={content.title}
              className="w-full h-full object-cover hover:scale-105 safi-transition"
            />
          </div>
        );
      
      case 'video':
        return (
          <div className="aspect-video bg-muted rounded-lg overflow-hidden relative group">
            <img
              src={content.thumbnail || content.url}
              alt={content.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 safi-transition">
              <Button
                size="lg"
                className="rounded-full bg-primary/80 hover:bg-primary text-primary-foreground"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsPlaying(!isPlaying);
                }}
              >
                <Play className="h-6 w-6 ml-1" />
              </Button>
            </div>
          </div>
        );
      
      case 'audio':
        return (
          <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex flex-col items-center justify-center p-6">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
              <Volume2 className="h-8 w-8 text-primary" />
            </div>
            <div className="text-center">
              <h4 className="font-semibold mb-2">{content.title}</h4>
              <div className="flex items-center space-x-2">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsPlaying(!isPlaying);
                  }}
                >
                  <Play className="h-4 w-4 mr-1" />
                  {isPlaying ? 'Pause' : 'Play'}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsMuted(!isMuted);
                  }}
                >
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <motion.div
      className={`content-card ${className}`}
      whileHover={{ y: -4 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link to={`/content/${content.id}`} className="block">
        {/* Media Preview */}
        {renderMediaPreview()}

        {/* Content Info */}
        <div className="p-4">
          {/* Creator Info */}
          <div className="flex items-center space-x-3 mb-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={content.creator.avatar} alt={content.creator.name} />
              <AvatarFallback className="bg-primary/10 text-primary">
                {content.creator.name[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-1">
                <p className="text-sm font-medium truncate">{content.creator.name}</p>
                {content.creator.isVerified && (
                  <Award className="h-3 w-3 text-primary flex-shrink-0" />
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                {new Date(content.createdAt).toLocaleDateString()}
              </p>
            </div>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>

          {/* Title and Description */}
          <div className="mb-3">
            <h3 className="font-semibold mb-1 line-clamp-2">{content.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">{content.description}</p>
          </div>

          {/* Tags */}
          {content.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {content.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  #{tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLike}
                className={`action-btn ${content.isLiked ? 'text-red-500' : 'text-muted-foreground'}`}
              >
                <Heart className={`h-4 w-4 mr-1 ${content.isLiked ? 'fill-current' : ''}`} />
                <span className="text-xs">{content.likes}</span>
              </Button>
              
              <Button variant="ghost" size="sm" className="action-btn text-muted-foreground">
                <MessageCircle className="h-4 w-4 mr-1" />
                <span className="text-xs">{content.comments}</span>
              </Button>
              
              <Button variant="ghost" size="sm" className="action-btn text-muted-foreground">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              {content.isMinted && (
                <Badge variant="secondary" className="text-xs bg-safi-gold/20 text-safi-bronze">
                  <Award className="h-3 w-3 mr-1" />
                  Certified
                </Badge>
              )}
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSave}
                className={`action-btn ${content.isSaved ? 'text-primary' : 'text-muted-foreground'}`}
              >
                <Bookmark className={`h-4 w-4 ${content.isSaved ? 'fill-current' : ''}`} />
              </Button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}