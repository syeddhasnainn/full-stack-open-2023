import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculator, Operation } from "./calculator";


const app = express();
app.use(express.json());

app.get("/ping", (_req, res) => {
  res.send("pong");
});

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.post('/calculate', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { value1, value2, op } = req.body;
  const operation = op as Operation;

  const result = calculator(Number(value1), Number(value2), operation);
  res.send({ result });
});


app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  const bmi = calculateBmi(height, weight);

  if (!height || !weight) {
    res.json({ error: "malformatted parameters" });
  }

  res.json({ height, weight, bmi });
});
const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
