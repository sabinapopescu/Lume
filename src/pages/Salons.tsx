import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, MapPin, Star, Filter, Grid, List, ChevronDown, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import Navigation from "@/components/ui/navigation";
import { SalonCard } from "@/components/salons/SalonCard";
import { FilterPanel } from "@/components/salons/FilterPanel";
import { Pagination } from "@/components/salons/Pagination";

// Import salon images
import salon1 from "@/assets/salon-1.jpg";
import salon2 from "@/assets/salon-2.jpg";
import salon3 from "@/assets/salon-3.jpg";

const MOCK_SALONS = [
  {
    id: 1,
    name: "Elegance Beauty Studio",
    rating: 4.8,
    reviewCount: 342,
    location: "Downtown, 0.5 mi",
    address: "123 Main Street, City Center",
    image: salon1,
    services: ["Hair", "Nails", "Skincare", "Massage"],
    priceRange: "$$$",
    isPartner: true,
    nextAvailable: "Today at 2:30 PM",
    specialties: ["Balayage", "Facials", "Manicure"],
  },
  {
    id: 2,
    name: "Luxe Salon & Spa",
    rating: 4.9,
    reviewCount: 528,
    location: "Uptown, 1.2 mi",
    address: "456 Oak Avenue, Uptown District",
    image: salon2,
    services: ["Hair", "Skincare", "Massage", "Waxing"],
    priceRange: "$$$$",
    isPartner: true,
    nextAvailable: "Tomorrow at 10:00 AM",
    specialties: ["Color Correction", "Anti-aging", "Deep Tissue"],
  },
  {
    id: 3,
    name: "Bloom Beauty Bar",
    rating: 4.6,
    reviewCount: 189,
    location: "Midtown, 0.8 mi",
    address: "789 Pine Street, Midtown Plaza",
    image: salon3,
    services: ["Hair", "Nails", "Lashes", "Brows"],
    priceRange: "$$",
    isPartner: false,
    nextAvailable: "Today at 4:15 PM",
    specialties: ["Extensions", "Gel Nails", "Microblading"],
  },
  {
    id: 4,
    name: "Radiance Wellness Spa",
    rating: 4.7,
    reviewCount: 276,
    location: "Westside, 2.1 mi",
    address: "321 Elm Street, Westside Plaza",
    image: salon1,
    services: ["Skincare", "Massage", "Body Treatments"],
    priceRange: "$$$",
    isPartner: true,
    nextAvailable: "Tomorrow at 3:00 PM",
    specialties: ["Hydrafacial", "Hot Stone", "Body Wraps"],
  },
  {
    id: 5,
    name: "Chic Hair Lounge",
    rating: 4.5,
    reviewCount: 158,
    location: "Eastside, 1.8 mi",
    address: "654 Maple Avenue, Eastside District",
    image: salon2,
    services: ["Hair", "Styling", "Extensions"],
    priceRange: "$$",
    isPartner: false,
    nextAvailable: "Today at 6:00 PM",
    specialties: ["Blowouts", "Updos", "Hair Extensions"],
  },
  {
    id: 6,
    name: "Glamour Nail Studio",
    rating: 4.9,
    reviewCount: 412,
    location: "Center City, 0.3 mi",
    address: "987 Oak Street, Center City",
    image: salon3,
    services: ["Nails", "Pedicures", "Nail Art"],
    priceRange: "$$",
    isPartner: true,
    nextAvailable: "Today at 1:45 PM",
    specialties: ["Gel Nails", "Nail Art", "Pedicures"],
  },
];

const Salons = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("rating");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    services: [],
    priceRange: [],
    rating: 0,
    distance: 0,
    partnersOnly: false,
  });

  const itemsPerPage = 9;
  const totalPages = Math.ceil(MOCK_SALONS.length / itemsPerPage);

  return (
    <div className="min-h-screen bg-background">
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
      <header className="bg-card border-b shadow-soft">
        <div className="container mx-auto px-4 py-4 lg:py-6">
          <div className="flex flex-col gap-4">
            {/* Search Bar */}
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search salons, services, or stylists..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-background border-border h-11"
                />
              </div>
              <div className="relative sm:min-w-[200px]">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Location or salon name"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="pl-10 bg-background border-border h-11"
                />
              </div>
              <Button className="bg-gradient-primary hover:opacity-90 text-primary-foreground px-6 h-11 sm:px-8">
                Search
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 lg:py-8">
        <div className="flex flex-col xl:flex-row gap-6 lg:gap-8">
          {/* Filters Sidebar */}
          <div className={`xl:w-80 ${showFilters ? "block" : "hidden xl:block"}`}>
            <FilterPanel filters={filters} onFiltersChange={setFilters} />
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="xl:hidden w-full sm:w-auto"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
                
                <div className="text-sm text-muted-foreground">
                  Showing {MOCK_SALONS.length} salons
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="distance">Nearest</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="availability">Availability</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex border border-border rounded-lg overflow-hidden w-full sm:w-auto">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-none flex-1 sm:flex-none"
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-none flex-1 sm:flex-none"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Salon Grid/List */}
            <div className={
              viewMode === "grid" 
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6" 
                : "space-y-4"
            }>
              {MOCK_SALONS.map((salon) => (
                <SalonCard 
                  key={salon.id} 
                  salon={salon} 
                  viewMode={viewMode}
                />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-12">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Salons;