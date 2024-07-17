

window.addEventListener("load", function(){
    console.log("linkeado correctamente");

    let editBtn = document.querySelector('#edit-btn');
    let form = document.querySelector('#edit-form-container')
    let cancelBtn = this.document.getElementById('cancel-btn')
    let deleteBtn = this.document.getElementById('delete-btn')
    let userId = deleteBtn.getAttribute('data-user-id');

    editBtn.addEventListener('click', function(){
        form.classList.toggle('show');
    })

    cancelBtn.addEventListener('click', function(){
        form.classList.toggle('show')
    })

    deleteBtn.addEventListener('click', async function() {
        if (window.confirm('¿Está seguro de que desea eliminar el usuario? Los datos no podrán recuperarse.')) {
            try {
                let response = await fetch(`/users/delete`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ userId: userId })
                });
                let data = await response.json();
                if (data.success) {
                    alert('Usuario eliminado exitosamente.');
                    window.location.href = '/'; // Redirigir a la página principal u otra página
                } else {
                    alert('Error al eliminar el usuario.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error al eliminar el usuario.');
            }
        }
    });


})