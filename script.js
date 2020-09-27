const API_KEY ='ef51a6ca4108416c9118394cf97a919c';

document.getElementById('btn-pesquisa').addEventListener('click', executaPesquisa);
document.getElementById('globo').addEventListener('click', globo);
document.getElementById('info-money').addEventListener('click', infomoney);
document.getElementById('CNN').addEventListener('click', cnn);
document.getElementById('FOX-NEWS').addEventListener('click', fox);

document.getElementById('btnsalvar').addEventListener('click', addpesquisa);
document.getElementById('xesque').addEventListener('click', teste);








window.onload = function() {

    
    principais();
    exibirpesquisa();
    teste();
    
}


function teste(){
    
    let elementos= [] ;
    elementos =document.getElementsById('pesquisas');
    console.log(elementos[i].pesquisa)

    for(let i=0; i<elementos.length; i++) {
		elementos[i].addEventListener("click", function() {
            let query = elementos[i].text;
            let xhr = new XMLHttpRequest ();
            xhr.onload = exibirNoticias;
            xhr.open ('GET', `https://newsapi.org/v2/everything?q=${query}&apiKey=${API_KEY}`);
            xhr.send ();
			});
		}

}

function exibirpesquisa(){
    let textoHTML='';
    let tela = document.getElementById('xesque');

    let pesquisasfeitas = [];
    let db_pesquisas = localStorage.getItem('db_pesquisas');
    if(db_pesquisas){
        pesquisasfeitas = JSON.parse(db_pesquisas)
    }

    for(i=0 ; i<pesquisasfeitas.length;i++){

        textoHTML+=` <button  href="#">${pesquisasfeitas[i].pesquisa}</button>`;
    }

    tela.innerHTML = textoHTML
    
}


function addpesquisa(){
    alert("ITEM SALVO COM SUCESSO")
    let valor = document.getElementById('recipient-name').value;
    let pesquisasfeitas =[];

    let db_pesquisas = localStorage.getItem('db_pesquisas');
    if(db_pesquisas){
        pesquisasfeitas = JSON.parse(db_pesquisas);
    }

    let novapesquisa ={"pesquisa":valor};
    pesquisasfeitas.push(novapesquisa);
    localStorage.setItem('db_pesquisas' , JSON.stringify(pesquisasfeitas))

    exibirpesquisa();
  };

function principais(){
    let xhr = new  XMLHttpRequest();
    xhr.onload = exibirNoticias;
    xhr.open('GET',`https://newsapi.org/v2/top-headlines?country=br&apiKey=ef51a6ca4108416c9118394cf97a919c`);
    xhr.send();
}

function executaPesquisa(){
    var query = document.getElementById('txtpesquisa').value;
    let xhr = new XMLHttpRequest ();
    xhr.onload = exibirNoticias;
    xhr.open ('GET', `https://newsapi.org/v2/everything?q=${query}&apiKey=${API_KEY}`);
    xhr.send ();
}


function globo(){
    
    
    
    
    let xhr = new  XMLHttpRequest();
    xhr.onload = exibirNoticias;
    xhr.open('GET',`http://newsapi.org/v2/top-headlines?sources=globo&apiKey=${API_KEY}`)
    xhr.send();
}

function infomoney(){
    
    
    
    
    let xhr = new  XMLHttpRequest();
    xhr.onload = exibirNoticias;
    xhr.open('GET',`http://newsapi.org/v2/top-headlines?sources=info-money&apiKey=ef51a6ca4108416c9118394cf97a919c`)
    xhr.send();
}

function cnn(){
    
    
    
    
    let xhr = new  XMLHttpRequest();
    xhr.onload = exibirNoticias;
    xhr.open('GET',`http://newsapi.org/v2/top-headlines?sources=cnn&apiKey=ef51a6ca4108416c9118394cf97a919c`)
    xhr.send();
}

function fox(){
    
    
    
    
    let xhr = new  XMLHttpRequest();
    xhr.onload = exibirNoticias;
    xhr.open('GET',`http://newsapi.org/v2/top-headlines?sources=fox-news&apiKey=ef51a6ca4108416c9118394cf97a919c`)
    xhr.send();
}





function exibirNoticias () {
    let boxNoticias = document.getElementById('box-noticias')
    let texto = '';
    boxNoticias.innerHTML = texto;

    let dados =JSON.parse (this.responseText);
    for( i=0; i<dados.articles.length;i++){
        let noticia = dados.articles[i];
        let data = new Date (noticia.publishedAt);
        
        texto = texto + `  
        <div class="row ">
        <div class="col-12">
            <div class="box-noticias" id="box-noticias">
                    <img class="imagem-noticia" src="${noticia.urlToImage}" alt="">
                    <p class="titulo-noticia"> ${noticia.title}</p>
                    <p class="texto-noticia">${noticia.description}</p>
                    <a class="leiamais"  href="${noticia.url}" target="_blank" >Leia mais..</a>
                    
                    
            </div>
        </div>        
    </div>     
    
    <div class="row">
                    <div class="col-12">
                        <p class="data"> Publicado em:${data.toLocaleDateString()}   </p>
                        <p class="fonte" >Fonte:${noticia.source.name}</p>
                    </div>
                </div>

    <div class="row linha ">
        <div class="col-10">
        
        </div>
     </div>
    
        `;
    };
    
    boxNoticias.innerHTML = texto;
}
    