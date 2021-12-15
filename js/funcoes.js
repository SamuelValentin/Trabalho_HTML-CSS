


async function validarProduto(cat, idNomeProduto, idCodProduto, idDescricao, idPreco, idPeso, txtImagem, idQtidadeProduto) {
    let cselect = document.getElementById(cat);

    let categ = cselect.options[cselect.selectedIndex].value;
    console.log("--categoria--> " + categ)

    
    let nome = document.getElementById(idNomeProduto).value;
    let codigo = document.getElementById(idCodProduto).value;
	let descricao = document.getElementById(idDescricao).value;
	let preco = document.getElementById(idPreco).value;
	let peso = document.getElementById(idPeso).value;
    let img = document.getElementById(txtImagem).value;
    let qtidade = document.getElementById(idQtidadeProduto).value;

    
	if (categ == "")
     alert("Categoria não pode estar em branco. Favor preenchê-lo!");
     else if (nome == "")
     alert("Nome do produto não pode estar em branco. Favor preenchê-lo!");
     else if (codigo == "")
     alert("Código do produto não pode estar em branco. Favor preenchê-lo!");
     else if (descricao == "")
     alert("Descrição do produto não pode estar em branco. Favor preenchê-lo!");
     else if (preco == "")
     alert("Preço do produto não pode estar em branco. Favor preenchê-lo!");
     else if (peso == "")
          alert("Peso do produto não pode estar em branco. Favor preenchê-lo!");
     else{
          console.log(categ)
          var xhr = new XMLHttpRequest();

          let url = 'http://loja.buiar.com/?key=cZbWpEr0MD&f=json&c=produto&t=inserir&nome='+nome+'&codigo='+codigo+'&categoria='+categ+'&descricao='+descricao+'&peso='+ peso +'&preco='+preco+'&imagem='+img;

          console.log(url)

          xhr.open("POST", url, true);
          xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
          xhr.send();

          alert("Salvou")
     }
}

function validarCategoria(intIdCategoria, txtNomeCategoria){
   
    let nome = document.getElementById(txtNomeCategoria).value;

    if (nome == "")
		alert("categoria não pode estar em branco. Favor preenchê-lo!");   
    else
        cadastrarCategoria(nome);  
        alert("Categoria salva com sucesso")       

}

function cadastrarCategoria(nomeCategoria){
    console.log(nomeCategoria)
    var xhr = new XMLHttpRequest();

    let url = 'http://loja.buiar.com/?key=cZbWpEr0MD&f=json&c=categoria&t=inserir&&nome=' + nomeCategoria;
    console.log(url)    

    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
    xhr.send();
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
/* Carrinho */

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
                document.write("<li>Id do produto: "+produto.idCat+"</li>");
                document.write("<li>Nome do produto: "+produto.nome+"</li>");
                document.write("<li>Código do produto: "+produto.codigo+"</li>");
                document.write("<li>Descrição do produto: "+produto.descricao+"</li>");
                document.write("<li>Preco do produto: "+produto.preco+"</li>");
                document.write("<li>Peso do produto: "+produto.peso+"</li>");
                document.write("<li>Quantidade no estoque: "+produto.quantidade+"</li>");
                document.write("</ul>");
            });
            let btn = document.createElement("button");
               btn.innerHTML = "Limpa Carrinho";
               btn.type = "button";
               btn.name = "btn_carrinho";
               btn.classList.add("btn_carrinho");
               /*Funcao de add no carrinho
               btn.onclick = carrinho(id, nome); */ 
               btn.onclick = function() {
                    limpaCarrinho();
               }/*carrinho(id, nome);  Eles esta pegando o ultimo id listado, precisa pegar o id certo de cada botao e seu respectivo produto */
               document.body.appendChild(btn);
               div.appendChild(btn);
    
            }
    } 
    else alert("A versão do seu navegador é muito antiga. Por isso, não será possível visualizar o estoque!");    
}

function limpaCarrinho(){
    alert("Limpo");
    localStorage.clear("produtos");
}