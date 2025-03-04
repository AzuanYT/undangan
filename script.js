// Konfigurasi Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDR6xHGGyMBp2SHh2pBEM_UZ3fhCfMXn7U",
    authDomain: "juamey.firebaseapp.com",
    databaseURL: "https://juamey-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "juamey",
    storageBucket: "juamey.firebasestorage.app",
    messagingSenderId: "974589432788",
    appId: "1:974589432788:android:044c0032abd503c4cc3c41"
};



// Inisialisasi Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

function nextStep() {
    document.getElementById('cek-nama').style.display = 'block';
}

function cekNama() {
    let nama = document.getElementById('namaInput').value.toLowerCase();
    db.ref("undangan/" + nama).once('value', (snapshot) => {
        if (snapshot.exists()) {
            document.getElementById('kodeTamu').innerHTML = "Kode Undangan Anda: " + snapshot.val().kode;
            document.getElementById('konfirmasi-hadir').style.display = 'block';
        } else {
            document.getElementById('kodeTamu').innerHTML = "Anda tidak terdaftar dalam undangan.";
        }
    });
}

function konfirmasiHadir() {
    let kode = document.getElementById('kodeInput').value;
    db.ref("undangan").orderByChild("kode").equalTo(kode).once('value', (snapshot) => {
        if (snapshot.exists()) {
            snapshot.forEach((child) => {
                child.ref.update({ hadir: true });
            });
            document.getElementById('statusTeks').innerHTML = "Selamat, Anda sudah hadir dalam acara.";
            document.getElementById('navigasi').style.display = 'block';
        } else {
            document.getElementById('statusTeks').innerHTML = "Kode salah, coba lagi.";
        }
    });
}

function tampilkanLokasi() {
    document.getElementById('lokasi').style.display = 'block';
    document.getElementById('jadwal').style.display = 'none';
    document.getElementById('komentar').style.display = 'none';
}

function tampilkanJadwal() {
    document.getElementById('lokasi').style.display = 'none';
    document.getElementById('jadwal').style.display = 'block';
    document.getElementById('komentar').style.display = 'none';
}

function tampilkanKomentar() {
    document.getElementById('lokasi').style.display = 'none';
    document.getElementById('jadwal').style.display = 'none';
    document.getElementById('komentar').style.display = 'block';
}

function kirimUcapan() {
    let pesan = document.getElementById('pesanUcapan').value;
    db.ref("ucapan").push({ pesan: pesan });
    document.getElementById('pesanUcapan').value = "";
}

function shareWA() {
    window.open("https://wa.me/?text=Undangan%20pernikahan%20Ajuan%20Apriansyah%20dan%20Davina%20Rosinta.%20Cek%20di:%20[link-website]");
}
