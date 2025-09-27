const searchBox = document.querySelector(".searchBox");
const searchBtn = document.querySelector(".searchBtn");
const recipeContainer= document.querySelector(".recipe-container");
const recipeDetailsContent = document.querySelector(".recipe-details-content");
const recipeCloseBtn = document.querySelector(".recipe-close-btn");


const fetchRecipes = async (query)=>{
    recipeContainer.innerHTML = "<h2>Fetching Recipes...</h2>";
    try{
          const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
   const response = await data.json();
   console.log(response.meals[0]);
   recipeContainer.innerHTML = "";
    response.meals.forEach(meal =>{
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add("recipe");
        recipeDiv.innerHTML = `
        <img src="${meal.strMealThumb}"/>
        <h3>${meal.strMeal}</h3>
        <p><span>${meal.strArea} </span>Dish</p>
        <p>Belongs to <span>${meal.strCategory}</span> category</p>
        `
        const button = document.createElement('button');
        button.textContent = "View Recipe";        
        recipeContainer.appendChild(recipeDiv);
        recipeDiv.appendChild(button);

    //Addding EventListener to recipe button
    button.addEventListener('click', ()=>{
        openRecipePopUp(meal);
    })
    })
    }
    catch(error){
        recipeContainer.innerHTML = "";
        const errordiv = document.createElement('div');
        errordiv.classList.add("errormsg");
        recipeContainer.appendChild(errordiv);
        errordiv.innerHTML = `
        <div>
        <img src='./assets/images.jfif' alt = 'msg'>
        <h2>Error in fetching recipes</h2>
        </div>
        `
          
    }

 
}

const openRecipePopUp = (meal)=>{
    recipeDetailsContent.innerHTML = `
      <h2 class = "recipeName">${meal.strMeal}</h2>
      <h3>Ingredents: </h3>
      <ul class = "ingredientList">${fetchIngredients(meal)}</ul>
       <div class = "recipeinstruction">
        <h3>Instructions: </h3>
        <p>${meal.strInstructions}</p>
    </div>
    `
   

    recipeDetailsContent.parentElement.style.display = "block";
}
//function to fetch ingredients and measurements
const fetchIngredients = (meal)=>{
let ingredientList = "";
for(let i = 1; i<=20; i++){
    const ingredient = meal[`strIngredient${i}`];
    if(ingredient){
        const measure = meal[`strMeasure${i}`];
        ingredientList +=`<li>${measure} ${ingredient}</li>`
    }
    else{
        break;
    }
}
return ingredientList;
}


recipeCloseBtn.addEventListener('click', ()=>{
    recipeDetailsContent.parentElement.style.display = 'none';
})

searchBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    if(searchInput==""){
        recipeContainer.innerHTML = `<h2>Type the meal in the search box</h2>`
        return;
    }
    fetchRecipes(searchInput);
     searchBox.value = "";
    // console.log("jai sri rama");
    
})


