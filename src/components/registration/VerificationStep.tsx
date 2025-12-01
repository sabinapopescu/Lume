import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Mail, Phone, RefreshCw } from "lucide-react";

interface VerificationData {
  emailCode: string;
  phoneCode: string;
  emailVerified: boolean;
  phoneVerified: boolean;
}

interface VerificationStepProps {
  data: VerificationData;
  onDataChange: (data: Partial<VerificationData>) => void;
  onNext: () => void;
  onBack: () => void;
  email: string;
  phone: string;
}

export const VerificationStep = ({ data, onDataChange, onNext, onBack, email, phone }: VerificationStepProps) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [resendTimer, setResendTimer] = useState(0);
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!data.emailVerified) {
      if (!data.emailCode || data.emailCode.length !== 6) {
        newErrors.emailCode = "Please enter the 6-digit email verification code";
      }
    }

    if (!data.phoneVerified) {
      if (!data.phoneCode || data.phoneCode.length !== 6) {
        newErrors.phoneCode = "Please enter the 6-digit phone verification code";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleVerifyEmail = async () => {
    if (data.emailCode.length === 6) {
      setIsVerifying(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      onDataChange({ emailVerified: true });
      setIsVerifying(false);
    }
  };

  const handleVerifyPhone = async () => {
    if (data.phoneCode.length === 6) {
      setIsVerifying(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      onDataChange({ phoneVerified: true });
      setIsVerifying(false);
    }
  };

  const handleResendCode = (type: 'email' | 'phone') => {
    setResendTimer(60);
    // Simulate sending new code
    console.log(`Resending ${type} verification code`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm() && data.emailVerified && data.phoneVerified) {
      onNext();
    }
  };

  const canProceed = data.emailVerified && data.phoneVerified;

  return (
    <Card className="w-full">
      <CardContent className="p-8">
        <div className="space-y-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Verify Your Contact Information</h2>
            <p className="text-muted-foreground">
              We've sent verification codes to confirm your email and phone number for security.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Email Verification */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Mail className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold">Email Verification</h3>
                </div>
                {data.emailVerified && (
                  <Badge className="bg-green-500/10 text-green-600 border-green-200">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                )}
              </div>

              <div className="p-4 bg-muted/30 rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">
                  We sent a 6-digit code to:
                </p>
                <p className="font-medium">{email}</p>
              </div>

              {!data.emailVerified && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="emailCode" className="text-sm font-medium">
                      Enter Email Verification Code
                    </Label>
                    <div className="flex space-x-2">
                      <Input
                        id="emailCode"
                        placeholder="123456"
                        value={data.emailCode}
                        onChange={(e) => onDataChange({ emailCode: e.target.value.replace(/\D/g, '').slice(0, 6) })}
                        className={`font-mono text-center text-lg ${errors.emailCode ? 'border-destructive' : ''}`}
                        maxLength={6}
                      />
                      <Button 
                        type="button" 
                        onClick={handleVerifyEmail}
                        disabled={data.emailCode.length !== 6 || isVerifying}
                        className="bg-gradient-primary hover:opacity-90"
                      >
                        {isVerifying ? (
                          <RefreshCw className="w-4 h-4 animate-spin" />
                        ) : (
                          "Verify"
                        )}
                      </Button>
                    </div>
                    {errors.emailCode && (
                      <p className="text-sm text-destructive">{errors.emailCode}</p>
                    )}
                  </div>

                  <div className="flex justify-between items-center">
                    <p className="text-sm text-muted-foreground">
                      Didn't receive the code?
                    </p>
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => handleResendCode('email')}
                      disabled={resendTimer > 0}
                      className="text-primary hover:text-primary/80"
                    >
                      {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend Code"}
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Phone Verification */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Phone className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-semibold">Phone Verification</h3>
                </div>
                {data.phoneVerified && (
                  <Badge className="bg-green-500/10 text-green-600 border-green-200">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                )}
              </div>

              <div className="p-4 bg-muted/30 rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">
                  We sent a 6-digit code to:
                </p>
                <p className="font-medium">{phone}</p>
              </div>

              {!data.phoneVerified && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="phoneCode" className="text-sm font-medium">
                      Enter Phone Verification Code
                    </Label>
                    <div className="flex space-x-2">
                      <Input
                        id="phoneCode"
                        placeholder="123456"
                        value={data.phoneCode}
                        onChange={(e) => onDataChange({ phoneCode: e.target.value.replace(/\D/g, '').slice(0, 6) })}
                        className={`font-mono text-center text-lg ${errors.phoneCode ? 'border-destructive' : ''}`}
                        maxLength={6}
                      />
                      <Button 
                        type="button" 
                        onClick={handleVerifyPhone}
                        disabled={data.phoneCode.length !== 6 || isVerifying}
                        className="bg-gradient-primary hover:opacity-90"
                      >
                        {isVerifying ? (
                          <RefreshCw className="w-4 h-4 animate-spin" />
                        ) : (
                          "Verify"
                        )}
                      </Button>
                    </div>
                    {errors.phoneCode && (
                      <p className="text-sm text-destructive">{errors.phoneCode}</p>
                    )}
                  </div>

                  <div className="flex justify-between items-center">
                    <p className="text-sm text-muted-foreground">
                      Didn't receive the code?
                    </p>
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => handleResendCode('phone')}
                      disabled={resendTimer > 0}
                      className="text-primary hover:text-primary/80"
                    >
                      {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend Code"}
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Success Message */}
            {canProceed && (
              <div className="p-4 bg-green-500/10 border border-green-200 rounded-lg">
                <div className="flex items-center space-x-2 text-green-600">
                  <CheckCircle className="w-5 h-5" />
                  <p className="font-medium">Verification Complete!</p>
                </div>
                <p className="text-sm text-green-600/80 mt-1">
                  Both your email and phone number have been successfully verified.
                </p>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              <Button type="button" variant="outline" onClick={onBack}>
                Back
              </Button>
              <Button 
                type="submit" 
                className="bg-gradient-primary hover:opacity-90"
                disabled={!canProceed}
              >
                Continue
              </Button>
            </div>
          </form>
        </div>
      </CardContent>
    </Card>
  );
};