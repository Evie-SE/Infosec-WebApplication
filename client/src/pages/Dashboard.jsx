import { useState } from 'react';
import {
  TrendingUp,
  Download,
  Printer,
  Eye,
  ChevronRight,
} from 'lucide-react';
import PRODUCTS from '../data/products.js';

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

const orderChannels = [
  { name: 'E-commerce', value: 57 },
  { name: 'Offline store', value: 43 },
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
  },
  {
    orderNumber: '125479663587',
    date: '18/7/2023',
    product: 'Hollan Bag',
    customerName: 'Damian simsons',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=80&auto=format&fit=crop&q=80',
    totalAmount: ' ₱649',
    status: 'Waiting payment',
  },
  {
    orderNumber: '154986315687',
    date: '18/7/2023',
    product: 'Eagle Bag',
    customerName: 'Hanah cole',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=80',
    totalAmount: ' ₱745',
    status: 'Delivered',
  },
  {
    orderNumber: '123698745632',
    date: '18/7/2023',
    product: 'Moze Cap',
    customerName: 'Gabbie Scott',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80',
    totalAmount: ' ₱523',
    status: 'Canceled',
  }
];

const salesTrends = {
  'Nike Air Max': 'Down',
  'Adidas Samba': 'Up',
  'Puma Suede': 'Up',
  'Reebok Classic': 'Down',
  'Converse Chuck': 'Up',
  'Vans Old Skool': 'Up',
  'New Balance 574': 'Up',
};

export default function DashboardPage() {
  const [salesPeriod, setSalesPeriod] = useState('1 week');

  return (
    <div className="min-h-full bg-slate-50/50 p-4 font-sans text-slate-800 sm:p-8">
      {/* Top Header */}
      <div className="mb-8">
        <h1 className="page-heading">Welcome, Jeriana</h1>
        <p className="page-date">1 April 2023</p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        {stats.map((stat, idx) => (
          <div key={idx} className="surface-card p-5">
            <h3 className="text-sm font-medium text-slate-500">{stat.title}</h3>
            
            <div className="flex items-center gap-1.5 mt-2 mb-3">
              <TrendingUp className={`w-3.5 h-3.5 ${stat.changeColor}`} />
              <span className={`text-xs font-semibold ${stat.changeColor}`}>
                ↑ {stat.change}
              </span>
              <span className="text-xs text-slate-400">{stat.period}</span>
            </div>

            <p className={`text-3xl font-bold  ${stat.valueColor} tracking-tight`}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Sales charts */}
      <section className="mb-8 grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,2fr)_minmax(300px,1fr)]">
        <div className="surface-card p-5">
          <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="section-heading">Overall Sales</h2>
              <p className="mt-1 text-xs text-slate-400">Monthly sales comparison</p>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Last year
              </span>
              <span className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                This year
              </span>
              <span className="rounded-md bg-slate-100 px-2.5 py-1 font-medium">1Y</span>
            </div>
          </div>
          <div className="h-[230px] w-full">
            <svg
              viewBox="0 0 720 210"
              role="img"
              aria-label="Monthly sales comparison line chart"
              className="h-full w-full overflow-visible"
              preserveAspectRatio="none"
            >
              {[34, 74, 114, 154].map((y) => (
                <line key={y} x1="48" y1={y} x2="710" y2={y} stroke="#edf0f2" strokeDasharray="3 4" />
              ))}
              {[
                { label: '$30k', y: 38 },
                { label: '$20k', y: 78 },
                { label: '$10k', y: 118 },
                { label: '$0', y: 158 },
              ].map((tick) => (
                <text key={tick.label} x="2" y={tick.y} fill="#8a959d" fontSize="10">
                  {tick.label}
                </text>
              ))}
              <path
                d="M50 114 C72 116 82 110 107 111 S143 130 164 129 S199 89 220 65 S255 60 276 68 S310 89 331 76 S365 56 386 61 S421 95 442 85 S476 54 497 55 S532 71 553 67 S587 45 608 49 S642 62 663 57 S694 50 710 47"
                fill="none"
                stroke="#6258ff"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M50 112 C72 109 82 118 107 121 S143 98 164 117 S199 145 220 138 S255 83 276 81 S310 103 331 98 S365 73 386 79 S421 115 442 123 S476 142 497 134 S532 93 553 98 S587 127 608 133 S642 126 663 121 S694 116 710 115"
                fill="none"
                stroke="#16a34a"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
              />
              {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(
                (month, index) => (
                  <text
                    key={month}
                    x={54 + index * 59.5}
                    y="184"
                    fill="#8a959d"
                    fontSize="10"
                    textAnchor="middle"
                  >
                    {month}
                  </text>
                ),
              )}
            </svg>
          </div>
          <p className="mt-1 text-xs text-slate-400">Illustrative data</p>
        </div>

        <div className="surface-card p-5">
          <div>
            <h2 className="section-heading">Order Report</h2>
            <p className="mt-1 text-xs text-slate-400">Sales channel distribution</p>
          </div>
          <div className="flex min-h-[230px] items-center justify-center gap-4">
            <div className="relative h-40 w-40 shrink-0">
              <svg
                viewBox="0 0 160 160"
                role="img"
                aria-label="Order report: 57 percent e-commerce, 43 percent offline store"
                className="h-full w-full -rotate-90"
              >
                <circle cx="80" cy="80" r="52" fill="none" stroke="#d9dce0" strokeWidth="17" />
                <circle
                  cx="80"
                  cy="80"
                  r="52"
                  fill="none"
                  stroke="#303236"
                  strokeWidth="17"
                  strokeDasharray={`${2 * Math.PI * 52 * 0.57} ${2 * Math.PI * 52 * 0.43}`}
                />
              </svg>
              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xl font-bold text-slate-800">12,980</span>
                <span className="text-xs text-slate-400">total orders</span>
              </div>
            </div>
            <div className="space-y-4 text-xs">
              {orderChannels.map((channel) => (
                <div key={channel.name}>
                  <p className="flex items-center gap-1.5 text-slate-600">
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        channel.name === 'E-commerce' ? 'bg-[#303236]' : 'bg-[#d9dce0]'
                      }`}
                    />
                    {channel.name}
                  </p>
                  <p className="ml-3 text-sm font-bold text-slate-800">{channel.value}%</p>
                </div>
              ))}
            </div>
          </div>
          <p className="text-xs text-slate-400">Illustrative breakdown</p>
        </div>
      </section>

      {/* Recent Orders Section */}
      <div className="surface-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="section-heading text-xl">Recent Order</h2>
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
            <tbody className="divide-y divide-slate-100 text-sm">
              {recentOrders.map((order, idx) => (
                <tr
                  key={idx}
                  className={`transition-colors hover:bg-slate-50/70 ${
                    idx === 0 ? 'bg-sky-50/70' : ''
                  }`}
                >
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
                    <span className="text-base font-semibold text-slate-800">{order.status}</span>
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

      {/* Top Selling Shoes */}
      <section className="surface-card mt-8 p-5 sm:p-6">
        <div className="mb-3 flex items-center justify-between gap-4">
          <h2 className="section-heading">Top Selling Shoes</h2>
          <label>
            <span className="sr-only">Sales period</span>
            <select
              value={salesPeriod}
              onChange={(event) => setSalesPeriod(event.target.value)}
              className="h-9 min-w-28 rounded-lg border border-slate-200 bg-slate-50 px-3 text-xs text-slate-600 outline-none focus:ring-2 focus:ring-slate-300"
            >
              <option>1 week</option>
              <option>1 month</option>
              <option>1 year</option>
            </select>
          </label>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[420px] border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-200 text-xs font-medium text-slate-700">
                <th scope="col" className="py-2 font-medium">Product</th>
                <th scope="col" className="w-28 py-2 text-left font-medium">Trend</th>
                <th scope="col" className="w-20 py-2 text-right font-medium">Sale</th>
              </tr>
            </thead>
            <tbody className="text-sm text-slate-800">
              {PRODUCTS.map((product) => {
                const trend = salesTrends[product.name];
                return (
                  <tr key={product.id} className="border-b border-slate-200 last:border-b-0">
                    <td className="py-2">
                      <span className="font-medium">{product.name}</span>
                    </td>
                    <td className={`py-2 font-medium ${trend === 'Up' ? 'text-emerald-600' : 'text-red-600'}`}>
                      {trend}
                    </td>
                    <td className="py-2 text-right font-semibold">{product.sold}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}