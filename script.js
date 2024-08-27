let y = 0;
let autoRotateInterval;
let mouseMoveTimeout;
const sensitivity = 0.4; // Чутливість для миші
const touchSensitivity = 0.5; // Зменшена чутливість для сенсорного вводу

// Функція для автоматичного обертання
function startAutoRotate() {
  autoRotateInterval = setInterval(() => {
    y += 1;
    updateCubeRotation();
  }, 35); // Інтервал у мілісекундах
}

// Зупиняємо автоматичне обертання
function stopAutoRotate() {
  clearInterval(autoRotateInterval);
}

// Функція для відновлення автоматичного обертання після 3 секунд без руху курсора
function resetAutoRotate() {
  clearTimeout(mouseMoveTimeout);
  mouseMoveTimeout = setTimeout(() => {
    startAutoRotate();
  }, 3000); // 3 секунди
}

// Управління за допомогою миші
document.addEventListener("mousemove", function (e) {
  stopAutoRotate();
  y += e.movementX * sensitivity; // Рух миші по горизонталі

  updateCubeRotation();
  resetAutoRotate();
});

// Управління за допомогою сенсорного вводу (смартфон)
document.addEventListener("touchmove", function (e) {
  const touch = e.touches[0];
  e.preventDefault(); // Забороняє скролінг лише при взаємодії з кубом
  stopAutoRotate();
  y += (touch.clientX - window.innerWidth / 2) * touchSensitivity; // Рух пальця по горизонталі

  updateCubeRotation();
  resetAutoRotate();
});

// Функція для оновлення трансформації куба
function updateCubeRotation() {
  document.querySelector(".cube").style.transform = `rotateY(${y}deg)`;
}

// Примусове відтворення відео з атрибутами
document.querySelectorAll("video").forEach((video) => {
  video.muted = true; // Гарантуємо вимкнення звуку
  video.play().catch((error) => {
    console.log("Autoplay failed:", error);
  });
});

// Запускаємо автоматичне обертання при завантаженні сторінки
startAutoRotate();
