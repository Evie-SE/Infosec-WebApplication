import { useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { createBrand, createCategory } from '../api.js';

const fieldClass = 'h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-slate-300';

async function resolveRef(value, options, create) {
  const name = value.trim();
  if (!name) throw new Error('Brand and category are required.');

  const match = options.find(
    (option) => option._id === name || option.name?.toLowerCase() === name.toLowerCase(),
  );
  if (match) return match._id;

  const created = await create({ name });
  return created._id;
}

export default function ProductForm({ product, brands, categories, saving, onSubmit, onClose }) {
  const [values, setValues] = useState({
    name: product?.name || '',
    brand: product?.brand || '',
    category: product?.category || '',
    price: product?.price ?? '',
    stock: product?.stock ?? '',
    imageUrl: product?.imageUrl || '',
  });
  const [formError, setFormError] = useState('');

  const setValue = (key) => (event) => setValues((current) => ({ ...current, [key]: event.target.value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError('');

    if (!values.name.trim()) {
      setFormError('Product name is required.');
      return;
    }

    try {
      const [brandId, categoryId] = await Promise.all([
        resolveRef(values.brand, brands, createBrand),
        resolveRef(values.category, categories, createCategory),
      ]);

      await onSubmit({
        name: values.name.trim(),
        brand: brandId,
        category: categoryId,
        price: Number(values.price) || 0,
        stock: Number(values.stock) || 0,
        imageUrl: values.imageUrl.trim(),
      });
    } catch (error) {
      setFormError(error.message);
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex justify-center overflow-y-auto bg-slate-900/25 p-3 sm:p-6 lg:left-64"
      onMouseDown={onClose}
    >
      <form
        onSubmit={handleSubmit}
        className="my-auto w-full max-w-[520px] rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-800">
              {product ? 'Edit product' : 'Add product'}
            </h2>
            <p className="mt-1 text-xs text-slate-500">Saved directly to the API.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close product form"
            className="grid h-9 w-9 place-items-center rounded-xl text-slate-500 hover:bg-slate-100"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="sm:col-span-2">
            <span className="mb-1.5 block text-xs font-medium text-slate-600">Product name</span>
            <input className={fieldClass} value={values.name} onChange={setValue('name')} required />
          </label>
          <label>
            <span className="mb-1.5 block text-xs font-medium text-slate-600">Brand</span>
            <input className={fieldClass} list="brand-options" value={values.brand} onChange={setValue('brand')} placeholder="e.g. Nike" required />
            <datalist id="brand-options">
              {brands.map((brand) => <option key={brand._id} value={brand.name} />)}
            </datalist>
          </label>
          <label>
            <span className="mb-1.5 block text-xs font-medium text-slate-600">Category</span>
            <input className={fieldClass} list="category-options" value={values.category} onChange={setValue('category')} placeholder="e.g. Sneakers" required />
            <datalist id="category-options">
              {categories.map((category) => <option key={category._id} value={category.name} />)}
            </datalist>
          </label>
          <label>
            <span className="mb-1.5 block text-xs font-medium text-slate-600">Price</span>
            <input className={fieldClass} type="number" min="0" step="0.01" value={values.price} onChange={setValue('price')} required />
          </label>
          <label>
            <span className="mb-1.5 block text-xs font-medium text-slate-600">Stock</span>
            <input className={fieldClass} type="number" min="0" step="1" value={values.stock} onChange={setValue('stock')} required />
          </label>
          <label className="sm:col-span-2">
            <span className="mb-1.5 block text-xs font-medium text-slate-600">Image URL</span>
            <input className={fieldClass} value={values.imageUrl} onChange={setValue('imageUrl')} placeholder="https://example.com/shoe.jpg" />
          </label>
        </div>

        {formError && <p className="mt-4 rounded-lg bg-rose-50 px-3 py-2 text-xs text-rose-700">{formError}</p>}

        <footer className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="h-9 rounded-xl border border-slate-200 px-4 text-sm font-medium text-slate-600 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="h-9 rounded-xl bg-slate-900 px-4 text-sm font-medium text-white hover:bg-slate-700 disabled:opacity-50"
          >
            {saving ? 'Saving…' : product ? 'Save changes' : 'Add product'}
          </button>
        </footer>
      </form>
    </div>,
    document.body,
  );
}
