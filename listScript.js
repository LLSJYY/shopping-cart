const storeKey = "cart-item-list";

const productList = JSON.parse(localStorage.getItem(storeKey)) || [];
const storedProduct = []; // 이름이 맘에 안듭니다.

const storeLocalStorage = function () {
  localStorage.setItem(storeKey, JSON.stringify(productList));
};
const clickContainer = document.querySelectorAll(".item-container").forEach((container) => {
  container.addEventListener('click', (e) => {
    const itemContainer = e.target.closest(".item-container");
    const productId = itemContainer.getAttribute("data-id");
    const productImg = itemContainer.querySelector("img").getAttribute("src")
    const productName = itemContainer.querySelector(".product-info__name").innerHTML;
    const productPrice = itemContainer.querySelector(".product-info__price").innerHTML;
    const cartImg = itemContainer.querySelector(".flex.justify-between.w-280.p-5").querySelector("img");

    if (e.target.getAttribute("alt") === "장바구니") {
      const findProductItem = productList.filter(({ productId: _productId }) => {
        return _productId === productId;

      })[0];

      if (findProductItem) {
        findProductItem.count++;
      } else {
        productList.push(
          {
            productId,
            productImg,
            productName,
            productPrice,
            count: 1,
          }
        )
        storeLocalStorage();
      }
    } else {
      location.href = `./cart.html?img=${productImg}&name=${productName}&Price=${productPrice}`
    }
  })
})