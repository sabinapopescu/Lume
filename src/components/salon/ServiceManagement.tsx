import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Edit, Trash2, Clock, DollarSign, Image } from "lucide-react";
import PhotoUpload from "./PhotoUpload";

interface Service {
  id: number;
  name: string;
  category: string;
  duration: number;
  price: number;
  description: string;
  image?: string;
  isActive: boolean;
}

const ServiceManagement = () => {
  const [services, setServices] = useState<Service[]>([
    {
      id: 1,
      name: "Hair Cut & Style",
      category: "Hair",
      duration: 60,
      price: 75,
      description: "Professional haircut with styling",
      image: "/placeholder.svg",
      isActive: true
    },
    {
      id: 2,
      name: "Hair Color",
      category: "Hair",
      duration: 120,
      price: 150,
      description: "Full hair coloring service",
      isActive: true
    },
    {
      id: 3,
      name: "Gel Manicure",
      category: "Nails",
      duration: 45,
      price: 35,
      description: "Long-lasting gel manicure",
      isActive: true
    },
    {
      id: 4,
      name: "Facial Treatment",
      category: "Skincare",
      duration: 75,
      price: 95,
      description: "Deep cleansing facial treatment",
      isActive: false
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    duration: "",
    price: "",
    description: "",
    image: ""
  });

  const categories = ["Hair", "Nails", "Skincare", "Massage", "Waxing", "Eyebrows", "Makeup"];

  const resetForm = () => {
    setFormData({
      name: "",
      category: "",
      duration: "",
      price: "",
      description: "",
      image: ""
    });
    setEditingService(null);
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setFormData({
      name: service.name,
      category: service.category,
      duration: service.duration.toString(),
      price: service.price.toString(),
      description: service.description,
      image: service.image || ""
    });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!formData.name || !formData.category || !formData.duration || !formData.price) {
      alert("Please fill in all required fields");
      return;
    }

    const serviceData = {
      name: formData.name,
      category: formData.category,
      duration: parseInt(formData.duration),
      price: parseFloat(formData.price),
      description: formData.description,
      image: formData.image,
      isActive: true
    };

    if (editingService) {
      setServices(services.map(service => 
        service.id === editingService.id 
          ? { ...service, ...serviceData }
          : service
      ));
    } else {
      setServices([...services, {
        id: Date.now(),
        ...serviceData
      }]);
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this service?")) {
      setServices(services.filter(service => service.id !== id));
    }
  };

  const toggleStatus = (id: number) => {
    setServices(services.map(service =>
      service.id === id
        ? { ...service, isActive: !service.isActive }
        : service
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Service Management</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-primary" onClick={resetForm}>
              <Plus className="w-4 h-4 mr-2" />
              Add New Service
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingService ? "Edit Service" : "Add New Service"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Service Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="e.g. Hair Cut & Style"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="duration">Duration (minutes) *</Label>
                  <Input
                    id="duration"
                    type="number"
                    value={formData.duration}
                    onChange={(e) => setFormData({...formData, duration: e.target.value})}
                    placeholder="60"
                  />
                </div>
                <div>
                  <Label htmlFor="price">Price ($) *</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    placeholder="75.00"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Describe the service..."
                  rows={3}
                />
              </div>

              <PhotoUpload
                onUpload={(url) => setFormData({...formData, image: url})}
                currentImage={formData.image}
                label="Service Image"
              />

              <div className="flex gap-2 pt-4">
                <Button onClick={handleSave} className="bg-gradient-primary">
                  {editingService ? "Update Service" : "Add Service"}
                </Button>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle>All Services ({services.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services.map((service) => (
                <TableRow key={service.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {service.image && (
                        <img 
                          src={service.image} 
                          alt={service.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                      )}
                      <div>
                        <div className="font-medium">{service.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {service.description}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{service.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {service.duration} min
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      {service.price}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleStatus(service.id)}
                    >
                      <Badge variant={service.isActive ? "default" : "secondary"}>
                        {service.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </Button>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-2 justify-end">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(service)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(service.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServiceManagement;