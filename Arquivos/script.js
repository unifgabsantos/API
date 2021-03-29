var temperaturas;
var time;
var dados;

function GetDados() {
    temperaturas = [];
    time = [];
    var requests = new XMLHttpRequest();
    requests.onreadystatechange = function() {
        if (requests.readyState == 4) {
            dados = JSON.parse(requests.responseText);
            for (i = 0; i < dados.length; i++) {
                temperaturas.push(parseFloat(dados[i].Temperatura));
                time.push(dados[i].Time);
            };
            var linha = {
                x: time,
                y: temperaturas,
                type: 'lines'
            };
            var data = [linha];
            Plotly.newPlot('MyDiv', data);
            AlterarLed();
        };
    };
    try {
        requests.open("GET", "http://127.0.0.1/Receber");
        requests.send();
    } catch (e) {
        console.log(e);
    }
}

function AlterarLed() {
    if (temperaturas[(temperaturas.length) - 1] > 40) {
        document.getElementById("led").innerHTML = '<div class="cabeca red red-light"></div><div class="base red"></div><div class="pernas"><div class="perna"></div><div class="perna curta"></div></div>'
    } else if (temperaturas[(temperaturas.length) - 1] > 30) {
        document.getElementById("led").innerHTML = '<div class="cabeca green green-light"></div><div class="base green"></div><div class="pernas"><div class="perna"></div><div class="perna curta"></div></div>'
    } else if (temperaturas[(temperaturas.length) - 1] > 20) {
        document.getElementById("led").innerHTML = '<div class="cabeca blue blue-light"></div><div class="base blue"></div><div class="pernas"><div class="perna"></div><div class="perna curta"></div></div>'
    } else if (temperaturas[(temperaturas.length) - 1] > 10) {
        document.getElementById("led").innerHTML = '<div class="cabeca pink pink-light"></div><div class="base pink"></div><div class="pernas"><div class="perna"></div><div class="perna curta"></div></div>'
    } else {
        document.getElementById('led').innerHTML = document.getElementById("led").innerHTML = '<div class="cabeca"></div><div class="base"></div><div class="pernas"><div class="perna"></div><div class="perna curta"></div></div>'
    }
}
setInterval(GetDados, 1000);
