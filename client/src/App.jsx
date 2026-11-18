import { useState } from 'react';
import Dashboard from './pages/Dashboard.jsx';
import InventoryReportPage from './pages/InventoryReport.jsx';
import ProductPage from './pages/Product';
import Sidebar from './navbar/Sidebar';
import PRODUCTS from './data/products.js';

function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [products, setProducts] = useState(PRODUCTS);

  return (
    <div className="flex h-dvh min-h-0 overflow-hidden bg-slate-100">
      <Sidebar initialActiveItem={activePage} onChange={setActivePage} />
      <div className="min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto">
        {activePage === 'products' ? (
          <ProductPage products={products} />
        ) : activePage === 'inventory-report' ? (
          <InventoryReportPage products={products} setProducts={setProducts} />
        ) : (
          <Dashboard products={products} />
        )}
      </div>
    </div>
  );
}

export default App;
