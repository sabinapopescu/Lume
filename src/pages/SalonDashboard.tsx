import { useState } from "react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Settings, Bell, Calendar, Users, Scissors, TrendingUp, ArrowLeft } from "lucide-react";
import Navigation from "@/components/ui/navigation";
import SalonStats from "@/components/salon/SalonStats";
import ServiceManagement from "@/components/salon/ServiceManagement";
import EmployeeManagement from "@/components/salon/EmployeeManagement";
import AppointmentManagement from "@/components/salon/AppointmentManagement";

const SalonDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock salon data - in real app this would come from backend
  const salonData = {
    name: "Luxe Beauty Studio",
    owner: "Sarah Martinez",
    email: "sarah@luxebeauty.com",
    phone: "(555) 123-4567",
    address: "123 Main Street, New York, NY 10001",
    description: "Premier beauty salon offering luxury hair, nail, and spa services",
    profileImage: "/placeholder.svg",
    coverImage: "/placeholder.svg",
    rating: 4.8,
    totalReviews: 156,
    status: "approved"
  };

  return (
    <div className="min-h-screen bg-gradient-secondary">
      <Navigation />
      
      {/* Back Navigation */}
      <div className="container mx-auto px-4 py-4">
        <Button variant="ghost" asChild>
          <Link to="/" className="flex items-center text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </Button>
      </div>

      {/* Header */}
      <div className="bg-card border-b shadow-soft">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={salonData.profileImage} />
                <AvatarFallback>LB</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold">{salonData.name}</h1>
                <p className="text-muted-foreground">Owner: {salonData.owner}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    {salonData.status}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    ★ {salonData.rating} ({salonData.totalReviews} reviews)
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="services" className="flex items-center gap-2">
              <Scissors className="w-4 h-4" />
              Services
            </TabsTrigger>
            <TabsTrigger value="employees" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Staff
            </TabsTrigger>
            <TabsTrigger value="appointments" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Appointments
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Profile
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <SalonStats />
            
            {/* Quick Actions */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button 
                    className="h-20 bg-gradient-primary"
                    onClick={() => setActiveTab("services")}
                  >
                    <div className="text-center">
                      <Scissors className="w-6 h-6 mx-auto mb-2" />
                      <div>Add New Service</div>
                    </div>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-20"
                    onClick={() => setActiveTab("employees")}
                  >
                    <div className="text-center">
                      <Users className="w-6 h-6 mx-auto mb-2" />
                      <div>Manage Staff</div>
                    </div>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-20"
                    onClick={() => setActiveTab("appointments")}
                  >
                    <div className="text-center">
                      <Calendar className="w-6 h-6 mx-auto mb-2" />
                      <div>View Appointments</div>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="services">
            <ServiceManagement />
          </TabsContent>

          <TabsContent value="employees">
            <EmployeeManagement />
          </TabsContent>

          <TabsContent value="appointments">
            <AppointmentManagement />
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Salon Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Salon Name</label>
                      <p className="text-lg">{salonData.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Owner</label>
                      <p className="text-lg">{salonData.owner}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Email</label>
                      <p className="text-lg">{salonData.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Phone</label>
                      <p className="text-lg">{salonData.phone}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Address</label>
                      <p className="text-lg">{salonData.address}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Description</label>
                      <p className="text-lg">{salonData.description}</p>
                    </div>
                  </div>
                </div>
                <div className="pt-4">
                  <Button className="bg-gradient-primary">
                    Edit Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SalonDashboard;