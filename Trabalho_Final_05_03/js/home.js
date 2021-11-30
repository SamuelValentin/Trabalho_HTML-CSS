
function initState() {//InitState do site, quando ele é carregado, eu chamo essa função
     console.log("entrou codeAddress")//Print pra saber se entrou
     puxaProdutos();//Chamando a função
     console.log('END')//Print pra saber se foi até o final
}

function puxaProdutos(){//Fazendo a requisição no db do professor e pegando nossos produtos cadastrados
     let url = "http://loja.buiar.com/?key=cZbWpEr0MD&f=json&c=produto&t=listar"

     var xmlHttp = new XMLHttpRequest();
     xmlHttp.onreadystatechange = function() { 
          if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
          tratarResponse(xmlHttp.responseText);
     }
     xmlHttp.open("GET", url, true); // true for asynchronous 
     xmlHttp.send(null);
}

function tratarResponse(retorno){//Recebendo a lista vindo do get e enviando para a função que irá mostra-los na tela
     console.log(retorno)

     let myMap = JSON.parse(retorno);
     //console.log(myMap['dados']['length'])
     listandoProdutos(retorno)
     //listandoProdutos(myMap)
}

function listandoProdutos(retorno) {//Construindo o body aqui pelo javascript
     var body = document.getElementsByTagName('body')[0];
     var tbl = document.createElement('table');
     tbl.style.width = '30%';
     tbl.style.height = '5%';
     tbl.setAttribute('border', '1');
 
     var produtos = JSON.parse(retorno);
 
     var tbdy = document.createElement('tbody');
     
     let span = document.createElement('span');
     for (var i = 0; i < produtos['dados']['length']; i++) {
          console.log(i)
          var id = produtos["dados"][i]["id"];
          var codigo = produtos["dados"][i]["codigo"];
          var categoria = produtos["dados"][i]["categoria"];
          var nome = produtos["dados"][i]["nome"];
          var descricao = produtos["dados"][i]["descricao"];
          var preco = produtos["dados"][i]["preco"];
          var imagem = produtos["dados"][i]["imagem"];
          var peso = produtos["dados"][i]["peso"];
          
          
          let div = document.createElement('div');
          div.classList.add('card');


          let divImg = document.createElement('div');
          divImg.classList.add('containerImg');
          div.appendChild(divImg);

          var imgCard = document.createElement('img');
          imgCard.id = "::img";
          //imgCard.style.cssText = 'width:100%;';
          imgCard.src = imagem;
          imgCard.classList.add('img');
          divImg.appendChild(imgCard);


          let divChild = document.createElement('div');
          divChild.classList.add('container');
          div.appendChild(divChild);

          var h = document.createElement("H1");
          var t = document.createTextNode(nome);
          h.appendChild(t);
          div.appendChild(h);

          var p = document.createElement("p");
          var t = document.createTextNode(descricao);
          p.appendChild(t);
          div.appendChild(p);

          let btn = document.createElement("button");
          btn.innerHTML = "Adicionar ao carrinho";
          btn.type = "button";
          btn.name = "btn_carrinho";
          btn.classList.add("btn_carrinho");
          /*Funcao de add no carrinho
          btn.onclick = carrinho(id, nome); */ 
          btn.onclick = function() {
               alert("Button is clicked");
               carrinho(id, nome); /* Eles esta pegando o ultimo id listado, precisa pegar o id certo de cada botao e seu respectivo produto */
          }
          
          document.body.appendChild(btn);
          div.appendChild(btn);
          
          
          //console.log(i % 3 == 0)
          if(i % 3 == 0 && i != 0){
               console.log('appendSpan')
               document.body.appendChild(span)
               span.appendChild(div);
          } else {
               console.log('appendDiv')
               span.appendChild(div);
          }

          //document.body.appendChild(div)
     }
     body.appendChild(span)
     //tbl.appendChild(tbdy);
     //body.appendChild(tbl)
 }
 
/** Coloca cada produto no carrinho */
 function carrinho(id, nome){

     alert("Button is clicked");

     let novoProduto = {id: id, nome: nome};
 
      /* Cadastrando na versão antiga */
      if (typeof(Storage) !== "undefined") {
         let produtos = localStorage.getItem("produtos");
         if (produtos == null) produtos = []; // Nenhum produto ainda foi cadastrado
         else produtos = JSON.parse(produtos);
         produtos.push(novoProduto); // Adiciona um novo produto
         localStorage.setItem("produtos",JSON.stringify(produtos))
         /*alert("Foram cadastradas com sucesso "+qtidade+" unidades do produto "+ produto+"!");*/
         atualizarCarrinho("totalEstoque");
         location.reload();
     } 
     else alert("A versão do seu navegador é muito antiga. Por isso, não será possível executar essa aplicação");
 
 }

 function atualizarCarrinho(idCampo) {
     localStorage.setItem("totalEstoque",++document.getElementById(idCampo).innerHTML)
 }