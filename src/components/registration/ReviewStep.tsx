import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Building2, MapPin, Phone, Mail, CheckCircle, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface ReviewData {
  agreeToTerms: boolean;
  agreeToMarketing: boolean;
}

interface AllRegistrationData {
  salonName: string;
  contactName: string;
  email: string;
  phone: string;
  isIndividualStylist: boolean;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  categories: string[];
}

interface ReviewStepProps {
  reviewData: ReviewData;
  registrationData: AllRegistrationData;
  onReviewDataChange: (data: Partial<ReviewData>) => void;
  onSubmit: () => void;
  onBack: () => void;
  isSubmitting?: boolean;
}

const serviceCategories = [
  { id: "hair", label: "Hair Services" },
  { id: "nails", label: "Nail Services" },
  { id: "skincare", label: "Skincare" },
  { id: "makeup", label: "Makeup" },
  { id: "barber", label: "Barber Services" },
  { id: "wellness", label: "Wellness" }
];

export const ReviewStep = ({ 
  reviewData, 
  registrationData, 
  onReviewDataChange, 
  onSubmit, 
  onBack,
  isSubmitting = false 
}: ReviewStepProps) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!reviewData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the Terms of Service to continue";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit();
    }
  };

  const fullAddress = `${registrationData.address}, ${registrationData.city}, ${registrationData.state} ${registrationData.zipCode}`;
  const selectedCategories = registrationData.categories.map(catId => 
    serviceCategories.find(cat => cat.id === catId)?.label
  ).filter(Boolean);

  return (
    <Card className="w-full">
      <CardContent className="p-8">
        <div className="space-y-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Review & Submit</h2>
            <p className="text-muted-foreground">
              Please review your information carefully before submitting your registration.
            </p>
          </div>

          {/* Registration Summary */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold flex items-center">
              <CheckCircle className="w-5 h-5 text-primary mr-2" />
              Registration Summary
            </h3>

            {/* Basic Information */}
            <div className="bg-muted/30 rounded-lg p-6 space-y-4">
              <div className="flex items-center space-x-2 mb-3">
                <Building2 className="w-4 h-4 text-primary" />
                <h4 className="font-semibold">Salon Information</h4>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-muted-foreground">
                    {registrationData.isIndividualStylist ? "Professional Name" : "Salon Name"}
                  </Label>
                  <p className="font-medium">{registrationData.salonName}</p>
                </div>

                {!registrationData.isIndividualStylist && (
                  <div>
                    <Label className="text-sm text-muted-foreground">Contact Name</Label>
                    <p className="font-medium">{registrationData.contactName}</p>
                  </div>
                )}

                <div>
                  <Label className="text-sm text-muted-foreground">Email</Label>
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <p className="font-medium">{registrationData.email}</p>
                    <Badge className="bg-green-500/10 text-green-600 text-xs">Verified</Badge>
                  </div>
                </div>

                <div>
                  <Label className="text-sm text-muted-foreground">Phone</Label>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <p className="font-medium">{registrationData.phone}</p>
                    <Badge className="bg-green-500/10 text-green-600 text-xs">Verified</Badge>
                  </div>
                </div>
              </div>

              {registrationData.isIndividualStylist && (
                <div className="mt-4">
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    Individual Stylist
                  </Badge>
                </div>
              )}
            </div>

            {/* Location Information */}
            <div className="bg-muted/30 rounded-lg p-6 space-y-4">
              <div className="flex items-center space-x-2 mb-3">
                <MapPin className="w-4 h-4 text-primary" />
                <h4 className="font-semibold">Location</h4>
              </div>

              <div>
                <Label className="text-sm text-muted-foreground">Address</Label>
                <p className="font-medium">{fullAddress}</p>
              </div>
            </div>

            {/* Services Information */}
            <div className="bg-muted/30 rounded-lg p-6 space-y-4">
              <div className="flex items-center space-x-2 mb-3">
                <CheckCircle className="w-4 h-4 text-primary" />
                <h4 className="font-semibold">Service Categories</h4>
              </div>

              <div className="flex flex-wrap gap-2">
                {selectedCategories.map((category, index) => (
                  <Badge key={index} variant="secondary" className="bg-primary/10 text-primary">
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <Separator />

          {/* Next Steps Information */}
          <div className="bg-gradient-accent rounded-lg p-6">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <h4 className="font-semibold text-primary mb-2">What Happens Next?</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>✓ Your registration will be reviewed by our team within 24-48 hours</p>
                  <p>✓ We'll verify your salon information and ensure quality standards</p>
                  <p>✓ Once approved, you'll receive an email with access to your dashboard</p>
                  <p>✓ You can then start managing services, bookings, and customer relationships</p>
                </div>
              </div>
            </div>
          </div>

          {/* Terms and Agreements */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="terms"
                  checked={reviewData.agreeToTerms}
                  onCheckedChange={(checked) => onReviewDataChange({ agreeToTerms: checked as boolean })}
                  className="mt-1"
                />
                <div className="flex-1">
                  <Label htmlFor="terms" className="text-sm font-medium leading-relaxed">
                    I agree to the{" "}
                    <Link to="/terms" className="text-primary hover:underline" target="_blank">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link to="/privacy" className="text-primary hover:underline" target="_blank">
                      Privacy Policy
                    </Link>
                    {" "}*
                  </Label>
                  {errors.agreeToTerms && (
                    <p className="text-sm text-destructive mt-1">{errors.agreeToTerms}</p>
                  )}
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="marketing"
                  checked={reviewData.agreeToMarketing}
                  onCheckedChange={(checked) => onReviewDataChange({ agreeToMarketing: checked as boolean })}
                  className="mt-1"
                />
                <Label htmlFor="marketing" className="text-sm leading-relaxed">
                  I would like to receive updates about new features, salon success stories, 
                  and special offers via email (optional)
                </Label>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              <Button type="button" variant="outline" onClick={onBack} disabled={isSubmitting}>
                Back
              </Button>
              <Button 
                type="submit" 
                className="bg-gradient-primary hover:opacity-90 min-w-[150px]"
                disabled={!reviewData.agreeToTerms || isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                    <span>Submitting...</span>
                  </div>
                ) : (
                  "Submit Registration"
                )}
              </Button>
            </div>
          </form>
        </div>
      </CardContent>
    </Card>
  );
};