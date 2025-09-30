import { motion } from 'framer-motion';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Sparkles, Users, Award } from 'lucide-react';
import ThreeJSHero from './ThreeJSHero';
import { Link } from 'react-router-dom';
import AuthModal from '@/components/AuthModal';

export default function HeroSection() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  
  const stats = [
    { label: 'Active Creators', value: '2.5K+', icon: Users },
    { label: 'Artworks Protected', value: '15K+', icon: Award },
    { label: 'Community Members', value: '50K+', icon: Sparkles },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <ThreeJSHero />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/60 to-background/90" />
      
      {/* Content */}
      <div className="relative z-10 container px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Hero Badge */}
          <motion.div
            className="inline-flex items-center rounded-full border px-4 py-2 text-sm mb-6 bg-background/50 backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="mr-2 h-4 w-4 text-primary" />
            Celebrating African Creativity
            <Badge className="ml-2 bg-safi-gold/20 text-safi-bronze">New</Badge>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <span className="gradient-text">Celebrate</span>
            <br />
            <span>African Creativity.</span>
            <br />
            <span className="text-primary">Own What You Love.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Discover amazing art, music, and videos from talented African creators. 
            Support artists and protect their work with blockchain-powered ownership certificates.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Link to="/feed">
              <Button 
                size="lg" 
                className="safi-hero-gradient text-primary-foreground px-8 py-3 text-base font-semibold safi-bounce hover:safi-shadow-glow"
              >
                Explore Art
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="px-8 py-3 text-base font-semibold border-primary/20 hover:bg-primary/5"
              onClick={() => setAuthModalOpen(true)}
            >
              Join as Creator
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="flex flex-col sm:flex-row justify-center items-center gap-8 sm:gap-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="p-2 rounded-lg bg-primary/10">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-primary">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2" />
        </div>
      </motion.div>
      
      <AuthModal 
        isOpen={authModalOpen}
        onOpenChange={setAuthModalOpen}
        defaultTab="signup"
      />
    </section>
  );
}