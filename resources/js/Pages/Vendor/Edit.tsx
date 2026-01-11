import React, { useState, useEffect } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
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
}

interface Props {
    vendor: Vendor;
    stockItems: StockItem[];
}

export default function Edit({ vendor, stockItems }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        vendor_name: vendor.vendor_name,
        name: vendor.name,
        contact: vendor.contact,
        stock_items: vendor.stock_items.map(item => item.id),
    });

    const [selectedItems, setSelectedItems] = useState<number[]>(
        vendor.stock_items.map(item => item.id)
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/vendors/${vendor.id}`);
    };

    const handleStockItemToggle = (itemId: number) => {
        const newSelectedItems = selectedItems.includes(itemId)
            ? selectedItems.filter(id => id !== itemId)
            : [...selectedItems, itemId];
        
        setSelectedItems(newSelectedItems);
        setData('stock_items', newSelectedItems);
    };

    return (
        <AppLayout>
            <Head title="Edit Vendor" />

            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-semibold text-gray-800">Edit Vendor</h2>
                                <Link
                                    href="/vendors"
                                    className="text-gray-600 hover:text-gray-900"
                                >
                                    ← Kembali
                                </Link>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="vendor_name" className="block text-sm font-medium text-gray-700 mb-2">
                                        Nama Vendor *
                                    </label>
                                    <input
                                        type="text"
                                        id="vendor_name"
                                        value={data.vendor_name}
                                        onChange={(e) => setData('vendor_name', e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Contoh: PT Sukses Jaya"
                                    />
                                    {errors.vendor_name && (
                                        <p className="mt-1 text-sm text-red-600">{errors.vendor_name}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                        Nama Contact Person *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Contoh: Budi Santoso"
                                    />
                                    {errors.name && (
                                        <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-2">
                                        Kontak *
                                    </label>
                                    <input
                                        type="text"
                                        id="contact"
                                        value={data.contact}
                                        onChange={(e) => setData('contact', e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Contoh: 08123456789 atau email@vendor.com"
                                    />
                                    {errors.contact && (
                                        <p className="mt-1 text-sm text-red-600">{errors.contact}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Stock Items (Opsional)
                                    </label>
                                    <div className="border border-gray-300 rounded-md p-4 max-h-60 overflow-y-auto">
                                        {stockItems.map((item) => (
                                            <div key={item.id} className="flex items-center mb-2">
                                                <input
                                                    type="checkbox"
                                                    id={`stock-${item.id}`}
                                                    checked={selectedItems.includes(item.id)}
                                                    onChange={() => handleStockItemToggle(item.id)}
                                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                />
                                                <label
                                                    htmlFor={`stock-${item.id}`}
                                                    className="ml-3 text-sm text-gray-700"
                                                >
                                                    {item.item_name} <span className="text-gray-500">({item.category})</span>
                                                </label>
                                            </div>
                                        ))}
                                        {stockItems.length === 0 && (
                                            <p className="text-sm text-gray-500">Belum ada stock items tersedia.</p>
                                        )}
                                    </div>
                                    {errors.stock_items && (
                                        <p className="mt-1 text-sm text-red-600">{errors.stock_items}</p>
                                    )}
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="flex-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {processing ? 'Menyimpan...' : 'Update Vendor'}
                                    </button>
                                    <Link
                                        href="/vendors"
                                        className="flex-1 text-center bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                                    >
                                        Batal
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
