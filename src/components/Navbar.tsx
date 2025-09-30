import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  Home, 
  Compass, 
  Plus, 
  User, 
  Wallet, 
  LogOut,
  Bell,
  Search
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useWalletStore } from '@/store/walletStore';
import { useAuth } from '@/hooks/useAuth';
import { motion } from 'framer-motion';
import AuthModal from '@/components/AuthModal';

export default function Navbar() {
  const location = useLocation();
  const { user, isAuthenticated } = useAuthStore();
  const { isConnected, address, connect, disconnect, isConnecting } = useWalletStore();
  const { signOut } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'signin' | 'signup'>('signin');

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/feed', label: 'Explore', icon: Compass },
    { path: '/dashboard', label: 'Create', icon: Plus, requiresAuth: true },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleWalletAction = () => {
    if (isConnected) {
      disconnect();
    } else {
      connect();
    }
  };

  const handleAuthClick = (tab: 'signin' | 'signup') => {
    setAuthModalTab(tab);
    setAuthModalOpen(true);
  };

  return (
    <motion.header 
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg safi-hero-gradient">
            <span className="font-bold text-primary-foreground">S</span>
          </div>
          <span className="text-xl font-bold gradient-text">Safi</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => {
            if (item.requiresAuth && !isAuthenticated) return null;
            
            return (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={isActive(item.path) ? "default" : "ghost"}
                  size="sm"
                  className="safi-transition"
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Button>
              </Link>
            );
          })}
        </nav>

        {/* Right side actions */}
        <div className="flex items-center space-x-3">
          {/* Search */}
          <Button variant="ghost" size="sm" className="hidden md:flex">
            <Search className="h-4 w-4" />
          </Button>

          {/* Notifications */}
          {isAuthenticated && (
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-4 w-4" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 text-xs" variant="destructive">
                3
              </Badge>
            </Button>
          )}

          {/* Wallet Connection */}
          <Button
            onClick={handleWalletAction}
            variant={isConnected ? "secondary" : "outline"}
            size="sm"
            disabled={isConnecting}
            className="safi-transition"
          >
            <Wallet className="mr-2 h-4 w-4" />
            {isConnecting ? 'Connecting...' : isConnected ? address?.slice(0, 6) + '...' : 'Connect'}
          </Button>

          {/* Auth Actions */}
          {isAuthenticated ? (
            <div className="flex items-center space-x-2">
              <Link to={`/profile/${user?.id}`}>
                <Avatar className="h-8 w-8 cursor-pointer ring-2 ring-primary/20 hover:ring-primary/40 safi-transition">
                  <AvatarImage src={user?.avatar} alt={user?.name} />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {user?.name?.[0]?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Link>
              
              <Button
                onClick={signOut}
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => handleAuthClick('signin')}
              >
                Login
              </Button>
              <Button 
                size="sm" 
                className="safi-hero-gradient text-primary-foreground"
                onClick={() => handleAuthClick('signup')}
              >
                Join Safi
              </Button>
            </div>
          )}
        </div>
      </div>
      
      <AuthModal 
        isOpen={authModalOpen}
        onOpenChange={setAuthModalOpen}
        defaultTab={authModalTab}
      />
    </motion.header>
  );
}