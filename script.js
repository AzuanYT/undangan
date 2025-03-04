// Konfigurasi Firebase
const firebaseConfig = {
    apiKey: "AIzaSyC05KNqTZ...",
    authDomain: "juamey.firebaseapp.com",
    databaseURL: "https://juamey-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "juamey",
    storageBucket: "juamey.appspot.com",
    messagingSenderId: "974589432788",
    appId: "1:974589432788:web:05eb1d690295e912cc3c41",
    measurementId: "G-F6DTZSLT23"
};

// Inisialisasi Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Cek Nama
function cekNama() {
    let namaInput = document.getElementById("namaInput").value.trim().toLowerCase();
    let kodeTamu = document.getElementById("kodeTamu");
    let konfirmasiSection = document.getElementById("konfirmasi-hadir");

    db.ref("undangan").once("value", (snapshot) => {
        let data = snapshot.val();
        let found = false;

        Object.keys(data).forEach((key) => {
            if (key.toLowerCase() === namaInput) {
                found = true;
                kodeTamu.innerText = `Kode Undangan: ${data[key].kode}`;
                konfirmasiSection.style.display = "block";
                document.getElementById("cek-undangan").style.display = "none";
                document.getElementById("konfirmasiBtn").setAttribute("data-nama", key);
            }
        });

        if (!found) {
            alert("Nama tidak ditemukan!");
        }
    });
}

// Konfirmasi Kehadiran
function konfirmasiHadir() {
    let namaTamu = document.getElementById("konfirmasiBtn").getAttribute("data-nama");
    let kodeInput = document.getElementById("kodeInput").value.trim();
    let kodeTamu = document.getElementById("kodeTamu").innerText.split(": ")[1];

    if (kodeInput === kodeTamu) {
        db.ref(`undangan/${namaTamu}/hadir`).set(true)
            .then(() => {
                alert("Konfirmasi berhasil! Selamat datang.");
                document.getElementById("konfirmasiBtn").disabled = true;
            })
            .catch((error) => console.error(error));
    } else {
        alert("Kode salah! Coba lagi.");
    }
}

// Kirim Ucapan
function kirimUcapan() {
    let ucapan = document.getElementById("pesanUcapan").value.trim();
    if (ucapan !== "") {
        let daftarUcapan = document.getElementById("daftarUcapan");
        let li = document.createElement("li");
        li.innerText = ucapan;
        daftarUcapan.appendChild(li);
        document.getElementById("pesanUcapan").value = "";
    }
}

// Bagikan via WhatsApp
function shareWA() {
    let url = encodeURIComponent(window.location.href);
    let message = encodeURIComponent("Saya diundang ke acara pernikahan ini! Yuk cek: ");
    window.open(`https://api.whatsapp.com/send?text=${message} ${url}`, "_blank");
          }
