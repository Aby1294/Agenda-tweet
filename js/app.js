//Variables
const formulario = document.querySelector('#formulario')
const listaTweets = document.querySelector('#lista-tweets')
let tweets = []

//----------------------------------------------------------------------------------------------------------------//
//----------------------------------------------------------------------------------------------------------------//

//Event Listeners (eventos del DOM)
EventListener()

function EventListener(){
    //Cuando el susuario agrega un numevo tweet
    formulario.addEventListener('submit', agregarTweet)

    //Cuando el documento esta listo  y se agrega el texto
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse(localStorage.getItem('tweets')) || []//el [] permite crear un array vacio en caso q no se halla agregado nada al localStorage, asi no se mostrara "null" yt generara un error con la funcion agregarTweet()
        console.log(tweets)

        //llamar a la funcion que crea el HTML
        crearHTML()
    })
}

//----------------------------------------------------------------------------------------------------------------//
//----------------------------------------------------------------------------------------------------------------//

//Funciones
function agregarTweet(evento){
    evento.preventDefault()

    //Texarea donde el usuario escribe. Si el usuario preciona "submit" validara (value) lo q este esriobio
    const tweet = document.querySelector('#tweet').value
    
    //validacion...
    if(tweet === ''){
        mostrarError('No puede ir vacio')

        return //evita q se sigan ejecutando la app si el Textarea esta vacio
    }

        const tweetObj = {
            id: Date.now(),//Date.now() devuelve la cantidad de milisegundos desde 1970, esto permitira que el Id o se repita
            //tweet  : tweet //tweet: tweet significa que en consola se mostrara tweet: texto, pero en JS al llamarse igual permite colocarlo una sola ves
            tweet
        }

        //Anadir al arreglo de tweets
        //El spread operator hace una copia del objeto
        tweets = [...tweets, tweetObj]//con spread operator, creo una copia de la constante tweet dentro de los corchetes para q se repita cada ves q agrego un nuevo twwet
       
        
        //Una ves agregado llamamos a la funcion q crea el HTML
        crearHTML()

        //reinicar el formulario
        formulario.reset()
}

//----------------------------------------------------------------------------------------------------------------//

//Mostrar mensaje de error
function mostrarError(error){
    const mensajeError = document.createElement('p')
    mensajeError.textContent = error//este es el error q se coloca en el parametro, de esta forma el mensaje sera mas dinamico y bastara con darle un parametro cuando se quiera usar en otros proyectos o funciones
    mensajeError.classList.add('error')//este 'error' viene de una funcion de CSS ya creada 
    
    //Insertarlo en el contenido
    const contenido = document.querySelector('#contenido')//llamo al ID contenido
    contenido.appendChild(mensajeError)//inserto el mensaje de error en el HTML

    //Elimino el mensaje de error despues de 3 seg
    setTimeout(() => {
        mensajeError.remove()
    }, 3000);
}

//----------------------------------------------------------------------------------------------------------------//

//Muestra un listado de los tweets
function crearHTML(){

    limpiarHTML()

    if(tweets.length>0){
        tweets.forEach( misTweet =>{
        
        //Agregar un boton de eliminar
        const btnEliminar = document.createElement('a')//creo un link en el HTML
        btnEliminar.classList.add('borrar-tweet')//llamo a la funcion 'borrar-tweet' que ya esta creada en el CSS
        btnEliminar.innerText = 'X' //inseto una X como link en el HTML

        //Anadir la funcion de eliminar
        btnEliminar.onclick = () =>{ //cuando hago click en btnEliminar (X)
            borrarTweet(misTweet.id) //llamo a la funcion que borra el tweet  //traigo al ID que se genera con Date.now() para poder borrarlo
        }

        //crear el HTML
        const li = document.createElement('li')

        //anadir al texto
        li.innerText = misTweet.tweet

        //Asignar el boton de eliminar
        li.appendChild(btnEliminar)

        //Insertarlo en el HTML
        listaTweets.appendChild(li)
        })
    }

    //llamo a la funcion que sicroniza con el localStorage
    sincronizarStorage()
}

//----------------------------------------------------------------------------------------------------------------//

//Agrega los tweets actuales al localStorage
function sincronizarStorage(){
    localStorage.setItem('tweets', JSON.stringify(tweets))
}

//----------------------------------------------------------------------------------------------------------------//

//Eliminar un tweet
function borrarTweet(id){ //recibe el ID de Date.now() para saber q tweet borrar
    tweets = tweets.filter( tweet => tweet.id !== id)

    crearHTML()
}

//----------------------------------------------------------------------------------------------------------------//

//Limpiar el HTML (esta funcion remueve a los Tweets q se repiten a causa del createElement)
function limpiarHTML(){
    while(listaTweets.firstChild){//Miestras que encuentra al primer hijo... 
        listaTweets.removeChild(listaTweets.firstChild)//removera de la lista a los hijos

    }
}



