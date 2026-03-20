const money_counter = document.getElementById("money");
const money_button = document.getElementById("money_button");
const cps_counter = document.getElementById("cps")
const buildingContainer = document.querySelector(".buildings");
const upgradesContainer = document.querySelector(".upgrades");
const coinImg = document.getElementById("coinImg");
let stats = [
    {
        name: "Money made(all time)",
        value: 0
    },
    {
        name: "Money made(this rebirth)",
        value: 0
    },
    {
        name: "upgrades bought",
        value: 0,
        maxValue: 3
    }
]
const shop_items_upgrades = [
    {
        name: "Coffe",
        description: "You take a sip and start being more efficient",
        effect: "clicks are twice as efficient",
        owned: false,
        multi: 2,
        multiType: "clicks",
        cost: 10,
        startingCost: 10
    }
];
const shop_items_buildings = [
    {
        name: "Loose change Jar",
        description: "You found it under your couch. It should be enough.",
        effect: "Clicks 1/s",
        cps: 1,
        cost: 10,
        startingCost: 10,
    },
    {
        name: "Two-sided Coin",
        description: "Hold on, both sides are Heads?",
        effect: "5 Cps",
        cps: 5,
        cost: 50,
        startingCost:50,
    },
    {
        name: "Lemonade stand",
        description: "You start selling a refreshing yellow liquid. Made from lemons.",
        effect: "20Cps",
        cps: 20,
        cost: 100,
        startingCost:100,
    },
    {
        name: "Vending Machine",
        description: "The sound of the coins clinging could be an ASMR",
        effect: "clicks are now more valuable",
        cps: 50,
        cost: 50,
        startingCost:50,
    },
    {
        name: "ATM",
        description: "Money shredder and printer? Yeah that's an ATM",
        effect: "clicks are now more valuable",
        cps: 100,
        cost: 50,
        startingCost:50,
    }
];
let money = 0;
let moneyMade = 0;
let cps = 0;
let itemsOwned = [];
createShopItems();

function updateCoin(tier) {
    switch (tier) {
        case tier = 1:
            coinImg.src = "Imgs/Coin_1.png"
            break;
        case tier = 2:
            coinImg.src = "Imgs/Coin_2.png"
        default:
            break;
    }
}

function button_click(){
    let clickValue = 1;
    money += clickValue
    stats[0].value += clickValue
    updateStats()
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
    buildingContainer.innerHTML = "";
    upgradesContainer.innerHTML = "";
    // create buildings
    shop_items_buildings.forEach((item) => {
        const shop_items_buildings = document.createElement("div");
        shop_items_upgrades.className = "shop-building";

        shop_items_buildings.innerHTML = `
            <div class="shop_building">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <button onclick="buyItem('${item.name}')">
                    Buy $${item.cost}
                </button>
            </div>
        `;

        buildingContainer.appendChild(shop_items_buildings);
    })
    // create upgrades
    shop_items_upgrades.forEach((item) => {
        if (item.owned) return;
        const shop_items_upgrades = document.createElement("div");
        shop_items_upgrades.className = "shop-upgrade";

        shop_items_upgrades.innerHTML = `
            <div class="shop_upgrade">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <button onclick="buyItem('${item.name}')">
                    Buy $${item.cost}
                </button>
            </div>
        `;

        upgradesContainer.appendChild(shop_items_upgrades);
    })
}
function buyItem(itemName) {
    const building = shop_items_buildings.find((i) => i.name === itemName);
    const upgrade = shop_items_upgrades.find((i) => i.name === itemName);

    if (building) {
        if (money >= building.cost) {
            money -= building.cost;
            
            const owned = itemsOwned.find((obj) => obj.name === building.name);
            if (owned) {
                owned.amount++
            } else {
                itemsOwned.push({ name: building.name, amount: 1});
            }
            building.cost = Math.floor(building.cost * 1.2);
            updateStats();
            createShopItems();
            }

    } else if (upgrade) {
        if (money >= upgrade.cost && !upgrade.owned) {
            money -= upgrade.cost;
            upgrade.owned = true;
            stats.find(s => s.name === "upgrades bought").value++;

            updateStats();
            createShopItems();
        }
    }
}
money_button.addEventListener('click', function(){
    button_click();
});

function buyBuilding(name) {
    const item = shop_items_buildings.find((i) => i.name === name);
    if(money >= item.cost) {
        money -= item.cost;
        item.amount++;
        item.cost = Math.floor(item.cost * 1.15);
        updateStats();
        createShopItems;
    }
}

function buyUpgrade(name) {

}

function updateStats() {
    money_counter.textContent = Math.floor(money);
    cps_counter.textContent = cps
}