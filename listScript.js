const storeKey = "cart-item-list";
const productList = JSON.parse(localStorage.getItem(storeKey)) || [];
const productContainer = document.querySelector(".product-container");

const storeLocalStorage = function () {
  localStorage.setItem(storeKey, JSON.stringify(productList));
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

    if(findProductItem) {
      findProductItem.count++;
    } else {
      productList.push({
        productId,
        productImg,
        productName,
        productPrice,
        count: 1,
      });
    }
    
    storeLocalStorage();
  } else {
    location.href = `./detail.html?img=${productImg}&name=${productName}&price=${productPrice}`
  }
});
