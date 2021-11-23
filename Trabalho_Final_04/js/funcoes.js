
function validarProduto(idNomeProduto, idCodProduto, idQtidadeProduto) {
    let nome = document.getElementById(idNomeProduto).value;
    let codigo = document.getElementById(idCodProduto).value;
    let qtidade = document.getElementById(idQtidadeProduto).value;

    console.log(nome)

    if (nome == "")
        alert("Nome do produto não pode estar em branco. Favor preenchê-lo!");
    else if (codigo == "")
        alert("Código do produto não pode estar em branco. Favor preenchê-lo!");
    else cadastrarProduto(nome, codigo, parseInt(qtidade));
}

function cadastrarProduto(produto, codig, qtidade) {
     console.log(produto)
     var xhr = new XMLHttpRequest();

     let url = 'http://loja.buiar.com/?key=cZbWpEr0MD&f=json&c=produto&t=inserir&&nome='+produto+'&codigo='+codig+'&categoria=547'+'&descricao=ehroupa'+'&peso=10'+'&preco=10';

     console.log(url)

     xhr.open("POST", url, true);
     xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
     xhr.send();     
     
     //xhr.open("POST", 'http://loja.buiar.com/?key=cZbWpEr0MD&f=json&c=produto&t=inserir&codigo='+codig+'&nome='+produto+'&categoria=547'+'&descricao=ehroupa'+'&peso=10'+'&preco=10', true);
     //xhr.setRequestHeader('Content-Type', 'application/json');
     //xhr.send(JSON.stringify({
     //}));
 }

/*function cadastrarProduto(produto, codig, qtidade) {
    let novoProduto = {nome:produto, codigo:codig, quantidade:qtidade};

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
}*/

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