document.addEventListener("DOMContentLoaded",() =>{
     
    let attempts = 1;  // primer juego cuenta como intento 1
    document.getElementById("attempts-display").textContent = "Intentos: " + attempts;
   
    document.getElementById("btn-save").addEventListener("click", savewinner)

    let randomNumber=Math.floor(Math.random() *14)+1; 

    //TODO: Eliminar antes de publicar
    console.debug("Número Ranmdom:" + randomNumber) //Se nuestra en consola 

    const imagenes= document.querySelectorAll(".cheems-card img")


    const clickCards=new Set();

    imagenes.forEach((img , index)=> {
        const id= index + 1;
        img.dataset.id =id;

        img.addEventListener("click", ()=>{
            if(!clickCards.has(id)){
                clickCards.add(id)



            if(id==randomNumber){
                img.src= window.IMG_BAD

                    imagenes.forEach((img)=>{
                        if (img.dataset.id != randomNumber){
                            img.src=window.IMG_OK
                        }
                    })
                
            }else {
                img.src= window.IMG_OK
                if (clickCards.size ===14){ 
                    const modal = new bootstrap.Modal(document.getElementById("modal-winner"));
                    modal.show();
                    
                   
                }
            }
        }


        })


    })
    function savewinner(){
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phrase= document.getElementById("phrase").value.trim();

        if(!name || !email || !phrase){
            alert("porfavor completa todos los campos");
            return;
        }
        fetch("/winner", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                name: name,
                email: email,
                phrase: phrase,
                attempts: attempts

            })

        })
        //entonces recibe la promesa de la llamada para saber si cumplio o no
        .then(response => {
            if(response.ok){
                return response.json()
            }else{
                return Promise.reject();
            }

        })
        .then(result => {
            if(result.success){
                alert("el registro fue guardado correctamente")
            }else{
                alert("no se pudo guardar. intente mas tarde.")
            }
        })
        .catch(error => {
            console.error("error: ", error);
            alert("error en la conexion")
        })


    }
    
    function resetGame() {
        attempts += 1; // Incrementa el contador de intentos
    // actualizar texto en pantalla
    document.getElementById("attempts-display").textContent = "Intentos: " + attempts;
    // Reestablece las imagenes 
    imagenes.forEach(img => {
        img.src = "/static/images/cheems_question.png";
        img.style.pointerEvents = "auto";
    });

    // Vacia las cartas 
    clickCards.clear();

    // Crear un nuevo numero random para el juego
    randomNumber = Math.floor(Math.random() * 14) + 1;

    //TODO: Eliminar antes de publicar
    console.debug("Nuevo número random: " + randomNumber);// se muestra nuevo numero random en la consola 

}

document.getElementById("restartBtn").addEventListener("click", () => {
    resetGame();
});

});