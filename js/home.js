
var listaProdutos;
var itemCount = 0;
var produtos;

function initState() {//InitState do site, quando ele é carregado, eu chamo essa função
     console.log("entrou codeAddress")//Print pra saber se entrou
     puxaProdutos();//Chamando a função
     categorias();
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

function tratarResponseProdCate(retorno, c){//Recebendo a lista vindo do get e enviando para a função que irá mostra-los na tela
     console.log(retorno)     

     var produtos = JSON.parse(retorno);//retorno da consulta
     var lista;
 
     for (var i = 0; i < produtos['dados']['length']; i++) {
          if(produtos['dados'][i]['categoria'] == c){
              lista[i] = produtos[i];
          }
     }
     //console.log(myMap['dados']['length'])
     listandoProdutos(lista);
     //listandoProdutos(myMap)
}

function listandoProdutos(retorno) {//Construindo o body aqui pelo javascript

     //let cselect = document.getElementById(categoria);
     //let ctg = cselect.options[cselect.selectedIndex].value;

     var body = document.getElementsByTagName('body')[0];
     var tbl = document.createElement('table');
     tbl.style.width = '30%';
     tbl.style.height = '5%';
     tbl.setAttribute('border', '1');
 
     produtos = JSON.parse(retorno);
      
     var tbdy = document.createElement('tbody');
     
     let span = document.createElement('span');
     for (var i = 0; i < produtos['dados']['length']; i++) {
          //console.log(i)
          var id = produtos["dados"][i]["id"];
          var codigo = produtos["dados"][i]["codigo"];
          var categorias = produtos["dados"][i]["categoria"];
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
               //console.log('appendSpan')
               document.body.appendChild(span)
               span.appendChild(div);
          } else {
               //console.log('appendDiv')
               span.appendChild(div);
          }

          //document.body.appendChild(div)
     }
     body.appendChild(span)
     //tbl.appendChild(tbdy);
     //body.appendChild(tbl)
 }


 function categoriasResponse(retorno){
     //console.log(retorno)

     let cat = JSON.parse(retorno);
     populaSelectCategoria(retorno);
}

 function categorias(){

     let url = 'http://loja.buiar.com/?key=cZbWpEr0MD&f=json&c=categoria&t=listar&&';
     console.log(url)    
 
     var xmlHttp = new XMLHttpRequest();
     xmlHttp.onreadystatechange = function() { 
          if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
          categoriasResponse(xmlHttp.responseText);
     }
     xmlHttp.open("GET", url, true); 
     xmlHttp.send(null);
     
 }
 
 function populaSelectCategoria(c) {
     
     var categorias = JSON.parse(c);
    // console.log(categorias);

     var ct = document.getElementById('categoria');
     //console.log(ct);

      for (var i = 0; i < categorias['dados']['length']; i++) {          
          var codigo = categorias["dados"][i]["id"];
          //console.log(codigo);
          var nome = categorias["dados"][i]["nome"];
          //console.log(nome);
          ct.innerHTML = ct.innerHTML + '<option value=' + codigo + '>' + nome + '</option>';
      }
 }

 function produtosPorCategoria(c){

     var codigo = c.options[c.selectedIndex].value;
     console.log("codig: " + codigo);
     let url = 'http://loja.buiar.com/?key=cZbWpEr0MD&f=json&c=produto&t=listar&&categoria=' + codigo;
     console.log("Essa é a URL de prod por cat" + url)   ;

     var xmlHttp = new XMLHttpRequest();
     xmlHttp.onreadystatechange = function() { 
         
          tratarResponseProdCate(xmlHttp.responseText, codigo);
     }
     xmlHttp.open("GET", url, true);  
     xmlHttp.send(null); 

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



function allowDrop(event) {
     event.preventDefault();
}

function drag(event) {   
     event.dataTransfer.setData("Item",event.target.id);
     
}

///Se eu arrastar o item pela imagem ele carrega sempre o mesmo item no carrinho pq o id das imagens sao o mesmo
//Se eu arrastar o card invez da imagem ele vai normal

function drop(event) {
     itemCount = itemCount + 1;

     event.preventDefault();
     var data = event.dataTransfer.getData("Item");
     $targetElement = document.getElementById('target-grid');

     $selectedElement = document.getElementById(data).cloneNode(true);
     $selectedElement.setAttribute('id', "cart"+itemCount);

     //$targetElement.appendChild($selectedElement);
     document.getElementById('itemcount').innerHTML = (itemCount+" Items");
     $selectedElement.innerHTML += "<i class='icon-remove' data-item="+data+"></i>"; 

     
     for (var i = 0; i < listaProdutos['dados']['length']; i++) {
          var id = listaProdutos["dados"][i]["id"];
          var codigo = listaProdutos["dados"][i]["codigo"];
          var categoria = listaProdutos["dados"][i]["categoria"];
          var nome = listaProdutos["dados"][i]["nome"];
          var descricao = listaProdutos["dados"][i]["descricao"];
          var preco = listaProdutos["dados"][i]["preco"];
          var imagem = listaProdutos["dados"][i]["imagem"];
          var peso = listaProdutos["dados"][i]["peso"];

          if(id == data){
               cadastrarProduto(nome,id,1);
               console.log("Passou")
               break;
          }
     }
     //localStorage.clear();
     
}

//------------------------------------------------------------------------Carrinho

function cadastrarProduto(produto, codig, qtidade) {
     let novoProduto = {nome:produto, codigo:codig, quantidade:qtidade};
 
     if (typeof(Storage) !== "undefined") {
         let produtos = localStorage.getItem("produtos");
         if (produtos == null) produtos = []; // Nenhum produto ainda foi cadastrado
         else produtos = JSON.parse(produtos);
         produtos.push(novoProduto); // Adiciona um novo produto
         localStorage.setItem("produtos",JSON.stringify(produtos))
         //alert("Foram cadastradas com sucesso "+qtidade+" unidades do produto "+ produto+"!");
         atualizarTotalEstoque("totalEstoque");//
         location.reload();

         console.log("Adicionado no Carrinho!")
     } 
     else alert("A versão do seu navegador é muito antiga. Por isso, não será possível executar essa aplicação");
 }
 
 function atualizarTotalEstoque(idCampo) {
     //localStorage.setItem("totalEstoque",++document.getElementById(idCampo).innerHTML)
 }

 function carregarTotalEstoque(idCampo) {
     if (typeof(Storage) !== "undefined") {
         let totalEstoque = localStorage.getItem("totalEstoque");
         if (totalEstoque == null) totalEstoque = 0;
         document.getElementById(idCampo).innerHTML = totalEstoque;
     }
     else alert("A versão do seu navegador é muito antiga. Por isso, não será possível executar essa aplicação");
 }
 
 function listarEstoque() {
     if (typeof(Storage) !== "undefined") {
         let produtos = localStorage.getItem("produtos");
         document.write("<h1>Carrinho</h1>")
         if (produtos == null)
             document.write("<h3>Ainda não há nenhum item no estoque</h3>");
         else {
             produtos = JSON.parse(produtos);
             produtos.forEach(produto => {
                 document.write("<ul>");
                 document.write("<li>Nome do produto: "+produto.nome+"</li>");
                 document.write("<li>Código do produto: "+produto.codigo+"</li>");
                 document.write("<li>Quantidade no estoque: "+produto.quantidade+"</li>");
                 document.write("</ul>");
             });
               
          }
          
         } 
     else alert("A versão do seu navegador é muito antiga. Por isso, não será possível visualizar o estoque!");    
 }



 function getProdutos(){
     let url = "http://loja.buiar.com/?key=cZbWpEr0MD&f=json&c=produto&t=listar"

     var c = document.getElementById('categoria');
     var codigo = c.options[c.selectedIndex].value;
     console.log("codig: " + codigo);
    
     var xmlHttp = new XMLHttpRequest();
     xmlHttp.onreadystatechange = function() { 
          if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
          mostraCategorias(xmlHttp.responseText, codigo);
     }
     xmlHttp.open("GET", url, true); // true for asynchronous 
     xmlHttp.send();
}

function mostraCategorias(retorno, idCategoria) {
     var body = document.getElementsByTagName('body')[0];
     
     var removeCard = document.querySelector('card');
     while (removeCard) {
          removeCard.parentNode.removeChild(removeCard);
        //  removeCard = document.getElementById('xyz');
     }

     produtos = JSON.parse(retorno);
     
     let span = document.createElement('span');
     for (var i = 0; i < produtos['dados']['length']; i++) {
          var id = produtos["dados"][i]["id"];
          var codigo = produtos["dados"][i]["codigo"];
          var categoria = produtos["dados"][i]["categoria"];
          var nome = produtos["dados"][i]["nome"];
          var descricao = produtos["dados"][i]["descricao"];
          var preco = produtos["dados"][i]["preco"];
          var imagem = produtos["dados"][i]["imagem"];
          var peso = produtos["dados"][i]["peso"];
    
          let divs = document.createElement('div');
          divs.classList.add('card');
          divs.setAttribute('draggable', 'true');
          divs.setAttribute('ondragstart', 'drag(event)');
          divs.setAttribute('id', ''+id);
          divs.setAttribute('ondblclick', 'btnAdicionarProduto(this.id)');

          let divImg = document.createElement('div');
          divImg.classList.add('containerImg');
          divs.appendChild(divImg);

          var imgCard = document.createElement('img');
          imgCard.id = ''+id;//"::img"
          imgCard.src = imagem;
          imgCard.classList.add('img');
          divImg.appendChild(imgCard);


          let divChild = document.createElement('div');
          divChild.classList.add('container');
          divs.appendChild(divChild);

          var h = document.createElement("H1");
          var t = document.createTextNode(nome);
          h.appendChild(t);
          divs.appendChild(h);

          var p = document.createElement("p");
          var t = document.createTextNode(descricao);
          p.appendChild(t);
          divs.appendChild(p);

          let btn = document.createElement("button");
          btn.innerHTML = "Adicionar ao carrinho";
          btn.type = "button";
          btn.name = "btn_carrinho";
          btn.classList.add("btn_carrinho");
          
          btn.setAttribute('id', ''+id);
          btn.setAttribute('onClick', 'btnAdicionarProduto(this.id)');
          divs.appendChild(btn);

          if(categoria != idCategoria){  
               //span.style.display = 'none';
               span.style.display = 'none';
               console.log('A categoria é diferente ' + categoria + " " + idCategoria + " " + nome);  
          }else{
               //span.style.display = 'inline-block';
               var hcat = document.createElement("H2");
               var tcat = document.createTextNode('Categoria ' + categoria);
               hcat.appendChild(tcat);
               divs.appendChild(hcat);
               span.style.display = 'inline-block';   
               console.log('A categoria é igual ' + categoria + " " + idCategoria + " " + nome);      

          } 

          
          if(i % 3 == 0 && i != 0){
               //document.body.appendChild(span)
               body.appendChild(span)
               span.appendChild(divs);
          } else {
               
               span.appendChild(divs);
          }
     }
     
     body.appendChild(span);

}
 