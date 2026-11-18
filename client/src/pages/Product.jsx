import { useMemo, useState } from 'react';
import {
  ArrowRight,
  ChevronDown,
  Download,
  Grid2X2,
  List,
  MoreVertical,
  Plus,
  Search,
  Upload,
} from 'lucide-react';
import PageHeader from '../components/PageHeader.jsx';
import ProductDetails from '../components/ProductDetails.jsx';

function FilterSelect({ label, value, options, onChange }) {
  return (
    <label className="relative">
      <span className="sr-only">{label}</span>
      <select
        aria-label={label}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-10 min-w-[112px] appearance-none rounded-xl border border-slate-200 bg-white py-2 pl-4 pr-9 text-sm text-slate-600 outline-none transition hover:bg-slate-50 focus:ring-2 focus:ring-slate-300"
      >
        <option value="">{label}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-500"
      />
    </label>
  );
}

function ProductCard({ product, listView, onViewProduct }) {
  return (
    <article
      className={`surface-card group overflow-hidden transition-shadow hover:shadow-md ${
        listView ? 'grid grid-cols-[minmax(150px,240px)_1fr] items-stretch' : ''
      }`}
    >
      <div className={`relative overflow-hidden bg-slate-50 ${listView ? 'h-full min-h-44' : 'h-[188px]'}`}>
        <img
          src={product.images[0].src}
          alt={product.name}
          className="h-full w-full object-cover mix-blend-multiply transition-transform duration-300 group-hover:scale-[1.03]"
        />
        <button
          type="button"
          aria-label={`More options for ${product.name}`}
          className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-white/85 text-[#71818a] shadow-sm transition hover:bg-white"
        >
          <MoreVertical className="h-4 w-4" />
        </button>
      </div>
      <div className="flex min-w-0 flex-col px-3 pb-3 pt-2.5">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-semibold leading-6 text-slate-800">${product.price}</span>
            <span className="text-xs text-slate-400 line-through">${product.originalPrice}</span>
          </div>
          <span aria-label="In stock" className={`h-1.5 w-1.5 shrink-0 rounded-full ${product.color}`} />
        </div>
        <h2 className="text-sm font-medium leading-5 text-slate-800">{product.name}</h2>
        <div className="relative mt-1.5 min-h-8 pr-24 text-xs leading-4 text-slate-500">
          <div className="space-y-0.5">
            <p>Category: {product.category}</p>
            <p>Brand: {product.brand}</p>
          </div>
          <button
            type="button"
            onClick={() => onViewProduct(product)}
            aria-label={`View details for ${product.name}`}
            className="pointer-events-none absolute right-0 top-1/2 inline-flex -translate-y-1/2 items-center gap-1 rounded-md bg-rose-100 px-2 py-1 text-[10px] font-medium text-rose-700 opacity-0 transition-opacity group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
          >
            View details
            <ArrowRight aria-hidden="true" className="h-3 w-3" />
          </button>
        </div>
        <div className="mt-auto flex items-center justify-between gap-2 pt-2 text-xs text-slate-500">
          <span className="flex min-w-0 items-center gap-1.5">
            <img src={product.avatar} alt="" className="h-5 w-5 shrink-0 rounded-full object-cover" />
            <span className="truncate">{product.seller}</span>
          </span>
          <span className="shrink-0">Sold: {product.sold}</span>
        </div>
      </div>
    </article>
  );
}

export default function ProductPage({ products }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [listView, setListView] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filteredProducts = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    const result = products.filter((product) => {
      const matchesSearch = `${product.name} ${product.brand} Sneakers`.toLowerCase().includes(query);
      return matchesSearch && (!category || category === 'Sneakers') && (!brand || product.brand === brand);
    });

    if (sortOrder === 'Popular') return [...result].sort((a, b) => b.sold - a.sold);
    if (sortOrder === 'Price: low to high') return [...result].sort((a, b) => a.price - b.price);
    if (sortOrder === 'Price: high to low') return [...result].sort((a, b) => b.price - a.price);
    return result;
  }, [brand, category, products, searchTerm, sortOrder]);

  return (
    <div className="min-h-full bg-slate-50/50 p-4 font-sans text-slate-800 sm:p-8">
      <PageHeader />

      <main>
        <div className="mb-5 flex flex-wrap items-center justify-between gap-5">
          <div className="flex items-center gap-3">
            <h2 className="section-heading text-xl">Products</h2>
            <span className="rounded-md bg-[#f04a2c] px-2 py-0.5 text-sm font-semibold leading-5 text-white">242</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button type="button" className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50">
              <Download className="h-3 w-3" />
              Import
            </button>
            <button type="button" className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50">
              <Upload className="h-3 w-3" />
              Export
            </button>
            <button type="button" className="inline-flex h-9 items-center gap-1.5 rounded-xl bg-slate-900 px-3.5 text-sm font-medium text-white transition hover:bg-slate-700">
              <Plus className="h-3 w-3" />
              Add Product
            </button>
          </div>
        </div>

        <div className="mb-8 flex flex-wrap items-center justify-between gap-5">
          <label className="relative w-full sm:max-w-[300px]">
            <span className="sr-only">Search products</span>
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#70838c]" />
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search products"
              className="h-10 w-full rounded-xl border border-slate-200 bg-white pl-9 pr-4 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-slate-300"
            />
          </label>
          <div className="flex flex-wrap items-center justify-end gap-2">
            <FilterSelect label="Category" value={category} options={['Sneakers']} onChange={setCategory} />
            <FilterSelect
              label="Brand"
              value={brand}
              options={[...new Set(products.map((product) => product.brand))]}
              onChange={setBrand}
            />
            <FilterSelect
              label="Popular"
              value={sortOrder}
              options={['Popular', 'Price: low to high', 'Price: high to low']}
              onChange={setSortOrder}
            />
            <div className="ml-1 flex items-center gap-1.5">
              <button
                type="button"
                aria-label="List view"
                aria-pressed={listView}
                onClick={() => setListView(true)}
                className={`grid h-9 w-9 place-items-center rounded-xl border transition ${listView ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 bg-white text-slate-500 hover:bg-slate-50'}`}
              >
                <List className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="Grid view"
                aria-pressed={!listView}
                onClick={() => setListView(false)}
                className={`grid h-9 w-9 place-items-center rounded-xl border transition ${!listView ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 bg-white text-slate-500 hover:bg-slate-50'}`}
              >
                <Grid2X2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className={listView ? 'grid grid-cols-1 gap-5' : 'grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4'}>
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                listView={listView}
                onViewProduct={setSelectedProduct}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-xl bg-white/70 px-4 py-10 text-center text-sm text-[#71838c]">
            No products match your search or filters.
          </div>
        )}

        <p className="mt-6 text-xs text-slate-500">Showing {filteredProducts.length} products</p>
      </main>
      {selectedProduct && (
        <ProductDetails product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </div>
  );
}
