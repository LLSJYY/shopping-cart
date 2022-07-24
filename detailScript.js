const getProduct = function () {
  const queryString = location.href.split("?")[1];

  if (queryString) {
    const params = queryString.split("&").map((item) => {
      const [key, value] = item.split("=");

      return {
        [key]: decodeURI(value)
      };
    });
    
    const productData = params.reduce((acc, curr) => {
      // map, filter, reduce 순수 함수 똑같은 값이 들어오면 똑같은 output을 만들어내고 side effect가 생기지 않는 함수
      return Object.assign({}, acc, curr); // 원본에 영향을 미치지 않는다.
    }, {}); // 어떤 타입으로 변경해주는지 이해하기 쉽게 두번째 값을 넣어준다.

    document.querySelector(".product-detail-container").innerHTML +=
      /*html*/`<div class="flex-col-center w-520">
                <img class="w-480 h-480 mb-10" src="${productData.img}" alt="${productData.name}" />
                <div class="product-detail-info">
                  <span class="product-detail-info__name">${productData.name}</span>
                  <hr class="divide-line-gray my-20" />
                  <div class="flex justify-between">
                    <span>금액</span>
                    <span class="product-detail-info__price">${productData.price}</span>
                  </div>
                </div>
                <button class="product-detail-button flex-center mt-20">
                  장바구니
                </button>
              </div>`;
  }
};

getProduct();