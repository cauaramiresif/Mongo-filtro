import conexao from "../config/conexao.js";

const ArtistaSchema = new conexao.Schema({
  nome: String
});

const Artista = conexao.model("Artista", ArtistaSchema);

export default Artista;