import { create } from 'zustand';

export interface Content {
  id: string;
  title: string;
  description: string;
  type: 'image' | 'video' | 'audio';
  url: string;
  thumbnail?: string;
  creator: {
    id: string;
    name: string;
    avatar?: string;
    isVerified?: boolean;
  };
  likes: number;
  comments: number;
  isLiked: boolean;
  isSaved: boolean;
  createdAt: string;
  tags: string[];
  royaltyPercentage?: number;
  isMinted?: boolean;
  price?: number;
}

interface ContentState {
  contents: Content[];
  featuredContents: Content[];
  isLoading: boolean;
  selectedContent: Content | null;
  filters: {
    type: 'all' | 'image' | 'video' | 'audio';
    category: 'trending' | 'new' | 'featured';
  };
  
  // Actions
  setContents: (contents: Content[]) => void;
  setFeaturedContents: (contents: Content[]) => void;
  setLoading: (loading: boolean) => void;
  setSelectedContent: (content: Content | null) => void;
  updateFilters: (filters: Partial<ContentState['filters']>) => void;
  likeContent: (contentId: string) => void;
  saveContent: (contentId: string) => void;
  addContent: (content: Content) => void;
}

export const useContentStore = create<ContentState>((set, get) => ({
  contents: [],
  featuredContents: [],
  isLoading: false,
  selectedContent: null,
  filters: {
    type: 'all',
    category: 'trending',
  },
  
  setContents: (contents) => set({ contents }),
  setFeaturedContents: (featuredContents) => set({ featuredContents }),
  setLoading: (isLoading) => set({ isLoading }),
  setSelectedContent: (selectedContent) => set({ selectedContent }),
  
  updateFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),
  
  likeContent: (contentId) =>
    set((state) => ({
      contents: state.contents.map((content) =>
        content.id === contentId
          ? {
              ...content,
              isLiked: !content.isLiked,
              likes: content.isLiked ? content.likes - 1 : content.likes + 1,
            }
          : content
      ),
    })),
  
  saveContent: (contentId) =>
    set((state) => ({
      contents: state.contents.map((content) =>
        content.id === contentId
          ? { ...content, isSaved: !content.isSaved }
          : content
      ),
    })),
  
  addContent: (content) =>
    set((state) => ({
      contents: [content, ...state.contents],
    })),
}));