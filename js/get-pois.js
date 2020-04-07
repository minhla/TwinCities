var http = require('http');
var url = "mongodb://localhost:27017";
http.createServer(function (req, res) {

// Retrieve
var MongoClient = require('mongodb').MongoClient;

// Connect to the db
MongoClient.connect(url, function(err, db) {
    if(err) { return console.dir(err); }

    var dbo = db.db("twincities");

    dbo.collection('poi').find({}).toArray(function(err, docs){

    res.writeHead(200, {
                'Content-Type': 'text/html',
                'Access-Control-Allow-Origin' : '*'});

    var intCount = docs.length;

    if(intCount > 0){
        res.write("[");
        for(var i=0; i<intCount;i++){

            var poiName = docs[i].name.toString();
            var lati = docs[i].lat.toString();
            var longi = docs[i].lon.toString();
            var desc = docs[i].desc.toString();
            var city = docs[i].city.toString();

            var jsonText = JSON.stringify({
                name: poiName,
                latitude : lati,
                longitude: longi,
                description: desc,
                city: city
            })
            
            res.write(jsonText);
            
            if(i!=intCount-1) res.write(",");
        }
        
        
        res.write("]");
    }

    res.end();
});});}).listen(1346, () => console.log('Server running on port 1346') );
