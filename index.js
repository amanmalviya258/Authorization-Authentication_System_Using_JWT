const express = require("express");
const app = express();

require("dotenv").config();

const PORT = process.env.PORT || 4000;

//using middleware
app.use(express.json());

require("./config/database").connect();

//route import and mount
const importingRoutes = require("./routes/usersRoutes");
app.use("/api/v1", importingRoutes);

//activating server
app.listen(PORT, () => {
  console.log(`Server is listening in port ${PORT}`);
});

//this is default route
app.get('/' ,(req,res)=>{
res.send(`<h1>This is home page </h1>`)
})