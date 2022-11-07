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

console.log(food);


const choicesContainer = document.querySelector('.checkboxFood');
console.log(choicesContainer);

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
                                <input type="number" class="checkbox__number checkbox__number--userChoice" placeholder="Piece(s)">
                                <h6 class="checkbox__number checkbox__number--currStock"><span>${f.invetory}</span> pieces available</h6>
                            </div>
                        </div>


                    </label>
                </div>
            </div>
        `;

        choicesContainer.insertAdjacentHTML("beforeend", markup);
    })
}

loadFoodChoices();