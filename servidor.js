// servidor.js
const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post("/enviar", (req, res) => {
  const { nome, email, mensagem } = req.body;
  const linha = `"${nome}","${email}","${mensagem}"\n`;

  const arquivo = path.join(__dirname, "dados.csv");

  const escreverCabecalhoSeNaoExiste = !fs.existsSync(arquivo);
  if (escreverCabecalhoSeNaoExiste) {
    fs.writeFileSync(arquivo, `"Nome","Email","Mensagem"\n`);
  }

  fs.appendFile(arquivo, linha, (err) => {
    if (err) {
      console.error("Erro ao salvar:", err);
      return res.status(500).send("Erro ao salvar os dados.");
    }
    res.send("Dados salvos com sucesso!");
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
