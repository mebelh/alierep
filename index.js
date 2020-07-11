const express = require("express");
const path = require("path");

const app = express();
const session = require("express-session");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongodb-session")(session);
const Handlebars = require("handlebars");
const bodyParser = require("body-parser");

const exphbs = require("express-handlebars");

const mainRout = require("./routs/main");

const MONGO_URI =
    "mongodb+srv://memet:12345@cluster0-mjl6h.mongodb.net/Repetlo?retryWrites=true&w=majority";

const store = new MongoStore({
    uri: MONGO_URI,
    collection: "sessions",
});

const PORT = 80;

const {
    allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");

const hbs = exphbs.create({
    defaultLayout: "main",
    extname: "hbs",
    handlebars: allowInsecurePrototypeAccess(Handlebars),
});
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "views", "img")));

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

app.use(
    session({
        secret: "jfds'df",
        resave: true,
        saveUninitialized: true,
        store,
    })
);

app.use("/", mainRout);

const start = async () => {
    try {
        mongoose.connect(MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useFindAndModify: false,
        });
        app.listen(PORT, () => {
            console.log(`Server has been started on ${PORT}.`);
        });
    } catch (e) {
        if (e) {
            console.log(e);
        }
    }
};
start();
