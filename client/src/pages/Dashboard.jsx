import {
  TrendingUp,
  Download,
  Printer,
  Eye,
  ChevronRight,
  //MoreHorizontal
} from 'lucide-react';

const stats = [
  {
    title: 'Total Sales',
    value: '$30,412',
    change: '1.5%',
    period: 'vs last Month',
    valueColor: 'text-emerald-600',
    changeColor: 'text-emerald-500'
  },
  {
    title: 'Total Order',
    value: '12,980',
    change: '1.5%',
    period: 'vs last Month',
    valueColor: 'text-rose-500',
    changeColor: 'text-emerald-500'
  },
  {
    title: 'Total Customer',
    value: '2.753',
    change: '114 new customer',
    period: 'vs last month',
    valueColor: 'text-emerald-600',
    changeColor: 'text-emerald-500'
  }
];

const recentOrders = [
  {
    orderNumber: '12563987563',
    date: '18/7/2023',
    product: 'Dolan watch',
    customerName: 'Allan wood',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&auto=format&fit=crop&q=80',
    totalAmount: ' ₱1,349',
    status: 'on process',
    statusStyle: 'bg-amber-50 text-amber-600 border-amber-200'
  },
  {
    orderNumber: '125479663587',
    date: '18/7/2023',
    product: 'Hollan Bag',
    customerName: 'Damian simsons',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=80&auto=format&fit=crop&q=80',
    totalAmount: ' ₱649',
    status: 'Waiting payment',
    statusStyle: 'bg-slate-100 text-slate-500 border-slate-200'
  },
  {
    orderNumber: '154986315687',
    date: '18/7/2023',
    product: 'Eagle Bag',
    customerName: 'Hanah cole',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=80',
    totalAmount: ' ₱745',
    status: 'Delivered',
    statusStyle: 'bg-emerald-50 text-emerald-600 border-emerald-200'
  },
  {
    orderNumber: '123698745632',
    date: '18/7/2023',
    product: 'Moze Cap',
    customerName: 'Gabbie Scott',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80',
    totalAmount: ' ₱523',
    status: 'Canceled',
    statusStyle: 'bg-rose-50 text-rose-500 border-rose-200'
  }
];

export default function DashboardPage() {
  return (
    <div className="flex-1 bg-slate-50/50 p-8 min-h-screen font-sans">
      {/* Top Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Welcome, Jeriana</h1>
        <p className="text-sm text-slate-400 mt-0.5">1 April 2023</p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="text-sm font-medium text-slate-500">{stat.title}</h3>
            
            <div className="flex items-center gap-1.5 mt-2 mb-3">
              <TrendingUp className={`w-3.5 h-3.5  ₱{stat.changeColor}`} />
              <span className={`text-xs font-semibold  ₱{stat.changeColor}`}>
                ↑ {stat.change}
              </span>
              <span className="text-xs text-slate-400">₱{stat.period}</span>
            </div>

            <p className={`text-3xl font-bold  ${stat.valueColor} tracking-tight`}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Recent Orders Section */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-slate-900">Recent Order</h2>
        </div>

        {/* Orders Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-xs font-medium text-slate-400 border-b border-slate-100">
                <th className="pb-3 font-medium">Order Number</th>
                <th className="pb-3 font-medium">Date</th>
                <th className="pb-3 font-medium">Product</th>
                <th className="pb-3 font-medium">Customer</th>
                <th className="pb-3 font-medium">Total Amount</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {recentOrders.map((order, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 font-semibold text-slate-800">{order.orderNumber}</td>
                  <td className="py-4 text-slate-500">{order.date}</td>
                  <td className="py-4">
                    <div>
                      <p className="font-medium text-slate-700">{order.product}</p>
                      <button className="text-[11px] text-slate-400 hover:text-slate-600 flex items-center gap-0.5 mt-0.5">
                        See more <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <img
                        src={order.avatar}
                        alt={order.customerName}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <span className="font-medium text-slate-700">{order.customerName}</span>
                    </div>
                  </td>
                  <td className="py-4 font-semibold text-slate-800">{order.totalAmount}</td>
                  <td className="py-4">
                    <span className={`inline-block px-2.5 py-1 rounded-full text-[11px] border  ₱{order.statusStyle}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center justify-end gap-2 text-slate-400">
                      <button className="hover:text-slate-600 p-1">
                        <Download className="w-3.5 h-3.5" />
                      </button>
                      <button className="hover:text-slate-600 p-1">
                        <Printer className="w-3.5 h-3.5" />
                      </button>
                      <button className="hover:text-slate-600 p-1">
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}