
function validarProduto(idIdCategoria, idNomeProduto, idCodProduto, idDescricao, idPreco, idPeso, txtImagem, idQtidadeProduto) {
     let idCat = document.getElementById(idIdCategoria).value;
     let nome = document.getElementById(idNomeProduto).value;
     let codigo = document.getElementById(idCodProduto).value;
	let descricao = document.getElementById(idDescricao).value;
	let preco = document.getElementById(idPreco).value;
	let peso = document.getElementById(idPeso).value;
     let img = document.getElementById(txtImagem).value;
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
    else cadastrarProduto(idCat, nome, codigo, descricao, preco, peso, img, parseInt(qtidade));
}

function cadastrarProduto(idCat, produto, codig, descricao, preco, peso, img, qtidade) {
    /* Cadastrando no backend do professor */
     console.log(produto)
     var xhr = new XMLHttpRequest();

     let url = 'http://loja.buiar.com/?key=cZbWpEr0MD&f=json&c=produto&t=inserir&nome='+produto+'&codigo='+codig+'&categoria=547'+'&descricao='+descricao+'&peso='+ peso +'&preco='+preco+'&imagem='+img;

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

//--------------------FUNÇÕES DO PEDIDO-------------------------
function limpa_formulário_cep() {
    //Limpa valores do formulário de cep.
    document.getElementById('rua').value = ("");
    document.getElementById('bairro').value = ("");
    document.getElementById('cidade').value = ("");
    document.getElementById('uf').value = ("");
}

function atualizaEnd(conteudo) {
    if (!("erro" in conteudo)) {
        //Atualiza os campos com os valores.
        document.getElementById('rua').value = (conteudo.logradouro);
        document.getElementById('bairro').value = (conteudo.bairro);
        document.getElementById('cidade').value = (conteudo.localidade);
        document.getElementById('uf').value = (conteudo.uf);
    } //end if.
    else {
        //CEP não Encontrado.
        limpa_formulário_cep();
        alert("CEP não encontrado.");
    }
}

function pesquisacep(valor) {

    //Nova variável "cep" somente com dígitos.
    var cep = valor.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep != "") {

        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;

        //Valida o formato do CEP.
        if (validacep.test(cep)) {

            //Preenche os campos com "..." enquanto consulta webservice.
            document.getElementById('rua').value = "...";
            document.getElementById('bairro').value = "...";
            document.getElementById('cidade').value = "...";
            document.getElementById('uf').value = "...";

            //Cria um elemento javascript.
            var script = document.createElement('script');

            //Sincroniza com o callback.
            script.src = 'https://viacep.com.br/ws/' + cep + '/json/?callback=atualizaEnd';

            //Insere script no documento e carrega o conteúdo.
            document.body.appendChild(script);

        } //end if.
        else {
            //cep é inválido.
            limpa_formulário_cep();
            alert("Formato de CEP inválido.");
        }
    } //end if.
    else {
        //cep sem valor, limpa formulário.
        limpa_formulário_cep();
    }

};

function mascCep() {
    var cep = document.getElementById('CEP');
    if (cep.value.length == 2) {
        cep.value += '.';
    }
    else if (cep.value.length == 6) {
        cep.value += '-';
    }
}

function mascCpf() {
    var cpf = document.getElementById('CPF');
    if (cpf.value.length == 3 || cpf.value.length == 7) {
        cpf.value += '.';
    }
    else if (cpf.value.length == 11) {
        cpf.value += '-';
    }
}

//---------BOLETO---------------------

function GerarBoleto() {
    var id = document.getElementById('idPedido').value;
    //necessario mudar chave
    let url = 'http://loja.buiar.com/?key=aula&c=boleto&t=listar&id=' + id;
        var win = window.open(url, '_blank');
        win.focus();
}

/*
function completarEnd() {
    var cep = document.getElementById("CEPCliente");
    var urlCep = "https://viacep.com.br/ws/" + cep.value + "/json";
    alert(urlCep);

    var rua = document.getElementById("RuaCliente");
    var bairro = document.getElementById("BairroCliente");
    var cidade = document.getElementById("cidadeCliente");
    var uf = document.getElementById("UFCliente");



    fetch(urlCep, [method : 'GET'])
        .then(response => {
            response.json()
                .then(data => [
                    console.log(data);
                ]
        })
        }
}*/