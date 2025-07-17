import express from "express";
import bodyParser from "body-parser";
import mongoose, { connect } from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import kpiRoutes from "./routes/kpi.js";
import KPI from "./models/KPI.js";
import { kpis } from "./data/data.js";

/* CONFUGURATIONS */
dotenv.config()
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

//* ROUTES */
app.use("/kpi", kpiRoutes); 


/* MONGOOSE SETUP */
const PORT = process.env.PORT || 9000;

// 添加一个简单的测试路由
app.get("/", (req, res) => {
    res.json({ message: "Server is running!" });
});

// 改进的 MongoDB 连接和 seed 数据
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB connected successfully");
        
        // Seed 数据库
        await mongoose.connection.db.dropDatabase();
        KPI.insertMany(kpis);
        console.log("Database seeded successfully");
        
        // 启动服务器
        app.listen(PORT, () => {
            console.log(`Server running on port: ${PORT}`);

        /* ADD DATA ONE TIME ONLY OR AS NEEDED */ 
        //  await mongoose.connection.db.dropDatabase();
        //  KPI.insertMany(kpis);
        });
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
        process.exit(1);
    }
};

connectDB();