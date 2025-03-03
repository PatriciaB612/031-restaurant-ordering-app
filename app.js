import { menuArray } from './data.js'

const menuEl = document.querySelector('.menu')
const orderDiv = document.querySelector('.order')
const orderItemsDiv = document.querySelector('.order-items')
const totalPriceEl = document.querySelector('.total-price')
const modalEl = document.querySelector('.modal')
const paymentForm = document.querySelector('form')
const thankYouMessageEl = document.querySelector('.thank-you-message')
let orderArray = []

function renderMenuItems() {
  menuArray.forEach(function (item) {
    menuEl.innerHTML += `
        <div class="item">
          <div class="emoji-container">
            <div class="item-emoji">${item.emoji}</div>
          </div>
          <div class="item-description">
            <p class="item-name">${item.name}</p>
            <p class="item-ingredients">${item.ingredients}</p>
            <p class="item-price">${'$' + item.price}</p>
          </div>
          <div class="add-btn-container">
            <button class="add-btn btn">
              <img src="images/add-btn.png" data-add="${item.id}">
            </button>
          </div>
        </div>
        `
  })
}
renderMenuItems()

document.addEventListener('click', function (e) {
  if (e.target.dataset.add) {
    handleAddBtnClick(e.target.dataset.add)
    orderDiv.style.display = 'revert'
  } else if (e.target.dataset.remove) {
    handleRemoveBtnClick(e.target)
  } else if (e.target.id === 'complete-btn') {
    handleCompleteBtnClick()
  }
})

function handleAddBtnClick(itemId) {
  orderArray.push(menuArray[itemId])
  orderItemsDiv.innerHTML = ''
  renderOrder()
  thankYouMessageEl.innerHTML = ''
}

function renderOrder() {
  const count = []

  orderArray.forEach((item) => {
    count[item.name] = (count[item.name] || 0) + 1
  })
  const uniqueItemsArray = orderArray.filter((item, index, self) => {
    return self.indexOf(item) === index
  })
  uniqueItemsArray.forEach((item) => {
    orderItemsDiv.innerHTML += `
  <div class="order-item">
    <p class="item-name-order item-name">${count[item.name]} x ${item.name}</p>
    <button class="remove-btn btn" data-remove="${orderArray.indexOf(
      item
    )}">remove</button>
    <p class="item-price-order item-price">${
      '$' + count[item.name] * item.price
    }</p>
  </div>
  `
  })
  renderTotalPrice()
}

function renderTotalPrice() {
  let totalPrice = 0
  for (let item of orderArray) {
    totalPrice += item.price
  }
  totalPriceEl.innerHTML = `${'$' + totalPrice}`
}

function handleRemoveBtnClick(eventTarget) {
  orderItemsDiv.innerHTML = ''
  const itemIndex = eventTarget.dataset.remove
  orderArray.splice(itemIndex, 1)
  renderOrder()
}

function handleCompleteBtnClick() {
  modalEl.style.display = 'block'
  orderArray = []
}

paymentForm.addEventListener('submit', function (e) {
  e.preventDefault()
  const paymentFormData = new FormData(paymentForm)
  const cardholderName = paymentFormData.get('cardholderName')

  modalEl.style.display = 'none'
  orderDiv.style.display = 'none'
  totalPriceEl.style.display = 'none'

  thankYouMessageEl.style.display = 'block'
  thankYouMessageEl.innerHTML = `
     <p>Thanks ${cardholderName}! Your order is on its way!</p>
     `
})
