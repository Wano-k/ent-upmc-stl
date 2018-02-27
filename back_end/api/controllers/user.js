'use strict';

var crypto = require('crypto');
var randomstring = require("randomstring");
var nodemailer = require('nodemailer');
var jwt = require('jsonwebtoken');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
           user: 'entupmcstl@gmail.com',
           pass: 'abcd123456789'
       }
});

function getRole(email){
    var arrayOfStrings = email.split("@");
    if(arrayOfStrings[1]==="etu.upmc.fr"){
        return "etu";
    }else if((arrayOfStrings[1]==="lip6.fr") || (arrayOfStrings[1]==="upmc.fr")){
        return "prof";
    }
    return null;
}

exports.signup=function(req , res){
    var fname  = req.body.first_name;
    var lname= req.body.last_name;
    var pass= req.body.password;
    var email=req.body.email;
    var encrypted_pass = crypto.createHash('sha256').update(pass).digest('base64');
    var role = getRole(email);
    if(role != null && role==="etu"){
        var arrayOfStrings = email.split("@");
        fname = arrayOfStrings[0].split(".")[0];
        lname = arrayOfStrings[0].split(".")[1];
    }
    else if(role==null){
        res.send({
           "code":400,
           "failed":"email non reconnu"
         });
         return;
    }
    var activation= randomstring.generate(15);
    var users={
        "prenom":fname,
        "nom":lname,
        "mail":email,
        "motDePasse":encrypted_pass,
        "role":role,
        "codeActiv":activation
      }
   // var sql = "INSERT INTO `login`(`id`,`prenom`,`nom`,`motDePasse`,`mail`,`role`,`codeActiv`) VALUES ('','" + db.escape(fname) + "','" +  db.escape(lname) + "','" + db.escape(encrypted_pass)+ "','" + db.escape(email)+ "','"+ db.escape(role)+ "','" +db.escape(activation)+"')";
    var query = db.query('INSERT INTO Utilisateur SET ?',users, function (error, results, fields) {
        if (error) {
          console.log("error ocurred",error);
          res.send({
            "code":400,
            "failed":"error ocurred"
          });
        }else{
            var mailOptions = {
                from: 'mail-noreply@ent_upmc.com', // sender address
                to: email, // list of receivers
                subject: 'Activation du compte', // Subject line
                html: '<a href="http://localhost:8080/activ/'+results.insertId+'/'+activation+'">Activer mon compte</a>'// plain text body
            };
            transporter.sendMail(mailOptions, function (err, info) {
                if(err)
                  console.log(err)
                else
                  console.log(info);
             });
            console.log('The solution is: ', results);
            res.send({
            "code":200,
            "success":"user registered sucessfully"
              });
        }
    });
     
};

exports.activation = function(req, res) {
    console.log("Code: "+req.params.code);
    db.query('UPDATE Utilisateur SET codeActiv = "" WHERE idUtilisateur = ? AND codeActiv=?', [parseInt(req.params.userId),""+req.params.code], function(err, result){
        if (err || result.changedRows ==0) {
            //console.log("error ocurred",err);
            res.send({
              "code":400,
              "failed":"Erreur"
            });
           // res.redirect("https://www.w3schools.com/jsref/jsref_parseint.asp");
          }else{
            console.log('Record Updated ' + result.changedRows + ' rows');
            res.send({
                "code":200,
                "success":"compte correctement activé"
            });
           // res.redirect("https://tecadmin.net/node-with-mysql-examples/#");
          }  
      });
  };

  exports.login = function(req, res) {
    var mail = req.body.email;
    //var decoded = jwt.verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiZXR1IiwiZW1haWwiOiJyaWNoYXJkLmJ1bmVsQGV0dS51cG1jLmZyIiwiaWF0IjoxNTE5NzQxNDE1fQ.Y80gRot1gxkkr2dEkBBy3PsJviaDqzCaLnG1IHRR-cU", 'keyentupmcjwt');
    //console.log("Token décodé:"+decoded.role+" "+decoded.email);
    var mdp =  crypto.createHash('sha256').update(req.body.password).digest('base64');
    db.query('SELECT * FROM Utilisateur WHERE mail = ? AND motDePasse = ? AND codeActiv = ""', [mail,mdp] ,function(error, result, fields){
        console.log(result.length);
        if (error || result.length==0) {
            res.send({
              "code":400,
              "failed":"Compte non activé ou inexistant"
            });
          }else{
            var token = jwt.sign({ role: result[0].role,email:result[0].mail }, 'keyentupmcjwt');
            res.send({
                "code":200,
                "token":token
            });
          }  
    });    
  };