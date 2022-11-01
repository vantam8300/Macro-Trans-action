// Image switch
let toggle = true;

const img1 = document.getElementById('loot-box');


img1.addEventListener('click', function(){
  
  toggle = !toggle;
  if(toggle){
      img1.src = 'assets/img/lootbox.jpg';
  }else{
      img1.src = 'assets/img/money.jpg';
  }
 

})

const img2 = document.getElementById('store');

img2.addEventListener('click', function(){
 
  toggle = !toggle;
  if(toggle){
      img2.src = 'assets/img/gamestore.webp';
  }else{
      img2.src = 'assets/img/money.jpg';
  }
 

})

const img3 = document.getElementById('cosmetic');

img3.addEventListener('click', function(){
  
  toggle = !toggle;
  if(toggle){
      img3.src = 'assets/img/skins.png';
  }else{
      img3.src = 'assets/img/money.jpg';
  }
 

})
/* 
    Start Simulator
    Van Tam 
*/
let spinBtn = $("#spin");

let autoBtn = $("#autoSpin");

let clearBtn = $("#clearBtn");

let money = $("#money");

let boxes = $(".box");

let oneStarItems = $(".oneStar");

let twoStarItems = $(".twoStar");

let threeStarItems = $(".threeStar");

let fourStarItems = $(".fourStar");

let fiveStarItems = $(".fiveStar");

let totalItemsEl = $("#totalItems");

let getFiveStarItem;

let NumOfItemObj = {};

let timeOut;

if (localStorage.getItem("NumOfItem")) {
  NumOfItemObj = JSON.parse(localStorage.getItem("NumOfItem"));
}


// display information from LocalStorage if LocalStorage has data.
function init() {
  if (NumOfItemObj) {
    money.text(NumOfItemObj.money);

    oneStarItems.text(NumOfItemObj.oneStar);
    twoStarItems.text(NumOfItemObj.twoStar);
    threeStarItems.text(NumOfItemObj.threeStar);
    fourStarItems.text(NumOfItemObj.fourStar);
    fiveStarItems.text(NumOfItemObj.fiveStar);

    totalItemsEl.text(NumOfItemObj.totalItems);
  }
}

function getRandom() {
  var num = Math.random();
  if (num < 0.001) return 5;   // 0.1%
  else if (num < 0.01) return 4; // 1%
  else if (num < 0.039) return 3; // 3.9%
  else if (num < 0.2) return 2; // 20%
  else return 1;  // 75%
}

// spin until get 5-star item
function autoSpin() {
  timeOut = setTimeout(function () {
    spin();
    if (!getFiveStarItem) {
      autoSpin();
    }
  }, 300)
}

// do one spin
async function spin() {

  // remove animation when start a new spin
  $(".animate-ping").removeClass("animate-ping")

  getFiveStarItem = false;

  // display spent money
  var currentMoney = parseInt(money.text());
  currentMoney += 25;
  money.text(currentMoney);

  var oneStar = oneStarItems.text();
  var twoStar = twoStarItems.text();
  var threeStar = threeStarItems.text();
  var fourStar = fourStarItems.text();
  var fiveStar = $(fiveStarItems[0]).text();
  var totalItems = totalItemsEl.text();


  for (var i = 0; i < boxes.length; i++) {
    var star = getRandom();
    if (star == 1) oneStar++;
    else if (star == 2) twoStar++;
    else if (star == 3) threeStar++;
    else if (star == 4) fourStar++;
    else {
      getFiveStarItem = true;
      fiveStar++
      $(boxes[i]).addClass("animate-ping")
    }
    // display items
    $(boxes[i]).text(star)
  }

  // display amount of received items
  oneStarItems.text(oneStar);
  twoStarItems.text(twoStar);
  threeStarItems.text(threeStar);
  fourStarItems.text(fourStar);
  fiveStarItems.text(fiveStar);

  //display total items
  totalItems = parseInt(totalItems) + 10;
  totalItemsEl.text(totalItems)

  // save data to LocalStorage
  NumOfItemObj.money = currentMoney;
  NumOfItemObj.oneStar = oneStar;
  NumOfItemObj.twoStar = twoStar;
  NumOfItemObj.threeStar = threeStar;
  NumOfItemObj.fourStar = fourStar;
  NumOfItemObj.fiveStar = fiveStar;

  NumOfItemObj.totalItems = totalItems;

  localStorage.setItem("NumOfItem", JSON.stringify(NumOfItemObj))
}

function clear() {
  // clear stop auto spin when clear button is clicked
  clearTimeout(timeOut);

  // remove animation when clear button is clicked
  $(".animate-ping").removeClass("animate-ping")

  money.text(0);
  oneStarItems.text(0);
  twoStarItems.text(0);
  threeStarItems.text(0);
  fourStarItems.text(0);
  fiveStarItems.text(0);
  totalItemsEl.text(0);
  for (var i = 0; i < boxes.length; i++) {
    $(boxes[i]).text("")
  }

  localStorage.removeItem("NumOfItem");
}

spinBtn.on("click", spin);

autoBtn.on("click", autoSpin);

clearBtn.on("click", clear);

init();

/* 
    End Simulator
    Van Tam 
*/

// Nav Bar
let pages = $(".intro, .fact, .simulator, .help-container");

let navBar = $(".navBar");

navBar.on("click", "a", function (event) {

  event.preventDefault();

  for (let i=0; i<pages.length; i++) {

    if ($(this).data("index") == i) {

      $(pages[i]).attr("class","block");

    } else {
      
      $(pages[i]).attr("class","hidden");
    }
  }
})

// API
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'd757a758f4msh1b11a3ad55630b5p174c1ajsnc657c13fbfc2',
    'X-RapidAPI-Host': 'steamcharts.p.rapidapi.com'
  }
};

fetch('https://steamcharts.p.rapidapi.com/api/v1/games/tops', options)
.then(function (response) {
  return response.json();
})
.then(function (data) {
  displayModal(data)
  console.log(data);
});



function displayModal(data) {
    let tableBody = $('.table-body');
    for (let i=0; i<data.length; i++) {
      let row = $('<tr class="border-b">');
      let name = $(`<td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">${data[i].name}</td>`);
      let currentPlayers = $(`<td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">${data[i].currentPlayers}</td>`)
      let peakPlayers = $(`<td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">${data[i].peakPlayers}</td>`)
      row.append(name);
      row.append(currentPlayers);
      row.append(peakPlayers);
      tableBody.append(row);
    }
  }

  // end API