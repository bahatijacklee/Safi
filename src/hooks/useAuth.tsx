import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuthStore } from '@/store/authStore';
import { User, Session } from '@supabase/supabase-js';

export const useAuth = () => {
  const { user, isAuthenticated, login, logout, setLoading } = useAuthStore();

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session: Session | null) => {
        if (session?.user) {
          // Transform Supabase user to our User interface
          const appUser = {
            id: session.user.id,
            name: session.user.email?.split('@')[0] || 'User',
            email: session.user.email || '',
            avatar: session.user.user_metadata?.avatar_url,
            isCreator: false, // Default value, can be updated later
            bio: session.user.user_metadata?.bio,
            socialLinks: session.user.user_metadata?.social_links,
          };
          login(appUser);
        } else {
          logout();
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        const appUser = {
          id: session.user.id,
          name: session.user.email?.split('@')[0] || 'User',
          email: session.user.email || '',
          avatar: session.user.user_metadata?.avatar_url,
          isCreator: false,
          bio: session.user.user_metadata?.bio,
          socialLinks: session.user.user_metadata?.social_links,
        };
        login(appUser);
      }
    });

    return () => subscription.unsubscribe();
  }, [login, logout]);

  const signOut = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error);
    }
    setLoading(false);
  };

  return {
    user,
    isAuthenticated,
    signOut,
    isLoading: useAuthStore(state => state.isLoading),
  };
};