
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
const productList = (JSON.parse(localStorage.getItem(storeKey)) || []).map((product) => { 
  return {
    ...product,
    checked: true
  }
});

const cartItemListSection = document.querySelector(".cart-item-container");
const uncheckdItem = function () {
  document.querySelectorAll(".cart-container").forEach((product) => {
    if (!product.querySelector(".checkbox").checked) {
      const productImg = product.querySelector("img").getAttribute("src");
      const productName = product.querySelector(".cart-name").innerHTML;
      const productPrice = product.querySelector(".cart-price").innerHTML;
      const productQty = product.querySelector(".number-input").value;

      productList.push({
        productImg,
        productName,
        productPrice,
        productQty,
      })
    }
  })
  localStorage.setItem(storeKey, JSON.stringify(productList));
}

const storeLocalStorage = function () {
  localStorage.setItem(storeKey, JSON.stringify(productList));
}
/** LIST CART IMG CLICK EVENT */
const newCartItem = function (e) {
  cartItemListSection.innerHTML += /*html*/`
    <div class="cart-container">
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

  productList.forEach((product) => {
    newCartItem(product);
  });
};

const updateItemInfo = (index) => {
  const { count, productPrice } = productList[index];
  const container = document.querySelectorAll(".cart-container")[index];

  const input = container.querySelector(".number-input");
  const price = container.querySelector(".cart-price");

  input.value = count;
  price.innerHTML = `${numberFormat(justNumbers(productPrice)*count)}원`;
}

updateCartItems();
updateTotalPrice(); // render ... 

document.querySelector(".check-all").addEventListener("click", function({ target: { checked }}) {
  productList.forEach((product, index) => {
    product.checked = checked;
    document.querySelectorAll(".cart-container")[index].querySelector(".checkbox").checked = checked;
  });

  updateTotalPrice();
});
/** CART ITEM EVENT 1.CHECKBOX ,2.REMOVE  3.INPUTBOX UP&DOWN*/
const shoppingCart = function () { //event delegate ->5,checkbox,inputNumberBox & up & down, removeBtn
  document.querySelector(".cart-section").addEventListener("click", function (e) {
    const container = e.target.closest(".cart-container");
    const cartContainers = document.querySelectorAll(".cart-container");

    /** todo localstorage -> productList에서도 삭제 */
    if (e.target.getAttribute("alt") === "삭제") {
     container.nextElementSibling.remove();
     container.remove()
    }

    if (e.target.classList.contains("delete-button")) {
      cartContainers.forEach((container) => {
        console.log(container)

        container.querySelector(".checkbox").checked ? (container.remove()) : "";
      })
      localStorage.removeItem("newCartItem");
      uncheckdItem();
    }

    if (e.target.classList.contains("number-input-button")) {
      const selectedContainerIndex = cartContainers.reduce((acc, curr, index) => curr === container ? index : acc, -1);

      if(selectedContainerIndex!==-1) {
        const product = productList[selectedContainerIndex];
        const isPlus = e.target.classList.contains("plus");
        const { count } = product;
        
        product.count = isPlus ? count+1 : count-1;
        
        updateItemInfo(selectedContainerIndex);
        updateTotalPrice();
      }
    }

    if (e.target.classList[0] == "primary-button") {
      localStorage.removeItem("newCartItem");
      uncheckdItem(); // .... 이거 반대로 적용시키고싶은데 어떤 방법이 있을가요 선생님..?
      location.href = "./order.html";
    }
    updateTotalPrice();
  })
}
shoppingCart()

/** CART-CONTAINER */
/**  check out */
