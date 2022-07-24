
const justNumbers = function (str) {
  return str.replace(/[^0-9]/g, "")
};
const numberFormat = function (str) {
  return str.toString()
    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
};
const updateTotalPrice = function () {
  const totalPrice = productList.filter(({ checked }) => checked).reduce((acc, curr) => {
    const { productPrice, count } = curr;

    return acc + parseInt(productPrice.replace(/[^0-9]/g, "")) * count;
  }, 0);

  document.querySelectorAll(".highlight-text")[1].innerHTML = `${numberFormat(totalPrice)}원`;
}

const storeKey = "cart-item-list";
let productList = (JSON.parse(localStorage.getItem(storeKey)) || []).map((product) => {
  return {
    ...product,
    checked: true
  }
});

const findItemByKey = (key) => {
  return productList.filter(({ productId }) => {
    return productId === key;
  })[0]
}

const cartItemListSection = document.querySelector(".cart-item-container");

const storeLocalStorage = function () {
  localStorage.setItem(storeKey, JSON.stringify(productList));
}
/** LIST CART IMG CLICK EVENT */
const newCartItem = function (e) {
  cartItemListSection.innerHTML += /*html*/`
    <div class="cart-container" data-key="${e.productId}">
      <div class="flex gap-15 mt-10">
        <input class="checkbox" name="checkbox" type="checkbox" checked="true">
        <img class="w-144 h-144" src="./assets/images/product.png" alt="${e.productImg}">
        <span class="cart-name">${(e.productName)}</span>
      </div>
      <div class="flex-col-center justify-end gap-15">
        <img class="cart-trash-svg" src="./assets/svgs/trash.svg" alt="삭제">
        <div class="number-input-container">
          <input type="number" min="0" class="number-input" value="${e.count}">
          <div>
            <button class="number-input-button plus">▲</button>
            <button class="number-input-button minus">▼</button>
          </div>
        </div>
        <span class="cart-price" data-price="${justNumbers(e.productPrice)}">${numberFormat(justNumbers(e.productPrice) * e.count)}원</span>
      </div>
    </div>
    <hr class="divide-line-thin mt-10" />`
};


const updateCartItems = () => { // 화면에 그려주는 용도
  cartItemListSection.innerHTML = ""

  productList.filter(({ remove }) => !remove).forEach((product) => {
    newCartItem(product);
  });
};
const findContainerByKey = (key) => {
  return Array.from(document.querySelectorAll(".cart-container")).filter((element) => {
    return element.getAttribute("data-key")===key
  })[0];
}
const updateItemInfo = (key) => {
  const { count, productPrice } = findItemByKey(key);
  const container = findContainerByKey(key);

  const input = container.querySelector(".number-input");
  const price = container.querySelector(".cart-price");

  input.value = count;
  price.innerHTML = `${numberFormat(justNumbers(productPrice) * count)}원`;
}

updateCartItems();
updateTotalPrice(); // render ... 

document.querySelector(".check-all").addEventListener("click", function ({ target: { checked } }) {
  productList.forEach((product, index) => {
    product.checked = checked;
    document.querySelectorAll(".cart-container")[index].querySelector(".checkbox").checked = checked;
  });

  updateTotalPrice();
});

document.querySelector(".delete-button").addEventListener("click", function () {
  const removeItems = productList.filter((product) => {
    return product.checked;
  });

  removeItems.forEach((product) => {
    removeByKey(product.productId)
  });

  productList = productList.filter((product) => {
    return !product.checked
  });
  
  storeLocalStorage();
});

document.querySelector(".order").addEventListener("click", (e) => {
  e.preventDefault();
  location.href = "./order.html";
});

function removeByKey(key) {
  const cartContainers = Array.from(document.querySelectorAll(".cart-container"));
  const container = cartContainers.filter((container) => {
    return container.getAttribute("data-key") === key
  })[0];

  container.nextElementSibling.remove();
  container.remove();
}

/** CART ITEM EVENT 1.CHECKBOX ,2.REMOVE  3.INPUTBOX UP&DOWN*/
const shoppingCart = function () { //event delegate ->5,checkbox,inputNumberBox & up & down, removeBtn
  document.querySelector(".cart-section").addEventListener("click", function (e) {
    const container = e.target.closest(".cart-container");

    if(container) {
      const key = container.getAttribute("data-key"); // 프로덕트 key index가 아님

      /** todo localstorage -> productList에서도 삭제 */
      if (e.target.getAttribute("alt") === "삭제") {
        productList = productList.filter(({ productId }) => productId !== key);

        removeByKey(key);

        storeLocalStorage();
      }

      if (e.target.classList.contains("number-input-button")) { // 플러스 마이너스 클릭시 
        const product = findItemByKey(key);
        const isPlus = e.target.classList.contains("plus");
        const { count } = product;

        product.count = isPlus ? count + 1 : count - 1;

        updateItemInfo(key);
        updateTotalPrice();
      }


      updateTotalPrice();
    }
  });
}
shoppingCart()

/** CART-CONTAINER */
/**  check out */
