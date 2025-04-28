const birthday = new Date('2025-05-11T00:00:00');
const now = new Date();

const beforeBirthday = document.getElementById('beforeBirthday');
const mainContent = document.getElementById('mainContent');
const countdownEl = document.getElementById('countdown');
const cardSection = document.getElementById('cardSection');

// Kiểm tra xem có đến ngày chưa
if (now >= birthday) {
  beforeBirthday.classList.add('hidden');
  mainContent.classList.remove('hidden');
  updateCountdown();
  setInterval(updateCountdown, 1000);
}

function updateCountdown() {
  const now = new Date();
  const diff = birthday - now;

  if (diff <= 0) {
    countdownEl.innerHTML = "🎂 Đến sinh nhật rồi! 🎂";
    cardSection.classList.remove('hidden');
  } else {
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    countdownEl.innerHTML = `${days} ngày ${hours} giờ ${minutes} phút ${seconds} giây`;
    cardSection.classList.add('hidden');
  }
}

// Wishes
const wishes = [
  "Chúc Hà luôn luôn xinh đẹp, học giỏi và cười thật nhiều nhé! 🎀",
  "Mong Hà sẽ có một tuổi mới thật rực rỡ như chính nụ cười của cậu! 💖",
  "Sinh nhật vui vẻ nhaaa Hà dễ thương 🧁🎈",
  "Chúc Hà có tất cả những gì cậu mong muốn nhé! 🥳",
  "Một năm mới đầy thành công, niềm vui và tình yêu thương! 🎂"
];

function openCard() {
  const wishBox = document.getElementById('wishes');
  wishBox.classList.remove('hidden');
  wishBox.innerHTML = wishes[Math.floor(Math.random() * wishes.length)];
  launchFireworks();
}

// Fireworks
const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function launchFireworks() {
  for (let i = 0; i < 30; i++) {
    createParticle();
  }
}

function createParticle() {
  const x = canvas.width / 2;
  const y = canvas.height / 2;
  const radius = Math.random() * 3 + 2;
  const color = `hsl(${Math.random() * 360}, 70%, 60%)`;
  const speed = Math.random() * 5 + 2;
  const angle = Math.random() * Math.PI * 2;

  const particle = {x, y, radius, color, speed, angle};

  animateParticle(particle);
}

function animateParticle(p) {
  const move = () => {
    p.x += Math.cos(p.angle) * p.speed;
    p.y += Math.sin(p.angle) * p.speed;
    p.radius -= 0.05;
    if (p.radius > 0) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
      requestAnimationFrame(move);
    }
  };
  move();
}

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
