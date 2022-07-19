const storedImg = []; // 이름이 맘에 안듭니다.
const productContainer = document.querySelector(".product-container");
const storeLocalStorage = function () {
  localStorage.setItem('newCartItem', JSON.stringify(storedImg));
}

let count = 0;

productContainer.addEventListener('click',(e) => {
 
  if(e.target.getAttribute("alt")== "장바구니"){
    const productInfo = e.target.closest("div")
    const imgSrcCart = productInfo.querySelector("img").getAttribute("src");
    const productImg = e.target.closest("div").parentElement.querySelector("img").getAttribute("src");
    const productName = productInfo.querySelector(".product-info__name").innerText;
    const productPrice = productInfo.querySelector(".product-info__price").innerText;
    console.log(productImg,productName,productPrice)

    count++;
    storedImg.push({
      productImg,
      productName,
      productPrice,
      count,
    })
    
    location.href = `./cart.html?img=${productImg}&name=${productName}&Price=${productPrice}`//todo : yes or no로 넘어갈지 안넘어갈지 하기
    console.log(storedImg) // todo : yes or no로 넘어갈지 안넘어갈지 하기
  } 
  if(e.target.tagName === "IMG" &&e.target.getAttribute("alt")!= "장바구니" ){
    const productInfo = e.target.closest("div")
  const imgSrcCart = productInfo.querySelector("img").getAttribute("src");
  const productImg = e.target.closest("div").parentElement.querySelector("img").getAttribute("src");
  const productName = productInfo.querySelector(".product-info__name").innerText;
  const productPrice = productInfo.querySelector(".product-info__price").innerText;
  console.log(productImg, productName, productPrice)
  location.href = `./detail.html?img=${productImg}&name=${productName}&Price=${productPrice}`

    console.log(e)
  }  
})
