const storeKey = "cart-item-list";
const productList = JSON.parse(localStorage.getItem(storeKey)) || [];
const numberFormat = function (str) {
  return str.toString()
    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
};
const newCartItem = function (e) {
  const section = document.querySelector(".order-left-section");
  section.innerHTML +=
  /*html*/`<div class="order-container">
            <div class="flex gap-15 mt-10">
              <img class="w-144 h-144" src="${e.productImg}" alt="${e.productName}" />
              <div class="flex-col gap-15">
                <span class="order-name">${e.productName}</span>
                <span>수량: ${e.count}</span>
              </div>
            </div>
          </div>
          <hr class="divide-line-thin mt-10" />`
}

productList.forEach(newCartItem);

const updateTotalPrice = function () {
  const totalPrice = productList.filter(({ checked }) => checked).reduce((acc, curr) => {
    const { productPrice, count } = curr;

    return acc + parseInt(productPrice.replace(/[^0-9]/g, "")) * count;
  }, 0);

  document.querySelectorAll(".highlight-text")[1].innerHTML = `${numberFormat(totalPrice)}원`;
  document.querySelector(".primary-button.flex-center").innerHTML = `${numberFormat(totalPrice)}원 결재하기`;
}

updateTotalPrice();