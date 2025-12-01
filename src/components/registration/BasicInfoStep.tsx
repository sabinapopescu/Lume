import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { User, Mail, Phone, Lock, Eye, EyeOff, Building2 } from "lucide-react";

interface BasicInfoData {
  salonName: string;
  contactName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  isIndividualStylist: boolean;
}

interface BasicInfoStepProps {
  data: BasicInfoData;
  onDataChange: (data: Partial<BasicInfoData>) => void;
  onNext: () => void;
  onBack?: () => void;
}

export const BasicInfoStep = ({ data, onDataChange, onNext, onBack }: BasicInfoStepProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!data.salonName.trim()) {
      newErrors.salonName = "Salon name is required";
    }

    if (!data.isIndividualStylist && !data.contactName.trim()) {
      newErrors.contactName = "Contact name is required";
    }

    if (!data.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!data.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!data.password) {
      newErrors.password = "Password is required";
    } else if (data.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (data.password !== data.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onNext();
    }
  };

  const handleIndividualStylistChange = (checked: boolean) => {
    onDataChange({ 
      isIndividualStylist: checked,
      // Auto-fill contact name with salon name for individual stylists
      contactName: checked ? data.salonName : data.contactName
    });
  };

  return (
    <Card className="w-full">
      <CardContent className="p-8">
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Tell Us About Your Salon</h2>
            <p className="text-muted-foreground">
              Let's start with the basics - this helps us create your perfect salon profile.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Individual Stylist Toggle */}
            <div className="flex items-center space-x-3 p-4 bg-accent/30 rounded-lg">
              <Checkbox
                id="individualStylist"
                checked={data.isIndividualStylist}
                onCheckedChange={handleIndividualStylistChange}
              />
              <div>
                <Label htmlFor="individualStylist" className="text-sm font-medium">
                  I'm an individual stylist or one-person salon
                </Label>
                <p className="text-xs text-muted-foreground mt-1">
                  Check this if you work independently or run a solo practice
                </p>
              </div>
            </div>

            {/* Salon Name */}
            <div className="space-y-2">
              <Label htmlFor="salonName" className="text-sm font-medium">
                {data.isIndividualStylist ? "Your Professional Name" : "Salon Name"} *
              </Label>
              <div className="relative">
                <Building2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="salonName"
                  placeholder={data.isIndividualStylist ? "e.g., Sarah's Hair Studio" : "e.g., Glamour Beauty Salon"}
                  value={data.salonName}
                  onChange={(e) => onDataChange({ salonName: e.target.value })}
                  className={`pl-10 ${errors.salonName ? 'border-destructive' : ''}`}
                />
              </div>
              {errors.salonName && (
                <p className="text-sm text-destructive">{errors.salonName}</p>
              )}
            </div>

            {/* Contact Name - Hidden for individual stylists */}
            {!data.isIndividualStylist && (
              <div className="space-y-2">
                <Label htmlFor="contactName" className="text-sm font-medium">
                  Business Contact Name *
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="contactName"
                    placeholder="e.g., John Smith"
                    value={data.contactName}
                    onChange={(e) => onDataChange({ contactName: e.target.value })}
                    className={`pl-10 ${errors.contactName ? 'border-destructive' : ''}`}
                  />
                </div>
                {errors.contactName && (
                  <p className="text-sm text-destructive">{errors.contactName}</p>
                )}
              </div>
            )}

            {/* Email & Phone Row */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email Address *
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="contact@salon.com"
                    value={data.email}
                    onChange={(e) => onDataChange({ email: e.target.value })}
                    className={`pl-10 ${errors.email ? 'border-destructive' : ''}`}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium">
                  Phone Number *
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(555) 123-4567"
                    value={data.phone}
                    onChange={(e) => onDataChange({ phone: e.target.value })}
                    className={`pl-10 ${errors.phone ? 'border-destructive' : ''}`}
                  />
                </div>
                {errors.phone && (
                  <p className="text-sm text-destructive">{errors.phone}</p>
                )}
              </div>
            </div>

            {/* Password Fields */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password *
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a secure password"
                    value={data.password}
                    onChange={(e) => onDataChange({ password: e.target.value })}
                    className={`pl-10 pr-10 ${errors.password ? 'border-destructive' : ''}`}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1 h-8 w-8 p-0"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                {errors.password && (
                  <p className="text-sm text-destructive">{errors.password}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium">
                  Confirm Password *
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={data.confirmPassword}
                    onChange={(e) => onDataChange({ confirmPassword: e.target.value })}
                    className={`pl-10 pr-10 ${errors.confirmPassword ? 'border-destructive' : ''}`}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1 h-8 w-8 p-0"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-destructive">{errors.confirmPassword}</p>
                )}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              {onBack ? (
                <Button type="button" variant="outline" onClick={onBack}>
                  Back
                </Button>
              ) : (
                <div />
              )}
              <Button type="submit" className="bg-gradient-primary hover:opacity-90">
                Continue
              </Button>
            </div>
          </form>
        </div>
      </CardContent>
    </Card>
  );
};