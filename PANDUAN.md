# 💕 Panduan Web Anniversary

Web ini dibuat supaya **gampang kamu isi dan ubah-ubah sendiri**.
Kamu cukup mengedit **satu file**: `js/config.js`. File lain tidak perlu disentuh.

---

## 🚀 Cara melihat web-nya

- **Cara cepat (di komputer):** klik dua kali file `index.html`, web langsung terbuka di browser.
- **Cara online (gratis):** lihat bagian "Publish ke GitHub Pages" di bawah.

---

## ✏️ Cara mengubah konten

Buka file **`js/config.js`**. Semua teks, tanggal, foto, dan pesan ada di situ,
lengkap dengan keterangan dalam Bahasa Indonesia. Beberapa contoh:

| Yang mau diubah | Bagian di config.js |
|---|---|
| Nama kamu & pacar | `namaKamu`, `namaDia` |
| Tanggal jadian (untuk counter) | `tanggalJadian` (format `YYYY-MM-DD`) |
| Judul halaman pembuka | `landing` |
| Momen di timeline | `timeline` |
| Foto galeri | `galeri` |
| Video YouTube | `video` |
| Isi surat cinta | `surat` |
| Pesan kejutan terakhir | `kejutan` |

Aturan singkat:
1. Teks selalu ditulis di antara tanda kutip `"..."`.
2. Jangan menghapus tanda koma `,` di akhir baris.
3. Simpan file setelah diedit, lalu refresh browser.

---

## 🖼️ Cara menambah / mengganti FOTO

1. Taruh file foto kamu di folder **`images/`**.
2. Di `js/config.js`, tulis nama filenya. Contoh:
   ```js
   foto: "images/foto-kita.jpg"
   ```
3. Kalau sebuah foto belum tersedia, web tetap berjalan normal (foto itu otomatis disembunyikan).

> Tips: kompres foto dulu (mis. di tinypng.com) supaya web cepat dibuka.

---

## 🎬 Cara menambah VIDEO (YouTube unlisted)

1. Upload video ke YouTube, set visibility ke **"Unlisted"** (siapa pun dengan link bisa nonton, tapi tidak muncul di pencarian).
2. Ambil **kode video** dari URL-nya. Contoh:
   `https://www.youtube.com/watch?v=`**`dQw4w9WgXcQ`**
3. Masukkan kodenya di `js/config.js`:
   ```js
   video: { ..., youtubeId: "dQw4w9WgXcQ" }
   ```
4. Kalau dikosongkan (`youtubeId: ""`), bagian video otomatis hilang.

---

## 🌐 Publish ke GitHub Pages (gratis)

1. Pastikan semua file sudah ada di repository GitHub kamu.
2. Buka repo di GitHub → **Settings** → **Pages**.
3. Di bagian *Source*, pilih branch (mis. `main`) dan folder `/ (root)`, lalu **Save**.
4. Tunggu sebentar, lalu buka link yang muncul, contoh:
   `https://username.github.io/cie/`

Setiap kali kamu mengubah `config.js` atau menambah foto lalu push ke GitHub,
web online-nya ikut ter-update otomatis. ✨

---

## 📁 Struktur file

```
cie/
├── index.html        ← halaman utama (tidak perlu diedit)
├── css/styles.css    ← tampilan/warna (opsional diedit)
├── js/
│   ├── config.js     ← ★ EDIT DI SINI: semua isi konten
│   └── app.js        ← mesin web (tidak perlu diedit)
└── images/           ← ★ taruh semua foto di sini
```
