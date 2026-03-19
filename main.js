const money_counter = document.getElementById("money");
const money_button = document.getElementById("money_button");
let money = 0

function button_click(){
    money++
    money_counter.textContent = money;
}
money_button.addEventListener('click', function(){
    button_click();
});