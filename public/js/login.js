    const formLogin = document.getElementById("formLogin");

    formLogin.addEventListener("submit", async (event) => {
    try {
        event.preventDefault();

        let formData = new FormData(formLogin);

        // Convertir FormData a una cadena de consulta para el cuerpo del fetch
        let urlEncodedData = new URLSearchParams(formData);

        let response = await fetch("/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: urlEncodedData,
        });

        let data = await response.json();

        alert(data.message);

        if (response.status == 200) {
        localStorage.setItem("usuario", JSON.stringify(data.usuario));
        location.href = "/";
        }
    } catch (error) {
        localStorage.clear();
        alert("Error al intentar iniciar sesión.");
    }
    });
