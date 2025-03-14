const form = document.querySelector(".search");
const input = document.querySelector("#input");
const nameEl = document.querySelector(".name");
const ageEl = document.querySelector(".age");
const sexEl = document.querySelector(".sex");
const clanEl = document.querySelector(".clan");
const imgEl = document.querySelector("#ninja-img");

// Dicionário de Tradução
const translations = {
  Male: "Masculino",
  Female: "Feminino",
  Unknown: "Desconhecido",
};

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const ninjaName = input.value.trim();
  if (!ninjaName) return showMessage("Digite um nome!");

  resetInfo();

  try {
    const response = await fetch(
      `https://dattebayo-api.onrender.com/characters?name=${ninjaName}`
    );
    if (!response.ok) throw new Error("Erro ao buscar os dados");

    const data = await response.json();
    if (!data.characters.length) throw new Error("Ninja não encontrado!");

    updateUI(data.characters[0]);
  } catch (error) {
    showMessage(error.message);
  }
});

function updateUI(character) {
  nameEl.textContent = character.name;
  imgEl.src = character.images.at(-1) || "./img/user.jpg";
  ageEl.textContent =
    character.personal.age?.["Part II"] ??
    character.personal.age?.["Part I"] ??
    "?";

  // Tradução do gênero e clã
  sexEl.textContent =
    translations[character.personal.sex] || character.personal.sex || "?";
  clanEl.textContent =
    translations[character.personal.clan] ||
    character.personal.clan ||
    "Sem Clã";
}

function resetInfo() {
  nameEl.textContent = "Ninja";
  ageEl.textContent = sexEl.textContent = clanEl.textContent = "?";
  imgEl.src = "./img/user.jpg";
}

function showMessage(message) {
  alert(message);
}
