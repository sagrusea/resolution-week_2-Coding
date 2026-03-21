const savingIndicator = document.getElementById("saveIndicator");
const money_counter = document.getElementById("money");
const money_button = document.getElementById("money_button");
const cps_counter = document.getElementById("cps")
const buildingContainer = document.querySelector(".buildings");
const upgradesContainer = document.querySelector(".upgrades");
const statsContainer = document.getElementById("statsContainer");
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
    },
    {
        name: "buildings bought(total)",
        value: 0
    },
    {
        name: "rebirths",
        value: 0
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
        effect: "50Cps",
        imgSrc: "./Imgs/buildings/vending.png",
        cps: 50,
        cost: 1000,
        startingCost: 1000,
        amount: 0,
    },
    {
        name: "ATM",
        description: "Money shredder and printer? Yeah that's an ATM",
        effect: "100Cps",
        imgSrc: "./Imgs/buildings/atm.png",
        cps: 100,
        cost: 10000,
        startingCost: 10000,
        amount: 0,
    },
    {
        name: "Investment",
        description: "You heard about this from a shady guy on the street. Will it work?",
        effect: "500Cps",
        imgSrc: "./Imgs/buildings/invest.png",
        cps: 500,
        cost: 35000,
        startingCost: 35000,
        amount: 0,
    },
    {
        name: "Bank",
        description: "A big moment you have enough money. Do you have enough courage to open your first banks?",
        effect: "1000Cps",
        imgSrc: "./Imgs/buildings/bank.png",
        cps: 1000,
        cost: 500000,
        startingCost: 500000,
        amount: 0,
    }
];
let money = 0;
let moneyMade = 0;
let cps = 0;
let itemsOwned = [];
let clickValue = 1;
let coinValue = 1;
createShopItems();
updateStats();
loadGame();

function updateCoin(tier) {
    switch (tier) {
        case 1:
            coinImg.src = "Imgs/Coin_1.png";
            coinValue = 2;
            break;
        case 2:
            coinImg.src = "Imgs/Coin_2.png";
            coinValue = 4;
            break;
        default:
            break;
    }
}

function button_click(){
    money += clickValue * coinValue;
    stats[0].value += clickValue * coinValue;
    updateStats();
}

function calcCps() {
    let totalCps = 0;
    shop_items_buildings.forEach(building => {
        totalCps += (building.cps * building.amount);
    });
    cps = totalCps;
    updateStats();
}

function resetProgress() {
    if(confirm("do you want to reset all of your progress")) {
        localStorage.removeItem("moneyClickerSave");
        
        money = 0;
        clickValue = 1;
        cps = 0;
        coinValue = 1;

        stats.forEach(stat => {
            stat.value = 0;
        });

        shop_items_buildings.forEach(bld => {
            bld.amount = 0;
            bld.cost = bld.startingCost;
        });

        shop_items_upgrades.forEach(upg => {
            upg.owned = false;
        });
        updateCoin(0);
        calcCps();
        createShopItems();
        updateStats();

        console.log("game wiped");
    }
}
function saveGame() {
    const gameData = {
        money: money,
        stats: stats,
        buildings: shop_items_buildings,
        upgrades: shop_items_upgrades,
        clickValue: clickValue,
        coinValue: coinValue
    };
    localStorage.setItem("moneyClickerSave", JSON.stringify(gameData));
    if (savingIndicator) {
        savingIndicator.classList.remove("hidden");
        setTimeout(() => {
            savingIndicator.classList.add("hidden");
        },1000);
    }
}

function loadGame() {
    const save = localStorage.getItem("moneyClickerSave");

    if (save) {
        const data = JSON.parse(save);
        money = data.money;
        clickValue = data.clickValue;
        stats = data.stats;
        coinValue = data.coinValue;

        data.buildings.forEach((savedBld, index) => {
            shop_items_buildings[index].amount = savedBld.amount;
            shop_items_buildings[index].cost = savedBld.cost;

        });

        data.upgrades.forEach((savedUpg, index) => {
            shop_items_upgrades[index].owned = savedUpg.owned;
        });

        calcCps();
        createShopItems();
        updateStats();
        updateCoin(coinValue / 2)
    }
}

setInterval(() => {
    if (cps > 0) {
        money += cps * coinValue;
        stats[0].value += cps * coinValue;
        stats[1].value = stats[0].value;
        updateStats();
    }

}, 1000)

setInterval(() => {
    saveGame();
}, 30000)

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
            stats[3].value++

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
    statsContainer.innerHTML = "";

    stats.forEach((stat) => {
        const statElement = document.createElement("p");
        statElement.innerHTML = ` <strong>${stat.name}:</strong> ${Math.floor(stat.value)}`;
        statsContainer.appendChild(statElement);
    })
}