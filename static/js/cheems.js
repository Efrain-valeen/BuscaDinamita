document.addEventListener("DOMContentLoaded", () => {

    document.getElementById("btn-set").addEventListener("click", saveWinner);

    
    let randomNumber = Math.floor(Math.random() * 14) + 1;
    
    console.log("Número aleatorio generado:", randomNumber);
    
    const imagenes = document.querySelectorAll(".cheems-card img");

   
    const clickedCards = new Set();

    imagenes.forEach((img, index) => {
        const id = index + 1;
        img.dataset.id = index + 1;

        img.addEventListener("click", () => {
            if (!clickedCards.has(id)) {
                clickedCards.add(id);
            }

            if (id === randomNumber) {
                imagenes.forEach((img, index) => {
                    img.src = window.IMG_OK;
                });

                img.src = window.IMG_BAD;
                alert("¡Perdiste! Has pulsado la imagen incorrecta.");
            } else {
                img.src = window.IMG_OK;

                if (clickedCards.size === 14) {
                    const modal = new bootstrap.Modal(document.getElementById('modal-winner'));
                    modal.show();
                }
            }
        });
    });

    function saveWinner() {
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phrase = document.getElementById("phrase").value.trim();

        if (!name || !email) {
            alert("Por favor, completa los campos obligatorios.");
            return;
        }

        fetch("/winner", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    phrase: phrase
                })
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else Promise.reject();
            })
            .then(result => {
                if (result.success) {
                    alert("¡Datos guardados correctamente! Gracias por participar.");
                } else {
                    alert("Hubo un error al guardar tus datos. Por favor, intenta mas tarde.");
                }
            });
    }

    function resetGame() {
        // Reestablece las imagenes 
        imagenes.forEach(img => {
            // Asegúrate de que esta ruta sea correcta en tu proyecto
            img.src = "/static/images/cheems_question.png"; 
            img.style.pointerEvents = "auto";
        });

        
        clickedCards.clear();

        // Crear un nuevo numero random para el juego
        randomNumber = Math.floor(Math.random() * 14) + 1;

        //TODO: Eliminar antes de publicar
        console.log("Nuevo número random: " + randomNumber); 
    }

    document.getElementById("restartBtn").addEventListener("click", () => {
        resetGame();
    });

});