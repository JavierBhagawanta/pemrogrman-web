// fetch.js (REVISI FINAL - Fokus pada Berita HP/Smartphone)

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Konfigurasi Kunci API ---
    // Menggunakan API Key yang Anda berikan
    const GNEWS_API_KEY = '205c9fc4adc77acf6477f342cd496435'; 

    // Panggil fungsi untuk memuat berita teknologi
    loadTechNews(GNEWS_API_KEY);
});


// --- 2. Fungsi untuk Bagian Berita (Menggunakan GNews) ---
async function loadTechNews(apiKey) {
    const newsList = document.getElementById('news-list');
    
    if (!apiKey || apiKey === '[MASUKKAN_API_KEY_GNEWS_ANDA]') {
        newsList.innerHTML = '<p class="col-span-2 text-center text-red-500">Gagal memuat berita: API Key GNews belum dimasukkan dalam file fetch.js.</p>';
        return;
    }

    newsList.innerHTML = '<p class="col-span-2 text-center text-blue-500 font-semibold">Mencari berita HP & smartphone terbaru...</p>';

    // --- INI PERUBAHAN UTAMANYA ---
    // Kita tidak lagi pakai 'topic=technology'.
    // Kita pakai 'q' (query) untuk mencari kata kunci yang spesifik.
    const QUERY = 'smartphone OR handphone OR "ponsel" OR "HP" OR "Samsung Galaxy" OR "iPhone" OR "Xiaomi" OR "Oppo"';
    const LANG = 'id';
    const MAX_ARTICLES = 4;
    
    // URL API diubah ke endpoint '/search' dan menggunakan parameter 'q'
    // Kita juga melakukan encode agar spasi dan tanda OR terbaca
    const API_URL_NEWS = `https://gnews.io/api/v4/search?q=${encodeURIComponent(QUERY)}&lang=${LANG}&max=${MAX_ARTICLES}&apikey=${apiKey}`;
    // --- AKHIR PERUBAHAN ---

    try {
        const response = await fetch(API_URL_NEWS);
        const data = await response.json(); 

        if (!response.ok) {
            const errorMessage = data.errors ? data.errors[0] : 'Gagal memuat berita.';
            throw new Error(`[${response.status}] ${errorMessage}`);
        }
        
        const articles = data.articles;

        if (!articles || articles.length === 0) {
            newsList.innerHTML = '<p class="col-span-2 text-center text-gray-500">Tidak ada berita smartphone yang ditemukan saat ini.</p>';
            return;
        }

        newsList.innerHTML = ''; 

        articles.forEach(article => {
            const date = new Date(article.publishedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
            
            const card = `
                <div class="bg-white p-6 rounded-xl shadow-md flex flex-col justify-between hover:shadow-lg transition duration-300 border">
                    <div>
                        <h4 class="text-xl font-bold mb-2 text-gray-900 line-clamp-2">${article.title}</h4>
                        <p class="text-gray-600 mb-4 line-clamp-3">${article.description || 'Tidak ada ringkasan tersedia.'}</p>
                    </div>
                    <div class="flex justify-between items-center text-sm mt-2">
                        <span class="text-blue-500 font-semibold">${date} | Sumber: ${article.source.name}</span>
                        <a href="${article.url}" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:text-blue-700 font-medium">Baca Selengkapnya &rarr;</a>
                    </div>
                </div>
            `;
            newsList.innerHTML += card;
        });

    } catch (error) {
        console.error('Error loading news:', error);
        newsList.innerHTML = `<p class="col-span-2 text-center text-red-500">Gagal memuat berita: ${error.message}. Periksa GNews API Key Anda.</p>`;
    }
}