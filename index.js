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

let userAccount = {
    username: 'test',
    password: 'test',
    cart: []
};

// console.log(userAccount);

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
                                <input type="number" min="1" max="${f.invetory}" class="checkbox__number checkbox__number--userChoice" placeholder="Piece(s)" id="${f.id}" disabled>
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

const cartCountOutput = document.querySelector('.cartCount');
const cartAmountOutput = document.querySelector('.cartAmount');

const btnBuyNow = document.querySelector('.buyNowBtn');



const errorMessageCheckbox = function($value, $message = "error"){
    errorTxt[$value].classList.toggle('hide');
    errorTxt[$value].textContent = $message;
}


checkboxes.forEach((checkbox, i) =>{
    checkbox.addEventListener('click', check => {
        if(check.target.checked){
            piecesInput[i].value = 1;
            piecesInput[i].disabled = false;
            totalOrderContainer[i].classList.remove('hide');
            totalOrderOutput[i].textContent = food[i].price;
            updateCartArray(+piecesInput[i].id, 1, food[i].price * 1);
            calcCart();
            
        } else if(!check.target.checked){
            piecesInput[i].value = "";
            piecesInput[i].disabled = true;
            inventoryOutput[i].textContent = food[i].invetory;
            totalOrderContainer[i].classList.add('hide');
            errorTxt[i].classList.add('hide');
        }
    })
})


const calcCart = function(){  
    // Sort arrays in descending, to get the latest input of user per choice 
    const sortCart = userAccount.cart.sort((a,b) => b.pieces - a.pieces);

    // Remove duplicate inputs
    const filteredCart = sortCart.reduce((acc, current) => {
        const x = acc.find(item => item.id === current.id);
        if (!x){
            return acc.concat([current]);
        } else {
            return acc;
        }
    },  []);

    //replace cart array
    userAccount.cart = [];
    userAccount.cart = [...filteredCart];

    
    //count and total computation
    const cartCount = userAccount.cart.reduce((acc, current) => acc.pieces + current.pieces);
    const cartAmount = userAccount.cart.reduce((acc, current) => acc.amount + current.amount);
    
    //adding count and total on object
    userAccount.totalCount = cartCount.pieces;
    userAccount.totalAmount = cartAmount.amount;

    //updating count and total
    cartCountOutput.textContent = cartCount.pieces ||  userAccount.totalCount || cartCount;
    cartAmountOutput.textContent = cartAmount.amount || userAccount.totalAmount || cartAmount;

}



const updateCartArray = function($id, $pieces, $amount){
    userAccount.cart.push({id: $id, 
                            pieces: $pieces,
                            amount: $amount});
}


piecesInput.forEach((pieces, i) => {
    pieces.addEventListener('change', piece =>{
        const foodID = +piece.target.id;

        //gets value of pieces of selected choice
        let userPieces = +piece.target.value;

        //Maximum Input Value
        if(userPieces > food[i].invetory){
            userPieces = food[i].invetory;
            piece.target.value = userPieces;

            errorMessageCheckbox(i, "no more stocks left");

            //adding maximum input value
            updateCartArray(foodID, userPieces, food[i].price * userPieces);
            calcCart();
        } 
        
        // Minimum Input Value
        else if(userPieces < 0){
            userPieces = 1;
            piece.target.value = userPieces;

            errorMessageCheckbox(i, "invalid number, your input defaulted to 1");

            //adding minimum input value
            updateCartArray(foodID, userPieces, food[i].price * userPieces);
            calcCart();
        } 
        
        else if(userPieces <= food[i].invetory){
            errorTxt[i].classList.add('hide');

            //update inventory of selected choice
            inventoryOutput[i].textContent = food[i].invetory - userPieces;

            //change to color orange
            checkboxes[i].setAttribute('checked', true);
            
            //show & compute of total amount per of selected choice
            totalOrderContainer[i].classList.remove('hide');
            totalOrderOutput[i].textContent = food[i].price * userPieces;

            //adding other user inputs to array
            updateCartArray(foodID, userPieces, food[i].price * userPieces);
            calcCart();
            
            
        }
    });
})

