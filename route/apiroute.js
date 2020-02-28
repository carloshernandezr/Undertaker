
// CRUD  create / read / update / delete    ===  post = create (crear info)  get = read () darme info //  put  = update  // delete = delete
var fs = require("fs")

module.exports = function (app) {


    app.get("/api/notes", function (req, res) {
        console.log("get");
        fs.readFile("./db/db.json", "utf8", function (err, data) {

            console.log(data)
            res.json(JSON.parse(data))

        })

    });



    app.post("/api/notes", function (req, res) {

        console.log("post", req.body)

        fs.readFile("./db/db.json", "utf8", function (err, data) {

            console.log(data)
            var db = JSON.parse(data)
            var id = db[db.length - 1].id + 1
            console.log(db)
            req.body.id = id
            db.push(req.body)

            fs.writeFile("./db/db.json", JSON.stringify(db), function (err, data) {

                // console.log(data);
                res.json("done")

            })

        });

    })


    app.delete("/api/notes/:id", function (req, res) {

        console.log("delete", req.params.id)

        fs.readFile("./db/db.json", "utf8", function (err, data) {


            var db = JSON.parse(data)
            console.log(db)

            //      filter
            // for loop

            db = db.filter(elem => elem.id !== parseInt(req.params.id))
            console.log("after: ", db)
            fs.writeFile("./db/db.json", JSON.stringify(db), function (err, data) {

                // console.log(data);
                res.json("done")

            })

        });

    });


};
