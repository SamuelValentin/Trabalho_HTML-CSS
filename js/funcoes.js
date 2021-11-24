
function validarProduto(idIdCategoria, idNomeProduto, idCodProduto, idDescricao, idPreco, idPeso, idQtidadeProduto) {
    let idCat = document.getElementById(idIdCategoria).value;
    let nome = document.getElementById(idNomeProduto).value;
    let codigo = document.getElementById(idCodProduto).value;
	let descricao = document.getElementById(idDescricao).value;
	let preco = document.getElementById(idPreco).value;
	let peso = document.getElementById(idPeso).value;
    let qtidade = document.getElementById(idQtidadeProduto).value;

	if (idCat == "")
		alert("Id da categoria não pode estar em branco. Favor preenchê-lo!");
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
    else cadastrarProduto(idCat, nome, codigo, descricao, preco, peso, parseInt(qtidade));
}

function cadastrarProduto(idCat, produto, codig, descricao, preco, peso, qtidade) {
    /* Cadastrando no backend do professor */
     console.log(produto)
     var xhr = new XMLHttpRequest();

     let url = 'http://loja.buiar.com/?key=cZbWpEr0MD&f=json&c=produto&t=inserir&&nome='+produto+'&codigo='+codig+'&categoria=547'+'&descricao='+ descricao+'&peso='+ peso +'&preco='+preco;

     console.log(url)

     xhr.open("POST", url, true);
     xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
     xhr.send();

    let novoProduto = {id: idCat, nome:produto, codigo:codig, quantidade:qtidade, descricao:descricao, preco:preco, peso:peso};

    /* Cadastrando na versão antiga */
    if (typeof(Storage) !== "undefined") {
        let produtos = localStorage.getItem("produtos");
        if (produtos == null) produtos = []; // Nenhum produto ainda foi cadastrado
        else produtos = JSON.parse(produtos);
        produtos.push(novoProduto); // Adiciona um novo produto
        localStorage.setItem("produtos",JSON.stringify(produtos))
        alert("Foram cadastradas com sucesso "+qtidade+" unidades do produto "+ produto+"!");
        atualizarTotalEstoque("totalEstoque");
        location.reload();
    } 
    else alert("A versão do seu navegador é muito antiga. Por isso, não será possível executar essa aplicação");
}

/*
function removerProduto{
    let url = 'http://loja.buiar.com/?key=cZbWpEr0MD&f=json&c=produto&t=remover
}*/


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
        }
    } 
    else alert("A versão do seu navegador é muito antiga. Por isso, não será possível visualizar o estoque!");    
}