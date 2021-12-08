
var listaProdutos;
var itemCount = 0;

var modal, btn, span;

function initState() {//InitState do site, quando ele é carregado, eu chamo essa função
     //console.log("entrou codeAddress")//Print pra saber se entrou
     //puxaProdutos().then(criarCarrinhoModal());//Chamando a função
     puxaProdutos();//Chamando a função
     console.log('LENGTH')
     console.log(localStorage.length)//Print pra saber se foi até o final


     //modal = document.getElementById("myModal");// Get the modal
     //btn = document.getElementById("myBtn");// Get the button that opens the modal
     //span = document.getElementsByClassName("close")[0];// Get the <span> element that closes the modal
}

async function puxaProdutos(){//Fazendo a requisição no db do professor e pegando nossos produtos cadastrados
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

          var p = document.createElement("p");
          var t = document.createTextNode("R$"+preco);
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
               cadastrarProduto(nome,id,1,imagem, preco);
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
               cadastrarProduto(nome,id,1,imagem, preco);
               console.log("Passou")
               break;
          }
     }
     //localStorage.clear();
}

//------------------------------------------------------------------------Funções do Carrinho

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

function cadastrarProduto(produto, codig, qtidade, img, preco) {
     let novoProduto = {nome:produto, codigo:codig, quantidade:qtidade, imagem:img, preco:preco};
 
     //Procuro o produto no localstorage ... se já tiver, eu pego o codigo dele e adiciono o 'input+1'

     if (typeof(Storage) !== "undefined") {
         let produtos = localStorage.getItem("produtos");
         if (produtos == null) produtos = []; // Nenhum produto ainda foi cadastrado
         else produtos = JSON.parse(produtos);
         produtos.push(novoProduto); // Adiciona um novo produto
         localStorage.setItem("produtos",JSON.stringify(produtos))
         atualizarTotalEstoque("totalEstoque");//
         location.reload();
         document.location.reload(true);

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

function abrirJanelaCarrinho() {
     let produtos = localStorage.getItem("produtos");

     if(produtos != null){
          window.open('verEstoque.html','_self')
     } else {
          alert("Seu carrinho está vazio!");
     }
}

async function criarCarrinhoModal() {
     if (typeof(Storage) !== "undefined") {
          let produtosCarrinho = localStorage.getItem("produtos");
          if (produtosCarrinho == null){
               //Alerta -> Seu carrinho está vazio!
               console.log('VAZIO')
          } else {
               var body = document.getElementsByTagName('body')[0];
               body.classList.add('body_bg');
               //---------------------------------------------------------------------[Div_Modal]
               let divModal = document.createElement('div');
               divModal.classList.add('modal');
               divModal.setAttribute('id','myModal');

               //---------------------------------------------------------------------[Div_Header]
               let divHeader = document.createElement('div');
               divHeader.classList.add('modal-header', 'border');

               let divHeaderImg = document.createElement('div');
               divHeaderImg.classList.add('header_img');
               var imgCard = document.createElement('img');
               imgCard.src = "img/Discosborda.png";
               imgCard.classList.add('imgSize');
               divHeaderImg.appendChild(imgCard);
               

               var headerProduto = document.createElement("H2");
               headerProduto.classList.add('hPadding1');
               var textProduto = document.createTextNode("Produto");
               headerProduto.appendChild(textProduto);

               var headerQuantidade = document.createElement("H2");
               headerQuantidade.classList.add('hPadding1');
               var textQuantidade = document.createTextNode("Quantidade");
               headerQuantidade.appendChild(textQuantidade);

               var headerPreco = document.createElement("H2");
               headerPreco.classList.add('hPadding1');
               var textPreco = document.createTextNode("Preço");
               headerPreco.appendChild(textPreco);

               divHeader.appendChild(divHeaderImg);
               divHeader.appendChild(headerProduto);
               divHeader.appendChild(headerQuantidade);
               divHeader.appendChild(headerPreco);

               divModal.appendChild(divHeader);
               
               //---------------------------------------------------------------------[Card_Content]
               let divCard = document.createElement('div');
               divCard.classList.add('modal-content','border');
               //div.setAttribute('id', ''+produtosCarrinho.codigo);
               //div.setAttribute('ondblclick', 'removerCarrinho(this.id)');

               produtosCarrinho = JSON.parse(produtosCarrinho);
               console.log(produtosCarrinho)

               var precoTotal = 0;
               produtosCarrinho.forEach(produtosCarrinho => {
                    //---------------------------------------------------------------------[Card_Produto]
                    let divContent = document.createElement('div');
                    divContent.classList.add('card', 'cardBg');

                    let divImg = document.createElement('div');
                    divImg.classList.add('divImage');
                    var imgCard = document.createElement('img');
                    imgCard.src = produtosCarrinho.imagem;
                    imgCard.classList.add('hPaddingLeft', 'imgSize');
                    divImg.appendChild(imgCard);

                    
                    let divNomeProduto = document.createElement('div');
                    divNomeProduto.classList.add('divNomeProduto');

                    var pProduto = document.createElement("p");
                    pProduto.classList.add('produtoPadding_nome', 'pText');
                    var textProduto = document.createTextNode(produtosCarrinho.nome);
                    pProduto.appendChild(textProduto);
                    divNomeProduto.appendChild(pProduto);

                    //---------------------------------------------------------------------[Card_Div_Quantidade]
                    let divButtons = document.createElement('div');
                    divButtons.classList.add('produtoPadding_qtd');

                    let btnMenos = document.createElement("button");
                    btnMenos.innerHTML = "-";
                    btnMenos.classList.add('button');
                    btnMenos.setAttribute('id',''+produtosCarrinho.codigo);
                    btnMenos.setAttribute('onclick','carrinhoQuantidade(0, this.id)');

                    var inputField = document.createElement("input");
                    inputField.type = "number";
                    inputField.className = "inputQtd";
                    inputField.setAttribute('id','input'+produtosCarrinho.codigo);
                    inputField.value = 1;

                    let btnMais = document.createElement("button");
                    btnMais.innerHTML = "+";
                    btnMais.classList.add('button');
                    btnMais.setAttribute('id',''+produtosCarrinho.codigo);
                    btnMais.setAttribute('onclick','carrinhoQuantidade(1, this.id)');

                    divButtons.appendChild(btnMenos);
                    divButtons.appendChild(inputField);
                    divButtons.appendChild(btnMais);


                    var pValor = document.createElement("p");
                    pValor.classList.add('produtoPadding_preco', 'pText');
                    pValor.setAttribute('id','valor'+produtosCarrinho.codigo);
                    var textValor = document.createTextNode('R$ '+produtosCarrinho.preco);//produtosCarrinho.nome
                    pValor.appendChild(textValor);

                    precoTotal = precoTotal + parseInt((produtosCarrinho.preco)*(inputField.value));
                    console.log(precoTotal);

                    let btnRemover = document.createElement("button");
                    btnRemover.innerHTML = "x";
                    btnRemover.classList.add('buttonRemove');
                    btnRemover.setAttribute('id', ''+produtosCarrinho.codigo);
                    btnRemover.setAttribute('onclick', 'removerCarrinho(this.id)');

                    //---------------------------------------------------------------------[Append_Child]
                    divCard.appendChild(divImg);
                    //divCard.appendChild(teste);
                    divCard.appendChild(divNomeProduto);
                    divCard.appendChild(divButtons);
                    divCard.appendChild(pValor);
                    divCard.appendChild(btnRemover);

                    divModal.appendChild(divCard)
              });
              divModal.appendChild(divCard)
              
               let divFooter = document.createElement('div');
               divFooter.classList.add('modal-footer', 'border');

               let divBotoes = document.createElement('div');
               divBotoes.classList.add("divBotoes");
               //body.appendChild(divBotoes)

               let btnVoltar = document.createElement("button");
               btnVoltar.innerHTML = "Voltar";
               btnVoltar.type = "button";
               btnVoltar.name = "btnVoltar";
               btnVoltar.setAttribute('onclick','window.open("index.html","_self")');
               btnVoltar.classList.add("btnFinalizar");


               let btnFinalizar = document.createElement("button");
               btnFinalizar.innerHTML = "Finalizar Compra";
               btnFinalizar.type = "button";
               btnFinalizar.name = "btnFinalizar";
               btnFinalizar.setAttribute('onclick','window.open("Pedido.html","_self")');
               btnFinalizar.classList.add("btnFinalizar");


               var valorTotal = document.createElement("p");
               valorTotal.classList.add('produtoPadding_preco', 'pText');
               var textValorT = document.createTextNode('Preço final:  R$ '+ precoTotal);//produtosCarrinho.nome
               valorTotal.setAttribute('id','valorTotal');
               valorTotal.appendChild(textValorT);


               divFooter.appendChild(btnVoltar)
               divFooter.appendChild(btnFinalizar)
               divFooter.appendChild(valorTotal)
               divModal.appendChild(divFooter);

               body.appendChild(divModal);
               modal = document.getElementById("myModal");
          }
      } 
      else alert("A versão do seu navegador é muito antiga. Por isso, não será possível visualizar o estoque!"); 
 }

function carrinhoQuantidade(valor, idInput){
     console.log('Entrou[1]');
     var inputRefId = 'input' + idInput;
     var inputCardQtd = document.getElementById(inputRefId);
     var qtdAtual = parseInt(inputCardQtd.value);

     var paramValor = 'valor' + idInput;
     var pProduto = document.getElementById(paramValor);
     var valorString = pProduto.textContent.substring(3,pProduto.textContent.length);
     var valorDouble = parseFloat(valorString);

     var novoSub;
     //console.log(inputCardQtd);
     //console.log(valorDouble);
     if(valor == 0){//Diminui
          if(inputCardQtd.value >= 2){
               inputCardQtd.value = qtdAtual - 1;
               
               var novoTotal = (valorDouble / qtdAtual) * (qtdAtual - 1);//(valorDouble / qtdAtual)
               novoSub = novoTotal;
               //console.log(novoTotal);
               pProduto.textContent = 'R$ ' + novoTotal.toString();
               var pTotal = document.getElementById('valorTotal');
               var valorTotalString = pTotal.textContent.substring(17,pTotal.textContent.length);
               var valorTotalDouble = parseFloat(valorTotalString);// menos valor atual ... + novoTotal
               valorTotalDouble = valorTotalDouble - valorDouble + novoSub;
               pTotal.textContent = 'Preço final:  R$ ' + valorTotalDouble.toString();

               localStorage.setItem('total', JSON.stringify(valorTotalDouble));
          }          
     } else if(valor == 1){//Aumenta
          inputCardQtd.value = qtdAtual + 1;
          
          var novoTotal = (valorDouble / qtdAtual) * (qtdAtual + 1);
          novoSub = novoTotal;
          //console.log(valorDouble);
          //console.log(qtdAtual + 1);
          pProduto.textContent = 'R$ ' + novoTotal.toString();
          var pTotal = document.getElementById('valorTotal');
          var valorTotalString = pTotal.textContent.substring(17,pTotal.textContent.length);
          var valorTotalDouble = parseFloat(valorTotalString);// menos valor atual ... + novoTotal
          valorTotalDouble = valorTotalDouble - valorDouble + novoSub;
          pTotal.textContent = 'Preço final:  R$ ' + valorTotalDouble.toString();

          localStorage.setItem('total', JSON.stringify(valorTotalDouble));
     }
     //console.log(pProduto.textContent);
     //console.log(pProduto);
     //valorTotal

     var valorrr = JSON.parse(localStorage.getItem('total'));
     
     console.log('******************************[01]*****************************');
     console.log(valorrr);
     console.log('******************************[02]*****************************');
 }



