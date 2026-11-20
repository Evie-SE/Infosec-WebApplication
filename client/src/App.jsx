import { useCallback, useEffect, useState } from 'react';
import Dashboard from './pages/Dashboard.jsx';
import InventoryReportPage from './pages/InventoryReport.jsx';
import ProductPage from './pages/Product.jsx';
import Sidebar from './navbar/Sidebar.jsx';
import ProductForm from './components/ProductForm.jsx';
import {
  createProduct,
  deleteProduct,
  getBrands,
  getCategories,
  getOrders,
  getProducts,
  getUsers,
  normalizeProduct,
  updateProduct,
} from './api.js';

function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [saving, setSaving] = useState(false);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const [productList, brandList, categoryList, orderList, userList] = await Promise.all([
        getProducts(),
        getBrands(),
        getCategories(),
        getOrders(),
        getUsers(),
      ]);
      setProducts(productList);
      setBrands(brandList);
      setCategories(categoryList);
      setOrders(orderList);
      setUsers(userList);
    } catch (loadError) {
      setError(loadError.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    Promise.resolve().then(() => {
      if (!cancelled) loadData();
    });
    return () => {
      cancelled = true;
    };
  }, [loadData]);

  const openAddForm = () => {
    setEditingProduct(null);
    setFormOpen(true);
  };

  const openEditForm = (product) => {
    setEditingProduct(product);
    setFormOpen(true);
  };

  const handleSubmit = async (values) => {
    setSaving(true);
    setError('');
    try {
      if (editingProduct) {
        const updated = await updateProduct(editingProduct.name, values);
        const normalized = normalizeProduct(updated);
        setProducts((current) => current.map((product) => (product.id === editingProduct.id ? normalized : product)));
      } else {
        const created = await createProduct(values);
        setProducts((current) => [normalizeProduct(created), ...current]);
      }
      const [brandList, categoryList] = await Promise.all([getBrands(), getCategories()]);
      setBrands(brandList);
      setCategories(categoryList);
      setFormOpen(false);
      setEditingProduct(null);
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteProducts = async (ids) => {
    const targets = products.filter((product) => ids.includes(product.id));
    setError('');
    const results = await Promise.allSettled(targets.map((product) => deleteProduct(product.name)));

    const removedIds = new Set();
    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        removedIds.add(targets[index].id);
      } else {
        setError(result.reason.message);
      }
    });

    if (removedIds.size) {
      setProducts((current) => current.filter((product) => !removedIds.has(product.id)));
    }
  };

  return (
    <div className="flex h-dvh min-h-0 overflow-hidden bg-slate-100">
      <Sidebar initialActiveItem={activePage} onChange={setActivePage} />
      <div className="min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto">
        {error && (
          <div className="m-4 flex items-center justify-between gap-3 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 sm:m-8">
            <span>{error}</span>
            <button
              type="button"
              onClick={loadData}
              className="shrink-0 rounded-lg bg-rose-700 px-3 py-1.5 text-xs font-medium text-white hover:bg-rose-800"
            >
              Retry
            </button>
          </div>
        )}
        {loading ? (
          <div className="grid h-[60vh] place-items-center text-sm text-slate-500">Loading data from the API…</div>
        ) : activePage === 'products' ? (
          <ProductPage products={products} onAddProduct={openAddForm} onEditProduct={openEditForm} />
        ) : activePage === 'inventory-report' ? (
          <InventoryReportPage products={products} onDeleteProducts={handleDeleteProducts} />
        ) : (
          <Dashboard products={products} orders={orders} users={users} />
        )}
      </div>
      {formOpen && (
        <ProductForm
          product={editingProduct}
          brands={brands}
          categories={categories}
          saving={saving}
          onSubmit={handleSubmit}
          onClose={() => {
            setFormOpen(false);
            setEditingProduct(null);
          }}
        />
      )}
    </div>
  );
}

export default App;
