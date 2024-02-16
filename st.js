const search=document.querySelector(".searchbtn");
const searchbox=document.querySelector(".searchbox");
const recont=document.querySelector(".recipe-container");
const recipedetails=document.querySelector(".recipe-details");
const recipedetailscontent=document.querySelector(".recipedetailscontent");
const rclose=document.querySelector(".recipe-close-btn");
const button=document.getElementById("button");
const content=document.querySelector(".content");
const menu=document.querySelector(".menu");
const form=document.querySelector(".form");
const navtab=document.getElementById("nav-tab");
const closemenu=document.querySelector(".close-menu");



button.addEventListener('click',()=>{
  content.style.display="none";
  form.style.display="flex";
  
});



const dish=async (value)=>{
   const data= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`);
  const response=await data.json();
response.meals.forEach(meal => {
 const recipediv= document.createElement('div');
    recipediv.classList.add('recipe');
    recipediv.innerHTML= `
    <img src="${meal.strMealThumb}">
    <p>${meal.strMeal}</p>
    
   `;
   const button=document.createElement('button');
  button.textContent="View recipe";
  recipediv.appendChild(button);
  button.addEventListener("click",()=>{viewrecipe(meal)} );

    recont.appendChild(recipediv);
});
}

const fetchingredients = (meal)=>{
    let ingredientlist="";
    for(let i=1;i<=20;i++){
      const ingredient=meal[`strIngredient${i}`]
        if(ingredient)
        {
           ingredientlist+=`<li> ${ingredient}</li>`
        }
        else{break;}
    }
    return ingredientlist;
}
const viewrecipe = (meal)=>{
    recipedetailscontent.innerHTML=`
    <h4>Name:<span>${meal.strMeal}</span></h4>
    <h3>ingredients</h3>  
    <ul>${fetchingredients(meal)}</ul>
    `
        recipedetails.style.display="block";

        rclose.addEventListener( "click" , ()=>{
            recipedetails.style.display="none";   
        })

}

search.addEventListener('click',(e)=>{
    e.preventDefault();
    recont.style.display="grid"
     let value = searchbox.value.trim();
   dish(value);
});
closemenu.addEventListener( 'click' , ()=>{
  menu.style.display="none";   
});


