document.addEventListener("DOMContentLoaded", function(){
    
    let buyBtn = this.querySelectorAll(".buy-btn");
    let counter = localStorage.cart ? JSON.parse(localStorage.cart).length : 0;
    let cartCounter = document.querySelector("#cart-count");
    cartCounter.innerText = counter;
    toastr.options = {
        closeButton: true,
        timeOut: 2000,
        positionClass: "toast-bottom-right"
    };
    // let cart = []
    buyBtn.forEach((buyBtn, index) => {
        buyBtn.addEventListener('click', (e) => {
            e.preventDefault();
            toastr.success('Producto agregado al carrito');
            let product = {
                id: e.target.dataset.id,
                quantity: 1
            }
            if(!localStorage.getItem('cart')){
                localStorage.setItem('cart', JSON.stringify([product]));
                counter = counter + 1;
            } else {
                let cart = JSON.parse(localStorage.getItem('cart'));
                let index = cart.findIndex(item => item.id == product.id);
                if(index != -1){
                    cart[index].quantity = cart[index].quantity +1;
                } else {
                    cart.push(product);
                    counter = counter + 1;
                }
                localStorage.setItem('cart', JSON.stringify(cart));
            }
            
            cartCounter.innerText = counter;
        });
    });

})