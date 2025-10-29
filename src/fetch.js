// Menjalankan script setelah semua konten HTML selesai dimuat
document.addEventListener('DOMContentLoaded', () => {
  
  // ==========================================
  // FUNGSI 1: MENGAMBIL LATIHAN (GYM)
  // (Tidak ada perubahan di sini)
  // ==========================================
  
  async function fetchExercises() {
    const exerciseListContainer = document.getElementById('exercise-list');
    const apiUrl = 'https://wger.de/api/v2/exerciseinfo/?language=2&category=10&limit=6';

    if (!exerciseListContainer) {
      console.error("Error: Element 'exercise-list' not found.");
      return;
    }

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const data = await response.json();
      const exercises = data.results;

      exerciseListContainer.innerHTML = ''; 

      exercises.forEach(exercise => {
        const card = document.createElement('div');
        card.className = 'p-6 bg-white rounded shadow';

        const exerciseName = document.createElement('h4');
        exerciseName.className = 'font-semibold text-lg mb-2';
        exerciseName.textContent = exercise.name;

        const exerciseDescription = document.createElement('div');
        exerciseDescription.className = 'text-sm text-gray-700';
        exerciseDescription.innerHTML = exercise.description;

        card.appendChild(exerciseName);
        card.appendChild(exerciseDescription);
        exerciseListContainer.appendChild(card);
      });

    } catch (error) {
      console.error('Gagal mengambil data latihan:', error);
      exerciseListContainer.innerHTML = '<p class="col-span-3 text-center text-red-500">Gagal memuat data latihan.</p>';
    }
  }

  // ==========================================
  // FUNGSI 2: MENGAMBIL BERITA KESEHATAN (Health News)
  // (Fungsi ini DIMODIFIKASI agar sesuai tema)
  // ==========================================
  
  async function fetchHealthNews() {
    const newsListContainer = document.getElementById('news-list');
    
    // --- PERUBAHAN URL API ---
    // Menggunakan API berita kategori "health" (kesehatan)
    // "in.json" berarti mengambil berita dari regional India (yang banyak berbahasa Inggris)
    // Kita batasi hanya 4 berita saja dengan .slice(0, 4) nanti
    const newsApiUrl = 'https://saurav.tech/NewsAPI/top-headlines/category/health/in.json';
    
    if (!newsListContainer) {
        console.error("Error: Element 'news-list' not found.");
        return;
    }

    try {
      const response = await fetch(newsApiUrl);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      
      // --- PERUBAHAN KEY JSON ---
      // API ini menyimpan artikel di dalam 'data.articles' (bukan 'data.results')
      // Kita ambil 4 artikel pertama saja
      const articles = data.articles.slice(0, 4);

      newsListContainer.innerHTML = ''; // Bersihkan loading

      articles.forEach(article => {
        // Membuat kartu HTML untuk setiap berita
        const card = document.createElement('div');
        card.className = 'bg-white rounded shadow border overflow-hidden';

        // --- PERUBAHAN KEY JSON ---
        // API ini menggunakan 'urlToImage' (bukan 'image_url')
        const img = document.createElement('img');
        // Beberapa berita mungkin tidak punya gambar, jadi kita beri gambar cadangan
        img.src = article.urlToImage || 'https://via.placeholder.com/400x200?text=Info+Sehat'; 
        img.alt = article.title;
        img.className = 'w-full h-48 object-cover';

        const content = document.createElement('div');
        content.className = 'p-6';

        // Judul Berita (Key 'title' sama)
        const title = document.createElement('h4');
        title.className = 'font-semibold text-lg mb-2';
        title.textContent = article.title;
        
        // --- PERUBAHAN KEY JSON ---
        // API ini menggunakan 'description' (bukan 'summary')
        const summary = document.createElement('p');
        summary.className = 'text-sm text-gray-600 mb-4';
        summary.textContent = article.description || 'Tidak ada deskripsi.'; // Beri teks cadangan

        // Link "Baca Selengkapnya" (Key 'url' sama)
        const link = document.createElement('a');
        link.href = article.url;
        link.textContent = 'Baca Selengkapnya';
        link.target = '_blank'; 
        link.className = 'text-red-500 hover:text-red-700 font-semibold';

        // Memasukkan semua elemen ke dalam kartu
        content.appendChild(title);
        content.appendChild(summary);
        content.appendChild(link);
        card.appendChild(img);
        card.appendChild(content);

        // Memasukkan kartu ke UI
        newsListContainer.appendChild(card);
      });

    } catch (error) {
      console.error('Gagal mengambil data berita:', error);
      newsListContainer.innerHTML = '<p class="col-span-2 text-center text-red-500">Gagal memuat berita kesehatan.</p>';
    }
  }

  // ==========================================
  // MENJALANKAN KEDUA FUNGSI
  // ==========================================
  fetchExercises();      // Ambil data latihan
  fetchHealthNews();   // Ambil data berita kesehatan
  
});