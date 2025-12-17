import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import AppLayout from '@/Components/Layout/AppLayout';
import Input from '@/Components/UI/Input';
import Button from '@/Components/UI/Button';

interface CreateFormData {
  item_code: string;
  item_name: string;
  category: string;
  unit: string;
  system_qty: string; // Changed from number to string
  location: string;
}

export default function StockCreate() {
  const [formData, setFormData] = useState<CreateFormData>({
    item_code: '',
    item_name: '',
    category: '',
    unit: '',
    system_qty: '', // Changed from 0 to empty string
    location: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [processing, setProcessing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    // Convert system_qty to number before sending
    const submitData = {
      ...formData,
      system_qty: parseFloat(formData.system_qty) || 0
    };

    router.post('/stock-opname', submitData, {
      onSuccess: () => {
        // Will redirect automatically
      },
      onError: (errors) => {
        setErrors(errors);
        setProcessing(false);
      },
      onFinish: () => {
        setProcessing(false);
      }
    });
  };

  const categories = ['Bahan Baku', 'Kemasan', 'Peralatan', 'Bumbu'];
  const units = ['kg', 'gram', 'liter', 'ml', 'pcs', 'roll', 'pack', 'butir'];

  return (
    <AppLayout title="Tambah Item Stock">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center mb-6">
          <div className="sm:flex-auto">
            <h1 className="text-2xl font-semibold text-gray-900">Tambah Item Stock Baru</h1>
            <p className="mt-2 text-sm text-gray-700">
              Tambahkan item baru ke dalam sistem stock opname.
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <Button
              variant="secondary"
              onClick={() => router.visit('/stock-opname')}
            >
              Kembali ke Daftar
            </Button>
          </div>
        </div>

        <div className="bg-white shadow-sm rounded-lg">
          <div className="px-6 py-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Kode Item"
                  placeholder="MTB001"
                  value={formData.item_code}
                  onChange={(e) => setFormData({
                    ...formData,
                    item_code: e.target.value
                  })}
                  error={errors.item_code}
                  required
                />

                <Input
                  label="Nama Item"
                  placeholder="Tepung Terigu Premium"
                  value={formData.item_name}
                  onChange={(e) => setFormData({
                    ...formData,
                    item_name: e.target.value
                  })}
                  error={errors.item_name}
                  required
                />

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kategori *
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.category}
                    onChange={(e) => setFormData({
                      ...formData,
                      category: e.target.value
                    })}
                    required
                  >
                    <option value="">Pilih Kategori</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="mt-1 text-sm text-red-600">{errors.category}</p>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Satuan *
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.unit}
                    onChange={(e) => setFormData({
                      ...formData,
                      unit: e.target.value
                    })}
                    required
                  >
                    <option value="">Pilih Satuan</option>
                    {units.map(unit => (
                      <option key={unit} value={unit}>{unit}</option>
                    ))}
                  </select>
                  {errors.unit && (
                    <p className="mt-1 text-sm text-red-600">{errors.unit}</p>
                  )}
                </div>

                <Input
                  label="Jumlah Sistem"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0"
                  value={formData.system_qty}
                  onChange={(e) => setFormData({
                    ...formData,
                    system_qty: e.target.value
                  })}
                  error={errors.system_qty}
                  required
                />

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Lokasi *
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4A574]"
                    value={formData.location}
                    onChange={(e) => setFormData({
                      ...formData,
                      location: e.target.value
                    })}
                    required
                  >
                    <option value="">Pilih Lokasi</option>
                    <option value="Tambun">Tambun</option>
                    <option value="Cikarang">Cikarang</option>
                  </select>
                  {errors.location && (
                    <p className="mt-1 text-sm text-red-600">{errors.location}</p>
                  )}
                </div>
              </div>

              <div className="flex gap-3 pt-6">
                <Button
                  type="submit"
                  variant="primary"
                  disabled={processing}
                >
                  {processing ? 'Menyimpan...' : 'Simpan Item'}
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => router.visit('/stock-opname')}
                >
                  Batal
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}