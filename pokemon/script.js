const findPoke = document.getElementById("btn-find")
const dexPoke  = document.getElementById("pokedex")

const typeColors = {
  normal: "#A8A77A",  fire: "#EE8130",   water: "#6390F0",
  electric: "#F7D02C", grass: "#7AC74C", ice: "#96D9D6",
  fighting: "#C22E28", poison: "#A33EA1", ground: "#E2BF65",
  flying: "#A98FF3",  psychic: "#F95587", bug: "#A6B91A",
  rock: "#B6A136",    ghost: "#735797",  dragon: "#6F35FC",
  dark: "#705746",    steel: "#B7B7CE",  fairy: "#D685AD",
}



findPoke.addEventListener("click", async () => {
  const randomId = Math.floor(Math.random() * 151) + 1

  const getPoke = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`)
  const dataPoke = await getPoke.json()

  const div = document.createElement("div")
  const img = document.createElement("img")
  const name = document.createElement("span")
  const pokeId = document.createElement("span")
  const btnDel = document.createElement("button")
  const pokeName = dataPoke.name

  const mainType = dataPoke.types[0].type.name
  div.style.background = typeColors[mainType] ?? "#ccc"

  const types = dataPoke.types.map(t => t.type.name)   // .map() แปลง array ทั้งก้อนจาก object ให้เหลือแค่ชื่อธาตุ
  const c1 = typeColors[types[0]] ?? "#ccc"
  const c2 = typeColors[types[1]] ?? c1                // ถ้าไม่มีตัวที่ 2 ใช้สีเดิม

  div.style.background = `linear-gradient(135deg, ${c1} 0%, ${c1} 45%, ${c2} 55%, ${c2} 100%)`

  const typeBox = document.createElement("div")  // ป้ายชื่อธาตุ
  typeBox.classList.add("cardPoke__types")

  // forEach ตรงนี้คือการวนสร้าง element ตามจำนวนข้อมูลที่มี — ตัว 1 type ได้ป้ายเดียว ตัว 2 type ได้ 2 ป้ายอัตโนมัติ
  dataPoke.types.forEach(t => {
  const badge = document.createElement("span")
  badge.classList.add("cardPoke__badge")
  badge.textContent = t.type.name
  badge.style.background = typeColors[t.type.name] ?? "#ccc"
  typeBox.append(badge)
})

div.append(btnDel, pokeId, img, name, typeBox)

  console.log(dataPoke)

  div.classList.add("cardPoke")
  img.classList.add("cardPoke__img")
  name.classList.add("cardPoke__name")
  pokeId.classList.add("cardPoke__id")
  btnDel.classList.add("cardPoke__del")



  img.src = dataPoke.sprites.front_default
  img.alt = pokeName
  name.textContent = pokeName.charAt(0).toUpperCase() + pokeName.slice(1)
  pokeId.textContent = "#" + String(dataPoke.id).padStart(3, "0")
  btnDel.textContent = "×"


  btnDel.addEventListener("click", () => div.remove())

  div.append(btnDel, pokeId, img, name, typeBox)
  dexPoke.append(div)
})