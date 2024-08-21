const recipieSection = document.getElementById("recipie-section");

Promise.all([
  fetch("https://www.themealdb.com/api/json/v1/1/search.php?f=a").then((res) =>
    res.json()
  ),
  fetch("https://www.themealdb.com/api/json/v1/1/search.php?f=b").then((res) =>
    res.json()
  ),
  fetch("https://www.themealdb.com/api/json/v1/1/search.php?f=c").then((res) =>
    res.json()
  ),
  fetch("https://www.themealdb.com/api/json/v1/1/search.php?f=d").then((res) =>
    res.json()
  ),
  fetch("https://www.themealdb.com/api/json/v1/1/search.php?f=e").then((res) =>
    res.json()
  ),
])
  .then(([aData, bData, cData, dData, eData]) => {
    const allrecipies = [
      ...aData.meals,
      ...bData.meals,
      ...cData.meals,
      ...dData.meals,
      ...eData.meals,
    ];
    const selectedRecipieId = ["53049", "52855", "52840", "52899"];
    const pickedRecipies = allrecipies.filter((recipie) =>
      selectedRecipieId.includes(recipie.idMeal)
    );
    console.log(allrecipies);
    displayRecipies(pickedRecipies);
  })
  .catch((err) => {
    console.error(`There was an error: ${err}`);
  });

const displayRecipies = (recipies) => {
  recipieSection.innerHTML = "";

  recipies.forEach(({ strMealThumb, strMeal, strSource }, index) => {
    recipieSection.innerHTML += `
      <div id="${index}" class="recipies">
        <a class="recipie-link" href="${strSource}" target="_blank">
          <div class="recipie-image-container">
            <img  class="recipie-image" src="${strMealThumb}" alt="${strMeal}">
            <h1 class="recipie-text">${strMeal}</h1>
          </div>
        </a>
      </div>
      `;
  });
};
