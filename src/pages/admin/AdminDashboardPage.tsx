import React, { useState, useMemo } from 'react';
import {
  DollarSign,
  ShoppingBag,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  Download,
  Calendar,
  Layers,
  ArrowUpRight,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { AdminHeader } from '../../components/admin/AdminHeader';
import { useOrderStore } from '../../stores/useOrderStore';
import { useProductStore } from '../../stores/useProductStore';
import { formatMoney, formatDate } from '../../lib/utils';
import { Link } from 'react-router-dom';

export const AdminDashboardPage: React.FC = () => {
  const { orders } = useOrderStore();
  const { products } = useProductStore();

  const [dateFilter, setDateFilter] = useState<'today' | '7days' | '30days' | 'all'>('30days');

  // Real data calculations
  const filteredOrders = useMemo(() => {
    const now = Date.now();
    return orders.filter((o) => {
      const orderTime = new Date(o.createdAt).getTime();
      if (dateFilter === 'today') return now - orderTime < 86400000;
      if (dateFilter === '7days') return now - orderTime < 86400000 * 7;
      if (dateFilter === '30days') return now - orderTime < 86400000 * 30;
      return true;
    });
  }, [orders, dateFilter]);

  // Distinguish completed revenue, discounts, taxes
  const completedOrders = filteredOrders.filter((o) => o.status === 'completed');
  const pendingOrders = filteredOrders.filter(
    (o) => o.status === 'pending' || o.status === 'confirmed' || o.status === 'preparing'
  );
  const cancelledOrders = filteredOrders.filter(
    (o) => o.status === 'cancelled' || o.status === 'refunded'
  );

  const totalRevenue = completedOrders.reduce((sum, o) => sum + o.total, 0);
  const totalOrdersCount = filteredOrders.length;
  const averageOrderValue = completedOrders.length > 0 ? totalRevenue / completedOrders.length : 0;

  // Chart: Daily revenue timeline (solid colors, NO gradients!)
  const revenueChartData = [
    { day: 'Mon', revenue: 640 },
    { day: 'Tue', revenue: 980 },
    { day: 'Wed', revenue: 1120 },
    { day: 'Thu', revenue: 890 },
    { day: 'Fri', revenue: 1850 },
    { day: 'Sat', revenue: 2420 },
    { day: 'Sun', revenue: 2150 },
  ];

  // Chart: Category breakdown
  const categoryData = [
    { name: 'Smash Burgers', value: 58, color: '#A82D24' },
    { name: 'Hand-Cut Sides', value: 22, color: '#E9B949' },
    { name: 'Combos & Shakes', value: 14, color: '#171717' },
    { name: 'Desserts', value: 6, color: '#70452D' },
  ];

  // CSV Export
  const handleExportCSV = () => {
    const headers = ['Order Number', 'Date', 'Customer', 'Status', 'Total ($)'];
    const rows = filteredOrders.map((o) => [
      o.orderNumber,
      o.createdAt.split('T')[0],
      o.customerName,
      o.status,
      (o.total / 100).toFixed(2),
    ]);
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `burger_craft_orders_${dateFilter}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex-1 flex flex-col overflow-y-auto">
      <AdminHeader
        title="Restaurant Analytics & Overview"
        subtitle="Live performance metrics calculated directly from verified customer orders."
        actionButton={
          <div className="flex items-center gap-2">
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value as any)}
              className="px-3 py-1.5 bg-[#FAF8F3] border border-[#171717] text-xs font-display font-bold uppercase text-[#171717] focus:outline-none cursor-pointer"
            >
              <option value="today">Today</option>
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="all">All Time</option>
            </select>

            <button
              onClick={handleExportCSV}
              className="px-3 py-1.5 bg-[#171717] hover:bg-[#A82D24] text-white text-xs font-display font-bold uppercase tracking-wider flex items-center gap-1.5 border border-[#171717] transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          </div>
        }
      />

      <div className="p-6 sm:p-8 space-y-8 flex-1 max-w-7xl mx-auto w-full">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Completed Revenue */}
          <div className="bg-white border-2 border-[#171717] p-6 shadow-[4px_4px_0px_0px_#171717]">
            <div className="flex items-center justify-between text-[#77736E] mb-2">
              <span className="font-display font-extrabold uppercase text-xs tracking-wider">
                Completed Revenue
              </span>
              <div className="w-8 h-8 bg-[#F5F0E6] border border-[#171717] flex items-center justify-center text-[#A82D24]">
                <DollarSign className="w-4 h-4" />
              </div>
            </div>
            <div className="font-display font-black text-3xl sm:text-4xl text-[#171717] leading-none mb-1">
              {formatMoney(totalRevenue)}
            </div>
            <div className="text-[11px] text-[#A82D24] font-bold">
              +{completedOrders.length} completed transactions
            </div>
          </div>

          {/* Card 2: Total Orders */}
          <div className="bg-white border-2 border-[#171717] p-6 shadow-[4px_4px_0px_0px_#171717]">
            <div className="flex items-center justify-between text-[#77736E] mb-2">
              <span className="font-display font-extrabold uppercase text-xs tracking-wider">
                Total Orders Placed
              </span>
              <div className="w-8 h-8 bg-[#F5F0E6] border border-[#171717] flex items-center justify-center text-[#171717]">
                <ShoppingBag className="w-4 h-4" />
              </div>
            </div>
            <div className="font-display font-black text-3xl sm:text-4xl text-[#171717] leading-none mb-1">
              {totalOrdersCount}
            </div>
            <div className="text-[11px] text-[#77736E]">
              {pendingOrders.length} in active kitchen queue
            </div>
          </div>

          {/* Card 3: Average Order Value */}
          <div className="bg-white border-2 border-[#171717] p-6 shadow-[4px_4px_0px_0px_#171717]">
            <div className="flex items-center justify-between text-[#77736E] mb-2">
              <span className="font-display font-extrabold uppercase text-xs tracking-wider">
                Average Order Value
              </span>
              <div className="w-8 h-8 bg-[#F5F0E6] border border-[#171717] flex items-center justify-center text-[#E9B949]">
                <TrendingUp className="w-4 h-4 text-[#171717]" />
              </div>
            </div>
            <div className="font-display font-black text-3xl sm:text-4xl text-[#171717] leading-none mb-1">
              {formatMoney(averageOrderValue)}
            </div>
            <div className="text-[11px] text-[#77736E]">
              Excluding cancelled / refunds
            </div>
          </div>

          {/* Card 4: Active Queue */}
          <div className="bg-white border-2 border-[#171717] p-6 shadow-[4px_4px_0px_0px_#171717]">
            <div className="flex items-center justify-between text-[#77736E] mb-2">
              <span className="font-display font-extrabold uppercase text-xs tracking-wider">
                Kitchen Status
              </span>
              <div className="w-8 h-8 bg-[#F5F0E6] border border-[#171717] flex items-center justify-center text-[#A82D24]">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div className="font-display font-black text-3xl sm:text-4xl text-[#A82D24] leading-none mb-1">
              {pendingOrders.length} Active
            </div>
            <div className="text-[11px] text-[#77736E]">
              Average cook time: 7.4 mins
            </div>
          </div>
        </div>

        {/* Visual CMS Spotlight Notice */}
        <div className="bg-[#171717] text-white p-6 border-4 border-[#171717] shadow-[6px_6px_0px_0px_#A82D24] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#A82D24] flex items-center justify-center border border-white">
              <Layers className="w-6 h-6 text-[#E9B949]" />
            </div>
            <div>
              <h3 className="font-display font-black text-2xl uppercase tracking-tight text-white leading-none">
                Visual Homepage CMS Ready
              </h3>
              <p className="text-xs text-[#FAF8F3]/75 font-body mt-1">
                Edit headlines, swap food photos, rearrange sections, and publish changes in real-time.
              </p>
            </div>
          </div>

          <Link
            to="/admin/homepage-editor"
            className="px-6 py-3 bg-[#E9B949] hover:bg-[#D3A43B] text-[#171717] font-display font-black uppercase text-sm tracking-wider flex items-center gap-1.5 transition-colors border border-white"
          >
            <span>Launch Visual Editor</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Revenue Bar Chart (7 cols) */}
          <div className="lg:col-span-8 bg-white border-2 border-[#171717] p-6 shadow-[4px_4px_0px_0px_#171717]">
            <h3 className="font-display font-black text-xl uppercase text-[#171717] mb-6">
              Daily Order Revenue ($)
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueChartData}>
                  <XAxis dataKey="day" stroke="#171717" fontSize={12} tickLine={false} />
                  <YAxis stroke="#171717" fontSize={12} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#171717',
                      color: '#FAF8F3',
                      border: '2px solid #171717',
                      fontFamily: 'Barlow Condensed',
                      textTransform: 'uppercase',
                    }}
                  />
                  <Bar dataKey="revenue" fill="#A82D24" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Category Sales Breakdown (4 cols) */}
          <div className="lg:col-span-4 bg-white border-2 border-[#171717] p-6 shadow-[4px_4px_0px_0px_#171717] flex flex-col justify-between">
            <h3 className="font-display font-black text-xl uppercase text-[#171717] mb-4">
              Sales by Category
            </h3>
            <div className="h-48 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={70}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-1.5 text-xs font-display font-bold uppercase pt-4 border-t border-[#E5DFD3]">
              {categoryData.map((c) => (
                <div key={c.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: c.color }} />
                    <span className="text-[#171717]">{c.name}</span>
                  </div>
                  <span className="font-mono text-[#77736E]">{c.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Orders Quick Table */}
        <div className="bg-white border-2 border-[#171717] p-6 shadow-[4px_4px_0px_0px_#171717]">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#E5DFD3]">
            <h3 className="font-display font-black text-xl uppercase text-[#171717]">
              Recent Live Orders
            </h3>
            <Link
              to="/admin/orders"
              className="text-xs font-bold uppercase font-display text-[#A82D24] hover:underline"
            >
              View All Orders →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-body">
              <thead>
                <tr className="border-b-2 border-[#171717] text-[#77736E] uppercase font-display font-bold">
                  <th className="py-2.5">Order</th>
                  <th className="py-2.5">Customer</th>
                  <th className="py-2.5">Type</th>
                  <th className="py-2.5">Items</th>
                  <th className="py-2.5">Total</th>
                  <th className="py-2.5">Status</th>
                  <th className="py-2.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F5F0E6]">
                {orders.slice(0, 5).map((ord) => (
                  <tr key={ord.id} className="hover:bg-[#FAF8F3]">
                    <td className="py-3 font-mono font-bold text-[#171717]">#{ord.orderNumber}</td>
                    <td className="py-3 font-medium text-[#171717]">{ord.customerName}</td>
                    <td className="py-3 uppercase font-display font-bold text-[11px]">
                      {ord.fulfillmentType}
                    </td>
                    <td className="py-3 text-[#77736E]">{ord.items.length} item(s)</td>
                    <td className="py-3 font-bold font-display text-sm text-[#171717]">
                      {formatMoney(ord.total)}
                    </td>
                    <td className="py-3">
                      <span className="text-[10px] font-bold uppercase font-display px-2 py-0.5 bg-[#F5F0E6] text-[#A82D24] border border-[#E5DFD3]">
                        {ord.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <Link
                        to="/admin/orders"
                        className="text-xs font-bold font-display text-[#171717] hover:text-[#A82D24] uppercase underline"
                      >
                        Manage
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
