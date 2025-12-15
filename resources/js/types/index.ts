export interface StockItem {
  id: number;
  item_id: string;
  item_name: string;
  category: string;
  unit: string;
  system_qty: number;
  physical_qty: number | null;
  difference: number;
  status: 'pending' | 'checked' | 'adjusted';
  location: string;
  last_updated: string;
  notes?: string;
}

export interface PageProps {
  stock_items: {
    data: StockItem[];
    links: any;
    meta: any;
  };
  filters: {
    search?: string;
    category?: string;
    status?: string;
  };
  flash?: {
    success?: string;
    error?: string;
  };
}

export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string;
}