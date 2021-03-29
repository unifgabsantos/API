var express = require('express');
var bodyParser = require('body-parser');
const SECRET_KEY = "teste";
const { response } = require('express');
var server = express();
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use('/', express.static('Arquivos'));
server.set("view engine", "ejs");
var dados = [];
var info;

function GetDados(req, resp) {
    resp.setHeader("Access-Control-Allow-Origin", "*");
    resp.send(dados);
};

function PostDados(req, resp) {
    if (req.query.Senha == SECRET_KEY) {
        info = { "Temperatura": req.query.Temperatura, "Time": new Date() }
        dados.push(info);
        resp.send({ "Status": 200 });
    } else {
        resp.status(401);
        resp.send({ "Erro": "Senha Incorreta" });
    }
    console.log(info);
};

function DeleteDados(req, resp) {
    if (req.query.Senha == SECRET_KEY) {
        dados = [];
        resp.send({ "Status": 200 });
    }
    else{
        resp.status(401);
        resp.send({ "Erro": "Senha Incorreta" });
    }
};

function Index(req, resp) {
    resp.render("index");
};

server.get("/", Index);
server.get("/Receber", GetDados);
server.post("/Enviar", PostDados);
server.post("/Deletar", DeleteDados);
server.listen(80);
