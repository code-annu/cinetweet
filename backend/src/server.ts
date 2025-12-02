import "reflect-metadata";
import express, { Request, Response } from "express";
import dotenv from "dotenv";
import authRouter from "./api/router/auth-router";
import profileRouter from "./api/router/profile-router";
import { errorHandler } from "./api/middleware/handle-error";
import { validateAuthorization } from "./api/middleware/validate-authorization";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const BASE_API_URL = "/api/v1";

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Cinetweet backend is up and running" });
});

app.use(`${BASE_API_URL}/auth`, authRouter);
app.use(`${BASE_API_URL}/profile`, validateAuthorization, profileRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}${BASE_API_URL}`);
});
