const storedImg = []; // 이름이 맘에 안듭니다.
const productInfoCart = document.querySelectorAll(".flex.justify-between.w-280.p-5");
let count = 0;

const storeLocalStorage = function () {
  localStorage.setItem('newCartItem', JSON.stringify(storedImg));
}

productInfoCart.forEach(function (el) {
  const cartSection = document.querySelector(".cart-left-section");
  el.addEventListener("click", function (e) {
    if (e.target.tagName == "IMG") { //선생님 이건 productInfoCart안의 이미지 파일만 선택되는걸까요 <- 해결.
      const getImg = e.target.closest(".flex").parentElement.children[0]
      const getImgName = getImg.getAttribute("alt");
      const getImgPrice = e.target.closest(".flex").querySelector(".product-info__price").innerText;
      count++;
      storedImg.push({
        getImg,
        getImgName,
        getImgPrice,
        count,
      })

      console.log(storedImg)
      storeLocalStorage(); //저장을 3번하고싶은데 안되네요 ..
      console.log(storeLocalStorage())
      debugger;
      location.href = `./detail.html?img=${getImg}&name=${getImgName}&getImgPrice=${getImgPrice}`

    }
    if (e.target.classList.contains('product-info__name') || e.target.classList.contains('product-info__price')) {
      const getStoredDetail = [];
      console.log("상품상세로 이동");
      const itemContainer = e.target.closest("div").parentElement;
      const getImg = itemContainer.querySelector("img").getAttribute("src");
      const getImgName = e.target.closest(".flex").querySelector("img").getAttribute("alt");
      const getImgPrice = e.target.closest(".flex").querySelector(".product-info__price").innerText;
      getStoredDetail.push({
        getImg,
        getImgName,
        getImgPrice,
      })

      console.log(getImg,getImgName,getImgPrice);
      const storeDetailLocalstorage = function(){
        localStorage.setItem('detailInfo',JSON.stringify(getStoredDetail))
      }
      storeDetailLocalstorage();
    }
  })
})




