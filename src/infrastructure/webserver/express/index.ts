import express from "express";
import dotenv from 'dotenv';
import { AppDataSource } from "../../orm/typeorm/config/ormconfig";
import { router } from "../../../interface/routes/dummy_routes";

dotenv.config()
const app = express();
app.use(express.json())
const port =3000;


app.get("/", (req, res) => {
  res.send("working")
});


app.use('/user',router)
AppDataSource.initialize().then(()=>{
  console.log("Working");
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}).catch((e)=>{
  console.log(e);
})

