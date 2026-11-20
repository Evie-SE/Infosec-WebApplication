import { Fragment, useMemo, useState } from 'react';
import {
  Boxes,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  Grid2X2,
  Package,
  Search,
  Tags,
  Trash2,
} from 'lucide-react';
import PageHeader from '../components/PageHeader.jsx';

const tabs = [
  { id: 'products', label: 'Products', icon: Package },
  { id: 'category', label: 'Category', icon: Grid2X2 },
  { id: 'brands', label: 'Brands', icon: Tags },
];

function SelectControl({ label, value, options, onChange }) {
  return (
    <label className="relative">
      <span className="sr-only">{label}</span>
      <select
        aria-label={label}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-10 min-w-28 appearance-none rounded-xl border border-slate-200 bg-white py-2 pl-3 pr-9 text-sm text-slate-600 outline-none focus:ring-2 focus:ring-slate-300"
      >
        <option value="">{label}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-500" />
    </label>
  );
}

function downloadReport(products) {
  const rows = [
    ['Product name', 'SKU', 'Category', 'Brand', 'Stock units', 'Sold units', 'Incoming', 'Unit price', 'Stock status'],
    ...products.map((product) => [
      product.name,
      product.sku,
      product.category,
      product.brand,
      product.stock,
      product.sold,
      product.incoming,
      product.price.toFixed(2),
      product.stock <= 20 ? 'Low stock' : 'In stock',
    ]),
  ];
  const csv = rows.map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(',')).join('\n');
  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = 'inventory-report.csv';
  link.click();
  URL.revokeObjectURL(url);
}

export default function InventoryReportPage({ products, onDeleteProducts }) {
  const [activeTab, setActiveTab] = useState('products');
  const [search, setSearch] = useState('');
  const [period, setPeriod] = useState('1 year');
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [pageSize, setPageSize] = useState('10');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    return products.filter((product) => {
      const matchesQuery = `${product.name} ${product.sku} ${product.brand} ${product.category}`
        .toLowerCase()
        .includes(query);
      return matchesQuery && (!category || product.category === category) && (!brand || product.brand === brand);
    });
  }, [brand, category, products, search]);

  const pageCount = Math.max(1, Math.ceil(filteredProducts.length / Number(pageSize)));
  const displayedPage = Math.min(currentPage, pageCount);
  const pageProducts = filteredProducts.slice(
    (displayedPage - 1) * Number(pageSize),
    displayedPage * Number(pageSize),
  );
  const firstProductNumber = filteredProducts.length ? (displayedPage - 1) * Number(pageSize) + 1 : 0;
  const lastProductNumber = Math.min(displayedPage * Number(pageSize), filteredProducts.length);
  const allVisibleSelected = pageProducts.length > 0 && pageProducts.every((product) => selectedIds.includes(product.id));

  const toggleProduct = (id) => {
    setSelectedIds((current) => current.includes(id)
      ? current.filter((selectedId) => selectedId !== id)
      : [...current, id]);
  };

  const toggleVisibleProducts = () => {
    setSelectedIds((current) => allVisibleSelected
      ? current.filter((id) => !pageProducts.some((product) => product.id === id))
      : [...new Set([...current, ...pageProducts.map((product) => product.id)])]);
  };

  const removeSelectedProducts = async () => {
    setDeleting(true);
    try {
      await onDeleteProducts(selectedIds);
      setSelectedIds([]);
      setExpandedId(null);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="min-h-full bg-slate-50/50 p-4 font-sans text-slate-800 sm:p-8">
      <PageHeader />

      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="page-heading text-xl">Inventory Report</h2>
          <p className="mt-1 text-sm text-slate-500">Stock, sales and incoming units across all {products.length} shoes.</p>
        </div>
        <div className="flex items-center gap-2">
          {activeTab === 'products' && selectedIds.length > 0 && (
            <button
              type="button"
              onClick={removeSelectedProducts}
              disabled={deleting}
              className="inline-flex h-9 items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-3 text-sm font-medium text-rose-700 transition hover:bg-rose-100 disabled:opacity-50"
            >
              <Trash2 className="h-4 w-4" />
              {deleting ? 'Removing…' : `Remove ${selectedIds.length} selected`}
            </button>
          )}
          <button
            type="button"
            onClick={() => downloadReport(filteredProducts)}
            className="inline-flex h-9 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
          >
            <Download className="h-4 w-4" />
            Export report
          </button>
        </div>
      </div>

      <section className="surface-card overflow-hidden p-4 sm:p-5">
        <div className="flex items-center justify-between border-b border-slate-200">
          <div className="flex gap-5">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  type="button"
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  aria-pressed={active}
                  className={`inline-flex items-center gap-2 border-b-2 px-1 pb-3 text-sm transition ${
                    active
                      ? 'border-slate-800 font-semibold text-slate-800'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
          <span className="pb-3 text-xs text-slate-500">{filteredProducts.length} products</span>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 py-4">
          <label className="relative w-full sm:max-w-[300px]">
            <span className="sr-only">Search shoes or SKU</span>
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search shoes or SKU"
              className="h-10 w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-slate-300"
            />
          </label>
          <div className="flex flex-wrap items-center gap-2">
            <SelectControl label="Period" value={period} options={['1 year', '30 days', '90 days']} onChange={setPeriod} />
            <SelectControl
              label="All categories"
              value={category}
              options={[...new Set(products.map((product) => product.category))]}
              onChange={(value) => {
                setCategory(value);
                setCurrentPage(1);
              }}
            />
            <SelectControl
              label="All brands"
              value={brand}
              options={[...new Set(products.map((product) => product.brand))]}
              onChange={(value) => {
                setBrand(value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>

        {activeTab === 'products' ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-200 text-xs font-medium text-slate-500">
                  <th className="w-10 py-3 pr-2">
                    <input
                      type="checkbox"
                      aria-label="Select all visible products"
                      checked={allVisibleSelected}
                      onChange={toggleVisibleProducts}
                      className="h-4 w-4 rounded border-slate-300 accent-slate-800"
                    />
                  </th>
                  <th className="py-3 pr-4">Product name</th>
                  <th className="py-3 pr-4">Category</th>
                  <th className="py-3 pr-4">Brand</th>
                  <th className="py-3 pr-4">Stock units</th>
                  <th className="py-3 pr-4">Sold units</th>
                  <th className="py-3 pr-4">Incoming</th>
                  <th className="py-3 pr-4">Unit price</th>
                  <th className="py-3 pr-4">Stock status</th>
                  <th className="w-8 py-3" aria-label="More details" />
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {pageProducts.map((product) => {
                  const lowStock = product.stock <= 20;
                  const expanded = expandedId === product.id;
                  return (
                    <Fragment key={product.id}>
                      <tr className="border-b border-slate-100 transition-colors hover:bg-slate-50/70">
                        <td className="py-3 pr-2">
                          <input
                            type="checkbox"
                            aria-label={`Select ${product.name}`}
                            checked={selectedIds.includes(product.id)}
                            onChange={() => toggleProduct(product.id)}
                            className="h-4 w-4 rounded border-slate-300 accent-slate-800"
                          />
                        </td>
                        <td className="py-2 pr-3">
                          <div className="flex min-w-0 items-center gap-2.5">
                            <img src={product.images[0].src} alt="" className="h-10 w-12 shrink-0 rounded-md bg-slate-100 object-cover" />
                            <div className="min-w-0">
                              <p className="truncate font-medium text-slate-800">{product.name}</p>
                              <p className="mt-0.5 text-xs text-slate-400">{product.sku}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 pr-3 text-slate-600">{product.category}</td>
                        <td className="py-3 pr-3 text-slate-600">{product.brand}</td>
                        <td className={`py-3 pr-3 ${lowStock ? 'text-amber-700' : 'font-medium text-slate-800'}`}>{product.stock} pairs</td>
                        <td className="py-3 pr-3 text-slate-600">{product.sold} pairs</td>
                        <td className="py-3 pr-3 font-medium text-emerald-600">{product.incoming} pairs</td>
                        <td className="py-3 pr-3 text-slate-700">${product.price.toFixed(2)}</td>
                        <td className="py-3 pr-3">
                          <span className={`inline-flex min-w-[76px] items-center justify-center rounded-full px-2.5 py-1 text-xs font-medium ${
                            lowStock ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                          }`}>
                            {lowStock ? 'Low stock' : 'In stock'}
                          </span>
                        </td>
                        <td className="py-3">
                          <button
                            type="button"
                            aria-label={`${expanded ? 'Hide' : 'Show'} ${product.name} details`}
                            aria-expanded={expanded}
                            onClick={() => setExpandedId(expanded ? null : product.id)}
                            className="grid h-8 w-8 place-items-center text-slate-500 hover:text-slate-800"
                          >
                            <ChevronDown className={`h-4 w-4 transition-transform ${expanded ? 'rotate-180' : ''}`} />
                          </button>
                        </td>
                      </tr>
                      {expanded && (
                        <tr className="border-b border-slate-100 bg-slate-50">
                          <td colSpan={10} className="px-12 py-3 text-xs text-slate-600">
                            SKU: {product.sku} <span className="mx-3 text-slate-300">|</span>
                            Available after incoming shipment: {product.stock + product.incoming} pairs
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  );
                })}
                {pageProducts.length === 0 && (
                  <tr>
                    <td colSpan={10} className="py-10 text-center text-sm text-slate-500">
                      No products match these filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 py-2 sm:grid-cols-2 lg:grid-cols-3">
            {(activeTab === 'category'
              ? [...new Set(filteredProducts.map((product) => product.category))].map((name) => ({
                name,
                count: filteredProducts.filter((product) => product.category === name).length,
              }))
              : [...new Set(filteredProducts.map((product) => product.brand))].map((name) => ({
                name,
                count: filteredProducts.filter((product) => product.brand === name).length,
              }))
            ).map((group) => (
              <article key={group.name} className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-slate-100 text-slate-600">
                    {activeTab === 'category' ? <Boxes className="h-5 w-5" /> : <Tags className="h-5 w-5" />}
                  </span>
                  <div>
                    <h3 className="font-medium text-slate-800">{group.name}</h3>
                    <p className="text-xs text-slate-500">{group.count} products</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-4 text-xs text-slate-500">
          <div className="flex items-center gap-4">
            <label className="relative">
              <span className="sr-only">Rows per page</span>
              <select
                value={pageSize}
                onChange={(event) => {
                  setPageSize(event.target.value);
                  setCurrentPage(1);
                }}
                className="h-9 appearance-none rounded-xl border border-slate-200 bg-white py-1.5 pl-3 pr-8 outline-none"
              >
                <option value="10">10 / page</option>
                <option value="5">5 / page</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2" />
            </label>
            <span>Showing {firstProductNumber}–{lastProductNumber} of {filteredProducts.length} products</span>
            {selectedIds.length > 0 && (
              <span className="inline-flex items-center gap-1 text-slate-700">
                <Check className="h-3.5 w-3.5" /> {selectedIds.length} selected
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={displayedPage === 1}
              onClick={() => setCurrentPage(displayedPage - 1)}
              className="inline-flex h-8 items-center gap-1 px-2 text-slate-500 hover:text-slate-800 disabled:cursor-not-allowed disabled:text-slate-300"
            >
              <ChevronLeft className="h-4 w-4" /> Previous
            </button>
            <span className="grid h-8 w-8 place-items-center rounded-full bg-slate-800 font-semibold text-white">{displayedPage}</span>
            <button
              type="button"
              disabled={displayedPage === pageCount}
              onClick={() => setCurrentPage(displayedPage + 1)}
              className="inline-flex h-8 items-center gap-1 px-2 text-slate-500 hover:text-slate-800 disabled:cursor-not-allowed disabled:text-slate-300"
            >
              Next <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      <p className="mt-4 text-xs text-slate-500">
        Sample stock, incoming quantities and SKUs. Product names and prices follow the product catalog.
      </p>
    </div>
  );
}
