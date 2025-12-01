import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, Edit, Trash2, Phone, Mail, Star, Calendar, Scissors } from "lucide-react";
import PhotoUpload from "./PhotoUpload";

interface Employee {
  id: number;
  name: string;
  role: string;
  specialties: string[];
  email: string;
  phone: string;
  bio: string;
  image?: string;
  rating: number;
  experience: number;
  isActive: boolean;
  schedule: string[];
}

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: 1,
      name: "Emma Wilson",
      role: "Hair Stylist",
      specialties: ["Hair Cut", "Hair Color", "Styling"],
      email: "emma@luxebeauty.com",
      phone: "(555) 234-5678",
      bio: "Expert hair stylist with 8 years of experience specializing in modern cuts and color techniques.",
      image: "/placeholder.svg",
      rating: 4.9,
      experience: 8,
      isActive: true,
      schedule: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
    },
    {
      id: 2,
      name: "Maria Garcia",
      role: "Nail Technician",
      specialties: ["Gel Manicure", "Nail Art", "Pedicure"],
      email: "maria@luxebeauty.com",
      phone: "(555) 345-6789",
      bio: "Professional nail technician with a passion for creative nail art and perfect finishes.",
      rating: 4.8,
      experience: 5,
      isActive: true,
      schedule: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    },
    {
      id: 3,
      name: "David Chen",
      role: "Massage Therapist",
      specialties: ["Deep Tissue", "Swedish", "Hot Stone"],
      email: "david@luxebeauty.com",
      phone: "(555) 456-7890",
      bio: "Licensed massage therapist specializing in therapeutic and relaxation techniques.",
      rating: 4.7,
      experience: 6,
      isActive: true,
      schedule: ["Monday", "Wednesday", "Friday", "Saturday", "Sunday"]
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    specialties: "",
    email: "",
    phone: "",
    bio: "",
    image: "",
    experience: "",
    schedule: [] as string[]
  });

  const roles = [
    "Hair Stylist", 
    "Nail Technician", 
    "Massage Therapist", 
    "Esthetician", 
    "Barber", 
    "Eyebrow Specialist",
    "Makeup Artist"
  ];

  const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const resetForm = () => {
    setFormData({
      name: "",
      role: "",
      specialties: "",
      email: "",
      phone: "",
      bio: "",
      image: "",
      experience: "",
      schedule: []
    });
    setEditingEmployee(null);
  };

  const handleEdit = (employee: Employee) => {
    setEditingEmployee(employee);
    setFormData({
      name: employee.name,
      role: employee.role,
      specialties: employee.specialties.join(", "),
      email: employee.email,
      phone: employee.phone,
      bio: employee.bio,
      image: employee.image || "",
      experience: employee.experience.toString(),
      schedule: employee.schedule
    });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!formData.name || !formData.role || !formData.email || !formData.phone) {
      alert("Please fill in all required fields");
      return;
    }

    const employeeData = {
      name: formData.name,
      role: formData.role,
      specialties: formData.specialties.split(",").map(s => s.trim()).filter(s => s),
      email: formData.email,
      phone: formData.phone,
      bio: formData.bio,
      image: formData.image,
      experience: parseInt(formData.experience) || 0,
      schedule: formData.schedule,
      rating: 0,
      isActive: true
    };

    if (editingEmployee) {
      setEmployees(employees.map(employee => 
        employee.id === editingEmployee.id 
          ? { ...employee, ...employeeData }
          : employee
      ));
    } else {
      setEmployees([...employees, {
        id: Date.now(),
        ...employeeData
      }]);
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to remove this employee?")) {
      setEmployees(employees.filter(employee => employee.id !== id));
    }
  };

  const toggleStatus = (id: number) => {
    setEmployees(employees.map(employee =>
      employee.id === id
        ? { ...employee, isActive: !employee.isActive }
        : employee
    ));
  };

  const toggleScheduleDay = (day: string) => {
    const newSchedule = formData.schedule.includes(day)
      ? formData.schedule.filter(d => d !== day)
      : [...formData.schedule, day];
    setFormData({...formData, schedule: newSchedule});
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Staff Management</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary" onClick={resetForm}>
              <Plus className="w-4 h-4 mr-2" />
              Add Staff Member
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingEmployee ? "Edit Staff Member" : "Add New Staff Member"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="e.g. Emma Wilson"
                  />
                </div>
                <div>
                  <Label htmlFor="role">Role *</Label>
                  <Select value={formData.role} onValueChange={(value) => setFormData({...formData, role: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map(role => (
                        <SelectItem key={role} value={role}>{role}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="emma@luxebeauty.com"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="(555) 234-5678"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="specialties">Specialties</Label>
                  <Input
                    id="specialties"
                    value={formData.specialties}
                    onChange={(e) => setFormData({...formData, specialties: e.target.value})}
                    placeholder="Hair Cut, Hair Color, Styling"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Separate with commas</p>
                </div>
                <div>
                  <Label htmlFor="experience">Years of Experience</Label>
                  <Input
                    id="experience"
                    type="number"
                    value={formData.experience}
                    onChange={(e) => setFormData({...formData, experience: e.target.value})}
                    placeholder="5"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => setFormData({...formData, bio: e.target.value})}
                  placeholder="Brief description of experience and specialties..."
                  rows={3}
                />
              </div>

              <div>
                <Label>Work Schedule</Label>
                <div className="grid grid-cols-4 gap-2 mt-2">
                  {weekDays.map(day => (
                    <Button
                      key={day}
                      type="button"
                      variant={formData.schedule.includes(day) ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleScheduleDay(day)}
                    >
                      {day.slice(0, 3)}
                    </Button>
                  ))}
                </div>
              </div>

              <PhotoUpload
                onUpload={(url) => setFormData({...formData, image: url})}
                currentImage={formData.image}
                label="Profile Photo"
              />

              <div className="flex gap-2 pt-4">
                <Button onClick={handleSave} className="bg-gradient-primary">
                  {editingEmployee ? "Update Staff Member" : "Add Staff Member"}
                </Button>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {employees.map((employee) => (
          <Card key={employee.id} className="shadow-soft hover:shadow-medium transition-shadow">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={employee.image} />
                      <AvatarFallback>
                        {employee.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-lg">{employee.name}</h3>
                      <p className="text-primary font-medium">{employee.role}</p>
                      <div className="flex items-center gap-1 mt-1">
                        {renderStars(Math.floor(employee.rating))}
                        <span className="text-sm text-muted-foreground ml-1">
                          ({employee.rating})
                        </span>
                      </div>
                    </div>
                  </div>
                  <Badge variant={employee.isActive ? "default" : "secondary"}>
                    {employee.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span>{employee.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span>{employee.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>{employee.experience} years experience</span>
                  </div>
                </div>

                {employee.specialties.length > 0 && (
                  <div>
                    <p className="text-sm font-medium mb-2">Specialties:</p>
                    <div className="flex flex-wrap gap-1">
                      {employee.specialties.map((specialty, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <p className="text-sm font-medium mb-1">Schedule:</p>
                  <div className="flex flex-wrap gap-1">
                    {employee.schedule.map((day, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {day.slice(0, 3)}
                      </Badge>
                    ))}
                  </div>
                </div>

                {employee.bio && (
                  <p className="text-sm text-muted-foreground">
                    {employee.bio}
                  </p>
                )}

                <div className="flex gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(employee)}
                    className="flex-1"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleStatus(employee.id)}
                  >
                    {employee.isActive ? "Deactivate" : "Activate"}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(employee.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EmployeeManagement;