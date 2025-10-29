// fetch.js (REVISI FINAL UNTUK RELEVANSI BERITA)

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Konfigurasi Kunci API ---
    const NEWS_API_KEY = 'a286c83b898a4608b5110aadf3bf017d'; 
    const WGER_API_BASE = 'https://wger.de/api/v2'; 

    // ... (Fungsi loadExercises() menggunakan WGER tetap sama, saya tidak menampilkannya di sini untuk keringkasan) ...

    // --- 3. Fungsi untuk Bagian Berita (Fokus pada Sumber Berita Kebugaran) ---
    async function loadHealthNews() {
        const newsList = document.getElementById('news-list');
        newsList.innerHTML = '<p class="col-span-2 text-center text-red-500 font-semibold">Mencari berita binaraga dan nutrisi gym...</p>';

        // PERBAIKAN RELEVANSI: 
        // 1. QUERY tetap spesifik pada topik gym.
        // 2. Ditambahkan filter 'sources' (sumber berita) untuk memprioritaskan situs kebugaran terkemuka.
        // Sumber-sumber populer (ID-nya di News API): mens-health, new-scientist, medical-news-today, dll.
        const SOURCES = 'mens-health,new-scientist,medical-news-today'; 
        const QUERY = 'weightlifting OR muscle gain OR protein intake'; 
        const LANGUAGE = 'en'; 
        
        // Menggunakan filter sources DAN query untuk mendapatkan berita paling relevan
        const API_URL_NEWS = `https://newsapi.org/v2/everything?q=${QUERY}&language=${LANGUAGE}&sources=${SOURCES}&sortBy=publishedAt&apiKey=${NEWS_API_KEY}&pageSize=4`;

        try {
            const response = await fetch(API_URL_NEWS);
            
            if (!response.ok) {
                const errorData = await response.json();
                // Menampilkan error jika API Key tidak valid atau kuota habis
                throw new Error(`[${response.status}] ${errorData.message || 'Gagal memuat berita.'}`);
            }
            
            const data = await response.json();
            const articles = data.articles;

            if (articles.length === 0) {
                // FALLBACK: Jika filter Sumber terlalu ketat, coba kueri luas tanpa Sumber.
                // Jika masih kosong, tampilkan pesan:
                newsList.innerHTML = '<p class="col-span-2 text-center text-gray-500">Tidak ada berita yang ditemukan. Coba matikan filter Sumber jika masalah ini terus terjadi.</p>';
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
                            <span class="text-red-500 font-semibold">${date} | Sumber: ${article.source.name}</span>
                            <a href="${article.url}" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:text-red-500 font-medium">Baca Selengkapnya &rarr;</a>
                        </div>
                    </div>
                `;
                newsList.innerHTML += card;
            });

        } catch (error) {
            console.error('Error loading news:', error);
            newsList.innerHTML = `<p class="col-span-2 text-center text-red-500">Gagal memuat berita: ${error.message}. Periksa News API Key dan kuota Anda.</p>`;
        }
    }

    // Panggil fungsi (Asumsikan loadExercises ada di file yang sama)
    // loadExercises(); 
    loadHealthNews();
});