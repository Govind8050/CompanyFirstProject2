const APP_ID = "YOUR_APP_ID";   // Replace with your Edamam APP_ID
const APP_KEY = "YOUR_APP_KEY"; // Replace with your Edamam APP_KEY

async function searchRecipes() {
  const query = document.getElementById("searchInput").value.trim();
  const message = document.getElementById("message");
  const results = document.getElementById("results");

  results.innerHTML = "";
  if (!query) {
    message.textContent = "⚠️ Please enter a recipe name!";
    return;
  }

  message.textContent = "⏳ Loading recipes...";

  try {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch recipes");
    }

    const data = await response.json();

    if (data.hits.length === 0) {
      message.textContent = "❌ No recipes found. Try another keyword.";
      return;
    }

    message.textContent = "";
    data.hits.forEach(hit => {
      const recipe = hit.recipe;
      const li = document.createElement("li");
      li.classList.add("card");
      li.innerHTML = `
        <img src="${recipe.image}" alt="${recipe.label}">
        <h3>${recipe.label}</h3>
        <a href="${recipe.url}" target="_blank">View Recipe</a>
      `;
      results.appendChild(li);
    });
  } catch (error) {
    message.textContent = "❌ Error fetching data. Please try again.";
    console.error(error);
  }
}