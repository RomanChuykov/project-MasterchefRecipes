import { entries } from "lodash";

const cart=document.querySelector('.fav-list-recipes');
const nothing=document.querySelector('.nothing');
const secRecipes=document.querySelector('.fav-recipes');
const categories=document.querySelector('.fav-categories');
const listCategories=document.querySelector('.fav-list-categories');
// const heart=document.querySelector('.fav-button-heart');
cart.innerHTML='';
// ======================== треба видалити  =================================
addMyLocal();
function addMyLocal(){
  const arrecipes=[
    {
      id:"1",
      preview:"./img/cards.jpg",
      title :"BANANA PANCAKES"    ,
      description:"Banana pancakes are a fluffy and sweet breakfast dish made with mashed ripe bananas, eggs, flour, and a touch of cinnamon, cooked to perfection on a skillet and served with toppings of your choice.",  
      rating:"4.5",
      category:'breakfast',
    },
    {
      id:"2",  
      preview:"./img/cards.jpg",
      title :"BANANA PANCAKES"    ,
      description:"Banana pancakes are a fluffy and sweet breakfast dish made with mashed ripe bananas, eggs, flour, and a touch of cinnamon, cooked to perfection on a skillet and served with toppings of your choice.",  
      rating:"4.8",
      category:'breakfast',
    },
    {
      id:"3",
      preview:"./img/cards.jpg",
      title :"BANANA PANCAKES"    ,
      description:"Banana pancakes are a fluffy and sweet breakfast dish made with mashed ripe bananas, eggs, flour, and a touch of cinnamon, cooked to perfection on a skillet and served with toppings of your choice.",  
      rating:"3.4",
      category:'dinner',
    },
    {
      id:"4",
      preview:"./img/cards.jpg",
      title :"BANANA PANCAKES"    ,
      description:"Banana pancakes are a fluffy and sweet breakfast dish made with mashed ripe bananas, eggs, flour, and a touch of cinnamon, cooked to perfection on a skillet and served with toppings of your choice.",  
      rating:"1",
      category:'breakfast',
    },
    {
      id:"5",
      preview:"./img/cards.jpg",
      title :"BANANA PANCAKES"    ,
      description:"Banana pancakes are a fluffy and sweet breakfast dish made with mashed ripe bananas, eggs, flour, and a touch of cinnamon, cooked to perfection on a skillet and served with toppings of your choice.",  
      rating:"2",
      category:'supper',
    },
  ];
  localStorage.setItem("favorites", JSON.stringify(arrecipes));
}

// ==========================  видалити до сюди

// =========================     variables    ==================================
const categoryArray=[];
let htmlCategory='';
let listCards='';
let rating=0;

    // =====================   main program   =======================================
    cart.innerHTML='';
    // listCategories.innerHTML=''
    const recipes=getLocal()
createCategories(recipes);
    createCards(recipes)
    
    
    // ******************  functions  *********************************

    //===================   categories  ================================
    function createCategories() {
      htmlCategory='<li><button class="fav-category-button">All categories</button></li>'
    for (const recipe of recipes) {
      console.log(recipe)
    if (!categoryArray.includes(recipe.category)) {
      categoryArray.push(recipe.category);
      htmlCategory+= `<li><button class="fav-category-button">${recipe.category}</button></li>` 
    }
    }
   
    
    listCategories.innerHTML=htmlCategory;
    const buttonsCat=document.querySelectorAll('.fav-category-button');
    buttonsCat.forEach(function(button) {
      button.addEventListener("click", onClickCategories)
    }) 
}

//   =====================   Cards  =================================
 function createCards(recipes){
  listCards='';
    for (const recipe of recipes) {
      rating=Math.round(parseFloat(recipe.rating));
    
      listCards+=`            <li class="fav-recipe-card" data-id="${recipe.id}" >
        <img class="fav-card-img" src="${recipe.preview}" alt="${recipe.title}">
        <button class="fav-button-heart">
          <svg class="fav-heart" width="22" height="22">
            <use href="./img/icons.svg#heart"></use>
          </svg>
        </button>
          <h3 class="fav-card-title">${recipe.title}</h3>
          <p class="fav-cart-text">${recipe.description}</p>
          <div class="fav-cart-footer">
            <p class="fav-rate">${recipe.rating}</p>
           
            <button class="fav-card-button">See recipe</button>
            </div>
            </li>`;
        }
        // console.log('list',listCards)
        if (listCards==0) {
            nothing.style.display='block';
            secRecipes.style.display='none';
            categories.style.display='none'
        }
        else{
            nothing.style.display='none';
            secRecipes.style.display='block';
            categories.style.display='block'
            cart.insertAdjacentHTML("beforeend", listCards);
           
            const hearts=document.querySelectorAll('.fav-button-heart');
            hearts.forEach(function(button) {
              button.addEventListener("click", onClickHeart)
            }) 
            // heart.addEventListener("click", onClickHeart)
        }
    }

// =========================  local storage     ========================================

function getLocal(){
  const savedSettings = localStorage.getItem("favorites");
   const recipes = JSON.parse(savedSettings);
 
  return recipes;
}
// ==========================  click on heart   =========================================

function onClickHeart(e){
  const parent=e.currentTarget.parentElement;

  cart.innerHTML='';

    var dataId = parent.getAttribute("data-id");
  
  
  const rec=getLocal()
  
  const toLocal = rec.filter(obj => obj.id !== dataId);
  localStorage.removeItem("favorites")
  localStorage.setItem("favorites", JSON.stringify(toLocal));
  location.reload();
 
  const rest=getLocal();
  createCategories(rest);
createCards(rest);
}
// =============================    click of categories ==================================
function onClickCategories(e) {
  const category=this.textContent || this.innerText
  console.log(category);
if (category=='All categories') {
  location.reload();
}
 else{
  const rec=getLocal();
  console.log('rec',rec);
  const filtered = rec.filter(obj => obj.category == category);
  console.log('filtered',filtered);
// createCategories(rec)

while (cart.firstChild) {
  cart.removeChild(cart.firstChild);
}
createCards(filtered);
 } 
}


