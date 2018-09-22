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
    res.send("Hello You can Discover Mars Here");
});

router.get("/getallroverswithobjectives",function(req,res){
    oracledb.getConnection(
        db,
        function(err, connection) {
            if (err) {
                console.error(err.message);
                return;
            }connection.execute(
                'SELECT R.ROVERID,R.ROVERNAME FROM ROVER R,ROVERCOMPUTER RC,OBJECTIVE O WHERE R.ROVERID=RC.ROVERID AND RC.COMPUTERID=O.COMPUTERID GROUP BY R.ROVERID,R.ROVERNAME',
                function(err, result) {
                    if (err) {
                        console.error(err.message);
                        doRelease(connection);
                        return;
                    }
                    var array=[];
                    for(var i=0;i<result.rows.length;i++){
                        // array.push(result.rows[i][0]);
                        const obj={
                            RoverID:result.rows[i][0],
                            RoverName:result.rows[i][1],
                        };
                        array.push(obj);
                    }
                    //res.json(array);
                    res.json(array);
                    doRelease(connection);
                });
        });
});


router.get("/getrovercurrentposition/:rid", function(req,res){
    oracledb.getConnection(
        db,
        function(err, connection) {
            if (err) {
                console.error(err.message);
                return;
            }
            connection.execute(
                "SELECT CURRENTPOSITION FROM ROVERMAP WHERE ROVERID=(:rid)",
                {
                    rid:req.params.rid
                },
                { autoCommit: true },
                function(err, result) {
                    if (err) {
                        console.error(err.message);
                        doRelease(connection);
                        return;
                    }
                    res.json(result.rows[0][0]);
                    doRelease(connection);
                });
        });
});





/**
 * update traversal path And Traversal Distance
 */

router.post("/updatemap",function(req,res){
    oracledb.getConnection(
        db,
        function(err, connection) {
            if (err) {
                console.error(err.message);
                return;
            }//console.log(req.body);
            connection.execute(
                "BEGIN mypkg.updateMap(:rid,:traversalP,:traversalDistances); END;",
                {
                    rid: req.body.rid,
                    traversalP:req.body.traversalPath,
                    traversalDistances: { type: oracledb.NUMBER,
                        dir: oracledb.BIND_IN,
                        val:req.body.traversalDistances
                    }
                },
                { autoCommit: true },
                function(err, result) {
                    if (err) {
                        console.error(err.message);
                        doRelease(connection);
                        return;
                    }
                    res.json(result);
                    doRelease(connection);
                });
        });
});

router.get("/getobjectivetype/:rid", function(req,res){
    oracledb.getConnection(
        db,
        function(err, connection) {
            if (err) {
                console.error(err.message);
                return;
            }
            connection.execute(
                "SELECT OBJECTIVETYPE FROM OBJECTIVE WHERE COMPUTERID=(SELECT COMPUTERID FROM ROVERCOMPUTER WHERE ROVERID=(:rid))",
                {
                    rid:req.params.rid
                },
                { autoCommit: true },
                function(err, result) {
                    if (err) {
                        console.error(err.message);
                        doRelease(connection);
                        return;
                    }

                    var array=[];
                    for(var i=0;i<result.rows.length;i++){
                        // array.push(result.rows[i][0]);
                        const obj={
                            OBJECTIVETYPE:result.rows[i][0],
                        };
                        array.push(obj);
                    }
                    res.json(array);
                    doRelease(connection);
                });
        });
});


router.get("/gettaskdetails/:rid", function(req,res){
    oracledb.getConnection(
        db,
        function(err, connection) {
            if (err) {
                console.error(err.message);
                return;
            }
            connection.execute(
                "SELECT TASKDETAILS FROM TASK WHERE OBJECTIVEID IN(SELECT OBJECTIVEID FROM OBJECTIVE WHERE COMPUTERID=(SELECT COMPUTERID FROM ROVERCOMPUTER WHERE ROVERID=(:rid)))",
                {
                    rid:req.params.rid
                },
                { autoCommit: true },
                function(err, result) {
                    if (err) {
                        console.error(err.message);
                        doRelease(connection);
                        return;
                    }

                    var array=[];
                    for(var i=0;i<result.rows.length;i++){
                        // array.push(result.rows[i][0]);
                        const obj={
                            TASKDETAILS:result.rows[i][0],
                        };
                        array.push(obj);
                    }
                    res.json(array);
                    doRelease(connection);
                });
        });
});

router.get("/gettraversaldistance/:rid", function(req,res){
    oracledb.getConnection(
        db,
        function(err, connection) {
            if (err) {
                console.error(err.message);
                return;
            }
            connection.execute(
                "SELECT TRAVERSALDISTANCE FROM ROVERMAP WHERE ROVERID=:rid",
                {
                    rid:req.params.rid
                },
                { autoCommit: true },
                function(err, result) {
                    if (err) {
                        console.error(err.message);
                        doRelease(connection);
                        return;
                    }


                    res.json(result.rows[0][0]);
                    doRelease(connection);
                });
        });
});

router.post("/transmition", function(req,res) {
    oracledb.getConnection(
        db,
        function(err, connection) {
            if (err) {
                console.error(err.message);
                return;
            }
            connection.execute(
                'INSERT INTO Transmission VALUES(TransmissionID_auto_increment.nextval,:Receiver,:Message,:TransmissionDate)RETURN TRANSMISSIONID INTO :TransmissionID',
                {
                    TransmissionID : {type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
                    Receiver:"DSN",
                    Message: req.body.Message,
                    TransmissionDate:req.body.TransmissionDate,

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

router.post("/generatereport", function(req,res){
    oracledb.getConnection(
        db,
        function(err, connection) {
            if (err) {
                console.error(err.message);
                return;
            } console.log(req.body);
            connection.execute(
                "BEGIN GENERATEREPORT(:rid,:tid); END;",
                {
                    rid:req.body.rid,
                    tid:req.body.tid
                },
                { autoCommit: true },
                function(err, result) {
                    if (err) {
                        console.error(err.message);
                        doRelease(connection);
                        return;
                    }
                    res.json(result);
                    doRelease(connection);
                });
        });
});


module.exports = router;