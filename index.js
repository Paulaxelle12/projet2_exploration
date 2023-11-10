const express = require("express");
const app = express();

app.use(express.json());
app.use("/api/converter", require("./routes/api/converter"));

app.get("/", (req, res) => {
    res.send("API de conversion de Sarah, Paule-Axelle, Anne-Laure");
});

app.listen(8080, () => console.log('Server started'));