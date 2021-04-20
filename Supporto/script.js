
//Funzione per caricare i contenuti della pagina da contents.js (nei divisori appositi);
function loadContents(){
	
	const divisori = document.querySelectorAll('.overlay'); //Nota: devo tener conto del fatto che gli overlay sono 3 e i divisori sono 2 per cui nella nodelist gli indici sono 1 e 2

	let conta = 0; 											//mi serve un contatore per ripartire nei due divisori i contenuti

    for(let item of contenuti){
		
        const oggetto=document.createElement('div');
        oggetto.classList.add('oggetto');
		
		const stella = document.createElement('div');
		stella.classList.add('hidden');
		oggetto.appendChild(stella);
		
		const titolo = document.createElement('h2');
		titolo.innerText = item.titolo;
		oggetto.appendChild(titolo);
		
		const immagine = document.createElement('img');
		immagine.src = item.immagine;
		oggetto.appendChild(immagine);
		
        const codice=document.createElement('h3')
        codice.innerText = item.codice;
        oggetto.appendChild(codice);
		
        const didascalia = document.createElement('article');
		didascalia.classList.add('hidden');
		oggetto.appendChild(didascalia);
		
		const nome = document.createElement('span');
		nome.innerText = item.nome;
		didascalia.appendChild(nome);
		
		const genere = document.createElement('span');
		genere.innerText = item.genere;
		didascalia.appendChild(genere);
		

		const tipo = document.createElement('span');
		tipo.innerText = item.titolo;
		didascalia.appendChild(tipo);

		
		if(conta < 4){										//I prodotti hanno più proprietà rispetto ai reparti, la conta mi serve a capire anche dove mettere le proprietà in più
			const taglia = document.createElement('span');
			taglia.innerText = item.taglia;
			didascalia.appendChild(taglia);
			
			const prezzo = document.createElement('span');
			prezzo.innerText = item.prezzo;
			didascalia.appendChild(prezzo);
		}
		if(conta >= 4){
			const indirizzo = document.createElement('span');
			indirizzo.innerText = item.indirizzo;
			didascalia.appendChild(indirizzo);
		}
		
		const bottoneDettagli = document.createElement('button');
		bottoneDettagli.innerText = ' (Meno dettagli)';
		didascalia.appendChild(bottoneDettagli);
		
		const bottonePreferiti = document.createElement('button');
		bottonePreferiti.innerText = 'Aggiungi ai preferiti';
		bottonePreferiti.classList.add('bottone');
		oggetto.appendChild(bottonePreferiti);
		
		if(conta < 4){										//Dopo che tutti gli elementi sono in posizione li ripartisco sugli overlay dei rispettivi divisori
			divisori[1].appendChild(oggetto);
		}else {divisori[2].appendChild(oggetto);}
		
		conta++;  
    }
}

//Funzione per rendere visibile la descrizione dell'immagine al click
function dettagli(event){
	const articles = document.querySelectorAll('.oggetto article');
	const image = event.currentTarget;
	 
	for(let i = 0; i<N; i++){
		if(image == images[i]){ 											//trovo l'indice dell'immagine che mi interessa
			articles[i].classList.remove('hidden');							//articles prende tutti gli articoli ma devo concentrarmi su quelli all'interno del divisore
			break;
		} 
	}
}

//Funzione per aggiungere l'oggetto nella sezione Preferiti

function aggiungi(event){
	const tasto = event.currentTarget;
	const titoli = document.querySelectorAll('.oggetto h2');
	tasto.removeEventListener('click', aggiungi);
	
	const titoloPreferiti = document.querySelector('#preferiti h1');
	titoloPreferiti.classList.remove('hidden');							//Rendo visibile il titolo della sezione preferiti
	
	const wrappers = document.querySelectorAll('.wrapper');
	/*const preferiti = document.querySelector('#preferiti');*//*Nel caso volessi usare la flex-wrapper: wrap, non lo faccio per motivi di tempo in quanto il titolo si storpia troppo*/	
	for(let i = 0; i<N; i++){
		
		if(tasto == tasti[i]){ 
				
			preferenze[i].classList.remove('hidden');
			const oggetto = document.createElement('div'); 
				
			oggetto.classList.add('elemento');
			 if(i < 4){													//distribuisco i preferiti aggiunti sui wrapper appositi
				wrappers[0].appendChild(oggetto);
			}else {wrappers[1].appendChild(oggetto);}
			/*preferiti.appendChild(oggetto);*//*Devo usare la flex: wrap*/
			
			const titolo = document.createElement('h2');
			titolo.innerText = titoli[i].innerText;
			oggetto.appendChild(titolo);
			
			const immagine=document.createElement('img');
			immagine.src = images[i].src;
			oggetto.appendChild(immagine);
				
			const codice=document.createElement('h3');
			codice.textContent = codiciDiv[i].textContent;
			oggetto.appendChild(codice);
		
			const didascalia = document.createElement('article');
			
			didascalia.textContent = articles[i].textContent;
			oggetto.appendChild(didascalia);
	
			const rimuovi = document.createElement('button');
			rimuovi.textContent = 'Rimuovi dai preferiti';
			rimuovi.addEventListener('click', rimozione);
			oggetto.appendChild(rimuovi);
			break;
			} 
		}
}
//Funzione per rimuovere i preferiti da apposito pulsante
function riduciDescrizione(event){
	const tasto = event.currentTarget;
													//la lista dei tasti che ci interessa è 'riduci', mi serve l'indice del tasto per poter mettere hidden alla classe
	for(let i = 0; i<N; i++){						//ricordo che N è il numero di immagini preso dalla nodelist images;
		if(tasto == riduci[i]){
			articles[i].classList.add('hidden');	//ricordo che articles è la nodelist degli articoli presenti nei divisori;
		}
	}
}
function rimozione(event){
	
	const tasto = event.currentTarget;
	const tasti = document.querySelectorAll('.elemento button');
	const elementi = document.querySelectorAll('.elemento');
	const titoloPreferiti = document.querySelector('#preferiti h1');
	
	const pulsante = document.querySelectorAll('.bottone');
	
	const codPref = document.querySelectorAll('.elemento h3');
	
	let cod = 0;
	
	for(let i =0; i<N; i++){
		if(tasto == tasti[i]){							//trovo l'indice appartenente al tasto (so che corrisponde a quello dell'elemento)
			console.log('codPref[i] ',codPref[i]);		//verifica
			elementi[i].remove();						//rimuovo dalla sezione preferiti
			cod = codPref[i].textContent;				//leggo il codice che mi serve per oscurare la stellina nel divisore
			preferenze[cod-1].classList.add('hidden');	//quando cerco l'elemento mi ricordo che il codice assegnato è l'indice array + 1
			pulsante[cod-1].addEventListener('click', aggiungi);
			
			break;
		}
	}
	//Ad ogni rimozione eseguo una conta degli elementi presenti nella sezione preferiti
	//se la conta è uguale a 0 la sezione è vuota e posso oscurare il titolo
	const verificaElementi = document.querySelectorAll('.elemento');
	let contaElementi = 0;
	for(let item of verificaElementi){
		contaElementi++;
	}
	if(contaElementi == 0){
		titoloPreferiti.classList.add('hidden');
	}
}

//FUNZIONE BARRA DI RICERCA
function filtra(event){
	
	const searchString=event.currentTarget.value.toLowerCase();
	const trovati = document.querySelectorAll('.cercato');
	const corpo = document.querySelector('body');
	const primaSezione = document.querySelector('section');
	
	//La sezione filtrati di mio interesse viene creata in maniera dinamica ogni volta che si interagisce con la barra di ricerca
	const sezFiltrati = document.createElement('div');
	sezFiltrati.classList.add('filtrati');
	corpo.insertBefore(sezFiltrati, primaSezione);
		
		for(let obj of oggetti){
			
			//Ricerca degli elementi: appena si trova un abbinamento con un oggetto del divisore viene creato un div di classe 'cercato' che viene posizionato nella sezione filtrati tramite appendChild
			
			if(obj.childNodes[4].innerText.toLowerCase().includes(searchString)){

				
				const oggetto1 = document.createElement('div'); 
				oggetto1.classList.add('cercato');
				sezFiltrati.appendChild(oggetto1);
				
				const titolo = document.createElement('h2'); 
				titolo.innerText = obj.childNodes[1].innerText;
				oggetto1.appendChild(titolo);
				
				const immagine1 = document.createElement('img');
				immagine1.src = obj.childNodes[2].src;
				oggetto1.appendChild(immagine1);
				
				const codice1 = document.createElement('h3');
				codice1.textContent = obj.childNodes[3].textContent;
				oggetto1.appendChild(codice1);
		
				const didascalia1 = document.createElement('article');
				
				didascalia1.textContent = obj.childNodes[4].textContent;
				oggetto1.appendChild(didascalia1);
				
				//In pratica ad ogni lettera aggiunta nella barra di ricerca si crea un nuovo div classe filtrati,
				//l'idea è quello di rimuovere simultaneamente il primo div alla battitura della seconda lettera
				//in quanto produrrebbe nuovi risultati più specifici
				const filtraggio = document.querySelectorAll('.filtrati');	//seleziono tutti i div filtrati
				console.log(filtraggio);
				let conta = 0;												//con questa variabile conto il numero di elmenti
				for(let item of filtraggio){								
					conta++;
					console.log(conta);
				}
				if(conta > 1){												//se la conta è maggiore di uno elmina il primo elemento della nodelist, in questo modo sembrerà un aggiornamento istantaneo (il for fa il break appena arriva al primo termine infatti)
					for(let item of filtraggio){
						item.remove();
						conta--;
						break;
					}
				}
			}
		}
		if(searchString == ''){
			const filtraggio = document.querySelectorAll('.filtrati');
			console.log('Stringa vuota');
			for(let item of filtraggio){
				
						item.remove();
			}
		}
}



function pulisci(event){
	const tasto = event.currentTarget;
	const filtraggio = document.querySelectorAll('.filtrati');
	for(let item of filtraggio){
		item.remove();
	}
}

const canc = document.querySelector('#barra button');
canc.addEventListener('click', pulisci);

loadContents(); 													// carico i contenuti di contents.js dinamicamente

const images = document.querySelectorAll('.divisore img'); 			//creo una nodelist di immagini

const articles = document.querySelectorAll('.divisore article');	//creo una nodelist di descrizioni
let N =0															//mi serve il numero degli elementi della lista immagini per poter fare il for nella funzione "dettagli"

for (const image of images){										//Faccio rispondere all'evento tutte le immagini
	image.addEventListener('click', dettagli);
	N++;
}

const tasti = document.querySelectorAll('.bottone'); 				//devo considerare solo dei bottoni particolari da qui l'esigenza della classe 'bottone'

const preferenze = document.querySelectorAll('.oggetto div');
for (const tasto of tasti){
	tasto.addEventListener('click', aggiungi);
	
}
const riduci = document.querySelectorAll('article button');
for (const item of riduci){
	item.addEventListener('click', riduciDescrizione);
	
}

const codiciDiv = document.querySelectorAll('.oggetto h3');


//BARRA DI RICERCA
const oggetti = document.querySelectorAll('.oggetto');
const search=document.querySelector('input');
search.addEventListener('keyup', filtra);



//Legenda dei childNodes degli oggetti nel div, quelli senza niente sono #text che non mi servono (spiega il perchè ho usato certi childNodes piuttosto che altri nella funzione filtra())
/*let k = 0;
console.log(oggetti[k].childNodes[0]);//div con background stella
console.log(oggetti[k].childNodes[1]);//Titolo dell'oggetto
console.log(oggetti[k].childNodes[2]);//immagine dell'oggetto
console.log(oggetti[k].childNodes[3]);//h3 con il codice
console.log(oggetti[k].childNodes[4]);//article con la descrizione dell'oggetto (gli elementi sono presi da contents)
console.log(oggetti[k].childNodes[5]);//bottone preferiti
*/

/*
Riepilogo:

SONO NOTE (nel senso, sono variabili globali) LE NODELIST DI: 
	IMMAGINI DEI DIVISORI -> images
	ARTICOLI DEI DIVISORI -> articles
	BOTTONI DEI DIVISORI -> tasti
	MAPPA CON LE SORGENTI IMMAGINI -> 
	CODICI DEGLI OGGETTI NEI DIVISORI
*/