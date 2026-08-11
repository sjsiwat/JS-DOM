const clickPic = document.getElementById("clickerpic")
const clickPicImg = document.getElementById("clickerpic-img")

let point = Number(localStorage.getItem("point")) || 0;

let clickPower = Number(localStorage.getItem("clickPower")) || 1;
let upgradeCost = Number(localStorage.getItem("upgradeCost")) || 10;

let autoPower = Number(localStorage.getItem("autoPower")) || 0;
let autoCost = Number(localStorage.getItem("autoCost")) || 50;


const autoEl = document.getElementById("auto")
const autoCostEl = document.getElementById("auto-cost")
const buyAutoBtn = document.getElementById("buy-auto")

const costToUpgrade = document.getElementById("cost")
const upgradeBtn = document.getElementById("upgrade")


const pointScore = document.getElementById("score")
const resetBtn = document.getElementById("reset")
const clickArea = document.getElementById("click-area");



resetBtn.addEventListener("click" , () => {
    point = 0;
    clickPower = 1;
    upgradeCost = 10;
    autoPower = 0;
    autoCost = 50;

    render();
})


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
clickPic.addEventListener("pointerdown",  () => setImg("s3"));
clickPic.addEventListener("pointerup",    () => setImg("s2"));
clickPic.addEventListener("pointerleave", () => setImg("s1"));



clickPic.addEventListener("click", (e)=> {
    point += clickPower
    render();

    const num = document.createElement("span")
    num.className = "float-num"
    num.textContent = "+" + clickPower
    num.style.left = e.offsetX + "px";
    num.style.top = e.offsetY + "px"

    clickArea.appendChild(num)

    num.addEventListener("animationend", () => {
        num.remove();
    })
    
    // console.log(point) 
})


upgradeBtn.addEventListener("click", () => {
    if (point < upgradeCost) return;

    point -= upgradeCost
    clickPower += 3
    upgradeCost = Math.floor(upgradeCost * 1.5)

    render()
})

buyAutoBtn.addEventListener("click", () => {
    if (point < autoCost) return;

    point -= autoCost
    autoPower += 5;
    autoCost = Math.floor(autoCost * 1.5)

    render();
})

setInterval(() => {
    console.log("tick", autoPower, point);
    point += autoPower;
    render();

},1000);


function render() {
    pointScore.textContent = point
    costToUpgrade.textContent = upgradeCost
    autoEl.textContent = autoPower
    autoCostEl.textContent = autoCost;

    upgradeBtn.disabled = point < upgradeCost
    buyAutoBtn.disabled = point < autoCost

    localStorage.setItem("point", point)
    localStorage.setItem("clickPower", clickPower)
    localStorage.setItem("upgradeCost", upgradeCost)
    localStorage.setItem("autoPower", autoPower)
    localStorage.setItem("autoCost", autoCost)

}


render();

