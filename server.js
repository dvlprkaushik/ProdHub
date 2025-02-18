import express from "express";
import { dbConnection } from "./db.js";
import endPoint from "./routes/product.route.js";
import advancedRoute from "./routes/productAdvance.route.js"

const app = express();
app.use(express.urlencoded({extended : true}));
app.use(express.json());
(async () => await dbConnection())();

/** @description home route */
app.get('/', (req, res) => {
    res.json({ message: "Welcome user" });
})

/** @description CRUD route */
app.use('/product', endPoint);

/** @description ADVANCED OPERATION route */
app.use('/product/advanced', advancedRoute);

const PORT = 2300;
app.listen(PORT, () => console.log(`Server running on : http://localhost:${PORT}`));