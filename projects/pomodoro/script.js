const formatTime = (seconds) => {
  const m = String(Math.floor(seconds / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  return `${m}:${s}`;
};

const config = {
  pomodoro: 25 * 60,
  descanso: 5 * 60,
  descansoLargo: 10 * 60,
};

const states = {
  pomodoro: { time: config.pomodoro, interval: null, running: false },
  descanso: { time: config.descanso, interval: null, running: false },
  descansoLargo: { time: config.descansoLargo, interval: null, running: false },
};

function startTimer(type, display) {
  if (states[type].running) return;

  states[type].running = true;
  states[type].interval = setInterval(() => {
    if (states[type].time <= 0) {
      clearInterval(states[type].interval);
      states[type].running = false;
      alert(`⏰ Tiempo finalizado | ${type}`);
      return;
    }

    states[type].time--;
    display.textContent = formatTime(states[type].time);
  }, 1000);
}

function pauseTimer(type) {
  clearInterval(states[type].interval);
  states[type].running = false;
}

function resetTimer(type, display) {
  clearInterval(states[type].interval);
  states[type].time = config[type];
  states[type].running = false;
  display.textContent = formatTime(states[type].time);
}

document.querySelectorAll("[data-type]").forEach((container) => {
  const type = container.getAttribute("data-type");
  const display = container.querySelector(".timer-display");
  const btnStart = container.querySelector(".btn-start");
  const btnPause = container.querySelector(".btn-pause");
  const btnReset = container.querySelector(".btn-reset");

  btnStart.addEventListener("click", () => startTimer(type, display));
  btnPause.addEventListener("click", () => pauseTimer(type));
  btnReset.addEventListener("click", () => resetTimer(type, display));
});
