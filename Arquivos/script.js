function GetDados() {
    var temperaturas = [];
    var time = [];
    var dados;
    var requests = new XMLHttpRequest();
    requests.onreadystatechange = function() {
        if (requests.readyState == 4) {
            dados = JSON.parse(requests.responseText);
            for (i = 0; i < dados.length; i++) {
                temperaturas.push(parseFloat(dados[i].Dados.Temperatura));
                time.push(dados[i].Dados.Time);
            };
            var trace1 = {
                x: time,
                y: temperaturas,
                type: 'lines'
            };
            var data = [trace1];
            Plotly.newPlot('MyDiv', data);
        };
    };
    try {
        requests.open("GET", "http://127.0.0.1/GetDados");
        requests.send();
    } catch (e) {
        console.log(e);
    }

}
setInterval(GetDados, 1000);