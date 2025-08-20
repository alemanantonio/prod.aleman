// Cambio de idioma
const toggleBtn = document.getElementById("toggle-lang");
let currentLang = "en";

toggleBtn.addEventListener("click", () => {
  currentLang = currentLang === "en" ? "es" : "en";
  toggleBtn.textContent = currentLang === "en" ? "ES" : "EN";

  document.querySelectorAll("[data-en]").forEach(el => {
    el.textContent = el.getAttribute(`data-${currentLang}`);
  });
});

// Animaciones on scroll (fade-in)
const sections = document.querySelectorAll(".fade");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, {
  threshold: 0.1
});

sections.forEach(section => {
  observer.observe(section);
});

function openModal(id) {
  document.getElementById(id).style.display = "flex";
}

function closeModal(id) {
  document.getElementById(id).style.display = "none";
}

// Cerrar con click fuera del modal
window.addEventListener("click", (e) => {
  document.querySelectorAll(".modal").forEach(modal => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
});


document.querySelectorAll('.play-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const audioId = btn.getAttribute('data-audio');
    const audio = document.getElementById(audioId);

    // reinicia por si estaba en otra parte
    audio.currentTime = 80; // 1:20

    audio.play();

    // detener en 1:35
    const stopTime = 95; // 1:35
    const interval = setInterval(() => {
      if (audio.currentTime >= stopTime) {
        audio.pause();
        clearInterval(interval);
      }
    }, 200);
  });
});


// Función para reproducir solo un fragmento de un audio
function playSnippet(audioId, start, end) {
  // Pausar todos los audios antes de iniciar el nuevo
  const allAudios = document.querySelectorAll("audio");
  allAudios.forEach(a => {
    a.pause();
    a.currentTime = 0; // reinicia todos
  });

  const audio = document.getElementById(audioId);
  if (audio) {
    audio.currentTime = start;
    audio.play();

    // Detener automáticamente en el segundo indicado
    const stopAudio = () => {
      if (audio.currentTime >= end) {
        audio.pause();
        audio.currentTime = start;
        audio.removeEventListener("timeupdate", stopAudio);
      }
    };
    audio.addEventListener("timeupdate", stopAudio);
  }
}
