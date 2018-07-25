const express = require('express');
const router = express.Router();
const oracledb = require('oracledb');
const db={
    user          : "harshana",
    password      : "123",
    connectString : "localhost/xe"
};

//Functions
function doRelease(connection) {
    connection.close(
        function(err) {
            if (err)
                console.error(err.message);
        });
}
//Routes
router.get("", function(req, res){
    res.send("Hello You can Control rover here");
});
/**
 * Add Rover Objectives
 *
 * // Rover::find(123)->photos;
 */
router.post("/addroverobjectives", function(req,res) {
    oracledb.getConnection(
        db,
        function(err, connection) {
            if (err) {
                console.error(err.message);
                return;
            }

                connection.execute(
                    'INSERT INTO Objective(ObjectiveType,ComputerID) VALUES(:RObjectiveType,:RComputerID)RETURN ObjectiveID INTO :ObjectiveID',
                    {
                        ObjectiveID : {type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
                        RObjectiveType: req.body.ObjectiveType,
                        RComputerID:req.body.ComputerID,
                    },
                    { autoCommit: true },
                    function(err, result) {
                        if (err) {
                            console.error(err.message);//TODO promt an error in front end when an error occurs
                            doRelease(connection);
                            return;
                        }
                        res.json(result.outBinds.ObjectiveID);
                        doRelease(connection);
                        });

        });
});
/**
 * Get All Added Objectives
 */
router.get("/getaddedobjectives/:selectedComputerId",function(req,res){
    oracledb.getConnection(
        db,
        function(err, connection) {
            if (err) {
                console.error(err.message);
                return;
            }
            connection.execute(
                'SELECT * FROM Objective WHERE ComputerID=:ComputerID',
                {
                    ComputerID:req.params.selectedComputerId
                },
                function(err, result) {
                    if (err) {
                        console.error(err.message);
                        doRelease(connection);
                        return;
                    }
                    var array=[];
                    for(var i=0;i<result.rows.length;i++){

                        const obj={
                            ObjectiveID:result.rows[i][0],
                            ObjectiveType:result.rows[i][1],
                            ComputerID:result.rows[i][2]
                        };
                        array.push(obj);
                    }
                    res.json(array);
                    doRelease(connection);
                });
        });
});
/**
 * Add Rover Tasks
 */
router.post("/addrovertasks", function(req,res) {
    oracledb.getConnection(
        db,
        function(err, connection) {
            if (err) {
                console.error(err.message);
                return;
            }
                connection.execute(
                    'INSERT INTO Task VALUES(TaskID_auto_increment.nextval,:TaskDetails,:ObjectiveID)',
                    {
                        TaskDetails: req.body.TaskDetails,
                        ObjectiveID:req.body.ObjectiveID,
                    },
                    { autoCommit: true },
                    function(err, result) {
                        if (err) {
                            console.error(err.message);//TODO promt an error in front end when an error occurs
                            doRelease(connection);
                            return;
                        }
                        res.json(result);
                        doRelease(connection);
                        });

        });
});

module.exports = router;