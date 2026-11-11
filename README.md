# 🏛️ Simulasi KLC-CAT UPKP Kementerian Keuangan
### Ujian Penyesuaian Kenaikan Pangkat (UPKP) — Direktorat Jenderal Perbendaharaan (DJPb)
**Tahun Anggaran 2026**

Aplikasi simulasi ujian berbasis komputer (*Computer Assisted Test* / CAT) yang dirancang khusus untuk memfasilitasi persiapan pegawai dalam menghadapi **Ujian Penyesuaian Kenaikan Pangkat (UPKP) Kementerian Keuangan Republik Indonesia**, khususnya pada lingkungan **Direktorat Jenderal Perbendaharaan (DJPb)**.

Tampilan antarmuka, tata letak, mekanisme pengerjaan, alokasi waktu, ambang batas kelulusan (*passing grade*), serta navigasi soal disusun **persis dengan sistem KLC-CAT & Safe Exam Browser (SEB)** sebagaimana tercantum dalam dokumen resmi *Materi Briefing Peserta UPKP Kemenkeu Corporate University*.

---

## ✨ Fitur Utama Aplikasi

### 1. Desain & Alur Mengacu pada Dokumen Briefing UPKP 2026
- **Halaman Login KLC-CAT (Slide 16 & 17)**:
  - Masuk menggunakan Akun Tunggal Digital (*Single Identity Login* Kemenkeu ID), Akun Google, atau Login Cepat Peserta.
  - Fitur *Cek Perangkatmu* untuk memastikan kesiapan browser dan sistem sebelum ujian dimulai.
- **Halaman Profil Peserta (Slide 18)**:
  - Menampilkan Username, Nama Lengkap, NIP, NIK, Jabatan, Unit Organisasi, Alamat Email, Nomor Kontak, dan Unit Eselon I (Ditjen Perbendaharaan).
  - Verifikasi data sebelum melangkah ke menu pemilihan ujian.
- **Daftar Ujian Terstandar (Slide 19)**:
  - Pilihan paket ujian berstandar resmi: **UPKP IV**, **UPKP V**, **UPKP VI**, **Paket Spesialis Regulasi Terkini (2021–2025)**, **Tes Potensi (TPA)**, dan **Simulasi Uji Coba (Dummy Test)**.
  - Setiap kartu ujian dilengkapi tombol `Lihat →` serta rincian durasi dan passing grade.
- **Pakta Integritas & Validasi Token Subtes (Slide 13)**:
  - Sebelum memulai subtes, peserta diwajibkan menyetujui pakta integritas dan menginput token resmi ujian (`UPKP26` / token paket).
- **Ruang Ujian KLC-CAT Otentik (Slide 20)**:
  - **Bilah Atas (Header)**: Avatar profil peserta, Nama Lengkap, NIP, Judul Ujian, dan Subtes aktif.
  - **Indikator Waktu (Timer)**: Kotak countdown kuning-oranye (`HH:MM:SS`) di sudut kanan atas dengan peringatan visual saat sisa waktu 5 menit terakhir.
  - **Lembar Soal**: Format teks terstruktur dengan opsi ganda (A, B, C, D, E) interaktif.
  - **Navigasi Bilah Bawah**: Tombol `← Kembali`, `Tandai` (Ragu-ragu / Oranye), dan `Lanjut →`.
  - **Sidebar Navigasi Soal**:
    - Kotak nomor soal dengan standar pewarnaan resmi Kemenkeu:
      - 🟦 **Warna Biru**: Sudah dijawab
      - 🟧 **Warna Oranye**: Ragu-ragu / Sedang dikerjakan
      - ⬜ **Warna Abu-abu**: Belum dijawab
    - **Statistik Pengerjaan Real-time**: Indikator jumlah butir soal terjawab, belum terjawab, dan ragu-ragu.
    - Tombol finalisasi `Kirim & Selesai`.
  - **Penyimpanan Otomatis**: Jawaban tersimpan secara lokal dan otomatis di latar belakang setiap 60 detik.
- **Aksesibilitas Teks & Dukungan Mode Gelap (Slide 20 & 21)**:
  - Tombol beralih **Mode Gelap / Terang (Dark / Light Mode)** langsung di bilah atas (*Top Header*) dengan indikator ikon 🌙 / ☀️ dan sinkronisasi ke switch footer.
  - Pintasan keyboard (*shortcut*) cepat: tekan **`Alt + T`** atau **`Ctrl + Shift + D`** untuk beralih mode gelap kapan saja.
  - Pengaturan tema otomatis tersimpan di penyimpanan lokal (*Local Storage*) dan menyesuaikan preferensi sistem secara cerdas.
  - Pengaturan ukuran font melalui tombol `A+` dan `A-` serta shortcut keyboard `Ctrl +` dan `Ctrl -`.
- **Simulasi Pengawasan & Bantuan Panitia (Slide 11)**:
  - Indikator status proctoring (*"AI Proctoring: Terhubung • Fokus Ujian"*).
  - Fitur komunikasi interaktif *"Chat dengan Pengawas"* untuk simulasi pelaporan kendala teknis dan konfirmasi instruksi panitia.

---

## 🎯 Ketentuan Waktu & Ambang Batas Kelulusan (Passing Grade)

Mengacu pada ketentuan **Slide 3 & Slide 7** dokumen briefing resmi:

| Jenjang UPKP | Ambang Batas Tes Potensi | Ambang Batas TSKKWK | Durasi Tes Potensi | Durasi TSKKWK |
| :--- | :---: | :---: | :---: | :---: |
| **UPKP IV** | **≥ 450** | **≥ 70.0** | 120 Menit (Verbal 45', Numerik 45', Figural 30') | 60 Menit |
| **UPKP V** | **≥ 475** | **≥ 70.0** | 120 Menit (Verbal 45', Numerik 45', Figural 30') | 60 Menit |
| **UPKP VI** | **≥ 475** | **≥ 70.0** | 120 Menit (Verbal 45', Numerik 45', Figural 30') | 60 Menit |

---

## 📚 Bank Soal & Pengembangan Materi Regulasi 2021–2025

Aplikasi memuat **460+ butir soal terverifikasi** lengkap dengan kunci jawaban dan pembahasan komprehensif, mencakup:
1. **Arsip Resmi UPKP Ditjen Perbendaharaan Kementerian Keuangan** (Tahun 2014, 2015, dan 2018).
2. **Koleksi Pembahasan Soal Kompetensi & Potensi Pegawai** (Penalaran Logis/Silogisme, Analitis, Deret Angka, Aritmatika Sosial, Peluang, Perbandingan, Statistika, Tugas dan Fungsi Perbendaharaan, Kode Etik PNS, dan Nilai-Nilai Kementerian Keuangan).
3. **Materi Regulasi & Pembaruan Terkini (2021 s.d. 2025)**:
   - **UU No. 20 Tahun 2023 tentang Aparatur Sipil Negara**: Perubahan sistem kepegawaian, nilai dasar BerAKHLAK, kesetaraan hak PPPK, dan batas usia pensiun.
   - **PP No. 94 Tahun 2021 tentang Disiplin PNS**: Klasifikasi tingkat hukuman disiplin, pemotongan tunjangan kinerja, dan ketentuan kumulatif ketidakhadiran.
   - **UU No. 1 Tahun 2022 tentang Hubungan Keuangan antara Pemerintah Pusat dan Daerah (UU HKPD)**: Transformasi penyaluran Transfer ke Daerah (TKD) melalui KPPN di seluruh Indonesia.
   - **Substansi Tata Kelola Perbendaharaan Modern**: Sistem Aplikasi Keuangan Tingkat Instansi (SAKTI), SPAN, Digipay Satu, Kartu Kredit Pemerintah (KKP) Domestik, Tanda Tangan Elektronik (TTE) Tersertifikasi BSrE, peran DJPb sebagai *Regional Chief Economist (RCE)* dan *Financial Advisor (FA)*, serta indikator kinerja pelaksanaan anggaran (IKPA).

---

## 📊 Lembar Hasil Evaluasi, Pembahasan, & Pelaporan

Setelah menyelesaikan ujian, sistem menyajikan rekapitulasi evaluasi kelulusan secara transparan:
1. **Penetapan Kelulusan**: Status kelulusan resmi berdasarkan pemenuhan ambang batas (*MEMENUHI PASSING GRADE / BELUM MEMENUHI PASSING GRADE*).
2. **Rincian Capaian Nilai**: Skor Tes Potensi, Nilai TSKKWK, persentase akurasi, rincian jawaban benar, salah, dan kosong.
3. **Lembar Pembahasan Lengkap**:
   - Perbandingan jawaban peserta terhadap kunci jawaban resmi.
   - Penjelasan dasar hukum dan langkah penyelesaian pada setiap butir soal.
   - Filter interaktif: *Semua Soal*, *Jawaban Salah*, atau *Jawaban Benar*.
4. **Penyampaian Rapor ke Email Peserta**:
   - Fitur otomatis untuk mengirimkan salinan laporan hasil ujian ke alamat email peserta (`mailto:` standar atau melalui script backend).
5. **Cetak / Unduh Format Dokumen Resmi**:
   - Tata letak cetak (*Print/Save as PDF*) yang telah dioptimalkan sesuai standar sertifikat evaluasi Kemenkeu.

---

## 🚀 Panduan Menjalankan Aplikasi

Aplikasi dibangun menggunakan arsitektur web modern tanpa ketergantungan pustaka pihak ketiga (*Zero Dependency*), sehingga dapat dijalankan secara langsung pada sistem operasi Windows 10/11:

### Cara 1: Menggunakan Launcher Resmi (Sangat Direkomendasikan)
1. Buka folder aplikasi.
2. Klik ganda file **`Mulai-Ujian-UPKP.bat`**.
3. Aplikasi akan otomatis berjalan di Microsoft Edge atau Google Chrome dalam mode aplikasi layar penuh (mensimulasikan lingkungan *Safe Exam Browser*).

### Cara 2: Membuka Langsung File HTML
1. Buka file **`index.html`** menggunakan peramban web modern (*Microsoft Edge*, *Google Chrome*, *Mozilla Firefox*).

### Cara 3: Menjalankan Server Lokal (Opsional)
Untuk menjalankan simulasi melalui server lokal HTTP:
```powershell
powershell -ExecutionPolicy Bypass -File server.ps1
```
Akses aplikasi melalui alamat browser: `http://localhost:8080`.

---
**Pusat Pembinaan Profesi & Penjaminan Mutu • Direktorat Jenderal Perbendaharaan**  
*Kementerian Keuangan Republik Indonesia*
