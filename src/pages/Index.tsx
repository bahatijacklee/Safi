import HeroSection from '@/components/HeroSection';
import FeaturedCreators from '@/components/FeaturedCreators';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Zap, Users, Globe, Star, Quote, User } from 'lucide-react';
import AuthModal from '@/components/AuthModal';

const Index = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  
  const features = [
    {
      icon: Shield,
      title: "Blockchain Protection",
      description: "Secure ownership certificates powered by Hedera blockchain technology for your creative works."
    },
    {
      icon: Zap,
      title: "Instant Uploads",
      description: "Upload art, music, and videos instantly with our streamlined creative workflow."
    },
    {
      icon: Users,
      title: "Creative Community",
      description: "Connect with fellow African creators, collaborate, and grow your artistic network."
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Showcase your work to a worldwide audience while celebrating African heritage."
    }
  ];

  const steps = [
    {
      step: "01",
      title: "Create Your Profile",
      description: "Join the Safi community and set up your creator profile to showcase your unique artistic identity."
    },
    {
      step: "02", 
      title: "Upload Your Work",
      description: "Share your art, music, or videos with our easy-to-use upload system and reach your audience."
    },
    {
      step: "03",
      title: "Protect & Monetize",
      description: "Generate blockchain certificates for ownership protection and start earning from your creativity."
    }
  ];

  const testimonials = [
    {
      name: "Amara Okafor",
      role: "Digital Artist",
      avatar: "/src/assets/creator-1.jpg",
      quote: "Safi has revolutionized how I share and protect my digital art. The blockchain certificates give me peace of mind."
    },
    {
      name: "Kwame Asante",
      role: "Music Producer",
      avatar: "/src/assets/creator-2.jpg", 
      quote: "The platform's focus on African creativity is incredible. I've connected with amazing artists across the continent."
    },
    {
      name: "Zara Ndongo",
      role: "Video Creator",
      avatar: "/src/assets/creator-3.jpg",
      quote: "Finally, a platform that understands and celebrates our culture while providing cutting-edge technology."
    }
  ];

  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturedCreators />
      
      {/* Features Section */}
      <motion.section 
        className="py-20 bg-background"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary">Why Choose Safi</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Empowering African Creativity
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience the perfect blend of cultural celebration and cutting-edge technology designed specifically for African creators.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center p-6 h-full hover:shadow-lg safi-transition border-primary/10">
                  <CardContent className="p-0">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                      <feature.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* How It Works Section */}
      <motion.section 
        className="py-20 bg-muted/50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-safi-gold/20 text-safi-bronze">Simple Process</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              How Safi Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get started in just three simple steps and join the growing community of protected African creators.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.step}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-full safi-hero-gradient flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary-foreground">{step.step}</span>
                </div>
                <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section 
        className="py-20 bg-background"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary">Success Stories</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              What Creators Say About Safi
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Hear from the amazing African creators who are already thriving on our platform.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 h-full">
                  <CardContent className="p-0">
                    <Quote className="w-8 h-8 text-primary mb-4" />
                    <p className="text-muted-foreground mb-6 italic">"{testimonial.quote}"</p>
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                        <User className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section 
        className="py-20 safi-hero-gradient"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "2.5K+", label: "Active Creators" },
              { value: "15K+", label: "Artworks Protected" },
              { value: "50K+", label: "Community Members" },
              { value: "98%", label: "Creator Satisfaction" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-3xl md:text-4xl font-bold text-primary-foreground mb-2">
                  {stat.value}
                </div>
                <div className="text-primary-foreground/80">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Final Call to Action Section */}
      <motion.section 
        className="py-20 bg-background"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Protect Your Creative Work?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Join thousands of African creators who are already using Safi to showcase their art and secure their ownership rights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="safi-hero-gradient text-primary-foreground px-8 py-3"
              onClick={() => setAuthModalOpen(true)}
            >
              Start Creating
            </Button>
            <Button size="lg" variant="outline" className="px-8 py-3" asChild>
              <Link to="/feed">Learn More</Link>
            </Button>
          </div>
        </div>
      </motion.section>
      
      <AuthModal 
        isOpen={authModalOpen}
        onOpenChange={setAuthModalOpen}
        defaultTab="signup"
      />
      
      <Footer />
    </div>
  );
};

export default Index;
