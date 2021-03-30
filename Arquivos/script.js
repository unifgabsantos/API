var temperaturas, time, dados;
var max = 0;
var min = 0;
var temp = 0;
function GetDados() {
    temperaturas = [];
    time = [];
    var requests = new XMLHttpRequest();
    requests.onreadystatechange = function() {
        if (requests.readyState == 4) {
            dados = JSON.parse(requests.responseText);
            for (i = 0; i < dados.length; i++) {
                temp = parseFloat(dados[i].Temperatura);
                temperaturas.push(temp);
                time.push(dados[i].Time);
                if (temp > max) max = temp;
                else if (temp < min) min = temp;
            };
            Grafico();
            Indicador();
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

function Grafico() {
    var linha = {
        x: time,
        y: temperaturas,
        type: 'lines'
    };
    var data = [linha];
    Plotly.newPlot('Grafico', data);
}

function Indicador() {
    var data = [{
        domain: { x: [0, 1], y: [0, 1] },
        value: temp,
        title: { text: "Temperatura" },
        type: "indicator",
        mode: "gauge+number",
        delta: { reference: 400.50 },
        gauge: { axis: { range: [0, max] } }
    }];

    var layout = { width: 600, height: 400 };
    Plotly.newPlot('Indicador', data, layout);
}

function AlterarLed() {
    if (temperaturas[(temperaturas.length) - 1] > 40) {
        document.getElementById("led").innerHTML = '<div class="led"><div class="cabeca red red-light"></div><div class="base red"></div><div class="pernas"><div class="perna"></div><div class="perna curta"></div></div></div>'
    } else if (temperaturas[(temperaturas.length) - 1] > 30) {
        document.getElementById("led").innerHTML = '<div class="led"><div class="cabeca green green-light"></div><div class="base green"></div><div class="pernas"><div class="perna"></div><div class="perna curta"></div></div></div>'
    } else if (temperaturas[(temperaturas.length) - 1] > 20) {
        document.getElementById("led").innerHTML = '<div class="led"><div class="cabeca blue blue-light"></div><div class="base blue"></div><div class="pernas"><div class="perna"></div><div class="perna curta"></div></div></div>'
    } else if (temperaturas[(temperaturas.length) - 1] > 10) {
        document.getElementById("led").innerHTML = '<div class="led"><div class="cabeca pink pink-light"></div><div class="base pink"></div><div class="pernas"><div class="perna"></div><div class="perna curta"></div></div></div>'
    } else {
        document.getElementById('led').innerHTML = document.getElementById("led").innerHTML = '<div class="led"><div class="cabeca"></div><div class="base"></div><div class="pernas"><div class="perna"></div><div class="perna curta"></div></div></div>'
    }
}
setInterval(GetDados, 1000);
