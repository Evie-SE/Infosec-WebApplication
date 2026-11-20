import fallbackImage from './assets/products/nike-air-max.jpg';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

export const DEFAULT_AVATAR = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&auto=format&fit=crop&q=80';

async function request(path, options = {}) {
  let response;

  try {
    response = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
  } catch {
    throw new Error('Cannot reach the API. Is the server running?');
  }

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.errorMessage || data?.message || `Request failed (${response.status})`);
  }

  return data;
}

async function getList(path) {
  try {
    return await request(path);
  } catch (error) {
    if (error.message.includes('(404)') || /\bno .* found/i.test(error.message)) {
      return [];
    }
    throw error;
  }
}

export function normalizeProduct(product) {
  const brand = typeof product.brand === 'string' ? product.brand : product.brand?.name;
  const category = typeof product.category === 'string' ? product.category : product.category?.name;
  const price = Number(product.price) || 0;
  const imageUrl = typeof product.imageUrl === 'string' ? product.imageUrl.trim() : '';
  const images = imageUrl
    ? [{ label: 'Product image', src: imageUrl }]
    : (product.images || []).map((image) =>
        typeof image === 'string' ? { label: 'Product image', src: image } : image,
      );

  return {
    ...product,
    id: product._id || product.id,
    name: product.name || 'Untitled product',
    sku: product.sku || '—',
    description: product.description || '',
    brand: brand || 'Unbranded',
    category: category || 'Uncategorized',
    brandId: typeof product.brand === 'object' ? product.brand?._id || product.brand?.id : product.brand,
    categoryId: typeof product.category === 'object' ? product.category?._id || product.category?.id : product.category,
    price,
    originalPrice: Number(product.originalPrice) || price,
    stock: Number(product.stock) || 0,
    sold: Number(product.sold) || 0,
    unitsSoldLast30Days: Number(product.unitsSoldLast30Days) || 0,
    incoming: Number(product.incoming) || 0,
    images: images.length ? images : [{ label: 'Product image', src: fallbackImage }],
    avatar: product.avatar || DEFAULT_AVATAR,
    seller: product.seller || 'Unknown',
    color: product.color || 'bg-slate-400',
    sizes: product.sizes || [],
  };
}

export async function getProducts() {
  const products = await getList('/products');
  return (Array.isArray(products) ? products : []).map(normalizeProduct);
}

export const getBrands = () => getList('/brands');
export const getCategories = () => getList('/categories');
export const createBrand = (payload) => request('/brand', { method: 'POST', body: JSON.stringify(payload) });
export const createCategory = (payload) => request('/category', { method: 'POST', body: JSON.stringify(payload) });
export const getOrders = () => getList('/orders');
export const getUsers = () => getList('/users');

export const createProduct = (payload) =>
  request('/product', { method: 'POST', body: JSON.stringify(payload) });

export const updateProduct = (name, payload) =>
  request(`/product/${encodeURIComponent(name)}`, { method: 'PUT', body: JSON.stringify(payload) });

export const deleteProduct = (name) =>
  request(`/product/${encodeURIComponent(name)}`, { method: 'DELETE' });
