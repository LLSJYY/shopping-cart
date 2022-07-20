const newCartItem = function (e) {
    const section = document.querySelector(".order-left-section");
    section.innerHTML += 
    `<div class="order-container">
    <div class="flex gap-15 mt-10">
      <img
        class="w-144 h-144"
        src="${e.productImg}"
        alt="${e.productName}"
      />
      <div class="flex-col gap-15">
        <span class="order-name">${e.productName}</span>
        <span>수량: ${e.productQty}</span>
      </div>
    </div>
    </div>
    <hr class="divide-line-thin mt-10" />`
  }
  const getStorage = function () {
    const getLocalStorage = JSON.parse(localStorage.getItem('newCartItem'));
    getLocalStorage.forEach(el => {
   console.log(el)
        newCartItem(el)
    });
  }

  getStorage()

  (function(){
    const section = document.querySelector(".order-left-section");
    const itemsPrice =  document.querySelectorAll(".order-container").forEach();  
    const orderTotal =  section.querySelectorAll(".highlight-text")[1].innerText
    
  })()