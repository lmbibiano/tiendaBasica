const formRegistro = document.getElementById("formRegistro");

formRegistro.addEventListener("submit", async (event) => {
    try {
        event.preventDefault();

        let formData = new FormData(formRegistro);
        

        if (formData.get("password") !== formData.get("replyPassword")) {
            return alert("Las contraseñas no coinciden.");
        }

        let response = await fetch("/registro", {
            method: "POST",
            body: formData
        });

        let data = await response.json();
        
        alert(data.message);

        if (response.status === 201) {
            location.href = "/login";
        }

    } catch (error) {
        console.log(error);
        alert("Error al intentar registrar al usuario.");
    }
});