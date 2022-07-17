

/** LIST CART IMG CLICK EVENT */
const newCartItem = function (e) {
  const section = document.querySelector(".cart-left-section");
  section.innerHTML += `<div class="cart-container">
  <div class="flex gap-15 mt-10">
    <input class="checkbox" name="checkbox" type="checkbox" checked="true">
    <img class="w-144 h-144" src="./assets/images/product.png" alt="${e.getImgName}">
    <span class="cart-name">${e.getImgName}</span>
  </div>
  <div class="flex-col-center justify-end gap-15">
    <img class="cart-trash-svg" src="./assets/svgs/trash.svg" alt="삭제">
    <div class="number-input-container">
      <input type="number" class="number-input" value="1">
      <div>
        <button class="number-input-button">▲</button>
        <button class="number-input-button">▼</button>
      </div>
    </div>
    <span class="cart-price">${e.getImgPrice}</span>
  </div>
  </div>
  <hr class="divide-line-thin mt-10" />`
}

const getStorage = function () {
  const cartSection = document.querySelector(".cart-left-section");
  const getLocalStorage = JSON.parse(localStorage.getItem('newCartItem'));
  getLocalStorage.forEach(el => {
    newCartItem(el)
  });
} //__ if localstorage dont have any item? 

getStorage();

/** CART ITEM EVENT 1.CHECKBOX ,2.REMOVE  3.INPUTBOX UP&DOWN*/
const shoppingCart = function () { //event delegate ->5,checkbox,inputNumberBox & up & down, removeBtn
  document.querySelector(".cart-section").addEventListener("click", function (e) {
    if (e.target.parentElement.classList.contains("checkbox-container")) {
      e.target.closest(".cart-section").querySelectorAll(".checkbox").forEach((el) => {
        el.checked = !e.target.checked
      })
      e.target.checked = !e.target.checked;
    }
    if (e.target.getAttribute("alt") === "삭제") {
      e.target.closest(".cart-container").nextElementSibling.remove();
      e.target.closest(".cart-container").remove()
    }

    if (e.target.classList.contains("delete-button")) {
      document.querySelectorAll(".cart-container").forEach((e) => {
        console.log(e.querySelector(".checkbox").checked ? e.remove() : console.log("2"))
      })
      document.querySelectorAll("hr.divide-line-thin.mt-10").forEach((e) => {
        e.remove()
      })
    }

    if (e.target.classList.contains("number-input-button")) {

      const container = e.target.parentElement.parentElement
      let cartQty = parseInt(container.querySelector(".number-input").value);
      const checkBtn = e.target.closest("div").querySelectorAll(".number-input-button")[0]
      e.target == checkBtn ? container.querySelector(".number-input").value = cartQty + 1 : container.querySelector(".number-input").value = cartQty - 1;

      e.target.closest(".flex-col-center.justify-end.gap-15").querySelector(".cart-price").innerHTML = parseInt(e.target.closest(".flex-col-center.justify-end.gap-15").querySelector(".cart-price").innerHTML.replace(/[^0-9]/g, "")) * cartQty

    }

    
      const total = Array.from(document.querySelectorAll(".cart-price")).reduce((acc, cur) => {
        return acc + parseInt(cur.innerHTML.replace(/[^0-9]/g, ""));
      }, 0)
      document.querySelectorAll(".highlight-text")[1].innerText = `${total}`
    //  


  })
}

/** CART-CONTAINER */

shoppingCart();
/**  check out */
const proceedToCheckout = function () {
  const checkoutSection = document.querySelector(".cart-right-section__bottom");
  // checkoutSection.querySelectorAll(".highlight-text")[1].innerHTML = `${}`
  // checkoutSection.querySelector(".primary-button flex-center").innerHTML = `주문하기 ${}개`
  // <button class="primary-button flex-center">  check 된 개수만큼,


}
// img,order-name, span(수량)
// document.querySelector(".primary-button flex-center").addEventListener('click',function(e){
//   const checkoutStorage = {};
//   // document.querySelector(".cart-container")


// })
