const money_counter = document.getElementById("money");
const money_button = document.getElementById("money_button");
const shopContainer = document.querySelector(".shop_area");
const shop_items_upgrades = [
    {
        name: "Coffe",
        description: "",
        effect: 0,
        cost: 10,
        startingCost: 10
    }
];
const shop_items_buildings = [
    {
        name: "Loose change Jar",
        description: "You found it under your couch. It should be enough.",
        effect: "Clicks 1/s",
        cost: 10,
        startingCost: 10,
    },
    {
        name: "Two-sided Coin",
        description: "Hold on, both sides are Heads?",
        effect: "5 Cps",
        cost: 50,
        startingCost:50,
    },
    {
        name: "Lemonade stand",
        description: "You start selling a refreshing yellow liquid. Made from lemons.",
        effect: "20Cps",
        cost: 100,
        startingCost:100,
    },
    {
        name: "Vending Machine",
        description: "The sound of the coins clinging could be an ASMR",
        effect: "clicks are now more valuable",
        cost: 50,
        startingCost:50,
    },
    {
        name: "ATM",
        description: "Money shredder and printer? Yeah that's an ATM",
        effect: "clicks are now more valuable",
        cost: 50,
        startingCost:50,
    }
]
let money = 0
let itemsOwned = []

function button_click(){
    money++
    money_counter.textContent = money;
}

setInterval(() => {
    const jarOwned = itemsOwned.find((i) => i.name === "Loose change Jar");
    if (jarOwned) {
        for (let i = 0; i < jarOwned.amount; i++) {
            button_click();
        }
    }

}, 1000)

function createShopItems() {
    // delete upgrades
    document.querySelectorAll(".shop-building").forEach((element) => {
        element.remove();
    })
    // create upgrades
    shop_items_buildings.forEach((item) => {
        const shop_items_buildings = document.createElement("div");
        shop_items_upgrades.className = "shop-building";

        shop_items_buildings.innerHTML = `
            <div>
                <h3>${item.name}</h3>
                <p>${item.description}</p>
            </div>
            <button onclick="buyItem('${item.name}')">
                Buy $${item.cost}
            </button>
        `;

        shopContainer.appendChild(shop_items_buildings);
    })
}
function buyItem(itemName) {
    const item = shop_items_buildings.find((i) => i.name === itemName);
    if (money >= item.cost) {
        money -= item.cost;
        money_counter.textContent = money;
        let amount = 1;

        const itemInArray = itemsOwned.find((obj) => obj.name === item.name);
        if (itemInArray) {
            itemInArray.amount++;
            console.log('found ${item.name}, added 1!');
            amount = itemInArray.amount;
        } else {
            itemsOwned.push({ name: item.name, amount: 1});
        }


    } else {
        console.log('not enough money');
    }
}
createShopItems();
money_button.addEventListener('click', function(){
    button_click();
});