document.addEventListener("DOMContentLoaded", function(){
    let contactForm =  document.querySelector('#contactForm');

    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();

        let formData = new FormData(contactForm);
        let data = {
            name: formData.get("name"),
            email: formData.get("email"),
            subject: formData.get("subject"),
            message: formData.get("message")
        }

        fetch('/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res=>res.json())
        .then(data => {
            if(data.error){
                alert(data.error)
            } else {
                alert(data.message)
                contactForm.reset()
            }
        })

    })


});