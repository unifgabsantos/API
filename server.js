var express = require('express');
var bodyParser = require('body-parser');
var server = express();
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use('/', express.static('Arquivos'));
server.set("view engine", "ejs");
var dados = [];

function EnviarDados(req, resp) {
    var info = {
        "Maquina": req.body.Maquina,
        "Dados": {
            "Time": req.body.Time,
            "Temperatura": req.body.Temperatura
        }
    };
    dados.push(info);
    resp.send({"Status_Code":200})
    console.log(info);
};

function GetDados(req, resp) {
    resp.setHeader("Access-Control-Allow-Origin", "*");
    resp.send(dados);
};

function Index(req, resp) {
    resp.render("index");
};

function Clear(req,resp){
    if (req.body.Password=="admin"){
        dados = [];
        resp.send("Clear");
    }
    else resp.send("Senha incorreta.")
};


server.post("/Enviar", EnviarDados);
server.post("/Clear",Clear);
server.get("/GetDados", GetDados);
server.get("/", Index);
server.listen(80);
