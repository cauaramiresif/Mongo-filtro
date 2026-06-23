import express from "express";
import Genero from './models/Genero.js';
import Musica from './models/Musica.js';
import Artista from './models/Artista.js';
import Playlist from './models/Playlist.js'

const app = express();
const PORT = 3000;



// Configura o EJS como motor de views
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
// pasta onde ficam os arquivos .ejs
app.set("views", "./views"); 
//Liberar acesso a pasta public
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(__dirname + '/public'))



app.get("/", (req, res) => {
  res.render("index");
});

//Rotas do gênero
app.get("/genero/lst", async (req, res) => {
  const generos = await Genero.find()
  res.render("genero/lst", {generos});
});

app.get("/genero/add",  (req, res) => {

  res.render("genero/add");
});

app.post("/genero/add", async (req, res) => {
  const nome = req.body.nome;
  //grava no banco de dados(Mongo)
  await Genero.create({nome});
  res.render("genero/addok");
});

//Rotas de música

app.get("/musica/lst", async (req, res) => {
  //buscando as musicas no BD
  const musicas = await Musica.find()
  res.render("musica/lst", {musicas});
});

app.get("/musica/add", (req, res) => {
  res.render("musica/add");
});

app.post("/musica/add", async (req, res) => {
  const {nome, duracao, artista, anoLancamento} = req.body;

  await Musica.create({nome, duracao, artista, anoLancamento})
  res.render("musica/addok");
});

//Rotas de artista

app.get("/artista/lst", async (req, res) => {
  //buscando as artistas no BD
  const artistas = await Artista.find()
  res.render("artista/lst", {artistas});
});

app.get("/artista/add", (req, res) => {
  res.render("artista/add");
});

app.post("/artista/add", async (req, res) => {
  const {nome} = req.body;
  await Artista.create({nome});
  res.render("artista/addok");
});

//Rotas de playlist

app.get("/playlist/lst", async (req, res) => {
  //buscando as playlists no BD
  const playlists = await Playlist.find()
  res.render("playlist/lst", {playlists});
});

app.get("/playlist/add", (req, res) => {
  res.render("playlist/add");
});

app.post("/playlist/add", async (req, res) => {
  const {nome, musica1, musica2} = req.body;
  await Playlist.create({nome, musica1, musica2})
  res.render("playlist/addok");
});

//Excluir

app.get('/musica/del/:id', async (req, res) => {

const musica = await Musica.findByIdAndDelete(req.params.id)

res.redirect("/musica/lst")

})

app.get('/genero/del/:id', async (req, res) => {

const genero = await Genero.findByIdAndDelete(req.params.id)

res.redirect("/genero/lst")

})

app.get('/artista/del/:id', async (req, res) => {

const artista = await Artista.findByIdAndDelete(req.params.id)

res.redirect("/artista/lst")

})

app.get('/playlist/del/:id', async (req, res) => {

const playlist = await Playlist.findByIdAndDelete(req.params.id)

res.redirect("/playlist/lst")

})

app.get("/cadastro", (req, res) => {
  res.render("cadastro");
});

app.post("/cadastro", (req, res) => {
  res.render("cadastrook");
});

app.get("/lista", (req, res) => {
  res.render("lista");
});

//Edição

app.get('/musica/edt/:id', async (req, res) => {

const musica = await Musica.findById(req.params.id)

res.render("musica/edt", {musica})

})

app.post('/musica/edt/:id', async (req, res) => {

const musica = await Musica.findByIdAndUpdate(req.params.id, req.body)

res.render("musica/edtok")

})

//Edição

app.get('/genero/edt/:id', async (req, res) => {

const genero = await Genero.findById(req.params.id)

res.render("genero/edt", {genero})

})

app.post('/genero/edt/:id', async (req, res) => {

const genero = await Genero.findByIdAndUpdate(req.params.id, req.body)

res.render("genero/edtok")

})

//Edição

app.get('/artista/edt/:id', async (req, res) => {

const artista = await Artista.findById(req.params.id)

res.render("artista/edt", {artista})

})

app.post('/artista/edt/:id', async (req, res) => {

const artista = await Artista.findByIdAndUpdate(req.params.id, req.body)

res.render("artista/edtok")

})

//Edição

app.get('/playlist/edt/:id', async (req, res) => {

const playlist = await Playlist.findById(req.params.id)

res.render("playlist/edt", {playlist})

})

app.post('/playlist/edt/:id', async (req, res) => {

const playlist = await Playlist.findByIdAndUpdate(req.params.id, req.body)

res.render("playlist/edtok")

})

app.listen(PORT, ()=>{
 console.log(
    `Servidor rodando em http://localhost:${PORT}`)
});
