import React, { useState } from 'react';
import { router, Head, Link } from '@inertiajs/react';
import AppLayout from '@/Components/Layout/AppLayout';
import Button from '@/Components/UI/Button';
import Input from '@/Components/UI/Input';

interface Location {
  id: number;
  name: string;
  address: string;
  phone: string;
  opening_time: string;
  closing_time: string;
  map_embed_url: string;
  gofood_url?: string;
  shopeefood_url?: string;
  grab_url?: string;
  is_active: boolean;
}

interface LocationEditProps {
  location: Location;
}

export default function LocationEdit({ location }: LocationEditProps) {
  const [formData, setFormData] = useState({
    name: location.name,
    address: location.address,
    phone: location.phone,
    opening_time: location.opening_time,
    closing_time: location.closing_time,
    map_embed_url: location.map_embed_url,
    gofood_url: location.gofood_url || '',
    shopeefood_url: location.shopeefood_url || '',
    grab_url: location.grab_url || '',
    is_active: location.is_active
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [processing, setProcessing] = useState(false);

  // Extract URL from iframe embed code
  const extractEmbedUrl = (input: string): string => {
    // Match iframe src attribute
    const iframeMatch = input.match(/src=["']([^"']+)["']/);
    if (iframeMatch) {
      return iframeMatch[1];
    }
    // If already a URL, return as is
    return input.trim();
  };

  // Convert embed URL to working Google Maps link
  const convertToWorkingLink = (embedUrl: string): string => {
    if (!embedUrl) return '';
    return embedUrl.replace('/maps/embed?', '/maps?');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    router.put(`/locations/${location.id}`, formData, {
      onError: (errors) => {
        setErrors(errors as Record<string, string>);
        setProcessing(false);
      },
      onSuccess: () => {
        setProcessing(false);
      }
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    // Auto-extract URL from iframe and convert to working link
    let processedValue = value;
    if (name === 'map_embed_url') {
      const extracted = extractEmbedUrl(value);
      processedValue = convertToWorkingLink(extracted);
    }

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : processedValue
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  return (
    <AppLayout title={`Edit ${location.name} - Martabak Alim`}>
      <Head title={`Edit ${location.name}`} />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link href="/locations" className="text-[#D4A574] hover:text-[#B8864F] font-medium flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Kembali ke Daftar Lokasi
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Lokasi: {location.name}</h1>
          <p className="text-gray-600 mb-8">Update informasi lokasi cabang.</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Nama Lokasi <span className="text-red-500">*</span>
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Contoh: Tambun, Cikarang"
                className={errors.name ? 'border-red-500' : ''}
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>

            {/* Address */}
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                Alamat <span className="text-red-500">*</span>
              </label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows={3}
                placeholder="Masukkan alamat lengkap"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4A574] ${errors.address ? 'border-red-500' : 'border-gray-300'
                  }`}
              />
              {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Nomor Telepon <span className="text-red-500">*</span>
              </label>
              <Input
                id="phone"
                name="phone"
                type="text"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+62 812 2932 6653"
                className={errors.phone ? 'border-red-500' : ''}
              />
              {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
            </div>

            {/* Opening & Closing Time */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="opening_time" className="block text-sm font-medium text-gray-700 mb-2">
                  Jam Buka <span className="text-red-500">*</span>
                </label>
                <Input
                  id="opening_time"
                  name="opening_time"
                  type="time"
                  value={formData.opening_time}
                  onChange={handleChange}
                  className={errors.opening_time ? 'border-red-500' : ''}
                />
                {errors.opening_time && <p className="mt-1 text-sm text-red-600">{errors.opening_time}</p>}
              </div>
              <div>
                <label htmlFor="closing_time" className="block text-sm font-medium text-gray-700 mb-2">
                  Jam Tutup <span className="text-red-500">*</span>
                </label>
                <Input
                  id="closing_time"
                  name="closing_time"
                  type="time"
                  value={formData.closing_time}
                  onChange={handleChange}
                  className={errors.closing_time ? 'border-red-500' : ''}
                />
                {errors.closing_time && <p className="mt-1 text-sm text-red-600">{errors.closing_time}</p>}
              </div>
            </div>

            {/* Map Embed URL */}
            <div>
              <label htmlFor="map_embed_url" className="block text-sm font-medium text-gray-700 mb-2">
                Google Maps URL <span className="text-red-500">*</span>
              </label>
              <textarea
                id="map_embed_url"
                name="map_embed_url"
                value={formData.map_embed_url}
                onChange={handleChange}
                rows={3}
                placeholder="Paste Google Maps embed code or URL here..."
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4A574] font-mono text-xs ${errors.map_embed_url ? 'border-red-500' : 'border-gray-300'
                  }`}
              />
              {errors.map_embed_url && <p className="mt-1 text-sm text-red-600">{errors.map_embed_url}</p>}
              <p className="mt-1 text-xs text-gray-500">
                Buka Google Maps → Klik Share → Embed a map → Copy HTML dan paste di sini
              </p>
            </div>

            {/* Order URLs */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Link Order (Opsional)</h3>

              <div className="space-y-4">
                <div>
                  <label htmlFor="gofood_url" className="block text-sm font-medium text-gray-700 mb-2">
                    GoFood URL
                  </label>
                  <Input
                    id="gofood_url"
                    name="gofood_url"
                    type="url"
                    value={formData.gofood_url}
                    onChange={handleChange}
                    placeholder="https://gofood.link/..."
                  />
                </div>

                <div>
                  <label htmlFor="shopeefood_url" className="block text-sm font-medium text-gray-700 mb-2">
                    ShopeeFood URL
                  </label>
                  <Input
                    id="shopeefood_url"
                    name="shopeefood_url"
                    type="url"
                    value={formData.shopeefood_url}
                    onChange={handleChange}
                    placeholder="https://shopee.co.id/..."
                  />
                </div>

                <div>
                  <label htmlFor="grab_url" className="block text-sm font-medium text-gray-700 mb-2">
                    GrabFood URL
                  </label>
                  <Input
                    id="grab_url"
                    name="grab_url"
                    type="url"
                    value={formData.grab_url}
                    onChange={handleChange}
                    placeholder="https://r.grab.com/..."
                  />
                </div>
              </div>
            </div>

            {/* Active Status */}
            <div className="flex items-center">
              <input
                id="is_active"
                name="is_active"
                type="checkbox"
                checked={formData.is_active}
                onChange={handleChange}
                className="h-4 w-4 text-[#D4A574] focus:ring-[#D4A574] border-gray-300 rounded"
              />
              <label htmlFor="is_active" className="ml-2 block text-sm text-gray-700">
                Aktifkan lokasi ini (akan ditampilkan di home page)
              </label>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4 pt-6 border-t border-gray-200">
              <Button
                type="submit"
                disabled={processing}
                className="flex-1 bg-gradient-to-r from-[#D4A574] to-[#B8864F] hover:from-[#B8864F] hover:to-[#9A6F3F] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {processing ? 'Menyimpan...' : 'Update Lokasi'}
              </Button>
              <Link href="/locations">
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
