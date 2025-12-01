import express, { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Cinetweet backend is up and running" });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

