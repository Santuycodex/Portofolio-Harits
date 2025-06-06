/*
File: script.js
Deskripsi: Skrip ini menambahkan interaktivitas profesional ke halaman portofolio,
termasuk perubahan navbar saat scroll dan animasi elemen saat muncul di layar.
Versi ini lebih aman untuk mencegah error.
*/

// Menjalankan semua kode hanya setelah seluruh konten HTML selesai dimuat.
// Ini adalah praktik terbaik untuk menghindari error 'element not found'.
document.addEventListener('DOMContentLoaded', function() {

    /**
     * FUNGSI 1: MENGATUR NAVBAR
     * Fungsi ini akan mengubah tampilan navbar (menambahkan bayangan dan latar belakang)
     * saat pengguna scroll ke bawah.
     */
    function setupNavbarScroll() {
        const navbar = document.getElementById('navbar');

        // PENTING: Cek dulu apakah elemen dengan ID 'navbar' benar-benar ada di HTML.
        // Jika tidak ada, hentikan fungsi ini agar tidak terjadi error.
        if (!navbar) {
            console.error("Peringatan: Elemen dengan ID 'navbar' tidak ditemukan di HTML.");
            return;
        }

        // Tambahkan event listener untuk event 'scroll' pada window
        window.addEventListener('scroll', function() {
            // Jika posisi scroll vertikal lebih dari 50 piksel
            if (window.scrollY > 50) {
                // Tambahkan class 'scrolled' ke navbar
                navbar.classList.add('scrolled');
            } else {
                // Jika tidak, hapus class 'scrolled' dari navbar
                navbar.classList.remove('scrolled');
            }
        });
    }

    /**
     * FUNGSI 2: MENGATUR ANIMASI REVEAL-ON-SCROLL
     * Fungsi ini akan membuat elemen dengan class '.reveal' muncul secara perlahan
     * saat elemen tersebut masuk ke dalam layar pandang (viewport).
     */
    function setupRevealOnScroll() {
        const revealElements = document.querySelectorAll('.reveal');

        // PENTING: Cek dulu apakah ada elemen dengan class '.reveal'.
        // Jika tidak ada, hentikan fungsi ini.
        if (revealElements.length === 0) {
            return;
        }

        // Opsi untuk Intersection Observer
        const observerOptions = {
            root: null, // menggunakan viewport browser
            threshold: 0.1, // elemen dianggap terlihat jika 10% bagiannya masuk layar
        };

        // Fungsi yang akan dijalankan setiap kali elemen target bersinggungan dengan viewport
        const intersectionCallback = function(entries, observer) {
            entries.forEach(entry => {
                // Jika elemen sedang bersinggungan (terlihat di layar)
                if (entry.isIntersecting) {
                    // Tambahkan class 'active' untuk memicu animasi di CSS
                    entry.target.classList.add('active');
                    // Setelah animasi berjalan, berhenti mengamati elemen ini untuk efisiensi
                    observer.unobserve(entry.target);
                }
            });
        };

        // Buat observer baru dengan callback dan opsi yang sudah ditentukan
        const observer = new IntersectionObserver(intersectionCallback, observerOptions);
        
        // Minta observer untuk mengamati setiap elemen yang memiliki class '.reveal'
        revealElements.forEach(element => {
            observer.observe(element);
        });
    }


    // --- INISIALISASI ---
    // Panggil semua fungsi setup utama di sini untuk menjalankannya.
    setupNavbarScroll();
    setupRevealOnScroll();

});