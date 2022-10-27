/* 
    Start Simulator
    Van Tam 
*/
let spinBtn = $("#spin");

let autoBtn = $("#autoSpin");

let money = $("#money");

let boxes = $(".box");

let oneStarItems = $(".oneStar");

let twoStarItems = $(".twoStar");

let threeStarItems = $(".threeStar");

let fourStarItems = $(".fourStar");

let fiveStarItems = $(".fiveStar");

let totalItemsEl = $("#totalItems");

let getFiveStarItem;

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
  setTimeout(function() {   
    spin();                
    if (!getFiveStarItem) {          
      autoSpin();             
    }                       
  }, 300)
}

// do one spin
async function spin() {

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
  totalItems = parseInt(totalItems) + 9;
  totalItemsEl.text(totalItems)
}

spinBtn.on("click", spin);

autoBtn.on("click", autoSpin);

/* 
    End Simulator
    Van Tam 
*/