
"use client";

import React, { FormEvent, useRef, useState } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export function Footer() {
  const [email, setEmail] = useState('');
  const { toast } = useToast();
  const ref = useRef(null);
  const isInView = useInView(ref);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Newsletter Subscription",
        description: "Thank you for subscribing to our newsletter!",
      });
      setEmail('');
    }
  };

  // Animation variants
  const variants: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
        staggerChildren: 0.1,
        delayChildren: 0.1,
      }
    },
    hidden: { opacity: 0, y: 20 },
  };

  const itemVariants: Variants = {
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
        delay: i * 0.1,
      }
    }),
    hidden: { opacity: 0, y: 20 },
  };

  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Information */}
          <motion.div 
            className="space-y-4"
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={0}
            variants={itemVariants}
          >
            <h3 className="text-xl font-bold">ServiceDesk Pro</h3>
            <p className="text-muted-foreground">
              Modern solutions for customer engagement and support operations.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div 
            className="space-y-4"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={1}
            variants={itemVariants}
          >
            <h3 className="text-xl font-bold">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">Home</Link></li>
              <li><Link to="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">Dashboard</Link></li>
              <li><Link to="/create-ticket" className="text-muted-foreground hover:text-foreground transition-colors">Create Ticket</Link></li>
              <li><Link to="/payment" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</Link></li>
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div 
            className="space-y-4"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={2}
            variants={itemVariants}
          >
            <h3 className="text-xl font-bold">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Documentation</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">API Reference</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Blog</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Support</a></li>
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div 
            className="space-y-4"
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            custom={3}
            variants={itemVariants}
          >
            <h3 className="text-xl font-bold">Stay Updated</h3>
            <p className="text-muted-foreground">
              Subscribe to our newsletter for the latest updates and news.
            </p>
            <form onSubmit={handleSubmit} className="space-y-2">
              <div className="flex gap-2">
                <Input 
                  type="email" 
                  placeholder="Your email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1" 
                  required
                />
                <Button type="submit" size="icon">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
        
        {/* Logo Animation */}
        <motion.div 
          className="mt-16 pt-8 border-t border-border"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={variants}
        >
          <div className="flex justify-center mb-8 ">
            <motion.div 
              className="text-4xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white/50 to-white"
              variants={{
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8 }
                },
                hidden: {
                  opacity: 0,
                  y: 20
                }
              }}
            >
              ServiceDesk Pro
            </motion.div>
          </div>
        </motion.div>
        
        {/* Copyright and Legal */}
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>© 2025 ServiceDesk Pro. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="https://github.com/Kartikmehta18" target='__blank' className=" text-blue-600 hover:text-foreground transition-colors">Developed with ❤️ & ☕ Kartikmehta18 </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
