import express from "express";
import { dbConnection } from "./db.js";
import endPoint from "./routes/product.route.js";

const app = express();
app.use(express.urlencoded({extended : true}));
app.use(express.json());
(async () => await dbConnection())();

app.use('/coolapi/product', endPoint);

const PORT = 2300;
app.listen(PORT, () => console.log(`Server running on : http://localhost:${PORT}`));