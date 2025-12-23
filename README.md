Dokumentasi Tugas Web Service - RESTful API

Nama: Muhammad Nauval Maulana
NIM: 2702284716

Deskripsi

Project ini adalah implementasi RESTful API sederhana menggunakan Express.js untuk manajemen data buku. API ini mendukung operasi CRUD (Create, Read, Update, Delete), menggunakan database SQLite (file buku.db), dan diuji menggunakan Postman.

Teknologi yang Digunakan

Backend: Node.js & Express.js

Database: SQLite (Library sqlite3)

Testing Tool: Postman

Cara Menjalankan Server

Pastikan Node.js sudah terinstall.

Buka terminal di folder project.

Install dependency (jika folder node_modules belum ada):

code
Bash
download
content_copy
expand_less
npm install

Jalankan server:

code
Bash
download
content_copy
expand_less
node app.js

Server berjalan di http://localhost:3000 dan database buku.db akan dibuat secara otomatis.

Daftar Endpoint API

Berikut adalah daftar endpoint yang tersedia untuk pengujian:

1. Menambah Data Baru (Create)

Method: POST

URL: http://localhost:3000/api/books

Body (JSON):

code
JSON
download
content_copy
expand_less
{
  "judul": "Laskar Pelangi",
  "penulis": "Andrea Hirata",
  "tahun": 2005
}

Deskripsi: Menambahkan buku baru ke dalam database SQLite. ID akan digenerate otomatis (Auto Increment).

2. Mengambil Semua Data (Read All)

Method: GET

URL: http://localhost:3000/api/books

Deskripsi: Menampilkan seluruh daftar buku yang tersimpan di database.

3. Mengambil Data Spesifik (Read One)

Method: GET

URL: http://localhost:3000/api/books/1

Deskripsi: Menampilkan detail buku berdasarkan ID (contoh di atas menggunakan ID: 1).

4. Mengubah Data (Update)

Method: PUT

URL: http://localhost:3000/api/books/1

Body (JSON):

code
JSON
download
content_copy
expand_less
{
  "judul": "Laskar Pelangi (Edisi Revisi)",
  "penulis": "Andrea Hirata",
  "tahun": 2024
}

Deskripsi: Mengupdate data buku secara keseluruhan pada ID 1.

5. Menghapus Data (Delete)

Method: DELETE

URL: http://localhost:3000/api/books/1

Deskripsi: Menghapus buku dengan ID 1 dari database.
