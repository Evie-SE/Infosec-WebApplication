import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

export default function ProductDetails({ product, onClose }) {
  const inStock = product.stock > 20;
  const primaryImage = product.images[0];
  const salesRevenue = product.unitsSoldLast30Days * product.price;

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex justify-center overflow-y-auto bg-slate-900/25 p-3 sm:p-6 lg:left-64"
      onMouseDown={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-overview-title"
        className="my-auto max-h-[calc(100dvh-1.5rem)] w-full max-w-[620px] overflow-y-auto rounded-3xl border border-sky-100 bg-[#eef8fc] shadow-2xl"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="flex items-center justify-between border-b border-sky-100 px-7 py-4">
          <h2 id="product-overview-title" className="text-lg font-semibold text-slate-800">
            Product overview
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close product details"
            className="grid h-10 w-10 place-items-center rounded-xl text-slate-500 transition hover:bg-white/70 hover:text-slate-800"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        <div className="space-y-5 px-7 pb-6 pt-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h1 className="text-2xl font-semibold leading-8 text-slate-800">{product.name}</h1>
              <p className="mt-1 text-sm text-slate-500">
                {product.brand} <span className="px-1 text-slate-300">/</span> {product.category}
              </p>
            </div>
            <span className={`mt-1 shrink-0 rounded-lg px-4 py-2 text-sm font-medium ${inStock ? 'bg-emerald-100/70 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
              {inStock ? 'In stock' : 'Low stock'}
            </span>
          </div>

          <div className="h-48 overflow-hidden rounded-xl bg-white/70">
            <img src={primaryImage.src} alt={product.name} className="h-full w-full object-contain" />
          </div>

          <section aria-labelledby="product-description-heading">
            <h3 id="product-description-heading" className="text-base font-semibold text-slate-800">
              Description
            </h3>
            <p className="mt-1.5 text-sm leading-5 text-slate-500">{product.description}</p>
          </section>

          <section aria-labelledby="product-inventory-heading">
            <h3 id="product-inventory-heading" className="text-base font-semibold text-slate-800">
              Pricing &amp; inventory
            </h3>
            <div className="mt-3 grid grid-cols-3 gap-3">
              <div>
                <p className="text-sm text-slate-500">Sale price</p>
                <p className="mt-1 text-2xl font-semibold leading-8 text-slate-800">${product.price}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Original price</p>
                <p className="mt-1 text-xl font-medium leading-8 text-slate-500 line-through">${product.originalPrice}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Stock left</p>
                <p className="mt-1 text-2xl font-semibold leading-8 text-slate-800">{product.stock} units</p>
              </div>
            </div>
            {product.sizes?.length > 0 && (
              <div className="mt-3 grid grid-cols-2 gap-2 rounded-xl bg-slate-100/80 px-3 py-3 text-center text-sm text-slate-600 sm:grid-cols-4">
                {product.sizes.map(({ size, stock }) => (
                  <span key={size}>US {size} · {stock}</span>
                ))}
              </div>
            )}
          </section>

          <section aria-labelledby="product-sales-heading">
            <h3 id="product-sales-heading" className="text-base font-semibold text-slate-800">
              Sales performance
            </h3>
            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-xl bg-white/80 px-4 py-3 shadow-md shadow-slate-900/10">
                <p className="text-sm text-slate-600">Total sold</p>
                <p className="mt-1 text-2xl font-semibold leading-7 text-slate-900">{product.sold}</p>
                <p className="mt-1 text-xs text-slate-600">All time</p>
              </div>
              <div className="rounded-xl bg-white/80 px-4 py-3 shadow-md shadow-slate-900/10">
                <p className="text-sm text-slate-500">Units sold</p>
                <p className="mt-1 text-2xl font-semibold leading-7 text-slate-800">{product.unitsSoldLast30Days}</p>
                <p className="mt-1 text-xs text-slate-500">Last 30 days</p>
              </div>
              <div className="rounded-xl bg-white/80 px-4 py-3 shadow-md shadow-slate-900/10">
                <p className="text-sm text-slate-500">Sales revenue</p>
                <p className="mt-1 text-2xl font-semibold leading-7 text-slate-800">
                  ${salesRevenue.toLocaleString()}
                </p>
                <p className="mt-1 text-xs text-slate-500">Last 30 days</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>,
    document.body,
  );
}
