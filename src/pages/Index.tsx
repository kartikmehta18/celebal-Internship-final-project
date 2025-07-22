import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { AnimatedGroup } from "@/components/ui/animated-group";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Ticket,
  Clock,
  Users,
  Shield,
  Zap,
  Globe,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import { FeatureCard } from "@/components/ui/grid-feature-cards";
import { StaggerTestimonials } from "@/components/ui/stagger-testimonials";
import { BeamsBackground } from "@/components/ui/beams-background";
import { Footer } from "@/components/ui/footer";
const transitionVariants = {
  item: {
    hidden: {
      opacity: 0,
      filter: "blur(12px)",
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        type: "spring" as const,
        bounce: 0.3,
        duration: 1.5,
      },
    },
  },
};
type ViewAnimationProps = {
  delay?: number;
  className?: React.ComponentProps<typeof motion.div>["className"];
  children: React.ReactNode;
};
function AnimatedContainer({
  className,
  delay = 0.1,
  children,
}: ViewAnimationProps) {
  const shouldReduceMotion = useReducedMotion();
  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }
  return (
    <motion.div
      initial={{
        filter: "blur(4px)",
        translateY: -8,
        opacity: 0,
      }}
      whileInView={{
        filter: "blur(0px)",
        translateY: 0,
        opacity: 1,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        delay,
        duration: 0.8,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
const Index = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const features = [
    {
      icon: Ticket,
      title: "Smart Ticket Management",
      description:
        "Create, track, and manage support tickets with intelligent categorization and priority assignment.",
    },
    {
      icon: Clock,
      title: "Real-time Updates",
      description:
        "Get instant notifications about ticket status changes and responses from our support team.",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description:
        "Enable seamless collaboration between users and support agents with internal comments and notes.",
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description:
        "Enterprise-grade security with role-based access control and data encryption.",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description:
        "Optimized performance ensures quick response times and smooth user experience.",
    },
    {
      icon: Globe,
      title: "Global Support",
      description:
        "24/7 support across multiple time zones with multilingual assistance.",
    },
  ];
  return (
    <div className="min-h-screen overflow-hidden">
      <main className="overflow-hidden">
        {/* Hero Section with BeamsBackground */}
        <section className="relative">
          <div className="absolute inset-0 z-0">
            <BeamsBackground intensity="medium" />
          </div>

          <div className="relative z-10 pt-24 md:pt-36">
            <div className="mx-auto max-w-7xl px-6">
              <div className="text-center sm:mx-auto lg:mr-auto lg:mt-0">
                <AnimatedGroup variants={transitionVariants}>
                  <Link
                    to={isAuthenticated ? "/dashboard" : "/register"}
                    className="hover:bg-background dark:hover:border-t-border bg-muted group mx-auto flex w-fit items-center gap-4 rounded-full border p-1 pl-4 shadow-md shadow-black/5 transition-all duration-300 dark:border-t-white/5 dark:shadow-zinc-950"
                  >
                    <span className="text-foreground text-sm">
                      World-Class Service Desk Platform
                    </span>
                    <span className="dark:border-background block h-4 w-0.5 border-l bg-white dark:bg-zinc-700"></span>
                    <div className="bg-background group-hover:bg-muted size-6 overflow-hidden rounded-full duration-500">
                      <div className="flex w-12 -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0">
                        <span className="flex size-6">
                          <ArrowRight className="m-auto size-3" />
                        </span>
                        <span className="flex size-6">
                          <ArrowRight className="m-auto size-3" />
                        </span>
                      </div>
                    </div>
                  </Link>

                  <h1 className="mt-8 max-w-4xl mx-auto text-balance text-6xl md:text-7xl lg:mt-16 xl:text-[5.25rem]">
                    Modern Solutions for Customer Engagement
                  </h1>
                  <p className="mx-auto mt-8 max-w-2xl text-balance text-lg">
                    Streamline your support operations with our intelligent
                    ticket management system. Built for modern teams who demand
                    excellence.
                  </p>
                </AnimatedGroup>

                <AnimatedGroup
                  variants={{
                    container: {
                      visible: {
                        transition: {
                          staggerChildren: 0.05,
                          delayChildren: 0.75,
                        },
                      },
                    },
                    item: {
                      hidden: {
                        opacity: 0,
                        filter: "blur(12px)",
                        y: 12,
                      },
                      visible: {
                        opacity: 1,
                        filter: "blur(0px)",
                        y: 0,
                        transition: {
                          type: "spring" as const,
                          bounce: 0.3,
                          duration: 1.5,
                        },
                      },
                    },
                  }}
                  className="mt-12 flex flex-col items-center justify-center gap-2 md:flex-row"
                >
                  <div className="bg-foreground/10 rounded-[14px] border p-0.5">
                    <Button
                      size="lg"
                      className="rounded-xl px-5 text-base"
                      onClick={() =>
                        navigate(isAuthenticated ? "/dashboard" : "/register")
                      }
                    >
                      <span className="text-nowrap">
                        {isAuthenticated ? "Go to Dashboard" : "Start Building"}
                      </span>
                    </Button>
                  </div>
                  <Button
                    size="lg"
                    variant="ghost"
                    onClick={() => navigate("/payment")}
                    className="h-10.5 rounded-xl px-5 mx-[2px]"
                  >
                    <span className="text-nowrap">View Plans</span>
                  </Button>
                </AnimatedGroup>
              </div>
            </div>

            {/* Dashboard Preview */}
            <AnimatedGroup
              variants={{
                container: {
                  visible: {
                    transition: {
                      staggerChildren: 0.05,
                      delayChildren: 0.75,
                    },
                  },
                },
                item: {
                  hidden: {
                    opacity: 0,
                    filter: "blur(12px)",
                    y: 12,
                  },
                  visible: {
                    opacity: 1,
                    filter: "blur(0px)",
                    y: 0,
                    transition: {
                      type: "spring" as const,
                      bounce: 0.3,
                      duration: 1.5,
                    },
                  },
                },
              }}
            >
              <div className="relative -mr-56 mt-8 overflow-hidden px-2 sm:mr-0 sm:mt-12 md:mt-20">
                <div
                  aria-hidden
                  className="bg-gradient-to-b to-background absolute inset-0 z-10 from-transparent from-35%"
                />
                <div className="inset-shadow-2xs ring-background dark:inset-shadow-white/20 bg-background relative mx-auto max-w-6xl overflow-hidden rounded-2xl border p-4 shadow-lg shadow-zinc-950/15 ring-1">
                  <img
                    className="bg-background aspect-15/8 relative hidden rounded-2xl dark:block"
                    src="/image.png"
                    alt="dashboard preview"
                    width="2700"
                    height="1440"
                  />
                  <img
                    className="z-2 border-border/25 aspect-15/8 relative rounded-2xl border dark:hidden "
                    src="/image.png"
                    alt="dashboard preview"
                    width="2700"
                    height="1440"
                  />
                </div>
              </div>
            </AnimatedGroup>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-32">
          <div className="mx-auto w-full max-w-5xl space-y-8 px-4">
            <AnimatedContainer className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-wide text-balance md:text-4xl lg:text-5xl xl:font-extrabold">
                Powerful Features for Modern Support Teams
              </h2>
              <p className="text-muted-foreground mt-4 text-sm tracking-wide text-balance md:text-base">
                Everything you need to deliver exceptional customer support and
                streamline your operations.
              </p>
            </AnimatedContainer>

            <AnimatedContainer
              delay={0.4}
              className="grid grid-cols-1 divide-x divide-y divide-dashed border border-dashed sm:grid-cols-2 md:grid-cols-3"
            >
              {features.map((feature, i) => (
                <FeatureCard key={i} feature={feature} />
              ))}
            </AnimatedContainer>
          </div>
        </section>

        {/* Trusted By Section */}
        <section className="bg-background pb-16 pt-16 md:pb-32">
          <div className="group relative m-auto max-w-5xl px-6">
            <div className="absolute inset-0 z-10 flex scale-95 items-center justify-center opacity-0 duration-500 group-hover:scale-100 group-hover:opacity-100">
              <Link
                to="/register"
                className="block text-sm duration-150 hover:opacity-75"
              >
                <span>Join Our Customers</span>
                <ChevronRight className="ml-1 inline-block size-3" />
              </Link>
            </div>
            <div className="group-hover:blur-xs mx-auto mt-12 grid max-w-2xl grid-cols-4 gap-x-12 gap-y-8 transition-all duration-500 group-hover:opacity-50 sm:gap-x-16 sm:gap-y-14">
              {[
                "https://html.tailus.io/blocks/customers/nvidia.svg",
                "https://html.tailus.io/blocks/customers/column.svg",
                "https://html.tailus.io/blocks/customers/github.svg",
                "https://html.tailus.io/blocks/customers/nike.svg",
                "https://html.tailus.io/blocks/customers/lemonsqueezy.svg",
                "https://html.tailus.io/blocks/customers/laravel.svg",
                "https://html.tailus.io/blocks/customers/lilly.svg",
                "https://html.tailus.io/blocks/customers/openai.svg",
              ].map((logo, index) => (
                <div key={index} className="flex">
                  <img
                    className="mx-auto h-5 w-fit dark:invert"
                    src={logo}
                    alt={`Company ${index + 1}`}
                    height="20"
                    width="auto"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedGroup preset="scale">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                    99.9%
                  </div>
                  <div className="text-muted-foreground font-medium">
                    Uptime
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-purple-600 mb-2">
                    10K+
                  </div>
                  <div className="text-muted-foreground font-medium">
                    Happy Customers
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-indigo-600 mb-2">
                    24/7
                  </div>
                  <div className="text-muted-foreground font-medium">
                    Support
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-green-600 mb-2">
                    2min
                  </div>
                  <div className="text-muted-foreground font-medium">
                    Avg Response
                  </div>
                </div>
              </div>
            </AnimatedGroup>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Loved by Teams Worldwide
              </h2>
              <p className="text-xl text-muted-foreground">
                See what our customers have to say about their experience.
              </p>
            </div>
            <StaggerTestimonials />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <AnimatedGroup preset="slide">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Transform Your Support Experience?
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Join thousands of teams who trust ServiceDesk Pro for their
                support operations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-semibold"
                  onClick={() => navigate("/register")}
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                {/* <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold">
                    Schedule Demo
                  </Button> */}
              </div>
            </AnimatedGroup>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};
export default Index;
