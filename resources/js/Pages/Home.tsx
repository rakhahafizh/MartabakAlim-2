import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';

export default function Home() {
  const [selectedBranch, setSelectedBranch] = useState('tambun');
  const [showMenuPDF, setShowMenuPDF] = useState(false);

  const products = [
    {
      name: 'Martabak Manis Jumbo Durian Keju',
      description: 'Martabak manis yang memiliki durian dan keju sebagai toppingnya.',
      price: 'Rp. 60.000',
      image: '/images/DK.png',
      category: 'Signature',
      badge: 'Best Seller'
    },
    {
      name: 'Martabak Manis Pandan Keju',
      description: 'Martabak manis berwarna hijau beraroma pandan dengan keju.',
      price: 'Rp. 41.000',
      image: '/images/PK.png',
      category: 'Classic',
      badge: 'Recommended'
    },
    {
      name: 'Martabak Telor Daging Ayam',
      description: 'Martabak telor premium dengan isian telur utuh dan daging ayam.',
      price: 'Rp. 40.000',
      image: '/images/TA.png',
      category: 'Savory',
      badge: 'Best Seller'
    }
  ];

  return (
    <>
      <Head title="Martabak Alim - Handmade in Bekasi">
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <style>{`
          html {
            scroll-behavior: smooth;
          }
        `}</style>
      </Head>

      <div className="min-h-screen bg-[#FDFBF7]" style={{ fontFamily: 'Inter, sans-serif' }}>
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#E8E4DC]">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="flex items-center justify-between h-20">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 flex items-center justify-center">
                  <img src="/images/alim-logo.png" alt="Martabak Alim" className="w-full h-full object-contain" />
                </div>
                <div>
                  <div className="font-bold text-xl text-[#2C2416]" style={{ fontFamily: 'Playfair Display, serif' }}>
                    MARTABAK ALIM
                  </div>
                  <div className="text-xs text-[#8B7355] tracking-wider">HANDMADE IN BEKASI</div>
                </div>
              </div>
              <div className="hidden md:flex items-center space-x-8">
                <a href="#about" className="text-sm font-medium text-[#2C2416] hover:text-[#D4A574] transition">ABOUT</a>
                <a href="#menu" className="text-sm font-medium text-[#2C2416] hover:text-[#D4A574] transition">MENU</a>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section - Full Width with Background Image */}
        <section className="relative pt-20 min-h-screen flex items-center overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src="/images/Home.png"
              alt="Martabak Alim"
              className="w-full h-full object-cover"
            />
            {/* Gradient Overlay - Dark from left, transparent to right */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#2C2416]/95 via-[#2C2416]/70 to-transparent"></div>
          </div>

          {/* Content */}
          <div className="max-w-7xl mx-auto px-6 lg:px-12 py-32 relative z-10">
            <div className="max-w-2xl space-y-8">
              <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full">
                <span className="text-sm font-semibold text-[#D4A574] tracking-wider">AUTHENTIC BEKASI TASTE</span>
              </div>

              <h1 className="text-6xl lg:text-8xl font-black text-white leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
                MARTABAK
                <br />
                <span className="text-[#D4A574]">HANDMADE</span>
                <br />
                PERFECTION
              </h1>

              <p className="text-xl text-gray-200 leading-relaxed max-w-xl">
                Dibuat oleh orang-orang profesional dan berpengalaman. Semua makanan terbuat dari bahan berkualitas dan tentunya halal.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a
                  href="#order"
                  className="group inline-flex items-center justify-center px-8 py-4 bg-[#D4A574] text-[#2C2416] font-bold text-lg rounded-lg hover:bg-[#B8864F] transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
                >
                  <span>ORDER NOW</span>
                  <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
                <a
                  href="#menu"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-bold text-lg rounded-lg hover:bg-white hover:text-[#2C2416] transition-all duration-300"
                >
                  VIEW MENU
                </a>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/20">
                <div>
                  <div className="text-4xl font-bold text-[#D4A574]" style={{ fontFamily: 'Playfair Display, serif' }}>100%</div>
                  <div className="text-sm text-gray-300">Halal</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-[#D4A574]" style={{ fontFamily: 'Playfair Display, serif' }}>Fresh</div>
                  <div className="text-sm text-gray-300">Daily Made</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-[#D4A574]" style={{ fontFamily: 'Playfair Display, serif' }}>5★</div>
                  <div className="text-sm text-gray-300">Quality</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Product Section */}
        <section id="menu" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <h2 className="text-5xl lg:text-6xl font-black text-[#2C2416] mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                OUR SIGNATURE
                <br />
                <span className="text-[#D4A574]">CREATIONS</span>
              </h2>
              <p className="text-lg text-[#5C4A33] max-w-2xl mx-auto">
                Setiap martabak dibuat dengan penuh perhatian dan cinta untuk memberikan pengalaman rasa yang tak terlupakan
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product, index) => (
                <div
                  key={index}
                  className="group bg-[#FDFBF7] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 flex flex-col h-full"
                >
                  <div className="relative h-72 overflow-hidden bg-gradient-to-br from-[#F5F1E8] to-[#EBE4D5]">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full">
                      <span className="text-xs font-bold text-[#D4A574]">{product.category}</span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-2xl font-bold text-[#2C2416] mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
                      {product.name}
                    </h3>
                    <p className="text-[#5C4A33] text-sm leading-relaxed mb-4 flex-grow">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-[#E8E4DC] mt-auto">
                      <span className="text-2xl font-bold text-[#D4A574]">{product.price}</span>
                      <div className={`px-4 py-2 rounded-lg font-semibold text-sm flex items-center gap-2 ${product.badge === 'Best Seller'
                        ? 'bg-gradient-to-r from-[#D4A574] to-[#B8864F] text-white'
                        : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                        }`}>
                        {product.badge === 'Best Seller'}
                        {product.badge}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Full Menu Button */}
            <div className="mt-12 text-center">
              <button
                onClick={() => setShowMenuPDF(true)}
                className="inline-flex items-center px-8 py-4 bg-[#D4A574] text-white font-bold text-base rounded-xl hover:bg-[#B8864F] transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
              >
                <svg className="mr-3 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>LIHAT MENU LENGKAP</span>
              </button>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 bg-gradient-to-br from-[#2C2416] to-[#1A1410] text-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <h2 className="text-5xl font-black" style={{ fontFamily: 'Playfair Display, serif' }}>
                  MARTABAK ALIM
                  <br />
                  <span className="text-[#D4A574]">AUTHENTIC BEKASI</span>
                </h2>
                <p className="text-lg text-gray-300 leading-relaxed">
                  Martabak Alim adalah sebuah martabak authentic yang berasal dari Bekasi. Dibuat oleh orang-orang yang profesional dan berpengalaman.
                </p>
                <ul className="space-y-4">
                  {['Porsi yang pas', 'Higenis', 'Kualitas terjaga'].map((item, i) => (
                    <li key={i} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-[#D4A574] rounded-full"></div>
                      <span className="text-gray-200">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
                  <div className="text-4xl font-bold text-[#D4A574] mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>15:00</div>
                  <div className="text-sm text-gray-300">Opening</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
                  <div className="text-4xl font-bold text-[#D4A574] mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>23:30</div>
                  <div className="text-sm text-gray-300">Closing</div>
                </div>
                <div className="col-span-2 bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
                  <div className="text-2xl font-bold text-white mb-2">+62 812 2932 6653</div>
                  <div className="text-sm text-gray-300">Contact Us</div>
                </div>
              </div>
            </div>

            {/* Location Map Section */}
            <div className="mt-16">
              <div className="mb-6 text-center">
                <h3 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                  LOKASI KAMI
                </h3>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => setSelectedBranch('tambun')}
                    className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${selectedBranch === 'tambun'
                      ? 'bg-[#D4A574] text-[#2C2416]'
                      : 'bg-white/10 text-white hover:bg-white/20'
                      }`}
                  >
                    📍 Tambun
                  </button>
                  <button
                    onClick={() => setSelectedBranch('cikarang')}
                    className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${selectedBranch === 'cikarang'
                      ? 'bg-[#D4A574] text-[#2C2416]'
                      : 'bg-white/10 text-white hover:bg-white/20'
                      }`}
                  >
                    📍 Cikarang
                  </button>
                </div>
              </div>

              {/* Google Maps Embed */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 overflow-hidden">
                {selectedBranch === 'tambun' ? (

                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d247.87759540160283!2d107.07329818650307!3d-6.258260399058733!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e698fa36c8040c9%3A0x9cdaff6d01c3634c!2sMartabak%20Alim!5e0!3m2!1sen!2sid!4v1765659466959!5m2!1sen!2sid"
                    width="100%"
                    height="400"
                    style={{ border: 0, borderRadius: '12px' }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Martabak Alim Tambun Location"
                  ></iframe>
                ) : (
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7931.98649809519!2d107.1825953691671!3d-6.264617022326239!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6984a2d0d4f555%3A0xddee7e1ad9bc6ab5!2sMARTABAK%20ALIM!5e0!3m2!1sen!2sid!4v1765984820396!5m2!1sen!2sid"
                    width="100%"
                    height="400"
                    style={{ border: 0, borderRadius: '12px' }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Martabak Alim Cikarang Location"
                  ></iframe>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="order" className="py-24 bg-gradient-to-br from-[#D4A574] to-[#B8864F]">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-5xl lg:text-6xl font-black text-white mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              READY TO TASTE
              <br />
              PERFECTION?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Pesan sekarang dan rasakan kelezatan martabak handmade kami
            </p>

            {/* Branch Selection */}
            <div className="mb-8">
              <p className="text-white/90 mb-4 font-medium">Pilih Cabang:</p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setSelectedBranch('tambun')}
                  className={`px-8 py-3 rounded-lg font-bold transition-all duration-300 ${selectedBranch === 'tambun'
                    ? 'bg-white text-[#2C2416] shadow-xl'
                    : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                >
                  📍 Tambun
                </button>
                <button
                  onClick={() => setSelectedBranch('cikarang')}
                  className={`px-8 py-3 rounded-lg font-bold transition-all duration-300 ${selectedBranch === 'cikarang'
                    ? 'bg-white text-[#2C2416] shadow-xl'
                    : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                >
                  📍 Cikarang
                </button>
              </div>
            </div>

            {/* Order Buttons - Tambun */}
            {selectedBranch === 'tambun' && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://gofood.link/a/yMa2My1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#2C2416] font-bold text-base rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
                >
                  <img src="/images/gojek.png" alt="Gojek" className="h-5 w-auto mr-3" />
                  <span>PESAN DI GOJEK</span>
                </a>
                <a
                  href="https://shopee.co.id/universal-link/now-food/shop/1008047?deep_and_deferred=1&shareChannel=copy_link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#2C2416] font-bold text-base rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
                >
                  <img src="/images/shopee.png" alt="Shopee" className="h-5 w-auto mr-3" />
                  <span>PESAN DI SHOPEEFOOD</span>
                </a>
                <a
                  href="https://r.grab.com/g/6-20251217_192822_D8D406FF00744A5BAFC7186724209326_MEXMPS-6-C2CUCXNUBE5JVA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#2C2416] font-bold text-base rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
                >
                  <img src="/images/grab.png" alt="Grab" className="h-5 w-auto mr-3" />
                  <span>PESAN DI GRAB</span>
                </a>
              </div>
            )}

            {/* Order Buttons - Cikarang */}
            {selectedBranch === 'cikarang' && (
              <div className="flex justify-center">
                <a
                  href="https://gofood.link/u/R1jrR"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#2C2416] font-bold text-base rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
                >
                  <img src="/images/gojek.png" alt="Gojek" className="h-5 w-auto mr-3" />
                  <span>PESAN DI GOJEK</span>
                </a>
              </div>
            )}
          </div>
        </section>

        {/* PDF Menu Modal */}
        {showMenuPDF && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="relative bg-white rounded-2xl w-full max-w-5xl h-[90vh] flex flex-col">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h3 className="text-2xl font-bold text-[#2C2416]" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Menu Lengkap Martabak Alim
                </h3>
                <button
                  onClick={() => setShowMenuPDF(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              {/* PDF Viewer */}
              <div className="flex-1 overflow-hidden">
                <iframe
                  src="/menu.pdf"
                  className="w-full h-full"
                  title="Martabak Alim Full Menu"
                />
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="bg-[#1A1410] text-gray-400 py-8">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
            <p className="text-sm">© 2024 Martabak Alim. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
