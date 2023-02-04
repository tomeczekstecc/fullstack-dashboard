import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js";
import Transaction from "./models/Transaction.js";
import OverallStat from "./models/OverallStat.js";
import AffiliateStat from "./models/AffiliateStat.js";
import colors from "colors";
import User from "./models/User.js";
import Product from "./models/Product.js";
import {
    dataUser,
    dataTransaction,
    dataProduct,
    dataProductStat,
    dataOverallStat,
    dataAffiliateStat
} from "./data/index.js";
import ProductStats from "./models/ProductStats.js";

// data imports

// CONFIG

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: 'cross-origin'}));
app.use(morgan('combined'));

app.use(cors());
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


// ROUTES
app.use('/client', clientRoutes);
app.use('/general', generalRoutes);
app.use('/management', managementRoutes);
app.use('/sales', salesRoutes);

// SERVER
const PORT = process.env.PORT || 5000;

const connectDB = () => mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
}).then(() => {
        console.log('Connected to MongoDB'.cyan);
        // User.insertMany(dataUser); // !!! only one time
        // Product.insertMany(dataProduct); // !!! only one time
        // ProductStats.insertMany(dataProductStat); // !!! only one time
        // Transaction.insertMany(dataTransaction); // !!! only one time

        // OverallStat.insertMany(dataOverallStat); // !!! only one time
        // AffiliateStat.insertMany(dataAffiliateStat); // !!! only one time
    }
).catch((err) => {
        console.log(err);
    }
);

app.listen(PORT, () => {
    mongoose.set('strictQuery', false)
    connectDB();
    console.log(`Server running on port: ${PORT}`.magenta)
});
