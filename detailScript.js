const getStorage = function () {
}

const newCartItem = function (e) {
  const container = document.querySelector(".product-detail-container");
  container.innerHTML +=

   ` <div class="flex-col-center w-520">
      $<img
        class="w-480 h-480 mb-10"
        src="./assets/images/product.png"
        alt="${get}"
      />
      <div class="product-detail-info">
        <span class="product-detail-info__name">PET보틀-정사각(420ml)</span>
        <hr class="divide-line-gray my-20" />
        <div class="flex justify-between">
          <span>금액</span>
          <span class="product-detail-info__price">43,000원</span>
        </div>
      </div>
      <button class="product-detail-button flex-center mt-20">
        장바구니
      </button>
    </div>`
}


