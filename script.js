let y = 0;
let autoRotateInterval;
let mouseMoveTimeout;
const sensitivity = 0.5; // Чутливість для миші
const touchSensitivity = 0.1; // Зменшена чутливість для сенсорного вводу

// Функція для автоматичного обертання
function startAutoRotate() {
  autoRotateInterval = setInterval(() => {
    y += 0.5; // Зменшено крок обертання для плавності
    updateCubeRotation();
  }, 30); // Зменшено інтервал для плавності
}

// Зупиняємо автоматичне обертання
function stopAutoRotate() {
  clearInterval(autoRotateInterval);
}

// Функція для відновлення автоматичного обертання після 3 секунд без руху курсора
function resetAutoRotate() {
  clearTimeout(mouseMoveTimeout);
  mouseMoveTimeout = setTimeout(startAutoRotate, 3000); // 3 секунди
}

// Управління за допомогою миші
function handleMouseMove(e) {
  stopAutoRotate();
  y += e.movementX * sensitivity; // Рух миші по горизонталі
  updateCubeRotation();
  resetAutoRotate();
}

// Управління за допомогою сенсорного вводу (смартфон)
function handleTouchMove(e) {
  const touch = e.touches[0];
  e.preventDefault(); // Забороняє скролінг лише при взаємодії з кубом
  stopAutoRotate();
  y += (touch.clientX - window.innerWidth / 2) * touchSensitivity; // Рух пальця по горизонталі
  updateCubeRotation();
  resetAutoRotate();
}

// Функція для оновлення трансформації куба
function updateCubeRotation() {
  document.querySelector(".cube").style.transform = `rotateY(${y}deg)`;
}

// Функція для примусового відтворення відео з атрибутами
function forcePlayVideos() {
  document.querySelectorAll("video").forEach((video) => {
    video.muted = true; // Гарантуємо вимкнення звуку
    video.play().catch((error) => {
      console.log("Autoplay failed:", error);
    });

    // Додаємо обробник події для циклічного відтворення
    video.addEventListener("ended", () => {
      video.currentTime = 0; // Повертаємося на початок відео
      video.play().catch((error) => {
        console.log("Play failed:", error);
      });
    });
  });
}

// Додаємо подію для відтворення відео при взаємодії користувача
function addVideoPlayOnClick() {
  document.querySelector(".front").addEventListener("click", () => {
    const video = document.querySelector(".front video");
    video.play().catch((error) => {
      console.log("Play failed:", error);
    });
  });
}

// Ініціалізація подій
function initEvents() {
  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("touchmove", handleTouchMove);
}

// Запуск функцій при завантаженні сторінки
function init() {
  startAutoRotate();
  forcePlayVideos();
  addVideoPlayOnClick();
  initEvents();
}

init();
