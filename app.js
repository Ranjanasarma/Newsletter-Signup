const express = require("express");
const bodyParser = require("body-parser");
const request=require("request");
const https=require("https");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req,res){
  const firstname =req.body.Fname;
  const lastname= req.body.Lname;
  const email=req.body.Email;
  const data={
    members: [
      {
      email_address: email,
      status:"subscribed",
      merge_fields:{
        FNAME:firstname,
        LNAME:lastname
      }
}

    ]
  };

  const jsondata = JSON.stringify(data);
  const url="https://us10.api.mailchimp.com/3.0/lists/bd44c7efa2";
  const options={
    method:"POST",
    auth:"ranjana:API KEY"
  }
const request =  https.request(url, options,function(response){
  if (response.statusCode === 200){
    res.sendFile(__dirname + "/success.html");

  }  else {
       res.sendFile(__dirname+"/failour.html");
    }


    response.on("data",function(data){
      console.log(JSON.parse(data));
    });
  });

  request.write(jsondata);
  request.end();

});

app.post("/failour",function(req,res){
  res.redirect("/")
});

app.get("/", function(req,res){
  res.send("server is ready and running");
});

app.listen(process.env.PORT,||3000, function(){

});
//api key = 46ad23d0a0d61c468aa02c8aed64825e-us10 mailchimp
// list id = bd44c7efa2
