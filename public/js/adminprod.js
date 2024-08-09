const formProduct = document.getElementById("formProducto");

formProduct.addEventListener("submit", async (event) => {
    event.preventDefault();

    let formData = new FormData(formProduct);

    try {
        let urlEncodedData = new URLSearchParams(formData);
        console.log(formData)
        let response = await fetch("/adminproductos", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: urlEncodedData,
        });

        let data = await response.json();

        if (response.status === 201) {
            alert("Registro exitoso");
            location.href = "/adminproductos";
        } else {
            alert(data.message || "Error al registrar producto");
            console.log(data.error);
        }
    } catch (error) {
        //console.error("Error de conexión:", error);
        alert("Error de conexión. Por favor, inténtalo nuevamente.");
    }
});