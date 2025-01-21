import  express  from "express";
import  {connectDatabase} from  "./dbconfig/database.js";
import  cors  from 'cors';
import  bodyParser from 'body-parser';
import  path  from 'path';

import authRoute from "./api/auth/route.js"
import itemRoute from "./api/items/route.js"

import dotenv from 'dotenv';
dotenv.config();

const app = express();
const allowedOrigins = ['http://localhost:8081'];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  allowedHeaders: 'Content-Type, Authorization'
};
app.use(cors(corsOptions));


app.options('*', cors(corsOptions));

app.use(bodyParser.json());





const { PORT } = process.env;

app.use(express.json());


app.use("/api/v1/auth", authRoute);

app.use("/api/v1/item", itemRoute);




app.get("/", (req, res) => {
  return res.status(200).json({
    code: 200,
    responseCode:"00",
    status: "success",
    message: ' BACKEND SERVER Service up and running local',
  }); 
})


app.use((req, res) => {
  return res.status(404).json({
    code: 404,
    responseCode:"99",
    status: "failed",
    message: 'Endpoint not found',
    error: "An Error Occured!",
  });
});




connectDatabase(() => {
  // Start the server after database successful handshake
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
