const appId = "YOUR_APP_ID";  // 👈 yaha apna App ID dalo
const appKey = "YOUR_APP_KEY"; // 👈 yaha apna App Key dalo

async function getRecipes(query) {
    const url = `https://api.edamam.com/search?q=${query}&app_id=${appId}&app_key=${appKey}`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();

        const resultsDiv = document.getElementById("results");
        resultsDiv.innerHTML = "";

        if (data.hits.length === 0) {
            resultsDiv.innerHTML = "<p>No recipes found.</p>";
            return;
        }

        data.hits.forEach(hit => {
            const recipe = hit.recipe;
            const recipeDiv = document.createElement("div");
            recipeDiv.classList.add("recipe");

            recipeDiv.innerHTML = `
                <h3>${recipe.label}</h3>
                <img src="${recipe.image}" alt="${recipe.label}">
                <a href="${recipe.url}" target="_blank">View Recipe</a>
            `;

            resultsDiv.appendChild(recipeDiv);
        });
    } catch (error) {
        document.getElementById("results").innerHTML = `<p style="color:red;">❌ Error fetching data - please try again.</p>`;
        console.error("Error fetching recipes:", error);
    }
}
