import { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, MapPin, Star, Plus, Filter, Search, User, Settings } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Mock data - in real app this would come from backend
  const user = {
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    avatar: "/placeholder.svg",
    memberSince: "2023"
  };

  const upcomingAppointments = [
    {
      id: 1,
      salon: "Luxe Beauty Studio",
      service: "Hair Cut & Color",
      date: "2024-01-15",
      time: "2:00 PM",
      duration: "2 hours",
      stylist: "Emma Wilson",
      price: "$150",
      status: "confirmed",
      address: "123 Main St, NYC"
    },
    {
      id: 2,
      salon: "Glamour Nails",
      service: "Gel Manicure",
      date: "2024-01-18",
      time: "11:00 AM",
      duration: "1 hour",
      stylist: "Maria Garcia",
      price: "$45",
      status: "confirmed",
      address: "456 Broadway, NYC"
    }
  ];

  const pastAppointments = [
    {
      id: 3,
      salon: "Serenity Spa",
      service: "Deep Tissue Massage",
      date: "2024-01-05",
      time: "3:00 PM",
      duration: "1.5 hours",
      stylist: "David Chen",
      price: "$120",
      status: "completed",
      rating: 5,
      address: "789 Wellness Ave, NYC"
    },
    {
      id: 4,
      salon: "Luxe Beauty Studio",
      service: "Facial Treatment",
      date: "2023-12-20",
      time: "1:00 PM",
      duration: "1 hour",
      stylist: "Lisa Park",
      price: "$85",
      status: "completed",
      rating: 4,
      address: "123 Main St, NYC"
    },
    {
      id: 5,
      salon: "Style Central",
      service: "Hair Styling",
      date: "2023-12-10",
      time: "10:00 AM",
      duration: "2 hours",
      stylist: "Alex Rodriguez",
      price: "$95",
      status: "completed",
      rating: 5,
      address: "321 Fashion Blvd, NYC"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  const filteredAppointments = [...upcomingAppointments, ...pastAppointments].filter(apt => {
    const matchesSearch = apt.salon.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         apt.service.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || apt.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-secondary">
      {/* Header */}
      <div className="bg-card border-b shadow-soft">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="w-12 h-12">
                <AvatarImage src={user.avatar} />
                <AvatarFallback>SJ</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold">Welcome back, {user.name}!</h1>
                <p className="text-muted-foreground">Manage your beauty appointments</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/salons">
                <Button className="bg-gradient-primary">
                  <Plus className="w-4 h-4 mr-2" />
                  Book Appointment
                </Button>
              </Link>
              <Link to="/profile">
                <Button variant="outline">
                  <Settings className="w-4 h-4 mr-2" />
                  Profile
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Upcoming</p>
                  <p className="text-2xl font-bold">{upcomingAppointments.length}</p>
                </div>
                <Calendar className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold">{pastAppointments.length}</p>
                </div>
                <Clock className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Favorite Salons</p>
                  <p className="text-2xl font-bold">5</p>
                </div>
                <MapPin className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Rating</p>
                  <p className="text-2xl font-bold">4.8</p>
                </div>
                <Star className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search appointments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[180px]">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Appointments Tabs */}
        <Tabs defaultValue="upcoming" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="upcoming">Upcoming ({upcomingAppointments.length})</TabsTrigger>
            <TabsTrigger value="history">History ({pastAppointments.length})</TabsTrigger>
            <TabsTrigger value="all">All Appointments</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4">
            {upcomingAppointments.map((appointment) => (
              <Card key={appointment.id} className="shadow-soft hover:shadow-medium transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-lg">{appointment.salon}</h3>
                          <p className="text-primary font-medium">{appointment.service}</p>
                          <p className="text-sm text-muted-foreground">{appointment.address}</p>
                        </div>
                        <Badge className={getStatusColor(appointment.status)}>
                          {appointment.status}
                        </Badge>
                      </div>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {appointment.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {appointment.time} ({appointment.duration})
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {appointment.stylist}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                      <div className="text-right">
                        <p className="font-semibold text-lg">{appointment.price}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Reschedule
                        </Button>
                        <Button variant="destructive" size="sm">
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            {pastAppointments.map((appointment) => (
              <Card key={appointment.id} className="shadow-soft hover:shadow-medium transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-lg">{appointment.salon}</h3>
                          <p className="text-primary font-medium">{appointment.service}</p>
                          <p className="text-sm text-muted-foreground">{appointment.address}</p>
                        </div>
                        <Badge className={getStatusColor(appointment.status)}>
                          {appointment.status}
                        </Badge>
                      </div>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {appointment.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {appointment.time} ({appointment.duration})
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {appointment.stylist}
                        </div>
                      </div>
                      
                      {appointment.rating && (
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">Your rating:</span>
                          <div className="flex gap-1">
                            {renderStars(appointment.rating)}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                      <div className="text-right">
                        <p className="font-semibold text-lg">{appointment.price}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Book Again
                        </Button>
                        {!appointment.rating && (
                          <Button variant="default" size="sm">
                            Rate Service
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="all" className="space-y-4">
            {filteredAppointments.map((appointment) => (
              <Card key={appointment.id} className="shadow-soft hover:shadow-medium transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-lg">{appointment.salon}</h3>
                          <p className="text-primary font-medium">{appointment.service}</p>
                          <p className="text-sm text-muted-foreground">{appointment.address}</p>
                        </div>
                        <Badge className={getStatusColor(appointment.status)}>
                          {appointment.status}
                        </Badge>
                      </div>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {appointment.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {appointment.time} ({appointment.duration})
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {appointment.stylist}
                        </div>
                      </div>
                      
                      {(appointment as any).rating && (
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">Your rating:</span>
                          <div className="flex gap-1">
                            {renderStars((appointment as any).rating)}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                      <div className="text-right">
                        <p className="font-semibold text-lg">{appointment.price}</p>
                      </div>
                      <div className="flex gap-2">
                        {appointment.status === "confirmed" ? (
                          <>
                            <Button variant="outline" size="sm">
                              Reschedule
                            </Button>
                            <Button variant="destructive" size="sm">
                              Cancel
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button variant="outline" size="sm">
                              Book Again
                            </Button>
                            {appointment.status === "completed" && !(appointment as any).rating && (
                              <Button variant="default" size="sm">
                                Rate Service
                              </Button>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        {filteredAppointments.length === 0 && (
          <Card className="shadow-soft">
            <CardContent className="py-12 text-center">
              <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No appointments found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm || filterStatus !== "all" 
                  ? "Try adjusting your search or filter criteria"
                  : "Ready to book your first appointment?"
                }
              </p>
              <Link to="/salons">
                <Button className="bg-gradient-primary">
                  <Plus className="w-4 h-4 mr-2" />
                  Book Your First Appointment
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Dashboard;