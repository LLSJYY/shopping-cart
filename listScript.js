const productList = JSON.parse(localStorage.getItem("cart-item-list")) || [];
const productContainer = document.querySelector(".product-container");

const storeLocalStorage = function () {
  localStorage.setItem("cart-item-list", JSON.stringify(productList));
};

productContainer.addEventListener("click", (e) => {
  const itemContainer = e.target.closest(".item-container");
  const productId = itemContainer.getAttribute("data-id");
  const productImg = itemContainer.querySelector("img").getAttribute("src"); 
  const productName = itemContainer.querySelector(".product-info__name").innerText;
  const productPrice = itemContainer.querySelector(".product-info__price").innerText;

  if (e.target.getAttribute("alt") == "장바구니") {
    const findProductItem = productList.filter(({ productId: _productId }) => {
      return _productId === productId;
    })[0];

    const count = findProductItem ? findProductItem.count : 0;

    productList.push({
      productId,
      productImg,
      productName,
      productPrice,
      count: count + 1,
    });

    storeLocalStorage();
  } else {
    location.href = `./detail.html?img=${productImg}&name=${productName}&price=${productPrice}`
  }
});
