const server = require("express")();
const port = 23456;

process.env.BASEDIR = process.cwd();

server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

server.use("/api", require("./routes"));

server.listen(port, () => {
  console.log(`Server listening at http://127.0.0.1:${port}`);
});
