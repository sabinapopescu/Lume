import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Calendar, Users, DollarSign, Star, Clock, UserCheck, Scissors } from "lucide-react";

const SalonStats = () => {
  // Mock statistics data - in real app this would come from backend
  const stats = {
    todayAppointments: 12,
    weeklyRevenue: 3450,
    monthlyRevenue: 14200,
    totalCustomers: 156,
    averageRating: 4.8,
    completedAppointments: 89,
    activeServices: 24,
    totalStaff: 6,
    weeklyGrowth: 12.5,
    customerRetention: 87,
    avgServiceTime: 45,
    popularService: "Hair Cut & Style"
  };

  const StatCard = ({ 
    title, 
    value, 
    icon: Icon, 
    change, 
    changeType = "increase",
    suffix = "" 
  }: {
    title: string;
    value: string | number;
    icon: any;
    change?: number;
    changeType?: "increase" | "decrease";
    suffix?: string;
  }) => (
    <Card className="shadow-soft hover:shadow-medium transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">
              {value}{suffix}
            </p>
            {change !== undefined && (
              <p className={`text-sm flex items-center gap-1 mt-1 ${
                changeType === "increase" ? "text-green-600" : "text-red-600"
              }`}>
                <TrendingUp className={`w-3 h-3 ${changeType === "decrease" ? "rotate-180" : ""}`} />
                {change > 0 ? "+" : ""}{change}% from last week
              </p>
            )}
          </div>
          <Icon className="w-8 h-8 text-primary" />
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Dashboard Overview</h2>
        <div className="text-sm text-muted-foreground">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Today's Appointments"
          value={stats.todayAppointments}
          icon={Calendar}
          change={8.5}
        />
        <StatCard
          title="Weekly Revenue"
          value={`$${stats.weeklyRevenue.toLocaleString()}`}
          icon={DollarSign}
          change={stats.weeklyGrowth}
        />
        <StatCard
          title="Total Customers"
          value={stats.totalCustomers}
          icon={Users}
          change={5.2}
        />
        <StatCard
          title="Average Rating"
          value={stats.averageRating}
          icon={Star}
          suffix="/5"
          change={2.1}
        />
      </div>

      {/* Secondary Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Monthly Revenue"
          value={`$${stats.monthlyRevenue.toLocaleString()}`}
          icon={TrendingUp}
          change={15.3}
        />
        <StatCard
          title="Completed Services"
          value={stats.completedAppointments}
          icon={UserCheck}
          change={7.8}
        />
        <StatCard
          title="Active Services"
          value={stats.activeServices}
          icon={Scissors}
        />
        <StatCard
          title="Staff Members"
          value={stats.totalStaff}
          icon={Users}
        />
      </div>

      {/* Additional Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Performance Metrics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Avg Service Time</span>
              <span className="font-medium">{stats.avgServiceTime} min</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Customer Retention</span>
              <span className="font-medium">{stats.customerRetention}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Popular Service</span>
              <span className="font-medium text-primary">{stats.popularService}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-lg">This Week's Highlights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>5 new customers acquired</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>3 five-star reviews received</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>2 new services launched</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-lg">Quick Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{stats.weeklyGrowth}%</p>
              <p className="text-sm text-muted-foreground">Weekly Growth</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">#{Math.floor(Math.random() * 5) + 1}</p>
              <p className="text-sm text-muted-foreground">Local Ranking</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SalonStats;