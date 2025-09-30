import { Link } from 'react-router-dom';
import { Twitter, Instagram, Github, Youtube, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const platformLinks = [
    { label: 'Explore', href: '/feed' },
    { label: 'How it Works', href: '#' },
    { label: 'Pricing', href: '#' },
    { label: 'FAQ', href: '#' },
  ];

  const creatorLinks = [
    { label: 'Creator Hub', href: '/dashboard' },
    { label: 'Upload Content', href: '/dashboard' },
    { label: 'Mint NFTs', href: '#' },
    { label: 'Analytics', href: '#' },
  ];

  const supportLinks = [
    { label: 'Help Center', href: '#' },
    { label: 'Contact Us', href: '#' },
    { label: 'Community', href: '#' },
    { label: 'Blog', href: '#' },
  ];

  const legalLinks = [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Cookie Policy', href: '#' },
    { label: 'DMCA', href: '#' },
  ];

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Github, href: '#', label: 'Discord' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ];

  return (
    <footer className="bg-[hsl(25,25%,8%)] text-[hsl(40,30%,95%)] mt-auto">
      <div className="container px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-8">
          {/* Brand Column */}
          <div className="lg:col-span-3">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 rounded-lg safi-hero-gradient flex items-center justify-center">
                <span className="text-xl font-bold text-primary-foreground">S</span>
              </div>
              <span className="text-2xl font-bold font-playfair">Safi</span>
            </Link>
            <p className="text-sm text-[hsl(40,30%,75%)] mb-6 max-w-xs">
              Celebrate African creativity. Connect with artists, discover amazing content, and own what you love.
            </p>
            <div className="flex space-x-2">
              {socialLinks.map((social) => (
                <Button
                  key={social.label}
                  variant="ghost"
                  size="icon"
                  className="hover:bg-[hsl(25,20%,15%)] hover:text-[hsl(45,85%,75%)] rounded-full"
                  asChild
                >
                  <a href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}>
                    <social.icon className="h-5 w-5" />
                  </a>
                </Button>
              ))}
            </div>
          </div>

          {/* Platform Links */}
          <div className="lg:col-span-2">
            <h3 className="font-semibold mb-4 text-[hsl(45,85%,75%)]">Platform</h3>
            <ul className="space-y-3">
              {platformLinks.map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.href}
                    className="text-sm text-[hsl(40,30%,75%)] hover:text-[hsl(45,85%,75%)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Creators Links */}
          <div className="lg:col-span-2">
            <h3 className="font-semibold mb-4 text-[hsl(45,85%,75%)]">For Creators</h3>
            <ul className="space-y-3">
              {creatorLinks.map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.href}
                    className="text-sm text-[hsl(40,30%,75%)] hover:text-[hsl(45,85%,75%)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div className="lg:col-span-2">
            <h3 className="font-semibold mb-4 text-[hsl(45,85%,75%)]">Support</h3>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.href}
                    className="text-sm text-[hsl(40,30%,75%)] hover:text-[hsl(45,85%,75%)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div className="lg:col-span-3">
            <h3 className="font-semibold mb-4 text-[hsl(45,85%,75%)]">Legal</h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.href}
                    className="text-sm text-[hsl(40,30%,75%)] hover:text-[hsl(45,85%,75%)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[hsl(25,15%,20%)] flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-[hsl(40,30%,65%)]">
            © {currentYear} Safi. All rights reserved.
          </p>
          <div className="flex items-center space-x-1 text-sm text-[hsl(40,30%,75%)]">
            <span>Built with</span>
            <Heart className="h-4 w-4 text-[hsl(0,70%,60%)] fill-current" />
            <span>for African creators</span>
            <span className="mx-2">•</span>
            <span className="text-[hsl(40,30%,65%)]">Powered by Hedera</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
