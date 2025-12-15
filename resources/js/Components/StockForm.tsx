import React, { useState } from 'react';
import { StockItem } from '@/types';
import Input from './UI/Input';
import Button from './UI/Button';

interface StockFormProps {
  item: StockItem;
  onSubmit: (data: Partial<StockItem>) => void;
  onCancel: () => void;
}

export default function StockForm({ item, onSubmit, onCancel }: StockFormProps) {
  const [formData, setFormData] = useState({
    physical_qty: item.physical_qty || 0,
    notes: item.notes || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const difference = formData.physical_qty - item.system_qty;
    onSubmit({
      ...formData,
      difference,
      status: 'checked' as const
    });
  };

  const difference = formData.physical_qty - item.system_qty;

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        Update Stock Count
      </h3>
      
      <div className="grid grid-cols-2 gap-4 mb-4 p-4 bg-gray-50 rounded">
        <div>
          <p className="text-sm font-medium text-gray-700">Item Code:</p>
          <p className="text-sm text-gray-900">{item.item_id}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-700">Item Name:</p>
          <p className="text-sm text-gray-900">{item.item_name}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-700">System Qty:</p>
          <p className="text-sm text-gray-900">{item.system_qty} {item.unit}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-700">Location:</p>
          <p className="text-sm text-gray-900">{item.location}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Input
          label="Physical Quantity"
          type="number"
          step="0.01"
          value={formData.physical_qty}
          onChange={(e) => setFormData({
            ...formData,
            physical_qty: parseFloat(e.target.value) || 0
          })}
          required
        />

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Difference
          </label>
          <div className={`p-3 rounded-md ${
            difference === 0 ? 'bg-green-50 text-green-700' :
            difference > 0 ? 'bg-blue-50 text-blue-700' :
            'bg-red-50 text-red-700'
          }`}>
            {difference > 0 ? `+${difference}` : difference} {item.unit}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Notes
          </label>
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
            value={formData.notes}
            onChange={(e) => setFormData({
              ...formData,
              notes: e.target.value
            })}
            placeholder="Optional notes about the count..."
          />
        </div>

        <div className="flex gap-3">
          <Button type="submit" variant="primary">
            Update Count
          </Button>
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}