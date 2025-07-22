
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { AnimatedGroup } from '@/components/ui/animated-group';
import { motion } from 'framer-motion';
import { initiatePayment, verifyPayment } from '@/utils/payment';
import { toast } from '@/hooks/use-toast';
import { 
  Check, 
  Crown, 
  Star, 
  Zap, 
  Shield, 
  Users,
  Headphones,
  BarChart3,
  ArrowRight,
  AlertCircle,
  CreditCard
} from 'lucide-react';

const Payment = () => {
  const { user, updateSubscription } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      price: 999,
      originalPrice: 1499,
      period: 'month',
      description: 'Perfect for small teams getting started',
      icon: Zap,
      popular: false,
      features: [
        'Up to 100 tickets/month',
        'Basic reporting',
        'Email support',
        '2 team members',
        'Standard integrations'
      ]
    },
    {
      id: 'professional',
      name: 'Professional',
      price: 2999,
      originalPrice: 4499,
      period: 'month',
      description: 'Ideal for growing businesses',
      icon: Crown,
      popular: true,
      features: [
        'Up to 1000 tickets/month',
        'Advanced reporting & analytics',
        'Priority support',
        '10 team members',
        'Custom integrations',
        'SLA management',
        'Custom workflows'
      ]
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 5999,
      originalPrice: 8999,
      period: 'month',
      description: 'For large organizations with complex needs',
      icon: Shield,
      popular: false,
      features: [
        'Unlimited tickets',
        'Enterprise reporting',
        '24/7 dedicated support',
        'Unlimited team members',
        'Custom integrations & API',
        'Advanced SLA management',
        'Custom branding',
        'SSO & advanced security'
      ]
    }
  ];

  const handlePayment = async (plan: any) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to purchase a plan",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    setSelectedPlan(plan.id);

    try {
      await initiatePayment({
        amount: plan.price * 100, // Convert to paise
        name: "ServiceDesk Pro",
        description: `${plan.name} Plan - Monthly Subscription`,
        handler: async (response: any) => {
          try {
            console.log('Payment Response:', response);
            
            // Verify payment
            const verification = await verifyPayment(
              response.razorpay_payment_id,
              response.order_id,
              response.razorpay_signature
            );

            if (verification.success) {
              // Update user subscription status
              const subscriptionData = {
                planId: plan.id,
                planName: plan.name,
                status: 'active' as const,
                startDate: new Date().toISOString(),
                amount: plan.price,
              };
              
              updateSubscription(subscriptionData);
              
              toast({
                title: "Payment Successful!",
                description: `Welcome to ServiceDesk Pro ${plan.name} plan!`,
              });
              
              // Store subscription details in localStorage as backup
              localStorage.setItem('servicedesk_subscription', JSON.stringify({
                ...subscriptionData,
                paymentId: response.razorpay_payment_id,
                orderId: response.order_id,
                signature: response.razorpay_signature,
              }));
              
              // Redirect to dashboard after successful payment
              setTimeout(() => {
                window.location.href = '/dashboard';
              }, 2000);
            } else {
              throw new Error('Payment verification failed');
            }
          } catch (verificationError) {
            console.error('Payment verification error:', verificationError);
            toast({
              title: "Payment Verification Failed",
              description: "Please contact support for assistance.",
              variant: "destructive",
            });
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
          contact: '',
        },
        theme: {
          color: '#3B82F6'
        }
      });
    } catch (error: any) {
      console.error('Payment Error:', error);
      toast({
        title: "Payment Failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
      setSelectedPlan(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <AnimatedGroup preset="blur-slide">
          {/* Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Star className="h-4 w-4" />
              Limited Time Offer - Save up to 33%
            </motion.div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Choose Your Perfect Plan
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Unlock the full potential of ServiceDesk Pro with features designed 
              to scale with your business needs.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative ${plan.popular ? 'scale-105' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <Card className={`h-full transition-all duration-300 hover:shadow-2xl ${
                  plan.popular 
                    ? 'border-2 border-blue-500 shadow-xl' 
                    : 'border hover:border-gray-300 dark:hover:border-gray-600'
                }`}>
                  <CardHeader className="text-center pb-8">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mx-auto mb-4 ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500' 
                        : 'bg-gray-100 dark:bg-gray-800'
                    }`}>
                      <plan.icon className={`h-8 w-8 ${
                        plan.popular ? 'text-white' : 'text-gray-600 dark:text-gray-300'
                      }`} />
                    </div>
                    <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400">
                      {plan.description}
                    </CardDescription>
                    <div className="mt-4">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <span className="text-4xl font-bold">₹{plan.price}</span>
                        <span className="text-gray-500 dark:text-gray-400">/{plan.period}</span>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                          ₹{plan.originalPrice}
                        </span>
                        <Badge variant="destructive" className="text-xs">
                          Save {Math.round((1 - plan.price / plan.originalPrice) * 100)}%
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <Button
                      className={`w-full mb-6 ${
                        plan.popular 
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700' 
                          : ''
                      }`}
                      size="lg"
                      disabled={isProcessing && selectedPlan === plan.id}
                      onClick={() => handlePayment(plan)}>
                      {isProcessing && selectedPlan === plan.id ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Processing Payment...
                        </>
                      ) : (
                        <>
                          <CreditCard className="mr-2 h-4 w-4" />
                          Pay with Razorpay
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                    
                    <ul className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-3">
                          <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Payment Information */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-3">
              <CreditCard className="h-6 w-6 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  Secure Payment with Razorpay
                </h3>
                <p className="text-blue-700 dark:text-blue-300 mb-4">
                  Your payment is processed securely through Razorpay. We support all major credit cards, debit cards, UPI, and net banking.
                </p>
               
              </div>
            </div>
          </div>

          {/* Notice about payment errors */}
         

          {/* Features Section */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 md:p-12 shadow-lg">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Why Choose ServiceDesk Pro?
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Everything you need to deliver world-class customer support
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Users,
                  title: "Team Collaboration",
                  description: "Work together seamlessly with your team"
                },
                {
                  icon: BarChart3,
                  title: "Advanced Analytics",
                  description: "Insights to improve your support operations"
                },
                {
                  icon: Headphones,
                  title: "24/7 Support",
                  description: "We're here to help you succeed"
                },
                {
                  icon: Shield,
                  title: "Enterprise Security",
                  description: "Bank-level security for your data"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="text-center">
                  <div className="bg-blue-100 dark:bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* FAQ or Additional Info */}
          <div className="text-center mt-16">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Need a custom plan for your enterprise? 
            </p>
            <Button variant="outline" size="lg">
              Contact Sales
            </Button>
          </div>
        </AnimatedGroup>
      </div>
    </div>
  );
};

export default Payment;
