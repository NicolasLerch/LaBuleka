document.addEventListener("DOMContentLoaded", function () {
  let totalValue = 0;
  let total = document.querySelector('.totalValue')

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
        });
        
    });
  }

  document.querySelector(".totalValue").innerHTML = `<p>$${totalValue}</p>`;
});
