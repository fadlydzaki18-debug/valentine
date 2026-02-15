let currentG = 1, score1 = 0, mSeq = [], uSeq = [], sIdx = 0;
const music = document.getElementById('bgMusic'), mSrc = document.getElementById('musicSource');
const songs = ["made-in-japan.mp3", "a-couple-minutes.mp3", "count-on-me.mp3"];

function startExperience() { music.play(); nextSlide('slide-games'); }
music.onended = () => { sIdx = (sIdx + 1) % songs.length; mSrc.src = songs[sIdx]; music.load(); music.play(); };

function nextSlide(id) {
    // 1. Pindah Slide
    document.querySelectorAll('.slide').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');

    // 2. Ganti Efek Partikel Otomatis
    startEffect(id);
}




function hitHeart() {
    score1++;
    if(score1 >= 5) { alert("Lanjut!"); currentG = 2; updateUI(); }
    else { let h = document.getElementById('heart-target'); h.style.top = Math.random()*130+"px"; h.style.left = Math.random()*180+"px"; }
}

function playMem() {
    mSeq = [0,1,2].sort(() => Math.random() - 0.5); uSeq = [];
    document.querySelectorAll('#g2 .mem-btn').forEach(b => b.classList.remove('clicked'));
    let i = 0;
    let inv = setInterval(() => {
        let b = document.getElementById('m'+mSeq[i]); b.classList.add('active');
        setTimeout(() => b.classList.remove('active'), 400);
        i++; if(i>=3) clearInterval(inv);
    }, 800);
}

function memClick(n) {
    uSeq.push(n); document.getElementById('m'+n).classList.add('clicked');
    if(uSeq[uSeq.length-1] !== mSeq[uSeq.length-1]) { alert("Ulangi!"); uSeq = []; document.querySelectorAll('#g2 .mem-btn').forEach(b => b.classList.remove('clicked')); }
    else if(uSeq.length === 3) { currentG = 3; updateUI(); }
}

function checkTreasure(el, isTrue) {
    if(isTrue) { el.innerText = "❤️"; setTimeout(() => { document.querySelector('.game-box').style.display='none'; document.getElementById('password-section').style.display='block'; }, 500); }
    else { el.innerText = "❌"; alert("Coba kotak lain!"); }
}

function updateUI() {
    document.querySelectorAll('.game-layer').forEach(l => l.classList.remove('active'));
    document.getElementById('g'+currentG).classList.add('active');
    document.getElementById('game-title').innerText = "Game " + currentG;
}
// Password & Album
function checkPass() {
    if(document.getElementById('passInput').value === "282009") { nextSlide('slide-album'); }
    else { alert("Salah!"); }
}

function renderAlbum(n) {
    const d = document.getElementById('album-display'); 
    d.innerHTML = ""; // Bersihkan tampilan sebelumnya
    document.getElementById('btnQuiz').style.display = "block"; // Munculkan tombol kuis

    // Kita buat elemen gambar baru
    let img = document.createElement('img'); }
    
    // Atur daftar file di sini (4 Foto, 2 Video)
const myMedia = [
    { type: 'image', src: 'jara4.jpg' },
    { type: 'video', src: 'jara2.mp4' },
    { type: 'image', src: 'jara5.jpg' },
    { type: 'image', src: 'jara6.jpg' },
    { type: 'video', src: 'jara3.mp4' },
    { type: 'image', src: 'jara1.jpg' }
];

function renderAlbum() {
    const container = document.getElementById('album-display');
    container.innerHTML = ""; 

    myMedia.forEach(item => {
        if (item.type === 'video') {
            const video = document.createElement('video');
            video.src = item.src;
            video.className = "album-video";
            video.controls = true;    // Munculkan tombol play/pause & volume
            video.preload = "metadata"; 
            container.appendChild(video);
        } else {
            const img = document.createElement('img');
            img.src = item.src;
            img.className = "album-item";
            img.alt = "Memory";
            img.onerror = function() { this.src = "https://via.placeholder.com/150?text=Foto+Error"; };
            container.appendChild(img);
        }
    });
}

// Panggil fungsi ini saat password benar
function checkPass() {
    const input = document.getElementById('passInput').value;
    if (input === "282009") {
        renderAlbum(); 
        nextSlide('slide-album');
    } else {
        alert("Sandi salah, coba lagi sayang!");
    }
}
// 3. Pastikan fungsi ini dipanggil saat Password Berhasil
function checkPass() {
    const input = document.getElementById('passInput').value;
    if (input === "282009") {
        renderAlbum(); // Jalankan fungsi album
        nextSlide('slide-album'); // Pindah ke slide album
    } else {
        alert("Passwordnya salah, coba lagi ya sayang!");
    }
}

// Quiz & Wish Jar
function moveNo() { let b = document.getElementById('noBtn'); b.style.position='absolute'; b.style.left=Math.random()*70+"%"; b.style.top=Math.random()*70+"%"; }
function ansQ1() { document.getElementById('q1').style.display='none'; document.getElementById('q2').style.display='block'; }
function showPasha() { document.getElementById('pasha-opt').style.display='block'; }
function ansQ2() { document.getElementById('q2').style.display='none'; document.getElementById('q3').style.display='block'; }

const wishes = ["semoga taun ini ak ga kambuh lagii", "jadi diri yang lebih baik untuk keduanyaaa", "semogaaaa harapan kita bakal jadi kenyataan untuk kedepannyaaaa (ke jepang bareng apalagi kgn jepang soalnya)"];
let wIdx = 0;
function openJar() {
    if(wIdx < wishes.length) { document.getElementById('wish-text').innerText = wishes[wIdx]; wIdx++; }
    else { document.getElementById('btnNextLetter').style.display = 'block'; }
}

// Typing Effect
const pesan = "maaf yaa sayang ku aku kemarin kemarin ga sayang km, ak jahat sama km. ak usahain diri ak yang itu ak musnahin dan ak mw menjadi pribadi yang lebih baik buat km biar km milih ak terus, ilysm and happy late valentine sayaaang, hehe.";
function startLetter() {
    nextSlide('slide-letter');
    let i = 0; const target = document.getElementById('typewriter');
    function type() {
        if(i < pesan.length) { target.innerHTML += pesan.charAt(i); i++; setTimeout(type, 50); }
        else { document.getElementById('btnFinal').style.display = 'block'; }
    }
    type();
}
let particleInterval;


// 1. DAFTAR KONFIGURASI (Emoji, Warna Partikel, dan Background)
const slideEffects = {
    'slide1': { emoji: '🌸', class: 'sakura', bgClass: 'bg-sakura' },
    'slide-games': { emoji: '🍂', class: 'autumn', bgClass: 'bg-autumn' },
    'slide-album': { emoji: '❄️', class: 'winter', bgClass: 'bg-winter' },
    'slide-quiz': { emoji: '☀️', class: 'summer', bgClass: 'bg-summer' },
    'slide-wish': { emoji: '🍁', class: 'fall', bgClass: 'bg-fall' },
    'slide-letter': { emoji: '💧', class: 'rainy', bgClass: 'bg-rainy' },
    'slide-final': { emoji: '❤️', class: 'sakura', bgClass: 'bg-sakura' }
};

// 2. FUNGSI UNTUK MENJALANKAN EFEK & BG
function startEffect(slideId) {
    // Berhenti efek lama & hapus partikel di layar
    clearInterval(particleInterval);
    const container = document.getElementById('petal-container');
    container.innerHTML = '';

    const effect = slideEffects[slideId];
    if (!effect) return;

    // --- BAGIAN GANTI BACKGROUND ---
    // Hapus semua class background lama, lalu pasang yang baru
    document.body.className = ''; 
    document.body.classList.add(effect.bgClass);

    // --- BAGIAN EFEK PARTIKEL ---
    particleInterval = setInterval(() => {
        const p = document.createElement('div');
        p.classList.add('particle', effect.class);
        p.innerHTML = effect.emoji;
        p.style.left = Math.random() * 100 + 'vw';
        p.style.animationDuration = Math.random() * 3 + 2 + 's';
        p.style.fontSize = Math.random() * 15 + 10 + 'px';
        container.appendChild(p);
        setTimeout(() => { p.remove(); }, 5000);
    }, 400);
}

// 3. UPDATE FUNGSI NEXTSLIDE (Pastikan ini mengganti fungsi lama)
function nextSlide(id) {
    document.querySelectorAll('.slide').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    
    // Panggil fungsi efek & bg setiap kali pindah slide
    startEffect(id);
}

// Jalankan efek sakura saat pertama kali dibuka
window.onload = () => {
    startEffect('slide1');
};
function nextSlide(targetId) {
    // 1. Cari semua elemen dengan class 'slide'
    const allSlides = document.querySelectorAll('.slide');
    
    // 2. Sembunyikan semuanya tanpa kecuali
    allSlides.forEach(slide => {
        slide.classList.remove('active');
        slide.style.display = 'none'; 
    });

    // 3. Cari slide tujuan berdasarkan ID
    const targetSlide = document.getElementById(targetId);

    if (targetSlide) {
        // 4. Munculkan slide tujuan
        targetSlide.classList.add('active');
        targetSlide.style.display = 'flex'; // Gunakan flex agar card tetap di tengah
        
        // 5. Scroll otomatis ke atas agar tidak terpotong
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        console.error("Gagal pindah! Slide dengan ID '" + targetId + "' tidak ditemukan.");
    }
}
