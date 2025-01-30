document.querySelector(".search").addEventListener("submit", async (e) => {
  e.preventDefault();

  const input = document.querySelector("#input");
  const ninjaName = input.value.trim();
  if (!ninjaName) return alert("Insira um nome...");

  // Reseta os valores antes da busca
  document.querySelector(".name").textContent = "Ninja";
  document.querySelector("#ninja-img").setAttribute("src", "");
  document.querySelector(".age").textContent = "?";
  document.querySelector(".sex").textContent = "?";
  document.querySelector(".clan").textContent = "?";

  try {
    const response = await fetch(
      `https://dattebayo-api.onrender.com/characters?name=${ninjaName}`
    );
    if (!response.ok) throw new Error("Erro ao buscar os dados");

    const data = await response.json();
    if (!data.characters.length) throw new Error("Personagem não encontrado");

    const character = data.characters[0];

    document.querySelector(".name").textContent = character.name;
    document
      .querySelector("#ninja-img")
      .setAttribute("src", character.images.at(-1) || "");
    document.querySelector(".age").textContent =
      character.personal.age["Part II"] ??
      character.personal.age["Part I"] ??
      "?";
    document.querySelector(".sex").textContent = character.personal.sex ?? "?";
    document.querySelector(".clan").textContent =
      character.personal.clan ?? "?";
  } catch (error) {
    alert(error.message);
  }
});
