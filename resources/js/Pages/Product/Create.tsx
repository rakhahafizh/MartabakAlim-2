import React, { useState } from 'react';
import { router, Head, Link } from '@inertiajs/react';
import AppLayout from '@/Components/Layout/AppLayout';
import Button from '@/Components/UI/Button';
import Input from '@/Components/UI/Input';

export default function ProductCreate() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: null as File | null,
    category: '',
    badge: '',
    is_featured: true,
    order: 0
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [processing, setProcessing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('price', formData.price);
    if (formData.image) {
      formDataToSend.append('image', formData.image);
    }
    formDataToSend.append('category', formData.category);
    formDataToSend.append('badge', formData.badge);
    formDataToSend.append('is_featured', formData.is_featured ? '1' : '0');
    formDataToSend.append('order', formData.order.toString());

    router.post('/products', formDataToSend, {
      onError: (errors) => {
        setErrors(errors as Record<string, string>);
        setProcessing(false);
      },
      onSuccess: () => {
        setProcessing(false);
      },
      forceFormData: true
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? parseInt(value) : value
    }));
    
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <AppLayout title="Tambah Product Baru - Martabak Alim">
      <Head title="Tambah Product" />
      
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link href="/products" className="text-[#D4A574] hover:text-[#B8864F] font-medium flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Kembali ke Daftar Produk
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Tambah Product Baru</h1>
          <p className="text-gray-600 mb-8">Isi form di bawah untuk menambahkan produk menu baru.</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Nama Produk <span className="text-red-500">*</span>
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Contoh: Martabak Manis Jumbo Durian Keju"
                className={errors.name ? 'border-red-500' : ''}
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Deskripsi <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                placeholder="Masukkan deskripsi produk"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4A574] ${
                  errors.description ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
            </div>

            {/* Price */}
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                Harga <span className="text-red-500">*</span>
              </label>
              <Input
                id="price"
                name="price"
                type="text"
                value={formData.price}
                onChange={handleChange}
                placeholder="Rp. 60.000"
                className={errors.price ? 'border-red-500' : ''}
              />
              {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
            </div>

            {/* Image Upload */}
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                Gambar Produk <span className="text-red-500">*</span>
              </label>
              <input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4A574] ${
                  errors.image ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image}</p>}
              {imagePreview && (
                <div className="mt-4">
                  <img src={imagePreview} alt="Preview" className="h-48 w-auto rounded-lg border border-gray-300" />
                </div>
              )}
            </div>

            {/* Category and Badge */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Kategori <span className="text-red-500">*</span>
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4A574] ${
                    errors.category ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Pilih Kategori</option>
                  <option value="Signature">Signature</option>
                  <option value="Classic">Classic</option>
                  <option value="Savory">Savory</option>
                  <option value="Premium">Premium</option>
                </select>
                {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
              </div>

              <div>
                <label htmlFor="badge" className="block text-sm font-medium text-gray-700 mb-2">
                  Badge <span className="text-red-500">*</span>
                </label>
                <select
                  id="badge"
                  name="badge"
                  value={formData.badge}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4A574] ${
                    errors.badge ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Pilih Badge</option>
                  <option value="Best Seller">Best Seller</option>
                  <option value="Recommended">Recommended</option>
                  <option value="New">New</option>
                  <option value="Popular">Popular</option>
                </select>
                {errors.badge && <p className="mt-1 text-sm text-red-600">{errors.badge}</p>}
              </div>
            </div>

            {/* Order & Featured */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="order" className="block text-sm font-medium text-gray-700 mb-2">
                  Urutan Tampilan
                </label>
                <Input
                  id="order"
                  name="order"
                  type="number"
                  value={formData.order}
                  onChange={handleChange}
                  placeholder="0"
                  className={errors.order ? 'border-red-500' : ''}
                />
                <p className="mt-1 text-xs text-gray-500">Semakin kecil angka, semakin di atas</p>
                {errors.order && <p className="mt-1 text-sm text-red-600">{errors.order}</p>}
              </div>

              <div className="flex items-center pt-8">
                <input
                  id="is_featured"
                  name="is_featured"
                  type="checkbox"
                  checked={formData.is_featured}
                  onChange={handleChange}
                  className="h-4 w-4 text-[#D4A574] focus:ring-[#D4A574] border-gray-300 rounded"
                />
                <label htmlFor="is_featured" className="ml-2 block text-sm text-gray-700">
                  Tampilkan di home page (Featured)
                </label>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4 pt-6 border-t border-gray-200">
              <Button
                type="submit"
                disabled={processing}
                className="flex-1 bg-gradient-to-r from-[#D4A574] to-[#B8864F] hover:from-[#B8864F] hover:to-[#9A6F3F] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {processing ? 'Menyimpan...' : 'Simpan Produk'}
              </Button>
              <Link href="/products">
                <Button
                  type="button"
                  variant="secondary"
                  className="px-8"
                >
                  Batal
                </Button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </AppLayout>
  );
}
