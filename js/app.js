const apiUrl = 'https://hp-api.onrender.com/api/characters';
const charactersContainer = document.getElementById("characters-container");
const selectElement = document.getElementById("house-filter");

let allCharacters = [];

// عطّلي القائمة أولاً لحتى ما يشتغل الحدث قبل تحميل الشخصيات
selectElement.disabled = true;

// Function to display characters
function displayCharacters(characters) {
  charactersContainer.innerHTML = "";

  if (!characters || characters.length === 0) {
    charactersContainer.innerHTML = "<p>No characters found.</p>";
    return;
  }

  characters.forEach((character) => {
    const card = document.createElement("div");
    card.classList.add("character-card");

    const img = document.createElement("img");
    img.src = character.image || "images/not-found1.png";
    img.alt = character.name;

    const name = document.createElement("h3");
    name.textContent = character.name;

    const house = document.createElement("p");
    house.textContent = character.house ? `House: ${character.house}` : "House: Unknown";

    card.appendChild(img);
    card.appendChild(name);
    card.appendChild(house);

    charactersContainer.appendChild(card);
  });
}

// Fetch characters from API
fetch("https://hp-api.onrender.com/api/characters")
  .then((response) => response.json())
  .then((data) => {
    allCharacters = data;
    displayCharacters(allCharacters);

    // ✅ فعّلي القائمة لما البيانات تكون جاهزة
    selectElement.disabled = false;
  })
  .catch((error) => {
    console.error("Error fetching characters:", error);
    charactersContainer.innerHTML = "<p>Error loading characters.</p>";
  });

// Filter when selection changes
selectElement.addEventListener("change", () => {
  const selectedHouse = selectElement.value;

  if (selectedHouse === "all") {
    displayCharacters(allCharacters);
  } else {
    const filtered = allCharacters.filter(
      (char) => char.house === selectedHouse
    );
    
    displayCharacters(filtered);
  }
  
});