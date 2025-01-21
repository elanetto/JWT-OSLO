import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";

const port = process.env.PORT || 3000;
const SECRET = process.env.SECRET || "shhhh";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(403).json({ message: "No token provided" });
    }
  
    const token = authHeader.split(" ")[1];
  
    try {
      const payload = jwt.verify(token, SECRET);
      res.json({ message: "Success", payload });
    } catch (error) {
      res.status(403).json({ message: "Invalid or expired token" });
    }
});
  

//prettier-ignore
const users = [
    {
      username: "ludvig",
      password: "password",
    },
    { 
      username: "admin",
      password: "admin123",
    },
    {
      username: "user",
      password: "user123",
    },
  ];

function checkPassword(username, password) {
  for (const user of users) {
    if (user.username === username && user.password === password) {
      return true;
    }
  }
  return false;
}

app.post("/login", (req, res) => {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }
  
    if (checkPassword(username, password)) {
      const token = jwt.sign({ username }, SECRET, { expiresIn: "1h" });
      return res.json({ message: "success", accessToken: token });
    } else {
      return res.status(401).json({ message: "Invalid credentials" });
    }
});
  

app.listen(port, () => {
  console.log("Server started on port: ", port);
});
