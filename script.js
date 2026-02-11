
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price){

  cart.push({ name, price });

  localStorage.setItem("cart", JSON.stringify(cart));

  alert(name + " added to cart!");
}


function loadCart(){

  let itemsContainer = document.getElementById("cartItems");
  let totalContainer = document.getElementById("total");

  if(!itemsContainer) return;

  itemsContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item,index)=>{
    itemsContainer.innerHTML += `
      <div style="margin:10px 0;">
        ${item.name} - Rs.${item.price}
        <button onclick="removeItem(${index})" 
        style="margin-left:10px;background:red;color:white;border:none;padding:5px 8px;border-radius:5px;">
        X
        </button>
      </div>
    `;
    total += item.price;
  });

  if(totalContainer){
    totalContainer.innerText = "Total: Rs. " + total;
  }
}

function removeItem(index){
  cart.splice(index,1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

// ==========================
// PAYMENT SYSTEM
// ==========================

let selectedMethod = "";

function selectMethod(method){
  selectedMethod = method;

  document.querySelectorAll(".payment-option")
  .forEach(el=>el.classList.remove("selected"));

  event.currentTarget.classList.add("selected");
}

function processPayment(){

  if(cart.length === 0){
    alert("Cart is empty!");
    return;
  }

  if(!selectedMethod){
    alert("Please select payment method");
    return;
  }

  // Fake Processing Screen
  document.body.innerHTML = `
    <div class="processing-screen">
      <div class="loader"></div>
      <h2>Processing ${selectedMethod} Payment...</h2>
      <p>Please wait...</p>
    </div>
  `;

  setTimeout(()=>{
    saveOrder();
    window.location.href = "success.html";
  },3000);
}

function saveOrder(){

  let orders = JSON.parse(localStorage.getItem("orders")) || [];

  orders.push({
    orderId: "BT-" + Math.floor(Math.random()*100000),
    items: cart,
    paymentMethod: selectedMethod,
    status: "Paid",
    date: new Date().toLocaleString()
  });

  localStorage.setItem("orders", JSON.stringify(orders));

  localStorage.removeItem("cart");
  cart = [];
}


loadCart();
