import React from 'react';
import { router, Head, Link } from '@inertiajs/react';
import AppLayout from '@/Components/Layout/AppLayout';
import Button from '@/Components/UI/Button';

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

interface LocationIndexProps {
  locations: Location[];
  flash?: {
    success?: string;
    error?: string;
  };
}

export default function LocationIndex({ locations, flash }: LocationIndexProps) {
  const handleDelete = (id: number, name: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus lokasi ${name}?`)) {
      router.delete(`/locations/${id}`);
    }
  };

  return (
    <AppLayout title="Manage Locations - Martabak Alim">
      <Head title="Manage Locations" />
      
      <div className="px-4 sm:px-6 lg:px-8">
        {/* Success/Error Messages */}
        {flash?.success && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>{flash.success}</span>
          </div>
        )}

        {flash?.error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span>{flash.error}</span>
          </div>
        )}

        {/* Header */}
        <div className="sm:flex sm:items-center justify-between mb-8">
          <div className="sm:flex-auto">
            <h1 className="text-4xl font-bold text-gray-900">Manage Locations</h1>
            <p className="mt-2 text-sm text-gray-600">
              Kelola lokasi cabang Martabak Alim beserta detail dan link ordernya.
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <Link href="/locations/create">
              <Button className="bg-gradient-to-r from-[#D4A574] to-[#B8864F] hover:from-[#B8864F] hover:to-[#9A6F3F] text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Tambah Lokasi Baru
              </Button>
            </Link>
          </div>
        </div>

        {/* Locations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {locations.map((location) => (
            <div
              key={location.id}
              className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-bold text-gray-900">{location.name}</h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          location.is_active
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {location.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-start gap-2">
                        <span className="text-lg">📍</span>
                        <span>{location.address}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg">📞</span>
                        <span>{location.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg">🕐</span>
                        <span>
                          {location.opening_time} - {location.closing_time}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Links */}
                <div className="mb-4 pt-4 border-t border-gray-200">
                  <p className="text-xs font-semibold text-gray-500 mb-2">LINK ORDER:</p>
                  <div className="flex flex-wrap gap-2">
                    {location.gofood_url && (
                      <span className="inline-flex items-center px-3 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full">
                        <img src="/images/gojek.png" alt="Gojek" className="h-3 w-auto mr-1" />
                        GoFood
                      </span>
                    )}
                    {location.shopeefood_url && (
                      <span className="inline-flex items-center px-3 py-1 bg-orange-50 text-orange-700 text-xs font-medium rounded-full">
                        <img src="/images/shopee.png" alt="Shopee" className="h-3 w-auto mr-1" />
                        ShopeeFood
                      </span>
                    )}
                    {location.grab_url && (
                      <span className="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
                        <img src="/images/grab.png" alt="Grab" className="h-3 w-auto mr-1" />
                        GrabFood
                      </span>
                    )}
                    {!location.gofood_url && !location.shopeefood_url && !location.grab_url && (
                      <span className="text-xs text-gray-400">Tidak ada link order</span>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 border-t border-gray-200">
                  <Link
                    href={`/locations/${location.id}/edit`}
                    className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(location.id, location.name)}
                    className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {locations.length === 0 && (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">Belum ada lokasi</h3>
            <p className="mt-1 text-sm text-gray-500">Mulai dengan menambahkan lokasi cabang pertama.</p>
            <div className="mt-6">
              <Link href="/locations/create">
                <Button className="bg-gradient-to-r from-[#D4A574] to-[#B8864F]">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Tambah Lokasi
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
