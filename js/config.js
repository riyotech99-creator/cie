/* =====================================================================
 *  ❤️  KONFIGURASI KONTEN WEB ANNIVERSARY  ❤️
 * =====================================================================
 *
 *  INI SATU-SATUNYA FILE YANG PERLU KAMU EDIT untuk mengubah isi web.
 *  Kamu TIDAK perlu menyentuh file lain (app.js, styles.css, index.html).
 *
 *  Aturan singkat saat mengedit:
 *   1. Teks selalu ditulis di antara tanda kutip "seperti ini".
 *   2. Jangan hapus tanda koma ( , ) di akhir baris.
 *   3. Untuk foto: taruh file di folder "images/" lalu tulis nama
 *      filenya, contoh:  "images/foto1.jpg"
 *   4. Setelah edit, simpan file ini. Selesai!
 *
 * ===================================================================== */

const CONFIG = {

  /* ------------------------------------------------------------------
   * 1) DATA UTAMA
   * ------------------------------------------------------------------ */
  namaKamu: "Nama Kamu",
  namaDia: "Nama Pacar",

  // Tanggal jadian. Format WAJIB: "TAHUN-BULAN-TANGGAL" (YYYY-MM-DD)
  // Contoh 29 Mei 2025  ->  "2025-05-29"
  tanggalJadian: "2025-05-29",


  /* ------------------------------------------------------------------
   * 2) HALAMAN PEMBUKA (LANDING)
   * ------------------------------------------------------------------ */
  landing: {
    judul: "Untuk Kamu, Cintaku",
    subjudul: "Setahun perjalanan kita — dan ini baru permulaan",
    // Foto besar di belakang halaman pembuka.
    // Taruh fotonya di folder images/ lalu tulis namanya di sini.
    fotoLatar: "images/landing.jpg",
    // Teks tombol untuk mulai scroll ke bawah
    tombol: "Buka kenangan kita 💕",
  },


  /* ------------------------------------------------------------------
   * 3) COUNTER HARI JADIAN
   * ------------------------------------------------------------------ */
  counter: {
    judul: "Sudah Sejauh Ini Bersama",
    catatan: "...dan setiap detiknya berharga 🤍",
  },


  /* ------------------------------------------------------------------
   * 4) TIMELINE KENANGAN
   * ------------------------------------------------------------------
   *  Daftar momen penting. Kamu bisa tambah / kurangi sebanyak yang mau.
   *  Tiap momen punya: tanggal, judul, cerita, dan foto (opsional).
   *  Untuk menambah momen baru, salin satu blok { ... } lalu ubah isinya.
   *  Kalau tidak ada foto, tulis:  foto: ""
   * ------------------------------------------------------------------ */
  timeline: [
    {
      tanggal: "29 Mei 2025",
      judul: "Pertama Kali Bertemu",
      cerita: "Hari di mana semuanya dimulai. Aku masih ingat senyummu waktu itu.",
      foto: "images/timeline1.jpg",
    },
    {
      tanggal: "15 Juli 2025",
      judul: "Kencan Pertama",
      cerita: "Deg-degan, canggung, tapi jadi salah satu hari paling membahagiakan.",
      foto: "images/timeline2.jpg",
    },
    {
      tanggal: "20 Desember 2025",
      judul: "Liburan Bareng",
      cerita: "Petualangan kecil kita yang penuh tawa dan cerita seru.",
      foto: "images/timeline3.jpg",
    },
    {
      tanggal: "29 Mei 2026",
      judul: "Satu Tahun Kita 🎉",
      cerita: "Terima kasih sudah bertahan dan tumbuh bersamaku. Aku sayang kamu.",
      foto: "images/timeline4.jpg",
    },
  ],


  /* ------------------------------------------------------------------
   * 5) GALERI FOTO
   * ------------------------------------------------------------------
   *  Daftar foto kenangan. Taruh semua foto di folder images/
   *  lalu tulis nama filenya di sini, satu per baris.
   *  "caption" boleh dikosongkan dengan menulis  caption: ""
   * ------------------------------------------------------------------ */
  galeri: {
    judul: "Galeri Kenangan",
    subjudul: "Sepotong-sepotong momen yang ingin aku simpan selamanya",
    foto: [
      { src: "images/galeri1.jpg", caption: "Momen favoritku" },
      { src: "images/galeri2.jpg", caption: "Ketawa bareng" },
      { src: "images/galeri3.jpg", caption: "Senja itu" },
      { src: "images/galeri4.jpg", caption: "" },
      { src: "images/galeri5.jpg", caption: "" },
      { src: "images/galeri6.jpg", caption: "" },
    ],
  },


  /* ------------------------------------------------------------------
   * 6) VIDEO (YouTube unlisted)
   * ------------------------------------------------------------------
   *  Upload video panjang kamu ke YouTube, set visibility ke "Unlisted",
   *  lalu ambil KODE VIDEO dari URL-nya.
   *
   *  Contoh URL:  https://www.youtube.com/watch?v=dQw4w9WgXcQ
   *  Maka kodenya adalah:  dQw4w9WgXcQ   (bagian setelah "v=")
   *
   *  Kalau belum ada video, tulis:  youtubeId: ""  (section akan disembunyikan)
   * ------------------------------------------------------------------ */
  video: {
    judul: "Video Spesial Buat Kamu",
    subjudul: "Tekan play, dan tonton sampai habis ya 🎬",
    youtubeId: "dQw4w9WgXcQ",
  },


  /* ------------------------------------------------------------------
   * 7) SURAT CINTA
   * ------------------------------------------------------------------
   *  "paragraf" adalah daftar paragraf surat. Tambah/kurangi sesukamu.
   *  Tiap paragraf ditulis di antara tanda kutip, dipisah koma.
   * ------------------------------------------------------------------ */
  surat: {
    judul: "Surat Untukmu",
    tombolBuka: "Buka surat 💌",
    pembuka: "Hai sayang,",
    paragraf: [
      "Nggak terasa kita sudah satu tahun bersama. Rasanya baru kemarin kita pertama kali ngobrol, dan sekarang kamu jadi bagian terpenting dalam hari-hariku.",
      "Terima kasih untuk setiap tawa, setiap dukungan di saat aku lelah, dan setiap momen kecil yang bikin hidup ini terasa lebih hangat.",
      "Aku janji akan terus berusaha jadi orang yang lebih baik untukmu. Yuk, lanjutkan cerita kita ke tahun-tahun berikutnya.",
    ],
    penutup: "Dengan sayang,",
    ttd: "Aku ❤️",
  },


  /* ------------------------------------------------------------------
   * 8) KEJUTAN / PESAN SPESIAL DI AKHIR
   * ------------------------------------------------------------------ */
  kejutan: {
    judul: "Satu Hal Terakhir...",
    tombol: "Klik untuk kejutan 🎁",
    pesan: "Happy 1st Anniversary! 🎉",
    pesanKecil: "Aku mencintaimu, kemarin, hari ini, dan selamanya.",
  },

};
