var express = require('express');
var router = express.Router();
var connection = require('../data_source/dataSource');


const books = [
    { title: 'Harry Potter', id: 1 },
    { title: 'Twilight', id: 2 },
    { title: 'Lorien Legacies', id: 3 }
];
const superviseeList = [{
    date: "06/10/2020",
    meetingDone: true,
    meetingDate: "06/10/2020",
    comments: "Testing",
    status: "Green",
},
{
    date: "06/16/2020",
    meetingDone: true,
    meetingDate: "06/16/2020",
    comments: "Testing by Ajay",
    status: "Green",
}];
router.get('/supervisee', (req, res) => {
    connection.query("SELECT * FROM O3_Emp_Details", function (err, result, fields) {
        res.send(result);

    });
});

router.get('/o3SuperviseeDetails/:OracleId', (req, res) => {
    console.log("----" + req.params.OracleId)
    var id = parseInt(req.params.OracleId);
    connection.query("SELECT * FROM O3_Details WHERE OracleId = ?", id, function (err, result, fields) {
        res.send(result);

    });
});

router.post("/save03detail/:OracleId", (req, res) => {
    console.log("----" + req.body);
    for (let val of req.body) {
        var id = parseInt(req.params.OracleId);
        console.log("-------is-"+id)
        var isTrueSet = (val.O3Done === true);
        console.log("-----O3Done---------"+isTrueSet)
        var post  = {
            OracleId: id,
            O3WeekStartDate: new Date(val.O3WeekStartDate),
            O3Done: val.O3Done,
            Status:val.Status,
            Comments: val.Comments,
            DateDone:  new Date(val.DateDone)
          };
        connection.query("INSERT INTO O3_Details SET ? ", post, function (err, result) {
            if (err){
                console.log(err);
                res.send("failure");
            }
            console.log("1 record inserted");
        });
    }
    res.send("success");
});

module.exports = router;


