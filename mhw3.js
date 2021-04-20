
//Immagine per l'header: API senza autenticazione: picsum.photos
const header = document.querySelector('header');

fetch("https://picsum.photos/2000/400").then(onResponse, onError);// /2000 indica la larghezza immagine, 400 l'altezza, rappresentano un buon compromesso


function onResponse(response){
    /*console.log(response);*/
    header.style.backgroundImage = "url("+response.url+")";
}

function onError(error){
    console.log(error);
    header.style.backgroundImage = "url(img.jpg)";
	header.style.backgroundSize = "cover";
}

//Immagini per le section: picsum.photos
const sections = document.querySelectorAll('section');
async function updateSection(index) {
    // Fetch a random pic from the picsum.photos
    const response = await fetch("https://picsum.photos/800/400");
    const data = await response.url;
    if (response.ok) {
      // Update DOM elements
      sections[index].style.backgroundImage = "url("+data+")";
	  sections[index].style.backgroundSize = "cover";
    } else {
     console.log(error);
    sections[index].style.backgroundImage = "url(img.jpg)";
	sections[index].style.backgroundSize = "cover";
    }
  }
 for(let i = 0; i< sections.length; i++){
	updateSection(i); 
 }

//API senza autenticazione : Citazioni per gli articles: Personality -> Quotable Quotes
 const quotes = document.querySelectorAll("blockquote p");
 const cites = document.querySelectorAll("blockquote h3");

async function updateQuote(index) {
    // Fetch a random quote from the Quotable API
    const response = await fetch("https://api.quotable.io/random");
    const data = await response.json();
    if (response.ok) {
      // Update DOM elements
      quotes[index].textContent = data.content;
	  cites[index].textContent = data.author;
    } else {
      quotes[index].textContent = "An error occured";
      console.log(data);
    }
  }
 for(let i = 0; i < quotes.length; i++){
	  updateQuote(i);
 }
 
 //Servizio con API KEY: il logo del profilo tra l'header e la nav Geocoding-> Abstract IP Geolocation

const profilo = document.querySelector('#profilo');
const nome = document.querySelector('#profilo h2');
const logo = document.createElement('img');
logo.src = "https://avatars.abstractapi.com/v1/?api_key=c8db9a6e34a54d77a8cf4e07eb7fb910&name=Catania%20Francesco&char_limit=2&background_color=800000&is_rounded=true";//response.url;
profilo.insertBefore(logo, nome);
/*console.log(logo);*/

//Tracciamento richiesta di accesso alla pagina tramite apikey di abstractapi: Geocoding-> Abstract IP Geolocation

fetch("https://ipgeolocation.abstractapi.com/v1/?api_key=78d4bbc71c5f41a59f345c81684f8203").then(ackIp).then(onJson);
function ackIp(response){
	return response.json();
}
function onJson(json){
	/*console.log(json);*/
	const ip = json.ip_address;
	const country= json.country;
	const region = json.region;
	const city = json.city;
	const access = json.timezone.current_time;
	console.log("Utente connesso! IP: "+ip+", Paese: "+country+", Regione: "+region+", Città: "+city+", Accesso: "+access);
	if(city == 'Catania' || city == 'Milano'){
		const saluti = document.querySelector('#saluti');
		const titolo = document.querySelector('#saluti h2');
		const augurio = document.createElement('p');
		augurio.innerText = "Vieni a trovarci nella sede di "+city+", ti aspettiamo!";
		saluti.insertBefore(augurio, titolo);
	}
}