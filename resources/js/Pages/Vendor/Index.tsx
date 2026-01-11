import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/Components/Layout/AppLayout';

interface StockItem {
    id: number;
    item_name: string;
    category: string;
}

interface Vendor {
    id: number;
    vendor_name: string;
    name: string;
    contact: string;
    stock_items: StockItem[];
    created_at: string;
    updated_at: string;
}

interface Props {
    vendors: Vendor[];
}

export default function Index({ vendors }: Props) {
    const handleDelete = (id: number, vendorName: string) => {
        if (confirm(`Apakah Anda yakin ingin menghapus vendor ${vendorName}?`)) {
            router.delete(`/vendors/${id}`);
        }
    };

    return (
        <AppLayout>
            <Head title="Vendor Management" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-semibold text-gray-800">Vendor Management</h2>
                                <Link
                                    href="/vendors/create"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    + Tambah Vendor
                                </Link>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {vendors.map((vendor) => (
                                    <div
                                        key={vendor.id}
                                        className="bg-white border border-gray-200 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                                    >
                                        <div className="mb-4">
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                                {vendor.vendor_name}
                                            </h3>
                                            <div className="space-y-1 text-sm text-gray-600">
                                                <p>
                                                    <span className="font-semibold">Nama:</span> {vendor.name}
                                                </p>
                                                <p>
                                                    <span className="font-semibold">Kontak:</span> {vendor.contact}
                                                </p>
                                            </div>
                                        </div>

                                        {vendor.stock_items && vendor.stock_items.length > 0 && (
                                            <div className="mb-4">
                                                <h4 className="text-sm font-semibold text-gray-700 mb-2">
                                                    Stock Items:
                                                </h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {vendor.stock_items.map((item) => (
                                                        <span
                                                            key={item.id}
                                                            className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                                                        >
                                                            {item.item_name}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        <div className="flex gap-2 pt-4 border-t border-gray-200">
                                            <Link
                                                href={`/vendors/${vendor.id}/edit`}
                                                className="flex-1 text-center bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded transition-colors"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(vendor.id, vendor.vendor_name)}
                                                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded transition-colors"
                                            >
                                                Hapus
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {vendors.length === 0 && (
                                <div className="text-center py-12">
                                    <p className="text-gray-500 text-lg">Belum ada vendor yang terdaftar.</p>
                                    <Link
                                        href="/vendors/create"
                                        className="mt-4 inline-block text-blue-500 hover:text-blue-700"
                                    >
                                        Tambah vendor pertama
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
