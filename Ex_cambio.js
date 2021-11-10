//-------------------------------------------------------------------------CRIA TABELA
function tableCreate(retorno) {
    var body = document.getElementsByTagName('body')[0];
    var tbl = document.createElement('table');
    tbl.style.width = '25%';
    tbl.style.height = '5%';
    tbl.setAttribute('border', '1');

    var data = JSON.parse(retorno);

    var tbdy = document.createElement('tbody');
    for (var i = 0; i < 5; i++) {
        var valor = data["value"][i]["cotacaoVenda"];
        var dataHora = data["value"][i]["dataHoraCotacao"];

        var tr = document.createElement('tr');

        var td = document.createElement('td');
        td.appendChild(document.createTextNode(valor))
        tr.appendChild(td)

        var td2 = document.createElement('td');
        td2.appendChild(document.createTextNode(dataHora))
        tr.appendChild(td2)

        tbdy.appendChild(tr);
    }
    tbl.appendChild(tbdy);
    body.appendChild(tbl)
}

//-------------------------------------------------------------------------REQUISIÇÃO GET
function fazGet(url) {
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url, false);
    xhttp.send();

    var retorno = xhttp.response;
    var data = JSON.parse(retorno);

    console.log(data["value"][0]["cotacaoVenda"]);
    console.log(data["value"][0]["dataHoraCotacao"]);

    tableCreate(retorno)
}

//-------------------------------------------------------------------------PUXA OS DADOS E CHAMA O GET
function pegandoDados() {
    event.preventDefault()
    let moeda = document.getElementById("moeda").value
    let dataInit = document.getElementById("dataInit").value
    let dataEnd = document.getElementById("dataEnd").value
    console.log(moeda)
    console.log(dataInit)
    console.log(dataEnd)

    /*body = {
        "@moeda": 'EUR',
        "@dataInicial": '04-07-2021',
        "@dataFinalCotacao": '04-08-2021',
        "$top": 100,
        "$skip": 0,
        "$format": 'json',
        "$select": 'cotacaoVenda,dataHoraCotacao',
    }*/

    //var url = "https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoMoedaDia(moeda=@moeda,dataCotacao=@dataCotacao)?@moeda="+moeda+"&@dataCotacao='12-27-2017'&$top=100&$skip=0&$format=json&$select=cotacaoVenda,dataHoraCotacao";
    //var url = "https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoMoedaDia(moeda=@moeda,dataCotacao=@dataCotacao)?@moeda='EUR'&@dataCotacao='12-27-2017'&$top=100&$skip=0&$format=json&$select=cotacaoVenda,dataHoraCotacao";

    //var url = "https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoMoedaPeriodo(moeda=@moeda,dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)?@moeda='EUR'&@dataInicial='04-07-2021'&@dataFinalCotacao='10-07-2021'&$top=100&$skip=0&$format=json&$select=cotacaoVenda,dataHoraCotacao"; 
    var url = "https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoMoedaPeriodo(moeda=@moeda,dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)?@moeda='"+moeda+"'&@dataInicial='04-07-2021'&@dataFinalCotacao='10-07-2021'&$top=100&$skip=0&$format=json&$select=cotacaoVenda,dataHoraCotacao"; 
  
    fazGet(url)

    /*fazPost(url2, body)*/
}
