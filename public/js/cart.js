document.addEventListener("DOMContentLoaded", function () {
  let buyBtn = this.querySelectorAll(".buy-btn");
  let counter = localStorage.cart ? JSON.parse(localStorage.cart).length : 0;
  let cartCounter = document.querySelector("#cart-count");
  let products = [];
  cartCounter.innerText = counter;
  toastr.options = {
    closeButton: true,
    timeOut: 2000,
    positionClass: "toast-bottom-right",
  };
  // let cart = []
  buyBtn.forEach((buyBtn, index) => {
    buyBtn.addEventListener("click", (e) => {
      e.preventDefault();
      toastr.success("Producto agregado al carrito");
      let product = {
        id: parseInt(e.target.dataset.id),
        quantity: 1,
      };
      if (!localStorage.getItem("cart")) {
        localStorage.setItem("cart", JSON.stringify([product]));
        counter = counter + 1;
      } else {
        let cart = JSON.parse(localStorage.getItem("cart"));
        let index = cart.findIndex((item) => item.id == product.id);
        if (index != -1) {
          cart[index].quantity = cart[index].quantity + 1;
        } else {
          cart.push(product);
          counter = counter + 1;
        }
        localStorage.setItem("cart", JSON.stringify(cart));
      }

      cartCounter.innerText = counter;
    });
  });

  // MOSTRAR EL CARRITO

  let totalValue = 0;
  let total = document.querySelector(".totalValue");

  let cartRows = document.querySelector(".cartRows");

  if (localStorage.cart) {
    let cart = JSON.parse(localStorage.cart);
    cart.forEach((product, index) => {
      fetch(`/api/products/${product.id}`)
        .then((response) => response.json())
        .then((data) => {
          cartRows.innerHTML += `
                <tr id="row${index}">
                <th scope="row">${index + 1}</th>
                <td> ${data.product.name}</td>
                <td> $${data.product.price}</td>
                <td> ${product.quantity}</td>                
                <td> $${data.product.price * product.quantity}</td>
                <td><button id="delete${index}" class="deleteBtn">Eliminar</button></td>
                </tr>                
                `;
          totalValue += data.product.price * product.quantity;
          total.innerHTML = `<p>Total: $${totalValue}</p>`;
          products.push({
            productId: data.product.id,
            name: data.product.name,
            price: data.product.price,
            quantity: product.quantity,
          });
        });
    });
  }

  document.querySelector(".totalValue").innerHTML = `<p>$${totalValue}</p>`;

  // CONTINUAR COMPRA - CHECKOUT
  let checkoutBtn = document.querySelector("#checkoutCart");
  let checkoutForm = document.querySelector("#checkoutForm");
  checkoutBtn.addEventListener("click", (e) => {
    e.preventDefault();

    console.log(products);

    const formData = {
      paymentMethod: checkoutForm.paymentMethod.value,
      total: totalValue,
      products: products,
    };

    fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        location.href = "/";
      })
      .catch((err) => {
        console.log(err);
      });
  });
});
