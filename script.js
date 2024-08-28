let y = 0;
let autoRotateInterval;
let mouseMoveTimeout;
const sensitivity = 0.5; // Чутливість для миші
const touchSensitivity = 0.05; // Зменшена чутливість для сенсорного вводу
let isVideoPlaying = false; // Перевірка, чи відео програється

// Функція для автоматичного обертання з використанням requestAnimationFrame
function startAutoRotate() {
  function rotate() {
    if (!isVideoPlaying) {
      // Запуск обертання лише якщо відео не програється
      y += 0.5;
      updateCubeRotation();
    }
    autoRotateInterval = requestAnimationFrame(rotate);
  }
  autoRotateInterval = requestAnimationFrame(rotate);
}

// Зупиняємо автоматичне обертання
function stopAutoRotate() {
  cancelAnimationFrame(autoRotateInterval);
}

// Функція для відновлення автоматичного обертання після 3 секунд без руху курсора
function resetAutoRotate() {
  if (!isVideoPlaying) {
    // Не запускаємо обертання, якщо відео програється
    clearTimeout(mouseMoveTimeout);
    mouseMoveTimeout = setTimeout(startAutoRotate, 3000); // 3 секунди
  }
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

// Примусове відтворення відео та налаштування циклічного відтворення
function forcePlayVideos() {
  document.querySelectorAll("video").forEach((video) => {
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

    // Відстежуємо стан відео (грає/паузується)
    video.addEventListener("play", () => {
      isVideoPlaying = true; // Відео програється, зупиняємо обертання
      stopAutoRotate();
    });

    video.addEventListener("pause", () => {
      isVideoPlaying = false; // Відео на паузі, можемо відновити обертання
      resetAutoRotate();
    });
  });
}

// Додаємо подію для відтворення відео при взаємодії користувача
function addVideoPlayOnClick() {
  document.querySelector(".front").addEventListener("click", () => {
    const video = document.querySelector(".front video");
    if (video.paused) {
      video.play().catch((error) => {
        console.log("Play failed:", error);
      });
    } else {
      video.pause(); // Додаємо можливість зупинити відео при повторному кліку
    }
  });
}

// Додаткові події для сенсорного введення
function handleTouchStart(e) {
  stopAutoRotate();
}

function handleTouchEnd(e) {
  resetAutoRotate();
}

// Ініціалізація подій
function initEvents() {
  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("touchmove", handleTouchMove);
  document.addEventListener("touchstart", handleTouchStart);
  document.addEventListener("touchend", handleTouchEnd);
}

// Запуск функцій при завантаженні сторінки
function init() {
  startAutoRotate();
  forcePlayVideos();
  addVideoPlayOnClick();
  initEvents();
}

init();
