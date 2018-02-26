var crypto = require('crypto');
var randomstring = require("randomstring");
var nodemailer = require('nodemailer');

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
    var mailOptions = {
        from: 'mail-noreply@ent_upmc.com', // sender address
        to: email, // list of receivers
        subject: 'Activation du compte', // Subject line
        html: '<p>'+activation+'</p>'// plain text body
    };
    var users={
        "prenom":db.escape(fname),
        "nom":db.escape(lname),
        "mail":db.escape(email),
        "motDePasse":db.escape(encrypted_pass),
        "role":db.escape(role),
        "codeActiv":db.escape(activation)
      }
   // var sql = "INSERT INTO `login`(`id`,`prenom`,`nom`,`motDePasse`,`mail`,`role`,`codeActiv`) VALUES ('','" + db.escape(fname) + "','" +  db.escape(lname) + "','" + db.escape(encrypted_pass)+ "','" + db.escape(email)+ "','"+ db.escape(role)+ "','" +db.escape(activation)+"')";
    var query = db.query('INSERT INTO Utilisateur SET ?',users, function (error, results, fields) {
        if (error) {
          console.log("error ocurred",error);
          res.send({
            "code":400,
            "failed":"error ocurred"
          })
        }else{
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