import React from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';

interface AppLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export default function AppLayout({ children, title = 'Stock Opname' }: AppLayoutProps) {
  const { props } = usePage();
  const csrfToken = (props as any).csrf_token;

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();

    // Create form with fresh CSRF token from Inertia props
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = '/logout';

    const tokenInput = document.createElement('input');
    tokenInput.type = 'hidden';
    tokenInput.name = '_token';
    tokenInput.value = csrfToken || '';

    form.appendChild(tokenInput);
    document.body.appendChild(form);
    form.submit();
  };

  return (
    <>
      <Head title={title} />
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center space-x-4">
                <img
                  src="/images/alim-logo.png"
                  alt="Alim"
                  className="h-10 w-auto"
                />
                <h1 className="text-xl font-semibold text-gray-900">
                  Martabak Alim Stock Opname
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">
                  Martabak Alim Inventory
                </span>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#D4A574] to-[#B8864F] text-white text-sm font-semibold rounded-lg hover:from-[#B8864F] hover:to-[#9A6F3F] transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </>
  );
}