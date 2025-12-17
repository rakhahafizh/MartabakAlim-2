import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import AppLayout from '@/Components/Layout/AppLayout';
import StockTable from '@/Components/StockTable';
import StockForm from '@/Components/StockForm';
import Input from '@/Components/UI/Input';
import Button from '@/Components/UI/Button';
import { PageProps, StockItem } from '@/types';

interface DashboardStats {
  total_items: number;
  available_count: number;
  categories_count: number;
  pending_count: number;
  checked_count: number;
  discrepancy_count: number;
}

interface LocationBreakdown {
  location: string;
  count: number;
}

interface CategoryBreakdown {
  category: string;
  count: number;
}

interface StockIndexProps extends PageProps {
  stock_items: any;
  stats: DashboardStats;
  category_breakdown: CategoryBreakdown[];
  location_breakdown: LocationBreakdown[];
  filters: {
    search?: string;
    category?: string;
    status?: string;
    location?: string;
  };
  flash?: {
    success?: string;
    error?: string;
  };
}

// Statistics Card Component
interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  onClick?: () => void;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color, bgColor, onClick }) => (
  <div
    className={`${bgColor} p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1`}
    onClick={onClick}
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
        <p className={`text-3xl font-bold ${color}`}>{value}</p>
      </div>
      <div className={`text-4xl ${color} opacity-80`}>
        {icon}
      </div>
    </div>
  </div>
);

export default function StockIndex({ stock_items, stats, category_breakdown, location_breakdown, filters, flash }: StockIndexProps) {
  const [editingItem, setEditingItem] = useState<StockItem | null>(null);
  const [search, setSearch] = useState(filters.search || '');
  const [categoryFilter, setCategoryFilter] = useState(filters.category || '');
  const [statusFilter, setStatusFilter] = useState(filters.status || '');
  const [locationFilter, setLocationFilter] = useState(filters.location || '');

  const handleSearch = () => {
    router.get('/stock-opname', {
      search,
      category: categoryFilter,
      status: statusFilter,
      location: locationFilter
    }, {
      preserveState: true,
      preserveScroll: true
    });
  };

  const handleReset = () => {
    setSearch('');
    setCategoryFilter('');
    setStatusFilter('');
    setLocationFilter('');
    router.get('/stock-opname', {}, {
      preserveState: true,
      preserveScroll: true
    });
  };

  const handleUpdateStock = (data: Partial<StockItem>) => {
    if (!editingItem) return;

    router.put(`/stock-opname/${editingItem.id}`, data, {
      onSuccess: () => {
        setEditingItem(null);
      },
      onError: (errors) => {
        // Check for 419 CSRF error
        if (errors?.message?.includes('419') ||
          errors?.message?.includes('CSRF') ||
          errors?.message?.includes('expired')) {
          alert('Your session has expired. The page will reload to get a fresh session.');
          window.location.reload();
        }
      }
    });
  };

  const categories = ['Bahan Baku', 'Kemasan', 'Peralatan', 'Bumbu'];
  const statuses = ['pending', 'checked'];

  return (
    <AppLayout title="Stock Opname - Martabak Alim">
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

        {/* Dashboard Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard Stock Opname</h1>
          <p className="text-gray-600">Overview inventory peralatan dan tracking lokasi</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Items"
            value={stats.total_items}
            icon={<span>📦</span>}
            color="text-[#D4A574]"
            bgColor="bg-white"
            onClick={() => handleReset()}
          />
          <StatCard
            title="Available"
            value={stats.available_count}
            icon={<span>✅</span>}
            color="text-green-500"
            bgColor="bg-white"
            onClick={() => {
              setSearch('');
              setCategoryFilter('');
              setStatusFilter('');
              setLocationFilter('');
              handleSearch();
            }}
          />
          <StatCard
            title="Categories"
            value={stats.categories_count}
            icon={<span>📊</span>}
            color="text-blue-500"
            bgColor="bg-white"
          />
          <StatCard
            title="Verified"
            value={stats.checked_count}
            icon={<span>📋</span>}
            color="text-blue-600"
            bgColor="bg-white"
            onClick={() => {
              setSearch('');
              setCategoryFilter('');
              setStatusFilter('checked');
              setLocationFilter('');
              handleSearch();
            }}
          />
          <StatCard
            title="Pending"
            value={stats.pending_count}
            icon={<span>⏳</span>}
            color="text-orange-500"
            bgColor="bg-white"
            onClick={() => {
              setSearch('');
              setCategoryFilter('');
              setStatusFilter('pending');
              setLocationFilter('');
              handleSearch();
            }}
          />
        </div>

        {/* Category & Location Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Category Breakdown */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h3 className="font-bold text-gray-900 text-lg mb-4 flex items-center">
              <span className="mr-2">📊</span>
              Category Breakdown
            </h3>
            <div className="space-y-3">
              {category_breakdown && category_breakdown.map((cat) => (
                <div key={cat.category}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{cat.category}</span>
                    <span className="text-sm font-bold text-[#D4A574]">{cat.count} items</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-[#D4A574] to-[#B8864F] h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(cat.count / stats.total_items) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Location Breakdown */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h3 className="font-bold text-gray-900 text-lg mb-4 flex items-center">
              <span className="mr-2">📍</span>
              Location Breakdown
            </h3>
            <div className="space-y-3">
              {location_breakdown && location_breakdown.map((loc) => (
                <div key={loc.location}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{loc.location}</span>
                    <span className="text-sm font-bold text-[#D4A574]">{loc.count} items</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-[#D4A574] to-[#B8864F] h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(loc.count / stats.total_items) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions & Header */}
        <div className="sm:flex sm:items-center justify-between mb-6">
          <div className="sm:flex-auto">
            <h2 className="text-2xl font-bold text-gray-900">All Stock Items</h2>
            <p className="mt-1 text-sm text-gray-600">
              Kelola dan pantau jumlah stock fisik untuk item inventory.
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <Button
              onClick={() => router.visit('/stock-opname/create')}
              className="bg-gradient-to-r from-[#D4A574] to-[#B8864F] hover:from-[#B8864F] hover:to-[#9A6F3F] text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Tambah Item Baru
            </Button>
          </div>
        </div>

        <div className="mb-6 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <div className="md:col-span-2">
              <Input
                placeholder="Cari item..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch();
                  }
                }}
              />
            </div>

            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4A574] transition-all"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="">Semua Kategori</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4A574] transition-all"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">Semua Status</option>
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>

            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4A574] transition-all"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            >
              <option value="">Semua Lokasi</option>
              <option value="Tambun">Tambun</option>
              <option value="Cikarang">Cikarang</option>
            </select>

            <div className="flex gap-2">
              <Button
                onClick={handleSearch}
                className="flex-1 bg-gradient-to-r from-[#D4A574] to-[#B8864F] hover:from-[#B8864F] hover:to-[#9A6F3F]"
              >
                Cari
              </Button>
              <Button
                onClick={handleReset}
                variant="secondary"
                className="px-4"
              >
                Reset
              </Button>
            </div>
          </div>
        </div>

        {
          editingItem && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="max-w-2xl w-full max-h-screen overflow-y-auto">
                <StockForm
                  item={editingItem}
                  onSubmit={handleUpdateStock}
                  onCancel={() => setEditingItem(null)}
                />
              </div>
            </div>
          )
        }

        <StockTable
          items={stock_items.data}
          onEdit={setEditingItem}
        />

        {
          stock_items.links && (
            <div className="mt-6 flex justify-center">
              <nav className="flex space-x-2">
                {stock_items.links.map((link: any, index: number) => (
                  <button
                    key={index}
                    onClick={() => link.url && router.visit(link.url)}
                    disabled={!link.url}
                    className={`px-3 py-2 text-sm rounded-md ${link.active
                      ? 'bg-blue-600 text-white'
                      : link.url
                        ? 'bg-white text-gray-700 hover:bg-gray-50 border'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                  />
                ))}
              </nav>
            </div>
          )
        }
      </div >
    </AppLayout >
  );
}