// fetch.js (REVISI FINAL FOKUS HANYA PADA NEWS API)

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Konfigurasi Kunci API ---
    // Poin 2 (Sumber API): Menggunakan News API, yang merupakan Public API gratis.
    const NEWS_API_KEY = 'a286c83b898a4608b5110aadf3bf017d'; 
    
    // --- 2. Fungsi untuk Bagian Berita ---
    async function loadHealthNews() {
        // Poin 5 (Tampilan Dinamis): newsList adalah elemen UI tempat data akan ditampilkan.
        const newsList = document.getElementById('news-list'); 
        newsList.innerHTML = '<p class="col-span-2 text-center text-red-500 font-semibold">Mencari berita binaraga dan nutrisi gym...</p>';

        // Poin 3 (Kesesuaian Tema): Query dan Sources sangat spesifik pada topik kebugaran.
        const SOURCES = 'mens-health,new-scientist,medical-news-today'; 
        const QUERY = 'weightlifting OR muscle gain OR protein intake'; 
        const LANGUAGE = 'en'; 
        
        // Poin 4 (Method): Seluruh data request dikirim melalui URL (ciri khas Method GET).
        const API_URL_NEWS = `https://newsapi.org/v2/everything?q=${QUERY}&language=${LANGUAGE}&sources=${SOURCES}&sortBy=publishedAt&apiKey=${NEWS_API_KEY}&pageSize=4`;

        try {
            // Poin 1 & 4: Fungsionalitas Utama (Fetch) menggunakan Method GET (default fetch)
            const response = await fetch(API_URL_NEWS); 
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`[${response.status}] ${errorData.message || 'Gagal memuat berita.'}`);
            }
            
            const data = await response.json();
            const articles = data.articles;

            if (articles.length === 0) {
                newsList.innerHTML = '<p class="col-span-2 text-center text-gray-500">Tidak ada berita kebugaran relevan yang ditemukan saat ini.</p>';
                return;
            }

            // Poin 5: Konten lama dihapus sebelum konten dinamis baru ditambahkan.
            newsList.innerHTML = ''; 

            articles.forEach(article => {
                const date = new Date(article.publishedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
                
                // Poin 5: Pembuatan struktur HTML (card) secara dinamis
                const card = `
                    <div class="bg-white p-6 rounded-xl shadow-md flex flex-col justify-between hover:shadow-lg transition duration-300 border">
                        <div>
                            <h4 class="text-xl font-bold mb-2 text-gray-900 line-clamp-2">${article.title}</h4>
                            <p class="text-gray-600 mb-4 line-clamp-3">${article.description || 'Tidak ada ringkasan tersedia.'}</p>
                        </div>
                        <div class="flex justify-between items-center text-sm mt-2">
                            <span class="text-red-500 font-semibold">${date} | Sumber: ${article.source.name}</span>
                            <a href="${article.url}" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:text-red-500 font-medium">Baca Selengkapnya &rarr;</a>
                        </div>
                    </div>
                `;
                // Poin 1 & 5: Memasukkan data ke dalam antarmuka web (UI) secara dinamis
                newsList.innerHTML += card; 
            });

        } catch (error) {
            console.error('Error loading news:', error);
            newsList.innerHTML = `<p class="col-span-2 text-center text-red-500">Gagal memuat berita: ${error.message}. Periksa News API Key atau kuota Anda.</p>`;
        }
    }

    loadHealthNews();
});