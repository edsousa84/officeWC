var crypto = require('crypto');
var md5 = require('MD5');
var fs = require('fs');

var user_array = [
    {name: "Alexandre Gonçalves", username: "amgoncalves@fabamaq.com", team: "DEV"},
    {name: "Ana Santos", username: "ana.santos@fabamaq.com", team: "GPROJ"},
    {name: "João Dantas", username: "joao.dantas@fabamaq.com", team: "SISTEMAS"},
    {name: "João Galaghar", username: "joao.galaghar@fabamaq.com", team: "IT"},
    {name: "João Maia", username: "joao.maia@fabamaq.com", team: "DEV"},
    {name: "José Neves", username: "jose.neves@fabamaq.com", team: "DESIGN"},
    {name: "Mário Silva", username: "mario.silva@fabamaq.com", team: "DESIGN"},
    {name: "Nuno Alcoforado", username: "nuno.alcoforado@fabamaq.com", team: "DEV"},
    {name: "Nuno Gonçalinho", username: "nuno@fabamaq.com", team: "GESTÃO"},
    {name: "Paulo Nascimento", username: "paulo@fabamaq.com", team: "GESTÃO"},
    {name: "Pedro Pacheco", username: "ppacheco@fabamaq.com", team: "DEV"},
    {name: "Ricardo Monteiro", username: "ricardo.monteiro@fabamaq.com", team: "DEV"},
    {name: "Rui Pena", username: "rspena@fabamaq.com", team: "DEV"},
    {name: "Sebastião Rezende Oliveira", username: "sebastiao.oliveira@fabamaq.com", team: "DESIGN"},
    {name: "Sérgio Pascoal", username: "sergio.pascoal@fabamaq.com", team: "DEV"},
    {name: "Miguel Santos", username: "miguel.santos@fabamaq.com", team: "DESIGN"},
    {name: "Pedro Tender", username: "pedro.tender@fabamaq.com", team: "IT"},
    {name: "Fábio Neves", username: "fabio.neves@fabamaq.com", team: "DEV"},
    {name: "Sérgio Rodrigues", username: "sergio.rodrigues@fabamaq.com", team: "DEV"},
    {name: "Daniel Vale", username: "daniel.vale@fabamaq.com", team: "QC"},
    {name: "Vania Alves", username: "vania.alves@fabamaq.com", team: "Design"},
    {name: "Paulo Raimundo", username: "paulo.raimundo@fabamaq.com", team: "Design"},
    {name: "Luis Miranda", username: "luis.miranda@fabamaq.com", team: "DEV"},
    {name: "Marcelina Leandro", username: "marcelina.leandro@fabamaq.com", team: "QA"},
    {name: "Carlos Sampaio", username: "carlos.sampaio@fabamaq.com", team: "DEV"},
    {name: "Diogo Lourenço", username: "diogo.lourenco@fabamaq.com", team: "DEV"},
    {name: "Filipe Gonçalves", username: "filipe.goncalves@fabamaq.com", team: "SISTEMAS"},
    {name: "Eduardo Dias", username: "eduardo.dias@fabamaq.com", team: "DEV"},
    {name: "Tiago Costa", username: "tiago.costa@fabamaq.com", team: "DEV"},
    {name: "Fernando Castilho", username: "fernando.castilho@fabamaq.com", team: "DESIGN"},
    {name: "João Coutinho", username: "joao.coutinho@fabamaq.com", team: "QA"},
    {name: "Eduardo Silva", username: "eduardo.silva@fabamaq.com", team: "DESIGN"},
    {name: "Marco Paiva", username: "marco.paiva@fabamaq.com", team: "DEV"},
    {name: "Ivo Gonçalves", username: "ivo.goncalves@fabamaq.com", team: "SISTEMAS"},
    {name: "Vera Francisco", username: "vera.francisco@fabamaq.com", team: "DEV"},
    {name: "João Pires", username: "joao.pires@fabamaq.com", team: "DEV"},
    {name: "Miguel Luís", username: "miguel.luis@fabamaq.com", team: "QC"},
    {name: "Mónica Silva", username: "monica.silva@fabamaq.com", team: "QA"},
    {name: "Cristina Santos", username: "cristina.santos@fabamaq.com", team: "RH"},
    {name: "Ricardo Gomes", username: "ricardo.gomes@fabamaq.com", team: "QC"},
    {name: "Robert Oliveira", username: "robert.oliveira@fabamaq.com", team: "QC"},
    {name: "Eduardo Sousa", username: "eduardo.sousa@fabamaq.com", team: "Hardware"},
    {name: "Pedro Carneiro", username: "pedro.carneiro@fabamaq.com", team: "DEV"},
    {name: "Gustavo Lima", username: "gustavo.lima@fabamaq.com", team: "DEV"},
    {name: "Rui Almeida", username: "rui.almeida@fabamaq.com", team: "DEV"},
    {name: "João Rodrigues", username: "joao.rodrigues@fabamaq.com", team: "QC"},
    {name: "Ricardo Silva", username: "ricardo.silva@fabamaq.com", team: "QC"},
    {name: "André Silva", username: "andreluis.g.silva@gmail.com", team: "DEV"},
    {name: "João Marques", username: "joao.marques@fabamaq.com", team: "DEV"},
    {name: "Sérgio Gonçalves", username: "sergio.goncalves@fabamaq.com", team: "QC"},
    {name: "Filipe Marques", username: "filipe.marques@fabamaq.com", team: "DESIGN"},
    {name: "Miguel Arlindo", username: "miguel.arlindo@fabamaq.com", team: "DESIGN"},
    {name: "Mário Queirós", username: "mario.queiros@fabamaq.com", team: "DESIGN"},
    {name: "André Torres", username: "andre.torres@fabamaq.com", team: "DESIGN"},
    {name: "Gabriel Rocha", username: "gabriel.rocha@fabamaq.com", team: "DEV"},
    {name: "Luís Conceição", username: "luis.conceicao@fabamaq.com", team: "DEV"},
    {name: "Joaquim Guimarães", username: "joaquim.guimaraes@fabamaq.com", team: "DEV"},
    {name: "Hugo Rocha", username: "hugo.rocha@fabamaq.com", team: "DEV"},
    {name: "Luis Neves", username: "luis.neves@fabamaq.com", team: "DEV"},
    {name: "Carlos Soares", username: "carlos.soares@fabamaq.com", team: "QC"},
    {name: "Mariana Perfeito", username: "mariana.perfeito@fabamaq.com", team: "DESIGN"},
    {name: "David Moro", username: "david.moro@fabamaq.com", team: "DESIGN"},
    {name: "Tiago Bento", username: "tiago.bento@fabamaq.com", team: "IT"},
    {name: "Rui Esteves", username: "rui.esteves@fabamaq.com", team: "DEV"},
    {name: "Tiago Salvador", username: "tiago.salvador@fabamaq.com", team: "DEV"},
    {name: "Administrator", username: "admin@fabamaq.com", team: "HARDWARE"}
];

function zeroPad(num, places) {
    var zero = places - num.toString().length + 1;
    return Array(+(zero > 0 && zero)).join("0") + num;
}


var logInInfoFileData = "";
var userNumber = 0;
user_array.forEach(function(user)
{
    //console.log(user);
    user.password = zeroPad(Math.floor((Math.random() * 10000) + 1), 4);
    user.passwordMd5 =  md5(user.password);
    user.userNumber = userNumber;

    if(user.name === "Administrator")
    {
        user.password = "1234";
        user.passwordMd5 =  md5(user.password);
    }

    logInInfoFileData = logInInfoFileData + "" + user.name +", " + user.username + ", " + user.password +"\n\r";

    userNumber = userNumber + 1;
});

var loginDB = {};
user_array.forEach(function(user)
{
    loginDB[user.username] = {userNumber: "", passwordMd5: "", team: ""};
    loginDB[user.username].userNumber = user.userNumber;
    loginDB[user.username].passwordMd5 = user.passwordMd5;
    loginDB[user.username].team = user.team;
});


var logInInfoJson = JSON.stringify(loginDB, null, 4);
var jsonFilePath = "./loginCheat.json";
fs.writeFile(jsonFilePath, logInInfoJson, function(err)
{
    if(err) {
        return console.log(err);
    }

    console.log("The file: " + jsonFilePath + " was saved!");
});




var loginInfoFilePath = "./loginCheat.csv";
fs.writeFile(loginInfoFilePath, logInInfoFileData, function(err)
{
    if(err)
    {
        return console.log(err);
    }

    console.log("The file: " + loginInfoFilePath + " was saved!");
});