
var listaProdutos;
var itemCount = 0;

function initState() {//InitState do site, quando ele é carregado, eu chamo essa função
     //console.log("entrou codeAddress")//Print pra saber se entrou
     puxaProdutos();//Chamando a função
     console.log('ITEM COUNT')
     console.log(itemCount)//Print pra saber se foi até o final
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
     //console.log(retorno)

     let myMap = JSON.parse(retorno);
     //console.log(myMap['dados']['length'])
     listandoProdutos(retorno)
     //listandoProdutos(myMap)
}

function listandoProdutos(retorno) {//Construindo o body aqui pelo javascript
     var body = document.getElementsByTagName('body')[0];
     //var tbl = document.createElement('table');
     //tbl.style.width = '30%';
     //tbl.style.height = '5%';
     //tbl.setAttribute('border', '1');
 
     var produtos = JSON.parse(retorno);
     listaProdutos = produtos;
 
     //var tbdy = document.createElement('tbody');
     
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
          
          //Colocar o id da div o mesmo id do produto, assim fica facil de puxar


          let div = document.createElement('div');
          div.classList.add('card');
          div.setAttribute('draggable', 'true');
          div.setAttribute('ondragstart', 'drag(event)');
          div.setAttribute('id', ''+id);
          div.setAttribute('ondblclick', 'btnAdicionarProduto(this.id)');


          let divImg = document.createElement('div');
          divImg.classList.add('containerImg');
          div.appendChild(divImg);

          var imgCard = document.createElement('img');
          imgCard.id = ''+id;//"::img"
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
          
          btn.setAttribute('id', ''+id);
          btn.setAttribute('onClick', 'btnAdicionarProduto(this.id)');
          div.appendChild(btn);
          
          if(i % 3 == 0 && i != 0){
               //document.body.appendChild(span)
               body.appendChild(span)
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
//------------------------------------------------------------------------Função Botão adicionar

function btnAdicionarProduto(idProduto){
     console.log("Entrou function")

     itemCount = itemCount + 1;

     $targetElement = document.getElementById('target-grid');
     $selectedElement = document.getElementById(idProduto).cloneNode(true);
     $selectedElement.setAttribute('id', "cart"+itemCount);

     //$targetElement.appendChild($selectedElement);
     document.getElementById('itemcount').innerHTML = (itemCount+" Items");
     $selectedElement.innerHTML += "<i class='icon-remove' data-item="+idProduto+"></i>"; 

     for (var i = 0; i < listaProdutos['dados']['length']; i++) {
          var id = listaProdutos["dados"][i]["id"];
          var codigo = listaProdutos["dados"][i]["codigo"];
          var categoria = listaProdutos["dados"][i]["categoria"];
          var nome = listaProdutos["dados"][i]["nome"];
          var descricao = listaProdutos["dados"][i]["descricao"];
          var preco = listaProdutos["dados"][i]["preco"];
          var imagem = listaProdutos["dados"][i]["imagem"];
          var peso = listaProdutos["dados"][i]["peso"];

          if(id == idProduto){
               cadastrarProduto(nome,id,1);
               console.log("btnAdicionou!")
               break;
          }
     }
}


//------------------------------------------------------------------------Funções Drag and Drop

function allowDrop(event) {
     event.preventDefault();
}

function drag(event) {   
     event.dataTransfer.setData("Item",event.target.id);
     
}

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

//------------------------------------------------------------------------Funções do Carrinho

function listarProdutosCarrinho() {
     
     if (typeof(Storage) !== "undefined") {
          let produtosCarrinho = localStorage.getItem("produtos");
          if (produtosCarrinho == null){
              //document.write("<h3>Nenhum produto foi adicionado.</h3>");
               var body = document.getElementsByTagName('body')[0];
               let header = document.createElement('header');
               header.classList.add('headerCarrinho');

               let divTitle = document.createElement('div');
               divTitle.classList.add('divTitle');

               var title = document.createElement("H1");
               var texto = document.createTextNode("Seu carrinho está vazio!");
               title.appendChild(texto);
               divTitle.appendChild(title);

               header.appendChild(divTitle)
               body.appendChild(header)
          } else {
               var body = document.getElementsByTagName('body')[0];
               let header = document.createElement('header');
               header.classList.add('headerCarrinho');

               var titulo = document.createElement("H1");//Colocar o titulo dentro de uma div e colocar o padding top nessa div
               var titulo = document.createTextNode("Seu Carrinho :");
               header.appendChild(titulo);

               let divTitle = document.createElement('div');
               divTitle.classList.add('divTitle');

               var title = document.createElement("H1");
               var texto = document.createTextNode("Seu carrinho de compras: ");
               title.appendChild(texto);
               divTitle.appendChild(title);
               header.appendChild(divTitle)

               let span = document.createElement('div');//display: table;
               span.setAttribute('display','table');//paddingTop

               produtosCarrinho = JSON.parse(produtosCarrinho);
               produtosCarrinho.forEach(produtosCarrinho => {
                    console.log(produtosCarrinho.nome)

                    let div = document.createElement('div');
                    div.classList.add('cardCarrinho');
                    div.setAttribute('id', ''+produtosCarrinho.codigo);
                    
                    div.setAttribute('ondblclick', 'removerCarrinho(this.id)'); //Remove item

                    /*
                    let divImg = document.createElement('div');
                    divImg.classList.add('containerImg');
                    div.appendChild(divImg);

                    var imgCard = document.createElement('img');
                    imgCard.id = ''+produtosCarrinho.codigo;
                    imgCard.src = imagem;
                    imgCard.classList.add('img');
                    divImg.appendChild(imgCard);*/

                    let btn = document.createElement("button");
                    btn.innerHTML = "X";
                    btn.type = "button";
                    btn.name = "btnRemoverCarrinho";
                    btn.classList.add("btnRemoverCarrinho");
                    
                    btn.setAttribute('id', ''+produtosCarrinho.codigo);
                    btn.setAttribute('onClick', 'removerCarrinho(this.id)');
                    div.appendChild(btn);


                    var h = document.createElement("H3");
                    var t = document.createTextNode(produtosCarrinho.nome);
                    h.appendChild(t);
                    div.appendChild(h);

                    var p = document.createElement("p");
                    var t = document.createTextNode('Qtd: '+produtosCarrinho.quantidade);
                    p.appendChild(t);
                    div.appendChild(p);

                    span.appendChild(div)

                    header.appendChild(span)
              });
              body.appendChild(header)
          }
      } 
      else alert("A versão do seu navegador é muito antiga. Por isso, não será possível visualizar o estoque!"); 
 }

function removerCarrinho(idProduto){
     console.log(idProduto)

     if (typeof(Storage) !== "undefined") {
          const items = JSON.parse(localStorage.getItem('produtos'));
          const filtered = items.filter(item => item.codigo !== idProduto);
          localStorage.setItem('produtos', JSON.stringify(filtered));

          document.location.reload(true);
     } 
     else alert("A versão do seu navegador é muito antiga. Por isso, não será possível executar essa aplicação");
}

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
     localStorage.setItem("totalEstoque",++document.getElementById(idCampo).innerHTML)
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
         document.write("<h1>Estoque:</h1>")
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


//https://warcontent.com/localstorage-javascript/#:~:text=no%20localStorage%20JavaScript-,O%20que%20%C3%A9%20localStorage%3F,limpe%20o%20cache%20do%20navegador.