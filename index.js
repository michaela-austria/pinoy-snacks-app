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
    username: '',
    cart: []
};



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
                                <h6 class="checkbox__number checkbox__number--currStock"><span class="checkbox__currInventory">${f.invetory}</span> piece(s)</h6>                                
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



const mainApp = document.querySelector('.app');
const message = document.querySelector('.message');

const piecesInput = document.querySelectorAll('.checkbox__number--userChoice');
const checkboxes = document.querySelectorAll('.checkbox__icon');

const inventoryContainer = document.querySelectorAll('.checkbox__number--currStock');
const inventoryOutput = document.querySelectorAll('.checkbox__currInventory');
const errorTxt = document.querySelectorAll('.errorTxt');

const totalOrderContainer = document.querySelectorAll('.checkbox__userOrder');
const totalOrderOutput = document.querySelectorAll('.checkbox__totalOrder');

const cartCountOutput = document.querySelector('.cartCount');
const cartAmountOutput = document.querySelector('.cartAmount');

const inputEnterCash = document.querySelector('.inputContainer__input');
const errorCashAmount = document.querySelector('.grid-container__cashamount .errorTxt');

const receiptCartOutput = document.querySelector('.receipt__cartContainer');
const receiptItemCountOutput = document.querySelector('.receiptItemsCount');
const receiptTotalAmountOutput = document.querySelector('.receiptTotalAmount');
const receiptCashOutput = document.querySelector('.receiptCash');
const receiptChangeOutput = document.querySelector('.receiptChange');
const receiptErrorTxt = document.querySelector('.receipt__detailsContainer .errorTxt');

const btnProceedToCounter = document.querySelector('.grid-container__receiptBtn');


const messageOutput = document.querySelector('.message');
const messageText = document.querySelector('.message h1');
const nameInput = document.querySelector('.navbar__input');
const btnNameSubmit = document.querySelector('.navbar__btn');
const btnExit = document.querySelector('.navbar__btnexit');
const messageError = document.querySelector(".message .errorTxt");
const userNameDisplay = document.querySelector(".userName");


const dynamicDateTime = document.querySelector('.dynamicDateTime');
const receiptDateTime = document.querySelector('.receipt__datetime');
const monthsArr = ['January', 'Februar', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const logoutTimer = document.querySelector('.timer');


let timer;


// === DATE AND TIME ====
const displayDateTime = function($container){
    const now = new Date();
    const options = {
      month: 'long',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }

    dynamicDateTime.textContent = new Intl.DateTimeFormat('en-US', options).format(now);
    $container ? $container.textContent = new Intl.DateTimeFormat('en-US', options).format(now) : ""; 
}

const startLogOutTime = function(){
    let time = 120;

    const tick = function(){
        const min = String(Math.trunc(time/60)).padStart(2,0);
        const sec = String(time % 60).padStart(2,0);
        logoutTimer.textContent = `${min}:${sec}`;

        time--;

        if(time === 0){
            updateHideUI();
            document.querySelector('.message h3').classList.remove('hide');
            document.querySelector('.message h3').textContent = "You've been inactive...";
        }
    }


    tick();
    const timer = setInterval(tick, 1000);

    return timer;
}







// === RECEIPT FUNCTION ===
const updateReceipt = function(){
    receiptCartOutput.textContent = "";
    receiptItemCountOutput.textContent = 0;
    receiptTotalAmountOutput.textContent = 0;

    userAccount.cart.forEach(item => {
        const markup = `
            <div class="receipt__itemprice">
                <div class="receipt__itemprice--item">${item.name}</div>
                <div class="receipt__itemprice--pieces"><span class="receiptItemCartPieces">${item.pieces}</span> piece(s)</div>
                <div class="receipt__itemprice--price">₱ <span class="receiptItemCartAmount">${item.amount}</span></div>
            </div>
        `;

        
        receiptCartOutput.insertAdjacentHTML('beforeend', markup);
        receiptItemCountOutput.textContent = userAccount.totalCount;
        receiptTotalAmountOutput.textContent = userAccount.totalAmount;
    })

    receiptCashOutput.textContent = 0;
    receiptCashOutput.textContent = userAccount.cash ?? 0;

    receiptChangeOutput.textContent = 0;
    const userChange = userAccount?.cash - userAccount.totalAmount;
    if(userChange < 0){
        btnProceedToCounter.classList.add("opacity");
        receiptErrorTxt.classList.remove("hide");
        receiptErrorTxt.textContent = "Insufficient Amount";
    }
    else if(userAccount.cart.length === 0){
        btnProceedToCounter.classList.add("opacity");
        receiptErrorTxt.classList.remove("hide");
        receiptErrorTxt.textContent = "Add something to your cart";
    } 
    else{
        btnProceedToCounter.classList.remove("opacity");
        receiptErrorTxt.classList.add("hide");
        receiptChangeOutput.textContent = userChange || 0;
        
    }

    displayDateTime(receiptDateTime);
}


//  === FOOD MENU FUNCTIONS ===
const errorMessageCheckbox = function($value, $message = "error"){
    errorTxt[$value].classList.toggle('hide');
    errorTxt[$value].textContent = $message;
}

const filterCart = function(){  
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

    
}

const removeItem = function($id){
    const newCart = userAccount.cart.filter(item => item.id != $id);
    
    //replace cart array
    userAccount.cart = [];
    userAccount.cart =  [...newCart];
}

const displayCart = function(){
    //count and total computation
    const cartCount = userAccount.cart.reduce((acc, current) => acc + current.pieces,0);
    const cartAmount = userAccount.cart.reduce((acc, current) => acc + current.amount, 0);
    
    //adding count and total on object
    userAccount.totalCount = cartCount;
    userAccount.totalAmount = cartAmount;

    //updating count and total
    cartCountOutput.textContent = cartCount.pieces ||  userAccount.totalCount || cartCount;
    cartAmountOutput.textContent = cartAmount.amount || userAccount.totalAmount || cartAmount;

    updateReceipt();
}


const updateCartArray = function($id, $pieces, $amount, $name){
    userAccount.cart.push({id: $id, 
                            pieces: $pieces,
                            amount: $amount,
                            name: $name});
}


const clearCheckbox = function ($counter) {
    piecesInput[$counter].value = "";
    piecesInput[$counter].disabled = true;
    inventoryOutput[$counter].textContent = food[$counter].invetory;
    totalOrderContainer[$counter].classList.add('hide');
    errorTxt[$counter].classList.add('hide');
}

const updateHideUI = function(){
    // Change UI
    btnExit.classList.add('hide');

    mainApp.style.opacity = 0;
    
    message.classList.remove('hide');
    message.style.opacity = 100;

    // Resetting 
    const clear = {
        username: '',
        cart: []
    }
    userAccount = "";
    userAccount = clear;

    checkboxes.forEach(choice => {choice.checked = false;})
    piecesInput.forEach(input => {input.value = ""; input.disabled = true;});
    inventoryOutput.forEach((_, i) => { clearCheckbox(i);});
    cartCountOutput.textContent = cartAmountOutput.textContent = 0;
    inputEnterCash.value = "";
}

// === EVENT HANDLERS ===



checkboxes.forEach((checkbox, i) =>{
    checkbox.addEventListener('click', check => {
        if(check.target.checked){
            piecesInput[i].value = 1;
            piecesInput[i].disabled = false;
            inventoryOutput[i].textContent = food[i].invetory - 1;
            totalOrderContainer[i].classList.remove('hide');
            totalOrderOutput[i].textContent = food[i].price;
            let foodName = check.target.id ?? check.path[0].id; // for safari ?? for chrome
            updateCartArray(+piecesInput[i].id, 1, food[i].price * 1, foodName);
            filterCart();
            displayCart();
            
        } else if(!check.target.checked){
            clearCheckbox(i);
            removeItem(+piecesInput[i].id);
            displayCart();
            updateReceipt();
        }
    })
})


piecesInput.forEach((pieces, i) => {
    pieces.addEventListener('change', piece =>{
        const foodID = +piece.target.id;
        let foodName = food[+piece.target.id].name ?? piece.path[2].children[0].textContent; // for safari ?? for chrome

        //gets value of pieces of selected choice
        let userPieces = +piece.target.value;

        //Maximum Input Value
        if(userPieces > food[i].invetory){
            userPieces = food[i].invetory;
            piece.target.value = userPieces;
            inventoryOutput[i].textContent = 0;

            errorMessageCheckbox(i, "no more stocks left, your input defaulted to max value");

            //adding maximum input value
            updateCartArray(foodID, userPieces, food[i].price * userPieces, foodName);
            filterCart();
            displayCart();
        } 
        
        // Minimum Input Value
        else if(userPieces < 0 || userPieces == ""){
            userPieces = 1;
            piece.target.value = userPieces;
            inventoryOutput[i].textContent = food[i].invetory - userPieces;

            errorMessageCheckbox(i, "invalid number, your input defaulted to 1");

            //adding minimum input value
            updateCartArray(foodID, userPieces, food[i].price * userPieces, foodName);
            filterCart();
            displayCart();
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
            updateCartArray(foodID, userPieces, food[i].price * userPieces, foodName);
            filterCart();
            displayCart();           
            
        }
    });


    
})


// === ENTER CASH FUNCTION ===
inputEnterCash.addEventListener('change', function(){

    if(+inputEnterCash.value <= 0){
        errorCashAmount.classList.remove('hide');
        inputEnterCash.value = "";
        userAccount.cash = 0;

        updateReceipt();
        
    } else {
        errorCashAmount.classList.add('hide');
        userAccount.cash = 0;
        userAccount.cash = +inputEnterCash.value;

        updateReceipt();
    }

})




// === LOG IN ===
btnNameSubmit.addEventListener('click', function(e){
    e.preventDefault();
    const userName = nameInput.value;
    
    if(userName === ""){
        messageError.classList.remove('hide');
    } else {

        setInterval(displayDateTime, 1000);

        userAccount.username = userName;
        
        message.style.opacity = 0;
        mainApp.style.opacity = 100;
        message.classList.add('hide');
        mainApp.classList.remove('hide');
        btnExit.classList.remove('hide');
        
        userNameDisplay.textContent = userAccount.username;
        
        updateReceipt();
        nameInput.value = "";

        if(timer) clearInterval(timer);
        timer = startLogOutTime();
    }
})

document.querySelector('body').addEventListener('click', function(){
    clearInterval(timer);
    timer = startLogOutTime();
});


// === Exit ===
btnExit.addEventListener('click', function(){
    updateHideUI();
    document.querySelector('.message h3').classList.add('hide');
})



// === PROCEED TO COUNTER BTN ===
btnProceedToCounter.addEventListener('click', function(){
    
    if(+receiptCashOutput.textContent === 0 || 
        receiptCashOutput.textContent == "" || 
        +receiptCashOutput.textContent < +receiptTotalAmountOutput.textContent )
        {
        alert("Enter your cash");
    } 
    else {
        updateHideUI();
        messageText.textContent = "Please proceed to the counter.";
        document.querySelector('.message h3').classList.remove('hide');
    }
});