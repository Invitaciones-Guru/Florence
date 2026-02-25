const weddingDate = new Date("Apr 11, 2026 11:30:00").getTime();

// SVG ICONS
const iconPlay = '<svg class="icon-svg-sm" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
const iconPause = '<svg class="icon-svg-sm" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>';

// 1. INICIAR LAS ANIMACIONES AUTOMÁTICAMENTE AL CARGAR LA PÁGINA
window.addEventListener('load', function() {
    AOS.init({ 
        duration: 1200, 
        easing: 'ease-out-cubic', 
        once: true, 
        offset: 50 
    });
    
    // Un pequeño empujón para obligar a los textos a aparecer
    setTimeout(function() {
        AOS.refresh();
    }, 500);
});

document.addEventListener('DOMContentLoaded', function() {
    
    const music = document.getElementById('weddingMusic');
    const musicBtn = document.getElementById('musicBtn');
    let musicStarted = false;

    // --- TRUCO: REPRODUCIR LA MÚSICA AL PRIMER TOQUE O DESLIZAMIENTO ---
    function startMusicPlay() {
        if (!musicStarted) {
            music.play().then(() => {
                musicStarted = true;
                musicBtn.innerHTML = iconPause;
                musicBtn.classList.add('pulse-animation');
                
                // Ya arrancó, así que dejamos de "escuchar" los toques
                window.removeEventListener('scroll', startMusicPlay);
                window.removeEventListener('touchstart', startMusicPlay);
                document.body.removeEventListener('click', startMusicPlay);
            }).catch(e => {
                console.log("El navegador pide que toques la pantalla.");
            });
        }
    }

    // Escuchamos si haces scroll, tocas o das clic
    window.addEventListener('scroll', startMusicPlay, { passive: true });
    window.addEventListener('touchstart', startMusicPlay, { passive: true });
    document.body.addEventListener('click', startMusicPlay, { passive: true });


    // CONTROL MANUAL DEL BOTÓN DE MÚSICA
    musicBtn.addEventListener('click', (e) => {
        e.stopPropagation(); 
        if (music.paused) {
            music.play();
            musicBtn.innerHTML = iconPause;
            musicBtn.classList.add('pulse-animation');
            musicStarted = true;
        } else {
            music.pause();
            musicBtn.innerHTML = iconPlay;
            musicBtn.classList.remove('pulse-animation');
        }
    });

    // INICIALIZAR EL CARRUSEL (SLIDER DE PADRINOS)
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
        loop: false, // <-- APAGADO para que no se repitan infinitamente
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        }
    });
});

// CONTADOR
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

// COPIAR CLABE BANCARIA
function copyText(text) {
    navigator.clipboard.writeText(text).then(() => alert("Datos bancarios copiados"));
}

// RSVP WHATSAPP
document.getElementById('rsvpForm').onsubmit = (e) => {
    e.preventDefault();
    const nombre = document.getElementById('guestName').value;
    const asistencia = document.getElementById('attendance').value;
    const personas = document.getElementById('numGuests').value;
    const status = asistencia === "si" ? "CONFIRMADO ✅" : "NO ASISTIRÁ ❌";
    
    // Cambié el texto para que diga Florence
    const msg = `Hola, soy ${nombre}.\nConfirmando para el bautizo de Florence:\nRSVP: ${status}\nPersonas: ${personas}`;
    window.open(`https://wa.me/528115999331?text=${encodeURIComponent(msg)}`, '_blank');
};
