//JS->HTML
const config = {
  intialPage: document.getElementById("initial-page"),
  subPage: document.getElementById("sub-page"),
  mainPage: document.getElementById("main-page")
}

//user Data
class User {
  constructor(userName, age, money) {
    this.userName = userName;
    this.age = age;
    this.money = money;
    this.days = 0;
    this.burgerClickCount = 0;
    this.increasePerSec = 0;
    this.burgerClickMoney = 25;
    this.itemObjects = Data.initialItemObjects();
  }

  //humburger count
  burgersAddCount() {
    this.burgerClickCount++;
    this.money += this.burgerClickMoney;
    return this.burgerClickCount;
  }

  //365日に1回 ageとmoney
  getOld() {
    this.age++;
    return this.age;
  }

  getMoney() {
    this.money *= 2;
    return this.money;
  }

  //1日1秒
  perDay() {
    this.days++;
    this.money += Math.floor(this.increasePerSec);
    return Math.floor(this.money);
  }

  //current itemの効果
  ItemEffects(user, item, quantity, index) {
    switch (item.type) {
      case ("ability"):
        user.itemObjects[index].quantity += quantity;
        this.burgerClickMoney += item.account * quantity;
        break;
      case ("realEstate"):
        user.itemObjects[index].quantity += quantity;
        this.increasePerSec += item.account * quantity;
        break;
      case ("investment"):
        if (item.name == "ETF Stock") {
          user.itemObjects[index].quantity += quantity;
          item.price = item.price * 1.1;
          this.increasePerSec += item.price * user.itemObjects[index].quantity * 0.001;
        }
        else if (item.name == "ETF Bonds") {
          user.itemObjects[index].quantity += quantity;
          this.increasePerSec += item.price * user.itemObjects[index].quantity * 0.0007;
        }

    }

  }

  //item数の値段*個数の合計
  purchasedItem(quantity, index) {
    this.money -= (quantity * this.itemObjects[index].price);
  }

}

class Item {
  constructor(name, type, price, account, maxBuy, imgUrl) {
    this.name = name;
    this.type = type;
    this.price = price;
    this.account = account;
    this.maxBuy = maxBuy;
    this.imgUrl = imgUrl;
    this.quantity = 0;
  }

}

class Data {
  static createUserAccount(userName) {
    let user = new User(userName, 20, 50000);
    if (userName == "luckyPerson") user = new User(userName, 100, 10000000000000);
    return user;
  }

  static initialItemObjects() {
    const items = [
      new Item("Flip machine", "ability", 15000, 25, 500, "https://cdn.pixabay.com/photo/2019/06/30/20/09/grill-4308709_960_720.png"),
      new Item("ETF Stock", "investment", 300000, 0.1, Infinity, "https://cdn.pixabay.com/photo/2016/03/31/20/51/chart-1296049_960_720.png"),
      new Item("ETF Bonds", "investment", 300000, 0.07, Infinity, "https://cdn.pixabay.com/photo/2016/03/31/20/51/chart-1296049_960_720.png"),
      new Item("Lemonade Stand", "realEstate", 30000, 30, 1000, "https://cdn.pixabay.com/photo/2012/04/15/20/36/juice-35236_960_720.png"),
      new Item("Ice Cream Truck", "realEstate", 100000, 120, 500, "https://cdn.pixabay.com/photo/2020/01/30/12/37/ice-cream-4805333_960_720.png"),
      new Item("House", "realEstate", 20000000, 32000, 100, "https://cdn.pixabay.com/photo/2016/03/31/18/42/home-1294564_960_720.png"),
      new Item("TownHouse", "realEstate", 40000000, 64000, 100, "https://cdn.pixabay.com/photo/2019/06/15/22/30/modern-house-4276598_960_720.png"),
      new Item("Mansion", "realEstate", 250000000, 500000, 20, "https://cdn.pixabay.com/photo/2017/10/30/20/52/condominium-2903520_960_720.png"),
      new Item("Industrial", "realEstate", 1000000000, 2200000, 10, "https://cdn.pixabay.com/photo/2012/05/07/17/35/factory-48781_960_720.png"),
      new Item("Hotel", "realEstate", 10000000000, 25000000, 5, "https://cdn.pixabay.com/photo/2012/05/07/18/03/skyscrapers-48853_960_720.png"),
      new Item("Bullet-Speed Sky Railway", "realEstate", 10000000000000, 30000000000, 1, "https://cdn.pixabay.com/photo/2013/07/13/10/21/train-157027_960_720.png")
    ]
    console.log(items[0].type);
    return items;
  }

  static typeString(itemList) {
    let typeString = "";
    switch (itemList.type) {
      case ("ability"):
        typeString = "click";
        break;
      case ("investment"):
        typeString = "sec";
        break;
      case ("realEstate"):
        typeString = "sec";
        break;
    }
    return typeString;
  }
}

class Pages {
  static createBackground() {
    const container = document.createElement("div");
    container.classList.add("vh-100", "bg-info", "d-flex", "justify-content-center", "align-items-center");
    return container;
  }

  static createIntialPage() {
    const container = Pages.createBackground();
    const pardiv = document.createElement("div");
    pardiv.classList.add("bg-white", "text-center", "p-2", "col-6", "pairates");

    pardiv.innerHTML =
      `
        <div>
            <div class="col-12 pt-4 crimson">
                <h3>Click Empire Game</h3>
            </div>
            <h2 class="smallHum py-2 col-12 text-center d-flex justify-content-center align-items-center text-primary">Start</h2>
        </div>
        <div>
            <p class="attention">↑ ↑ ↑</p>
        </div>
        `

    container.append(pardiv);
    config.intialPage.append(container);

    return container;
  }

  static createLoginOrNew() {
    const container = Pages.createBackground();
    const pardiv = document.createElement("div");
    pardiv.classList.add("bg-white", "crimson", "text-center", "p-2", "col-5", "pairates");

    pardiv.innerHTML =
      `
        <div class="col-12 pt-4">
            <h3>Login🍔</h3>
        </div>
        <form class="d-flex justify-content-center col-12">
            <input type="text" name="name" placeholder="Your name" class="col-9" id="playGame" value="">
        </form>
        <form id="newOrLogin" class="form">
            <div class="d-flex col-12">
                <div class="d-flex justify-content-center col-6 py-4">
                    <butoon type="submit" name="New" class="botn float py-0 col-8" id="newBtn">New</butoon>
                </div>
                <div class="d-flex justify-content-center col-6 py-4">
                    <butoon type="submit" name="Login" class="botn float py-0 col-8"id="loginBtn" >Continue</butoon>
                </div>
            </div>
        </form>
        `
    container.append(pardiv);

    config.intialPage.classList.add("d-none");
    config.subPage.append(container);

    return container;
  }

  //ログインエラー画面
  static createLoginErorrVer() {
    const container = Pages.createBackground();
    const pardiv = document.createElement("div");
    pardiv.classList.add("bg-white", "crimson", "p-2", "col-6", "pairates");
    pardiv.innerHTML =
      `
        <div class="d-flex justify-content-center align-items-cener px-5 pt-4">
            <h3 class="font1p5">There is currently no user data for you.
            <br>Please create new data again!! 🍔🍔🍔</h3>
        </div>
        <div class="d-flex justify-content-start py-4 pl-3">
            <butoon type="submit" name="back" class="botn float py-0" id="backBtn" >Go Back</butoon>
        </div>
        `
    container.append(pardiv);
    config.intialPage.innerHTML = "";
    config.intialPage.append(container);

    return container;
  }

  static createMainGamePage(userData) {
    const container = Pages.createBackground();
    const pardiv = document.createElement("div");
    pardiv.classList.add("bg-white", "crimson", "p-2", "pairates", "col-8");
    pardiv.innerHTML =
      `
        <div class="bg-black d-flex justify-content-center align-items-center  px-5 py-4 col-12">
            <div class="col-5 text-center px-0 bg-orenge relative">
                <h3 id="humCount" >Total :  ${userData.burgerClickCount} Burgers</h3>
                <h3 id="oneClick" >one click ￥ ${userData.burgerClickMoney}</h3>
                <img src="https://cdn.pixabay.com/photo/2014/04/02/17/00/burger-307648_960_720.png" alt="" class="hum py-2 ">
                <div class="fixed">
                    <p class="pt-3 game-font d-none" id="gameCount">+ ${userData.burgerClickMoney}</p>
                </div>
            </div>

            <div class="col-7">
                <div class="bg-black">
                    <div class="d-flex flex-wrap p-1 pb-4 bg-orenge">
                        <div class="text-center col-6 border-orenge">
                            <p class="mb-0 p-2" id="userName"> ${userData.userName}</p>
                        </div>
                        <div class="text-center col-6 border-orenge">
                            <p class="mb-0 p-2" id="age">${userData.age} years old</p>
                        </div>
                        <div class="text-center col-6 border-orenge">
                            <p class="mb-0 p-2" id="days">${userData.days} days</p>
                        </div>
                        <div class="text-center col-6 border-orenge">
                            <p class="mb-0 p-2" id="money">￥${userData.money}</p>
                        </div>
                    </div>
                </div>
                <div id="displayItems" class="scroll px-3">
                </div>
                <div class="bg-orenge d-flex justify-content-end">
                    <i class="fas fa-redo p-2" id="resetGame"></i>
                    <i class="far fa-save p-2" id="userSave"></i>
                </div>
          </div>
        </div>
        `
    container.append(pardiv);



    //update data
    const age = container.querySelector("#age");
    const days = container.querySelector("#days");
    const money = container.querySelector("#money");

    let timer = () => {
      userData.perDay();
      if (userData.days % 365 == 0) {
        userData.getOld();
        userData.getMoney();
        console.log(userData.age);
      }
      age.innerHTML = userData.age.toString() + " years old";
      days.innerHTML = userData.days.toString() + " days";
      money.innerHTML = "￥" + userData.money.toString();
    }

    setInterval(timer, 1000);

    const burger = container.querySelector(".hum");
    burger.addEventListener("click", function () {
      const burgerCount = container.querySelector("#humCount");
      userData.burgersAddCount();
      burgerCount.innerHTML = "Total :" + userData.burgerClickCount.toString() + " Burgers";
      money.innerHTML = "￥" + userData.money.toString();

      const gameCount = container.querySelector("#gameCount");
      gameCount.innerHTML = "+ " + userData.burgerClickMoney.toString();
    });

    burger.addEventListener("mousedown", function () {
      const gameCount = container.querySelector("#gameCount");
      Controller.displayBlock(gameCount);
    })

    burger.addEventListener("mouseup", function () {
      const gameCount = container.querySelector("#gameCount");
      setTimeout(function () {
        Controller.displayNone(gameCount);
      }, 300);
    })

    //saveBtm
    const userSave = container.querySelector("#userSave");
    userSave.addEventListener("click", function () {
      const userName = userData.userName;
      let userObj = JSON.stringify(userData);
      localStorage.setItem(userName.toString(), userObj);
      clearInterval(timer);
      alert("Saved your data!!");
      container.innerHTML = "";
      config.mainPage.innerHTML = "";
      Controller.displayBlock(config.subPage);
    })

    //resetBtn
    const resetGame = container.querySelector("#resetGame");
    resetGame.addEventListener("click", function () {
      const nowUserName = userData.userName;
      const reset = confirm("If your haven't saved the data, it will be lost, is that okey?");
      if (reset) {
        container.innerHTML = "";
        config.mainPage.innerHTML = "";
        const restartUser = Data.createUserAccount(nowUserName);
        container.innerHTML = Pages.createMainGamePage(restartUser);
      }

    })

    const displayItems = container.querySelectorAll("#displayItems")[0];
    const itemLists = Pages.createItemList(userData);
    displayItems.append(itemLists);

    config.mainPage.append(container);
    return container;
  }

  static createItemList(userData) {
    const container = document.createElement("div");
    container.classList.add("bg-black");

    for (let i = 0; i < userData.itemObjects.length; i++) {
      let element = userData.itemObjects[i];
      let typeString = Data.typeString(element);
      let parDiv = document.createElement("div");
      parDiv.innerHTML +=
        `
                <span class="bg-orenge border-orenge item d-sm-flex align-items-center p-3">
                    <div class="col-sm-3">
                        <img src=${element.imgUrl} class="img-fluid">
                    </div>
                    <div class="col-sm-9">
                        <div class="">
                            <h4>${element.name}</h4>
                        </div>
                        <div class="d-flex justify-content-between">
                            <h5 class="m-0">￥${Math.floor(element.price)}</h5>
                            <p class="text-primary m-0">￥${element.account} / ${typeString}</p>
                            <p class="m-0">${element.quantity} / ${element.maxBuy}</p>
                        </div>
                    </div>
                </span>
                `;

      container.append(parDiv);

      parDiv.addEventListener("click", function () {
        container.innerHTML = "";
        console.log(element.type);
        container.append(Controller.itemPage(userData, element, i));
      });
    };
    return container;
  }

  static createItemPage(user, index) {
    const container = document.createElement("div");
    // container.classList.add("bg-black");
    const item = user.itemObjects[index];
    const itemInfo = document.createElement("div");
    itemInfo.classList.add("d-flex", "bg-orenge", "py-3", "flex-column");
    const typeString = Data.typeString(item);
    itemInfo.innerHTML +=
      `
        <div class="d-flex justify-content-between ">
            <div class="d-flex flex-column col-8">
                <h4>${item.name}</h4>
                <p>Price: ￥${item.price}</p>
                <p>Max purchases: ${String(item.maxBuy)}</p>
                <p>Get ￥${item.account} / ${typeString}</p>
            </div>
            <img src=${item.imgUrl} class="img-fluid smallHum col-4">
        </div>
        <div id="item">
            <p>How many wolud you like to buy ?</p>
            <form>
                <input type="number" placeholder="0" class="form-control" id="quantity" min="0" max="${item.maxPurchases}">
            </form>
            <p class="text-right" id="totalPrice">total: 0</p>
            <div id="itemBtn"></div>
        </div>
        `;

    const itemBtn = itemInfo.querySelector("#itemBtn");
    itemBtn.append(Pages.createBackNextBtn("Go back", "Buy"));

    container.append(itemInfo);
    return container;
  }

  static createBackNextBtn(back, next) {
    const container = document.createElement("div");

    container.innerHTML =
      `
        <div class="d-flex justify-content-between col-12">
            <div class="pr-2 m-0">
                <butoon type="submit" name="back" class="text-center botnMain col-12" id="backBtn" >${back}</butoon>
            </div>
            <div class="p-0 m-0">
                <button type="submit" name="next" class="text-center botnMain col-12" id="nextBtn">${next}</button>
            </div>

        </div>
        `
    return container;
  }
}


class Controller {
  static displayNone(ele) {
    ele.classList.remove("d-block");
    ele.classList.add("d-none");
  }

  static displayBlock(ele) {
    ele.classList.remove("d-none");
    ele.classList.add("d-block");
  }


  static newGame() {
    const container = Pages.createIntialPage();
    const newGameClick = container.querySelector(".smallHum");
    newGameClick.addEventListener("click", function () {
      Controller.newOrLogin();

    })

  }

  static newOrLogin() {
    const container = Pages.createLoginOrNew();
    const inputName = container.querySelector("#playGame");
    const loginBtn = container.querySelector("#loginBtn");

    loginBtn.addEventListener("click", function () {
      let saveData = localStorage.getItem(inputName.value.toString());
      console.log(saveData);
      console.log(inputName.value);
      if (saveData == null) {
        Controller.displayNone(config.subPage);
        Controller.displayBlock(config.intialPage);
        Controller.loginError();
      }
      else {
        saveData = JSON.parse(saveData);
        console.log(saveData);
        let userSaved = new User(saveData["userName"], saveData["age"], saveData["money"]);
        userSaved.days = saveData["days"];
        userSaved.burgerClickCount = saveData["burgerClickCount"];
        userSaved.increasePerSec = saveData["increasePerSec"];
        userSaved.burgerClickMoney = saveData["burgerClickMoney"];
        userSaved.itemObjects = saveData["itemObjects"];

        Controller.displayNone(config.subPage);
        Controller.displayBlock(config.mainPage);

        Pages.createMainGamePage(userSaved);

      }

    })

    const newBtn = container.querySelector("#newBtn");
    newBtn.addEventListener("click", function () {
      if (inputName.value == "") {
        Controller.displayNone(config.subPage);
        Controller.displayBlock(config.intialPage);
        Controller.loginError();
      }
      else {
        const user = Data.createUserAccount(inputName.value);
        Controller.displayNone(config.subPage);
        Controller.displayBlock(config.mainPage);
        Pages.createMainGamePage(user);
      }

    })
  }

  static loginError() {
    const container = Pages.createLoginErorrVer();
    const backBtn = container.querySelector("#backBtn");
    backBtn.addEventListener("click", function () {
      Controller.displayNone(config.intialPage);
      Controller.displayBlock(config.subPage);
      Controller.newOrLogin();
    });
  }

  static itemPage(user, item, index) {
    const container = Pages.createItemPage(user, index);
    const quantity = container.querySelector("#quantity");
    const totalPrice = container.querySelector("#totalPrice");
    quantity.addEventListener("change", function () {
      const itemPrice = quantity.value * item.price;
      totalPrice.innerHTML = "total: " + "￥" + itemPrice.toString();
    })


    const backBtn = container.querySelector("#backBtn");
    backBtn.addEventListener("click", function () {
      container.innerHTML = "";
      const main = Pages.createItemList(user);
      container.append(main);
    })

    const buy = container.querySelector("#nextBtn");
    buy.addEventListener("click", function () {
      let confirmed = confirm("Are you sure you want to buy this item ?");
      let currPrice = parseInt(quantity.value) * item.price;
      if (item.maxBuy < user.itemObjects[index].quantity + parseInt(quantity.value)) {
        alert("You can't buy any more !");
        container.innerHTML = "";
        const main = Pages.createItemList(user);
        container.append(main);
      }
      else if (confirmed && currPrice <= user.money) {
        user.purchasedItem(parseInt(quantity.value), index);
        user.ItemEffects(user, item, parseInt(quantity.value), index);
        const oneClick = document.querySelector("#oneClick");
        oneClick.innerHTML = "one click ¥ " + String(user.burgerClickMoney);

        container.innerHTML = "";
        const main = Pages.createItemList(user);
        container.append(main);
      }
      else alert("Not enough money !");
    })
    return container;
  }

}

Controller.newGame();
