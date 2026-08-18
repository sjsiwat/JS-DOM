// === STATE ===

// โหลดแต้ม(point)ที่เซฟไว้จากเครื่อง แปลงเป็นตัวเลข ถ้าไม่มีข้อมูลให้เริ่มที่ 0
let point = Number(localStorage.getItem("point")) || 0;

let clickPower = Number(localStorage.getItem("clickPower")) || 1;
let upgradeCost = Number(localStorage.getItem("upgradeCost")) || 10;

let autoPower = Number(localStorage.getItem("autoPower")) || 0;
let autoCost = Number(localStorage.getItem("autoCost")) || 50;

let totalClicks = Number(localStorage.getItem("totalClicks")) || 0;
let upgradesBought = Number(localStorage.getItem("upgradesBought")) || 0;

// element
const clickPic = document.getElementById("clickerpic");
const clickPicImg = document.getElementById("clickerpic-img");

const autoEl = document.getElementById("auto");
const autoCostEl = document.getElementById("auto-cost");
const buyAutoBtn = document.getElementById("buy-auto");

const costToUpgrade = document.getElementById("cost");
const upgradeBtn = document.getElementById("upgrade");

const pointScore = document.getElementById("score");
const resetBtn = document.getElementById("reset");
const clickArea = document.getElementById("click-area");

const statPower = document.getElementById("stat-power");
const statAuto = document.getElementById("stat-auto");
const statBought = document.getElementById("stat-bought");
const statClicks = document.getElementById("stat-clicks");

// ข้อความในกล่่องterminal
const logLines = [
  "npm run dev",
  "git commit -m 'fix bug'",
  "console.log(point)",
  "> compiled successfully",
  "fetching data...",
  "TypeError: undefined",
  "deploy to production",
  "git push origin main",
];

const terminal = document.getElementById("terminal");

resetBtn.addEventListener("click", () => {
  point = 0;
  clickPower = 1;
  upgradeCost = 10;
  autoPower = 0;
  autoCost = 50;
  totalClicks = 0;
  upgradesBought = 0;

  render();
});

function setImg(name) {
  clickPicImg.src = "img/" + name + ".png";
}

/* 
    แบบเขียนย่อ เพราะกำหนดฟังชั่น setImg แล้ว วันหลังถ้าย้ายที่เก็บรูป
    แค่เปลี่ยน "img/" เป็นที่เก็บอื่น 
    clickPicImg.src = "img/" + "s2" + ".png";
                        └────── ต่อสตริงกัน ──────┘
    clickPicImg.src = "img/s2.png";   
    
  
    แบบเดิม เขียนเต็ม แต่ถ้าวันหลังแก้ย้ายรูปไปที่อื่น ต้องไล่แก้หมด
    clickPic.addEventListener("pointerdown", () => {
    clickPicImg.src = "img/s3.png"

})
    
    
    */

clickPic.addEventListener("pointerenter", () => setImg("s2"));
clickPic.addEventListener("pointerdown", () => setImg("s3"));
clickPic.addEventListener("pointerup", () => setImg("s2"));
clickPic.addEventListener("pointerleave", () => setImg("s0"));

clickPic.addEventListener("click", (e) => {
  point += clickPower;
  totalClicks += 1;
  addLog();
  render();

  floatNum("+" + clickPower, "click-num", e.offsetX, e.offsetY);

  // console.log(point)
});

upgradeBtn.addEventListener("click", () => {
  if (point < upgradeCost) return;

  point -= upgradeCost;
  clickPower += 3;
  upgradeCost = Math.floor(upgradeCost * 1.5);
  upgradesBought += 1;
  render();
});

buyAutoBtn.addEventListener("click", () => {
  if (point < autoCost) return;

  point -= autoCost;
  autoPower += 5;
  autoCost = Math.floor(autoCost * 2);
  upgradesBought += 1;
  render();
});

function floatNum(text, className, x, y) {
  const num = document.createElement("span");
  num.classList.add("float-num", className);
  num.textContent = text;
  num.style.left = x + "px";
  num.style.top = y + "px";
  clickArea.appendChild(num);
  num.addEventListener("animationend", () => num.remove());
}

setInterval(() => {
  point += autoPower;
  render();

  if (autoPower > 0) {
    floatNum("+" + autoPower, "auto-num", 40 + Math.random() * 180, 40);
  }
}, 1000);

function addLog() {
  const line = document.createElement("div");
  line.className = "log-line";
  line.textContent =
    "$ " + logLines[Math.floor(Math.random() * logLines.length)];

  terminal.appendChild(line);
  terminal.scrollTop = terminal.scrollHeight;

  if (terminal.children.length > 40) {
    terminal.firstChild.remove();
  }
}

function render() {
  pointScore.textContent = point;
  costToUpgrade.textContent = upgradeCost;
  autoEl.textContent = autoPower;
  autoCostEl.textContent = autoCost;
  statPower.textContent = clickPower;
  statAuto.textContent = autoPower;
  statBought.textContent = upgradesBought;
  statClicks.textContent = totalClicks;

  upgradeBtn.disabled = point < upgradeCost;
  buyAutoBtn.disabled = point < autoCost;

  localStorage.setItem("point", point);
  localStorage.setItem("clickPower", clickPower);
  localStorage.setItem("upgradeCost", upgradeCost);
  localStorage.setItem("autoPower", autoPower);
  localStorage.setItem("autoCost", autoCost);
  localStorage.setItem("totalClicks", totalClicks);
  localStorage.setItem("upgradeBought", upgradesBought);
}

render();
