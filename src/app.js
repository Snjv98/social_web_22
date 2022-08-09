const express = require("express");
const { reset } = require("nodemon");
const app = express();
const path = require("path");
// const hbs = require("hbs"); //when we add partials
require("./db/conn");
const Signup = require("./models/signup");

const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
// const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);

app.get("/", (req, res) =>{
    res.render("index");
})

app.get("/login", (req,res) =>{
    res.render("login");
})

app.get("/timeline", (req,res) =>{
    res.render("timeline");
})

app.get("/network", (req,res)=>{
    res.render("timeline_friend")
})
// Post data from signup page(index.hbs) to login
app.post("/login", async (req, res) =>{
    try {
      const password = req.body.password;
      const cpassword = req.body.confirmPassword;

      if(password === cpassword){
        const registerUser = new Signup({          
            name: req.body.name,
            phone:req.body.phone,
            email:req.body.email,
            password:req.body.password,
            confirmPassword:req.body.confirmPassword
        }) 
        const signedUp = await registerUser.save();
        res.status(201).render("timeline")
      }
      else{
        res.send("passwords are not matching")
      }
    } catch (error) {
        res.status(400).send(error)
    }
})

// post login data to timeline
app.post("/timeline", async (req,res) =>{
    // res.render("timeline")
    // console.log(req.body.phone)
    try {
        const phone = req.body.phone;
        const password = req.body.password;

        const userphone = await Signup.findOne({phone:phone});
        if(userphone.password === password){
        res.status(201).render("timeline");
        }
        else{
            reset.send("Password didn't match")
        }
    } catch (error) {
        res.status(400).send("Invalid email or password")
    }
})

app.listen(port, ()=>{
    console.log(`Server is running at port ${port}`)
})