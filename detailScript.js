const getProduct = function () {
  const getUrl = location.href.split("?")[1].split("&").map((item) => {
    const [key, value] = item.split("=")
    return { [key]: decodeURI(value) }
  })
  console.log(getUrl);

  ///그냥 상품상세 띄웠을때 아무것도 안나오는데 ㅇ어떤방법이 좋을까요 
document.querySelector(".product-detail-container").innerHTML +=
  `<div class="flex-col-center w-520">
<img class="w-480 h-480 mb-10"
  src="${getUrl[0].img}"
  alt="${getUrl[1].name}"
/>
<div class="product-detail-info">
  <span class="product-detail-info__name">${getUrl[1].name}</span>
  <hr class="divide-line-gray my-20" />
  <div class="flex justify-between">
    <span>금액</span>
    <span class="product-detail-info__price">${getUrl[2].Price}</span>
  </div>
</div>
<button class="product-detail-button flex-center mt-20">
  장바구니
</button>`

}
getProduct();




