import { menuArray } from './data.js'
const menu = document.querySelector('.menu')
const orderArray = []
const orderItems = document.querySelector('.order-items')
const orderDiv = document.querySelector('.order')
const totalPriceDiv = document.querySelector('.total-price')
const modal = document.querySelector('.modal')
const paymentForm = document.querySelector('form')

function renderMenuItems() {
  menuArray.forEach(function (menuItem) {
    menu.innerHTML += `
        <div class="item">
          <div class="emoji-container">
            <div class="item-emoji">${menuItem.emoji}</div>
          </div>
          <div class="item-description">
            <p class="item-name">${menuItem.name}</p>
            <p class="item-ingredients">${menuItem.ingredients}</p>
            <p class="item-price">${'$' + menuItem.price}</p>
          </div>
          <div class="add-btn-container">
            <button class="add-btn btn">
              <img src="images/add-btn.png" data-add="${menuItem.id}">
            </button>
          </div>
        </div>
        `
  })
}
renderMenuItems()

document.addEventListener('click', function (e) {
  if (e.target.dataset.add) {
    handleAddClick(e.target.dataset.add)
    orderDiv.style.display = 'revert'
    renderOrder()
    renderTotalPrice()
  } else if (e.target.dataset.remove) {
    removeItem(e.target)
    renderOrder()
    renderTotalPrice()
  } else if (e.target.id === 'complete-btn') {
    handleCompleteBtnClick()
  } else if (e.target.id === 'pay-btn') {
    handlePayBtnClick()
  }
})

function handleAddClick(itemId) {
  if (menuArray[itemId]) {
    orderArray.push(menuArray[itemId])
    return orderArray
  }
}

function renderOrder() {
  orderItems.innerHTML = ''
  orderArray.forEach(function (orderItem) {
    orderItems.innerHTML += `
  <div class="order-item">
    <p class="item-name-order item-name">${orderItem.name}</p>
    <button class="remove-btn btn" data-remove="${orderArray.indexOf(
      orderItem
    )}">remove</button>
    <p class="item-price-order item-price">${'$' + orderItem.price}</p>
  </div>
  `
  })
}

function renderTotalPrice() {
  let totalPrice = 0
  for (let order of orderArray) {
    totalPrice += order.price
  }
  totalPriceDiv.innerHTML = `${'$' + totalPrice}`
}

function removeItem(eventTarget) {
  const itemIndex = eventTarget.dataset.remove
  orderArray.splice(itemIndex, 1)
}

function handleCompleteBtnClick() {
  modal.style.display = 'block'
}

function handlePayBtnClick() {}

paymentForm.addEventListener('submit', function (e) {
  e.preventDefault()
  const paymentFormData = new FormData(paymentForm)
  const cardholderName = paymentFormData.get('cardholderName')

  console.log(paymentFormData)
  console.log(cardholderName)

  modal.style.display = 'none'
  orderDiv.style.display = 'none'
  totalPriceDiv.style.display = 'none'

  const thankYouMessage = document.querySelector('.thank-you-message')
  thankYouMessage.style.display = 'block'
  thankYouMessage.innerHTML = `
     <p>Thanks ${cardholderName}! Your order is on its way!</p>
     `
})
