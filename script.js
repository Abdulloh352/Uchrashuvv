// ====== SOZLAMA ======
// Telegram username'ingizni @ belgisisiz yozing
const TELEGRAM_USERNAME = "Ravshanovv_dev";
// =====================

const $ = id => document.getElementById(id);
const noBtn = $("noBtn"), yesBtn = $("yesBtn");
let place = "", time = "", attempts = 0;

const noTexts = ["Yo'q", "Ishonchingiz komilmi? 🥺", "Qayta o'ylab ko'r 😢", "Iltimos... 🥹", "Barmog'ing adashdi 😏", "Ushlab bo'lmaydi 😎"];

// "Yo'q" tugmasi faqat BOSGANDA qochadi
function runAway(e) {
  if (e) e.preventDefault();
  attempts++;
  noBtn.classList.add("run");
  const pad = 10;
  const maxX = window.innerWidth - noBtn.offsetWidth - pad;
  const maxY = window.innerHeight - noBtn.offsetHeight - pad;
  noBtn.style.left = Math.max(pad, Math.random() * maxX) + "px";
  noBtn.style.top  = Math.max(pad, Math.random() * maxY) + "px";
  noBtn.textContent = noTexts[Math.min(attempts, noTexts.length - 1)];
  yesBtn.style.transform = "scale(" + Math.min(1 + attempts * 0.12, 1.8) + ")";
  $("sub").textContent = "Yo'q tugmasi ham seni sevadi, shuning uchun qochyapti 😂";
}
noBtn.addEventListener("click", runAway);
noBtn.addEventListener("touchstart", runAway, { passive: false });

function show(id) {
  ["step1","step2","step3","step4"].forEach(s => $(s).classList.add("hidden"));
  $(id).classList.remove("hidden");
}

// HA
yesBtn.addEventListener("click", () => {
  noBtn.classList.add("hidden");
  confetti();
  show("step2");
});

// Joy tanlash
document.querySelectorAll("[data-place]").forEach(b =>
  b.addEventListener("click", () => { place = b.dataset.place; show("step3"); })
);

// Vaqt tanlash
document.querySelectorAll("[data-time]").forEach(b =>
  b.addEventListener("click", () => {
    const t = b.dataset.time;

    // 10:00 va 11:00 — kech, xira bo'lib qoladi
    if (t === "10:00" || t === "11:00") {
      b.disabled = true;
      const msg = $("lateMsg");
      msg.textContent = "Buncha... kech ko'rishamizmi? 😒 9:00 ni tanla";
      msg.classList.remove("show");
      void msg.offsetWidth;          // animatsiyani qayta ishga tushirish
      msg.classList.add("show");
      return;
    }

    // faqat 9:00 o'tadi
    time = t;
    $("summary").innerHTML = "Uchrashuv joyi: <b>" + place + "</b><br>Vaqti: <b>" + time + "</b> 💫<br>Men seni kutaman!";
    show("step4");
    confetti();
  })
);

// Telegramga yuborish
$("sendBtn").addEventListener("click", () => {
  const text = "Ha! 💗 Uchrashuvga roziman. Joy: " + place + ", vaqt: " + time;
  window.open("https://t.me/" + TELEGRAM_USERNAME + "?text=" + encodeURIComponent(text), "_blank");
});

// Yuraklar yog'ishi
function confetti() {
  for (let i = 0; i < 30; i++) {
    const h = document.createElement("div");
    h.className = "heart";
    h.textContent = ["💖","💗","💕","🌸"][Math.floor(Math.random() * 4)];
    h.style.left = Math.random() * 100 + "vw";
    h.style.animationDuration = 2 + Math.random() * 3 + "s";
    h.style.fontSize = 16 + Math.random() * 22 + "px";
    document.body.appendChild(h);
    setTimeout(() => h.remove(), 5500);
  }
}