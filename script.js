const weddingDate = new Date("Aug 18, 2026 15:30:00").getTime();

// SVG ICONS
const iconPlay = '<svg class="icon-svg-sm" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
const iconPause = '<svg class="icon-svg-sm" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>';

// --- FUNCIÓN PARA ABRIR LA CARTA (ONCLICK) ---
function abrirInvitacion() {
    const overlay = document.getElementById('envelope-overlay');
    const music = document.getElementById('weddingMusic');
    const musicBtn = document.getElementById('musicBtn');
    
    // Agrega la clase para animar hacia arriba
    overlay.classList.add('opened');
    
    // Intentar reproducir música
    music.play().then(() => {
        musicBtn.innerHTML = iconPause;
        musicBtn.classList.add('pulse-animation');
    }).catch(e => {
        console.log("Autoplay bloqueado por el navegador");
    });

    // Iniciar animaciones AOS un poco después de abrir
    setTimeout(() => { AOS.init({ duration: 1200, easing: 'ease-out-cubic', once: true, offset: 100 }); }, 600);
}

document.addEventListener('DOMContentLoaded', function() {
    const music = document.getElementById('weddingMusic');
    const musicBtn = document.getElementById('musicBtn');

    // CONTROL MÚSICA BOTÓN
    musicBtn.addEventListener('click', () => {
        if (music.paused) {
            music.play();
            musicBtn.innerHTML = iconPause;
            musicBtn.classList.add('pulse-animation');
        } else {
            music.pause();
            musicBtn.innerHTML = iconPlay;
            musicBtn.classList.remove('pulse-animation');
        }
    });

    // --- INICIALIZAR SWIPER (SLIDER PADRINOS) ---
    var swiper = new Swiper(".mySwiper", {
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "auto",
        coverflowEffect: {
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: false,
        },
        loop: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
    });
});

const timer = setInterval(function() {
    const now = new Date().getTime();
    const distance = weddingDate - now;
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerHTML = days < 10 ? '0' + days : days;
    document.getElementById("hours").innerHTML = hours < 10 ? '0' + hours : hours;
    document.getElementById("minutes").innerHTML = minutes < 10 ? '0' + minutes : minutes;
    document.getElementById("seconds").innerHTML = seconds < 10 ? '0' + seconds : seconds;

    if (distance < 0) { clearInterval(timer); document.getElementById("countdown").innerHTML = "¡ES HOY!"; }
}, 1000);

function copyText(text) {
    navigator.clipboard.writeText(text).then(() => alert("Datos bancarios copiados"));
}

