document.addEventListener("DOMContentLoaded", function () {
    console.log("linkeado correctamente registerValidations");

    let registerForm = document.querySelector("#registerForm");
    registerForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const formData = new FormData(registerForm);
        const data ={
            name: formData.get("name"),
            lastName: formData.get("lastName"),
            email: formData.get("email"),
            password: formData.get("password"),
            repPassword: formData.get("repPassword")
        }

        fetch('/register', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(data =>{
            if(data.error){
                alert(data.error)
            } else {
                window.location.href='/login'
            }
            
        })
        .catch(error => console.log(error))

    })

});