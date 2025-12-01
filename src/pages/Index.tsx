import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import UserTypeSelection from "@/components/registration/UserTypeSelection";
import { 
  Search, 
  Users, 
  Calendar, 
  BarChart3, 
  ArrowRight, 
  CheckCircle, 
  Star,
  MapPin,
  Clock,
  Sparkles
} from "lucide-react";

const Index = () => {
  const [showUserTypeModal, setShowUserTypeModal] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-secondary">
      {/* Navigation */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-8 h-8 text-primary" />
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Beauty Book
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <input 
                  type="text" 
                  placeholder="Search salons..." 
                  className="w-full pl-10 pr-4 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
            <Button 
              className="bg-gradient-primary hover:opacity-90"
              onClick={() => setShowUserTypeModal(true)}
            >
              Sign In
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-16 pb-24 text-center">
        <Badge className="mb-6 bg-accent/20 text-accent-foreground border-accent/30">
          <Star className="w-3 h-3 mr-1" />
          Trusted by 2,500+ Salons
        </Badge>
        
        <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-tight">
          <span className="bg-gradient-primary bg-clip-text text-transparent">
            Discover & Book
          </span>
          <br />
          <span className="text-foreground">Your Beauty Experience</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
          Connect with the best beauty salons and professionals in your area. Book appointments, 
          discover new services, and grow your business - all in one beautiful platform.
        </p>

        {/* Main Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-6 h-6" />
            <input 
              type="text" 
              placeholder="Search for salons, services, or locations..." 
              className="w-full pl-14 pr-6 py-6 text-lg border border-input rounded-2xl bg-background/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary shadow-soft"
            />
            <Button className="absolute right-2 top-2 bg-gradient-primary hover:opacity-90 h-12 px-6">
              Search
            </Button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Button 
            size="lg" 
            className="bg-gradient-primary hover:opacity-90 text-primary-foreground px-8 py-4 text-lg h-14 min-w-[200px]"
            onClick={() => setShowUserTypeModal(true)}
          >
            Join Beauty Book
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <Link to="/salons">
            <Button variant="outline" size="lg" className="px-8 py-4 text-lg h-14 min-w-[200px]">
              Explore Salons
            </Button>
          </Link>
        </div>

        {/* Social Proof */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">2,500+</div>
            <div className="text-muted-foreground">Active Salons</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">150K+</div>
            <div className="text-muted-foreground">Monthly Bookings</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">4.9★</div>
            <div className="text-muted-foreground">Customer Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">50+</div>
            <div className="text-muted-foreground">Cities Covered</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Everything You Need to <span className="bg-gradient-primary bg-clip-text text-transparent">Scale</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From appointment booking to business analytics, we've got every aspect of your salon business covered.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="bg-card border-0 shadow-medium hover:shadow-strong transition-all duration-300 group">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Smart Salon Management</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Comprehensive salon profiles with service management, staff scheduling, and real-time availability tracking.
              </p>
              <ul className="text-left space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-primary mr-2" />
                  <span className="text-sm">Service & pricing management</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-primary mr-2" />
                  <span className="text-sm">Staff & schedule coordination</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-primary mr-2" />
                  <span className="text-sm">Customer profile management</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="bg-card border-0 shadow-medium hover:shadow-strong transition-all duration-300 group">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Calendar className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Advanced Booking System</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Streamlined appointment scheduling with automated reminders, waitlist management, and mobile optimization.
              </p>
              <ul className="text-left space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-primary mr-2" />
                  <span className="text-sm">Real-time availability sync</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-primary mr-2" />
                  <span className="text-sm">Automated SMS & email reminders</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-primary mr-2" />
                  <span className="text-sm">Waitlist & cancellation management</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="bg-card border-0 shadow-medium hover:shadow-strong transition-all duration-300 group">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <BarChart3 className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Business Analytics</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Detailed insights and performance metrics to help you make data-driven decisions and grow your business.
              </p>
              <ul className="text-left space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-primary mr-2" />
                  <span className="text-sm">Revenue & booking analytics</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-primary mr-2" />
                  <span className="text-sm">Customer retention insights</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-primary mr-2" />
                  <span className="text-sm">Performance benchmarking</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-4 py-24 bg-gradient-accent">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Get Started in <span className="bg-gradient-primary bg-clip-text text-transparent">3 Simple Steps</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From registration to your first booking - we'll have you up and running in minutes.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl font-bold text-primary-foreground">1</span>
            </div>
            <h3 className="text-xl font-bold mb-4">Register Your Salon</h3>
            <p className="text-muted-foreground">
              Complete our simple registration form with your salon details and services.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl font-bold text-primary-foreground">2</span>
            </div>
            <h3 className="text-xl font-bold mb-4">Get Verified</h3>
            <p className="text-muted-foreground">
              Our team reviews your registration within 24-48 hours for quality assurance.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl font-bold text-primary-foreground">3</span>
            </div>
            <h3 className="text-xl font-bold mb-4">Start Growing</h3>
            <p className="text-muted-foreground">
              Access your dashboard and start managing bookings, customers, and business insights.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-24 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to <span className="bg-gradient-primary bg-clip-text text-transparent">Transform</span> Your Salon?
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Join thousands of successful salons already using SalonCRM to streamline their operations and grow their business.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/register">
              <Button size="lg" className="bg-gradient-primary hover:opacity-90 text-primary-foreground px-8 py-4 text-lg h-14 min-w-[250px]">
                Start Your Free Trial
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <p className="text-sm text-muted-foreground">
              <Clock className="w-4 h-4 inline mr-1" />
              Get approved in 24-48 hours
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Sparkles className="w-6 h-6 text-primary" />
                <span className="text-lg font-bold">Beauty Book</span>
              </div>
              <p className="text-muted-foreground">
                Your gateway to the perfect beauty experience.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link to="/salons" className="hover:text-foreground transition-colors">Browse Salons</Link></li>
                <li><Link to="/register" className="hover:text-foreground transition-colors">Register Salon</Link></li>
                <li><Link to="/pricing" className="hover:text-foreground transition-colors">Pricing</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link to="/help" className="hover:text-foreground transition-colors">Help Center</Link></li>
                <li><Link to="/contact" className="hover:text-foreground transition-colors">Contact Us</Link></li>
                <li><Link to="/api" className="hover:text-foreground transition-colors">API Docs</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link to="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 Beauty Book. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <UserTypeSelection 
        open={showUserTypeModal} 
        onOpenChange={setShowUserTypeModal} 
      />
    </div>
  );
};

export default Index;
