/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Package,
  Truck,
  DollarSign,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  MoreVertical,
  MapPin,
} from 'lucide-react';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  AreaChart,
  Area,
} from 'recharts';

const AdminDashboardStates = () => {
  // Sample data for charts
  const deliveryTrends = [
    { name: 'Mon', delivered: 145, inTransit: 89, pending: 34 },
    { name: 'Tue', delivered: 167, inTransit: 92, pending: 28 },
    { name: 'Wed', delivered: 134, inTransit: 78, pending: 45 },
    { name: 'Thu', delivered: 198, inTransit: 95, pending: 32 },
    { name: 'Fri', delivered: 221, inTransit: 103, pending: 29 },
    { name: 'Sat', delivered: 189, inTransit: 87, pending: 41 },
    { name: 'Sun', delivered: 156, inTransit: 76, pending: 38 },
  ];

  const statusDistribution = [
    { name: 'Delivered', value: 1245, color: '#10B981' },
    { name: 'In Transit', value: 432, color: '#3B82F6' },
    { name: 'At Hub', value: 234, color: '#8B5CF6' },
    { name: 'Pending', value: 123, color: '#F59E0B' },
    { name: 'Cancelled', value: 45, color: '#EF4444' },
  ];

  const revenueData = [
    { month: 'Jan', revenue: 45000, orders: 1200 },
    { month: 'Feb', revenue: 52000, orders: 1350 },
    { month: 'Mar', revenue: 48000, orders: 1180 },
    { month: 'Apr', revenue: 91000, orders: 1520 },
    { month: 'May', revenue: 45000, orders: 1380 },
    { month: 'Jun', revenue: 67000, orders: 1650 },
    { month: 'Jul', revenue: 97000, orders: 5650 },
    { month: 'Aug', revenue: 275000, orders: 150 },
    { month: 'Sep', revenue: 77000, orders: 10650 },
    { month: 'Oct', revenue: 57000, orders: 360 },
    { month: 'Nov', revenue: 17000, orders: 550 },
    { month: 'Dec', revenue: 687000, orders: 250 },
  ];

  const topRoutes = [
    { route: 'Dhaka → Chattogram', orders: 1234, revenue: 98760 },
    { route: 'Dhaka → Sylhet', orders: 987, revenue: 75430 },
    { route: 'Chattogram → Dhaka', orders: 856, revenue: 68900 },
    { route: 'Dhaka → Rajshahi', orders: 743, revenue: 59650 },
    { route: 'Sylhet → Dhaka', orders: 692, revenue: 52340 },
  ];

  const recentOrders = [
    {
      id: 'TRK-001',
      customer: 'John Doe',
      status: 'delivered',
      amount: 1250,
      time: '2 hours ago',
    },
    {
      id: 'TRK-002',
      customer: 'Sarah Khan',
      status: 'in-transit',
      amount: 890,
      time: '4 hours ago',
    },
    {
      id: 'TRK-003',
      customer: 'Ahmed Ali',
      status: 'pending',
      amount: 2100,
      time: '6 hours ago',
    },
    {
      id: 'TRK-004',
      customer: 'Maria Silva',
      status: 'at-hub',
      amount: 750,
      time: '8 hours ago',
    },
    {
      id: 'TRK-005',
      customer: 'David Chen',
      status: 'delivered',
      amount: 1680,
      time: '1 day ago',
    },
  ];

  const getStatusColor = (status: any) => {
    const colors = {
      delivered: 'bg-green-100 text-green-800',
      'in-transit': 'bg-blue-100 text-blue-800',
      pending: 'bg-yellow-100 text-yellow-800',
      'at-hub': 'bg-purple-100 text-purple-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-black text-white rounded-t-md py-6">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-gray-300">
                Welcome back! Here's what's happening with your delivery service
                today.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-2 pt-4 pb-4">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">
                  Total Orders
                </p>
                <p className="text-3xl font-bold text-black">2,847</p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-green-500 text-sm font-semibold">
                    +12.5%
                  </span>
                  <span className="text-gray-500 text-sm">vs last week</span>
                </div>
              </div>
              <div className="bg-primary/10 p-3 rounded-xl">
                <Package className="w-8 h-8 text-primary" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Revenue</p>
                <p className="text-3xl font-bold text-black">৳4,89,230</p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-green-500 text-sm font-semibold">
                    +8.2%
                  </span>
                  <span className="text-gray-500 text-sm">vs last week</span>
                </div>
              </div>
              <div className="bg-green-100 p-3 rounded-xl">
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">
                  Active Drivers
                </p>
                <p className="text-3xl font-bold text-black">347</p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingDown className="w-4 h-4 text-red-500" />
                  <span className="text-red-500 text-sm font-semibold">
                    -3.1%
                  </span>
                  <span className="text-gray-500 text-sm">vs last week</span>
                </div>
              </div>
              <div className="bg-blue-100 p-3 rounded-xl">
                <Truck className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">
                  Delivery Rate
                </p>
                <p className="text-3xl font-bold text-black">94.8%</p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-green-500 text-sm font-semibold">
                    +2.3%
                  </span>
                  <span className="text-gray-500 text-sm">vs last week</span>
                </div>
              </div>
              <div className="bg-purple-100 p-3 rounded-xl">
                <CheckCircle className="w-8 h-8 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-2 gap-4 mb-4">
          {/* Delivery Trends */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-black">Delivery Trends</h2>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <MoreVertical className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={deliveryTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="delivered"
                  stackId="1"
                  stroke="#10B981"
                  fill="#10B981"
                  fillOpacity={0.8}
                />
                <Area
                  type="monotone"
                  dataKey="inTransit"
                  stackId="1"
                  stroke="#3B82F6"
                  fill="#3B82F6"
                  fillOpacity={0.8}
                />
                <Area
                  type="monotone"
                  dataKey="pending"
                  stackId="1"
                  stroke="#F59E0B"
                  fill="#F59E0B"
                  fillOpacity={0.8}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Status Distribution */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-black">
                Order Status Distribution
              </h2>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <MoreVertical className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={statusDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {statusDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              {statusDistribution.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm text-gray-600">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Revenue Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 mb-4">
          <h2 className="text-xl font-bold text-black mb-6">
            Revenue Overview
          </h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                }}
              />
              <Bar dataKey="revenue" fill="#10B981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Bottom Section */}
        <div className="grid lg:grid-cols-2 gap-4">
          {/* Top Routes */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold text-black mb-6">Top Routes</h2>
            <div className="space-y-4">
              {topRoutes.map((route, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-black">{route.route}</p>
                      <p className="text-sm text-gray-600">
                        {route.orders} orders
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-black">
                      ৳{route.revenue.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600">Revenue</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold text-black mb-6">Recent Orders</h2>
            <div className="space-y-4">
              {recentOrders.map((order, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-gray-100 p-2 rounded-lg">
                      <Package className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-black">{order.id}</p>
                      <p className="text-sm text-gray-600">{order.customer}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-black">৳{order.amount}</p>
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status.replace('-', ' ')}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{order.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminDashboardStates;
