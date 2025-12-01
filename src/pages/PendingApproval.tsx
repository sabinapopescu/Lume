import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, Mail, Phone, ArrowRight, Home } from "lucide-react";

const PendingApproval = () => {
  return (
    <div className="min-h-screen bg-gradient-secondary">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold mb-4">
              Registration <span className="bg-gradient-primary bg-clip-text text-transparent">Submitted!</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Thank you for choosing SalonCRM. Your registration is now under review.
            </p>
          </div>

          {/* Status Card */}
          <Card className="mb-8 shadow-medium">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-primary" />
                    <h2 className="text-xl font-semibold">Application Status</h2>
                  </div>
                  <Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-200">
                    Under Review
                  </Badge>
                </div>

                <div className="bg-muted/30 rounded-lg p-6">
                  <h3 className="font-semibold mb-3">What's Happening Now:</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm">Registration received and verified</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                      <span className="text-sm">Quality review in progress</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 rounded-full border-2 border-muted" />
                      <span className="text-sm text-muted-foreground">Final approval and dashboard access</span>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-primary/5 rounded-lg">
                    <Clock className="w-6 h-6 text-primary mx-auto mb-2" />
                    <p className="font-semibold">Review Time</p>
                    <p className="text-sm text-muted-foreground">24-48 hours</p>
                  </div>
                  <div className="text-center p-4 bg-primary/5 rounded-lg">
                    <Mail className="w-6 h-6 text-primary mx-auto mb-2" />
                    <p className="font-semibold">Notification</p>
                    <p className="text-sm text-muted-foreground">Via email</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="mb-8 shadow-medium">
            <CardContent className="p-8">
              <h2 className="text-xl font-semibold mb-6">While You Wait...</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-4 p-4 bg-muted/30 rounded-lg">
                  <Phone className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-semibold mb-1">Prepare Your Team</h3>
                    <p className="text-sm text-muted-foreground">
                      Let your staff know about the new system and consider who will manage the account initially.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-muted/30 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-semibold mb-1">Plan Your Services</h3>
                    <p className="text-sm text-muted-foreground">
                      Think about the services you want to offer and their pricing. You'll be able to add these once approved.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-muted/30 rounded-lg">
                  <Mail className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-semibold mb-1">Watch Your Email</h3>
                    <p className="text-sm text-muted-foreground">
                      We'll send you a detailed email with next steps once your salon is approved.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* FAQ Section */}
          <Card className="mb-8 shadow-medium">
            <CardContent className="p-8">
              <h2 className="text-xl font-semibold mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Why do you review registrations?</h3>
                  <p className="text-sm text-muted-foreground">
                    We review all registrations to ensure the quality and authenticity of salons on our platform, 
                    which helps maintain trust and safety for all users.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">What if my registration is rejected?</h3>
                  <p className="text-sm text-muted-foreground">
                    If there are any issues, we'll email you with specific feedback and give you the opportunity 
                    to address any concerns and resubmit your application.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Can I make changes to my registration?</h3>
                  <p className="text-sm text-muted-foreground">
                    Once submitted, you'll need to wait for the approval process to complete. After approval, 
                    you can update most information through your dashboard.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button variant="outline" className="min-w-[200px]">
                <Home className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <Link to="/salons">
              <Button className="bg-gradient-primary hover:opacity-90 min-w-[200px]">
                Browse Salons
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          {/* Contact Support */}
          <div className="text-center mt-8 p-6 bg-muted/30 rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">
              Have questions about your registration?
            </p>
            <Button variant="ghost" className="text-primary hover:text-primary/80">
              Contact Support
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingApproval;