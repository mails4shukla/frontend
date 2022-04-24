const express = require('express')
const app = express()
const port = 3000
const gcpMetadata = require('gcp-metadata');
var mysql = require('mysql');


async function quickstart() {
  const isAvailable = await gcpMetadata.isAvailable();
  console.log(`Is available: ${isAvailable}`);

  if (isAvailable) {
    const projectMetadata = await gcpMetadata.project('attributes/database_ip');
    return (projectMetadata)
  }

}


app.get('/',  async(req, res) => {
     
	var projectMetadata= await quickstart();
        var con = mysql.createConnection({
        host: projectMetadata,
        user: "root",
        password: "password",
	database: "simpleapi"
        });

	con.connect(function(err) {
           if (err) throw err;
           console.log("Connected!");
           con.query("select * from users", function (err, result) {
           if (err) throw err;
              console.log("Result: " + result);
              res.send(result);
	   });
         });
//	res.send('Hello World!'+ projectMetadata);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
