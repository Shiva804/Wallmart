var app = require("express")();

var http = require("http").Server(app);

const cors = require("cors");
const mongoose = require("mongoose");
var io = (module.exports.io = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
}));
const bodyparser = require("body-parser");
var multer = require("multer");
var upload = multer({ dest: "uploads/" });

const port = 5000;
require("dotenv").config();
const SocketManager = require("./SocketManager");

//For Encrypting password
const bcrypt = require("bcrypt");
const saltRounds = 10;

//Import Models
const chats = require("./models/Chat");
const users = require("./models/User");
const userDatas = require("./models/UserData");

app.use(bodyparser.json({ limit: "50mb", extended: true }));
app.use(cors());

//Socket Connections
io.on("connection", SocketManager);

/////////////////////////////////////////////////////////////
//Routes
app.get("/", async (req, res) => {
  res.send("hello");
});

app.post("/register", async (req, res) => {
  try {
    const email = req.body.email;
    const username = req.body.username;
    const password = await bcrypt.hash(req.body.password, saltRounds);
    const type = await req.body.type;

    const newCustomer = await users.create({
      email: email,
      username: username,
      password: password,
      type: type,
      validated: false,
    });

    res.send(newCustomer);
  } catch (error) {
    res.send(error);
  }
});

app.post("/authenticate", async (req, res) => {
  try {
    const findUser = await users.findOne({ email: req.body.email }).exec();
    console.log(findUser);

    if (findUser) {
      const decryptPassword = await bcrypt.compare(
        req.body.password,
        findUser.password
      );

      console.log(decryptPassword);

      if (decryptPassword) {
        if (findUser.validated) {
          res.send(true);
        } else {
          res.send(false);
        }
      } else {
        res.status(400).send("Incorrect email or password!");
      }
    }
  } catch (error) {
    res.send(error);
  }
});

app.post("/retailerDetails", async (req, res) => {
  try {
    const retailerDetail = await userDatas.create(req.body);

    res.send(retailerDetail);
  } catch (error) {
    res.send(error);
  }
});

/*
app.post("/postChat", async (req, res) => {
  try {
    const newChat = await chats.create({
      message: req.body.message,
      name: req.body.name,
    });

    res.status(200).send("done");
  } catch (error) {
    res.send(error);
  }
});

app.get("/getChat", async (req, res) => {
  try {
    const chatData = await chats.find();
    res.send(chatData);
  } catch (error) {
    res.send(error);
  }
});
*/

///////////////////////////////////////////////////////////////
//Database Connection

mongoose.connect(
  process.env.URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  () => {
    console.log("connected");
  }
);

//Start Server
http.listen(port, () => {
  console.log("connected to port: " + port);
});
