window.addEventListener("load", function(){
    console.log("linkeado correctamente");

    let editBtns = document.querySelectorAll(".editButton");
    let cancelBtns = document.querySelectorAll(".cancelBtn");

 
    // Script para mostrar el value de cada producto.
    editBtns.forEach((editBtn, index) => {
        const editContainer = document.querySelectorAll('.edit-product-container')[index];
        editBtn.addEventListener('click', () => {
            editContainer.classList.add('show');
        });
    });

    cancelBtns.forEach(cancelBtn => {
        cancelBtn.addEventListener('click', () => {
            cancelBtn.closest('.edit-product-container').classList.remove('show');
        });
    });

})
