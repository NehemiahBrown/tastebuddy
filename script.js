const recipieSection = document.getElementById("recipie-section");

const fetchPromises = Array.from('abcdefghijklmnopqrstuvwxyz').map(letter =>
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
    .then(res => res.json())
);

Promise.all(fetchPromises)
  .then(responses => {
    const allRecipies = responses.flatMap(response => response.meals || []);

    const selectedRecipieIds = ["52999", "52855", "52840", '52835', '52931', '52803', '52945', '52908', '52813'];

    const pickedRecipies = allRecipies.filter(recipie =>
      selectedRecipieIds.includes(recipie.idMeal)
    );

    console.log(allRecipies);
    displayRecipies(pickedRecipies);
  })
  .catch(err => {
    console.error(`There was an error: ${err}`);
  });

const displayRecipies = (recipies) => {
  
  recipieSection.innerHTML = "";

  recipies.forEach(({ strMealThumb, strMeal, strSource }, index) => {
    recipieSection.innerHTML += `
      <div id="${index}" class="recipies">
        <a class="recipie-link" href="${strSource}" target="_blank">
          <div class="recipie-image-container">
            <img class="recipie-image" src="${strMealThumb}" alt="${strMeal}">
            <h1 class="recipie-text">${strMeal}</h1>
          </div>
        </a>
      </div>
    `;
  });
};
