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
        imgSrc: "./Imgs/upgrades/coffe.png",
        multi: 2,
        multiType: "clicks",
        cost: 10
    },
    {
        name: "Gold coin",
        description: "You look at the ground and see a shiny coin",
        effect: "clicks are twice as efficient",
        owned: false,
        imgSrc: "./Imgs/Coin_0.png",
        multi: 2,
        multiType: "clicks",
        cost: 300
    },
    {
        name: "Energy Drink",
        description: "You took a sip and start feeling the caffeine rush",
        effect: "clicks are three times as efficient",
        owned: false,
        imgSrc: "./Imgs/upgrades/energy.png",
        multi: 3,
        multiType: "clicks",
        cost: 2000
    },
    {
        name: "Sapphire coin",
        description: "When looking at the ground you notice a strange coin you've never seen",
        effect: "coin value 2x",
        owned: false,
        imgSrc: "./Imgs/Coin_1.png",
        multi: 2,
        multiType: "coin",
        lvl: 1,
        cost: 10000
    },
    {
        name: "Ruby coin",
        description: "none",
        effect: "coin value 2x",
        owned: false,
        imgSrc: "./Imgs/Coin_2.png",
        multi: 4,
        multiType: "coin",
        lvl: 2,
        cost: 100000
    }
];
const shop_items_buildings = [
    {
        name: "Loose change Jar",
        description: "You found it under your couch. It should be enough.",
        effect: "Clicks 0.1/s",
        imgSrc: "./Imgs/buildings/jar.png",
        cps: 0.1,
        cost: 10,
        startingCost: 10,
        amount: 0,
    },
    {
        name: "Two-sided Coin",
        description: "Hold on, both sides are Heads?",
        effect: "5 Cps",
        imgSrc: "./Imgs/buildings/coin.png",
        cps: 5,
        cost: 100,
        startingCost: 100,
        amount: 0,
    },
    {
        name: "Lemonade stand",
        description: "You start selling a refreshing yellow liquid. Made from lemons.",
        effect: "20Cps",
        imgSrc: "./Imgs/buildings/lemon.png",
        cps: 20,
        cost: 300,
        startingCost: 300,
        amount: 0,
    },
    {
        name: "Vending Machine",
        description: "The sound of the coins clinging could be an ASMR",
        effect: "clicks are now more valuable",
        imgSrc: "./Imgs/buildings/vending.png",
        cps: 50,
        cost: 1000,
        startingCost: 1000,
        amount: 0,
    },
    {
        name: "ATM",
        description: "Money shredder and printer? Yeah that's an ATM",
        effect: "clicks are now more valuable",
        imgSrc: "./Imgs/buildings/atm.png",
        cps: 100,
        cost: 10000,
        startingCost: 10000,
        amount: 0,
    }
];
let money = 0;
let moneyMade = 0;
let cps = 0;
let itemsOwned = [];
let clickValue = 1;
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
    money += clickValue
    updateStats()
}

function calcCps() {
    let totalCps = 0;
    shop_items_buildings.forEach(building => {
        totalCps += (building.cps * building.amount);
    });
    cps = totalCps;
    updateStats();
}

setInterval(() => {
    if (cps > 0) {
        money += cps;
        stats[0].value += cps;
        updateStats();
    }

}, 1000)

function createShopItems() {
    // delete upgrades
    buildingContainer.innerHTML = "";
    upgradesContainer.innerHTML = "";
    // create buildings
    shop_items_buildings.forEach((item) => {
        const shop_items_buildings = document.createElement("div");
        shop_items_buildings.className = "shop_building";

        shop_items_buildings.innerHTML = `
            <img class="buildingIcon" src="${item.imgSrc}">
            <div class="buidlingInfo">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <h2>${item.amount}</h2>
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
            <img class="icon" src="${item.imgSrc}">
            <div class="upgrade_tooltip">
                <strong>${item.name}</strong><br>
                ${item.description}<br>
                <hr>
                <p class="effect">"${item.effect}"</p>
                Cost: $${item.cost}
            </div>
        `;
        shop_items_upgrades.onclick = () => buyItem(item.name);
        upgradesContainer.appendChild(shop_items_upgrades);
    })
}

function buyItem(itemName) {
    const building = shop_items_buildings.find((i) => i.name === itemName);
    const upgrade = shop_items_upgrades.find((i) => i.name === itemName);

    if (building) {
        if (money >= building.cost) {
            money -= building.cost;
            building.amount++;
            building.cost = Math.floor(building.cost * 1.2);

            updateStats();
            calcCps();
            createShopItems();
            }

    } else if (upgrade) {
        if (money >= upgrade.cost && !upgrade.owned) {
            money -= upgrade.cost;
            upgrade.owned = true;
            stats.find(s => s.name === "upgrades bought").value++;
            switch (upgrade.multiType) {
                case "clicks":
                    clickValue *= upgrade.multi;
                    break;
                case "coin":
                    updateCoin(upgrade.lvl)
                    break;
            }

            updateStats();
            createShopItems();
        }
    }
}
money_button.addEventListener('click', function(){
    button_click();
});

function updateStats() {
    money_counter.textContent = Math.floor(money);
    cps_counter.textContent = cps.toFixed(1);
}