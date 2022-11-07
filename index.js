'use strict';

const food = [
    {
        id: 1,
        name: "Barbecue",
        price: 15,
        invetory: 20,
        img: "img/barbeque.jpeg"
    }, 
    {
        id: 2,
        name: "Isaw",
        price: 5,
        invetory: 25,
        img: "img/isaw.jpeg"
    }, 
    {
        id: 3,
        name: "Kwek-Kwek",
        price: 4,
        invetory: 40,
        img: "img/kwekkwek.jpeg"
    },
    {
        id: 4,
        name: "Kikiam",
        price: 2,
        invetory: 50,
        img: "img/kikiam.jpeg"
    },
    {
        id: 5,
        name: "Betamax",
        price: 5,
        invetory: 20,
        img: "img/betamax.jpeg"
    },
    {
        id: 6,
        name: "Fishball",
        price: 0.5,
        invetory: 100,
        img: "img/fishball.png"
    },
    {
        id: 7,
        name: "Squidball",
        price: 2,
        invetory: 100,
        img: "img/squidball.jpeg"
    },

];

const choicesContainer = document.querySelector('.checkboxFood');
const loadFoodChoices = function(){
    food.forEach(f => {
        const markup = `
            <div class="checkbox-container">
                <input type="checkbox" id="${f.name}" name="${f.name}" class="checkbox__icon">
                <div class="checkbox">
                    <label for="${f.name}" class="checkbox__container">
                        <div class="checkbox__imgContainer">
                            <img src="${f.img}" alt="${f.name}" class="checkbox__img">
                        </div>

                                    
                        <div class="checkbox__details">
                            <h5 class="checkbox__name">${f.name}</h5>
                            
                            <div class="checkbox__price">₱ <span><strong>${f.price.toFixed(2)}</strong></span></div>
        
                            <div class="checkbox__number">
                                <input type="number" min="1" max="${f.invetory}" class="checkbox__number checkbox__number--userChoice" placeholder="Piece(s)">
                                <h6 class="checkbox__number checkbox__number--currStock"><span class="checkbox__currInventory">${f.invetory}</span> pieces available</h6>                                
                            </div>

                            <h6 class="errorTxt hide">no more stocks left</h6>
                        </div>

                        <div class="checkbox__userOrder hide">
                            <strong>₱<span class="checkbox__totalOrder">100</span></strong>
                        </div>


                    </label>
                </div>
            </div>
        `;

        choicesContainer.insertAdjacentHTML("beforeend", markup);
    })
}
loadFoodChoices();



const piecesInput = document.querySelectorAll('.checkbox__number--userChoice');
const checkboxes = document.querySelectorAll('.checkbox__icon');

const inventoryContainer = document.querySelectorAll('.checkbox__number--currStock');
const inventoryOutput = document.querySelectorAll('.checkbox__currInventory');
const errorTxt = document.querySelectorAll('.errorTxt');

const totalOrderContainer = document.querySelectorAll('.checkbox__userOrder');
const totalOrderOutput = document.querySelectorAll('.checkbox__totalOrder');

// console.log(piecesInput);


const errorMessage = function($value, $message = "error"){
    errorTxt[$value].classList.toggle('hide');
    errorTxt[$value].textContent = $message;
}


piecesInput.forEach((pieces, i) => {
    pieces.addEventListener('change', piece =>{

        let userPieces = +piece.target.value;
        if(userPieces > food[i].invetory){
            userPieces = food[i].invetory;
            piece.target.value = userPieces;
            errorMessage(i, "no more stocks left");
        } else if(userPieces < 0){
            userPieces = 1;
            piece.target.value = userPieces;
            errorMessage(i, "invalid number, your input defaulted to 1");
        } else if(userPieces <= food[i].invetory){
            errorTxt[i].classList.add('hide');
        }
                

        inventoryOutput[i].textContent = food[i].invetory - userPieces;
        
        checkboxes[i].setAttribute('checked', true);
        
        totalOrderContainer[i].classList.remove('hide');
        totalOrderOutput[i].textContent = food[i].price * userPieces;

    })
})

checkboxes.forEach((checkbox, i) =>{
    checkbox.addEventListener('click', check => {
        if(check.target.checked){
            piecesInput[i].value = 1;
            totalOrderContainer[i].classList.remove('hide');
            totalOrderOutput[i].textContent = food[i].price;
            
        } else if(!check.target.checked){
            piecesInput[i].value = "";
            inventoryOutput[i].textContent = food[i].invetory;
            totalOrderContainer[i].classList.add('hide');
            errorTxt[i].classList.add('hide');
        }
    })
})

