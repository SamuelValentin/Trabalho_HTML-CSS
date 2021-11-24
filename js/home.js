
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
     listandoProdutos(retorno)
}

function listandoProdutos(retorno) {//Construindo o body aqui pelo javascript
     var body = document.getElementsByTagName('body')[0];
     var tbl = document.createElement('table');
     tbl.style.width = '30%';
     tbl.style.height = '5%';
     tbl.setAttribute('border', '1');
 
     var data = JSON.parse(retorno);
 
     var iter = 0;
     var quantidade = 0;

     while(data["dados"][iter] != null){
          iter++;
          quantidade++;
          //console.log(data["dados"][iter])
     }
     console.log('--------------------------')
     console.log(quantidade)
 
     var tbdy = document.createElement('tbody');
     for (var i = 0; i < 5; i++) {//Adicionando os produtos na tabela(fixado em apenas 5 produtos) **Tem que deixar dinamico**
          var id = data["dados"][i]["id"];
          var codigo = data["dados"][i]["codigo"];
          var categoria = data["dados"][i]["categoria"];
          var nome = data["dados"][i]["nome"];
          var descricao = data["dados"][i]["descricao"];
          var preco = data["dados"][i]["preco"];
          var imagem = data["dados"][i]["imagem"];
          var peso = data["dados"][i]["peso"];

          var tr = document.createElement('tr');
 

          var td = document.createElement('td');
          td.appendChild(document.createTextNode(id))
          tr.appendChild(td)
     
          var td2 = document.createElement('td');
          td2.appendChild(document.createTextNode(codigo))
          tr.appendChild(td2)

          var td3 = document.createElement('td');
          td3.appendChild(document.createTextNode(categoria))
          tr.appendChild(td3)

          var td4 = document.createElement('td');
          td4.appendChild(document.createTextNode(nome))
          tr.appendChild(td4)

          var td5 = document.createElement('td');
          td5.appendChild(document.createTextNode(descricao))
          tr.appendChild(td5)

          var td6 = document.createElement('td');
          td6.appendChild(document.createTextNode(preco))
          tr.appendChild(td6)

          var td7 = document.createElement('td');
          td7.appendChild(document.createTextNode(imagem))
          tr.appendChild(td7)

          var td8 = document.createElement('td');
          td8.appendChild(document.createTextNode(peso))
          tr.appendChild(td8)
          

          tbdy.appendChild(tr);
     }
     tbl.appendChild(tbdy);
     body.appendChild(tbl)
 }