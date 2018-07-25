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
    res.send("Hello You can Manage Rover Parts Here");
});

/**
 * Add DeveloperCamera
 */
router.post("/cameras", function(req,res) {
    oracledb.getConnection(
        db,
        function(err, connection) {
            if (err) {
                console.error(err.message);
                return;
            }
            connection.execute(
                'INSERT INTO DeveloperCamera VALUES(DevCameraID_auto_increment.nextval,:DevCameraType,:DevCameraDetails)',
                {
                    DevCameraType: req.body.DevCameraType,
                    DevCameraDetails:req.body.DevCameraDetails
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
/**
 * Add DeveloperInstrument
 */

router.post("/instruments", function(req,res) {
    oracledb.getConnection(
        db,
        function(err, connection) {
            if (err) {
                console.error(err.message);
                return;
            }
                connection.execute(
                    'INSERT INTO DeveloperInstrument VALUES(DevInstrumentID_auto_increment.nextval,:DevInstrumentType,:DevInstrumentDetails)',
                    {
                        DevInstrumentType: req.body.DevInstrumentType,
                        DevInstrumentDetails:req.body.DevInstrumentDetails
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

/**
 * Add DeveloperSensor
 */
router.post("/sensors", function(req,res) {
    oracledb.getConnection(
        db,
        function(err, connection) {
            if (err) {
                console.error(err.message);
                return;
            }
            connection.execute(
                'INSERT INTO DeveloperSensor VALUES(DevSensorID_auto_increment.nextval,:DevSensorType,:DevSensorDetails)',
                {
                    DevSensorType: req.body.DevSensorType,
                    DevSensorDetails:req.body.DevSensorDetails
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

/**
 * Add DeveloperOperatingSystem
 */
router.post("/os", function(req,res) {
    oracledb.getConnection(
        db,
        function(err, connection) {
            if (err) {
                console.error(err.message);
                return;
            }
            connection.execute(
                'INSERT INTO DeveloperOperatingSystem VALUES(DevOsID_auto_increment.nextval,:DevOperatingSystem)',
                {
                    DevOperatingSystem: req.body.DevOperatingSystem,
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
/**
 * Add DeveloperObjective
 */
router.post("/objectives", function(req,res) {
    oracledb.getConnection(
        db,
        function(err, connection) {
            if (err) {
                console.error(err.message);
                return;
            }
            connection.execute(
                'INSERT INTO DeveloperObjective VALUES(DevObjectiveID_auto_increment.nextval,:DevObjectiveType,:DevObjestiveDetails)',
                {
                    DevObjectiveType: req.body.DevObjectiveType,
                    DevObjestiveDetails:req.body.DevObjestiveDetails
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

/**
 * Get All Developer Operating Systems
 */
router.get("/getoperatingsystems",function(req,res){
    oracledb.getConnection(
        db,
        function(err, connection) {
            if (err) {
                console.error(err.message);
                return;
            }
            connection.execute(
                'SELECT * FROM DeveloperOperatingSystem',
                function(err, result) {
                    if (err) {
                        console.error(err.message);
                        doRelease(connection);
                        return;
                    }
                    var array=[];
                    for(var i=0;i<result.rows.length;i++){
                        array.push(result.rows[i][1]);
                    }
                    res.json(array);
                    doRelease(connection);
                });
        });
});

/**
 * Get All Developer Sensors
 */
router.get("/getsensors",function(req,res){
    oracledb.getConnection(
        db,
        function(err, connection) {
            if (err) {
                console.error(err.message);
                return;
            }
            connection.execute(
                'SELECT * FROM DeveloperSensor',
                function(err, result) {
                    if (err) {
                        console.error(err.message);
                        doRelease(connection);
                        return;
                    }
                    var array=[];
                    for(var i=0;i<result.rows.length;i++){
                        const obj={
                            DevSensorType:result.rows[i][1],
                            DevSensorDetails:result.rows[i][2],
                        };
                        array.push(obj);
                    }
                    res.json(array);
                    doRelease(connection);
                });
        });
});

/**
 * Get All DeveloperCamera
 */
router.get("/getcameras",function(req,res){
    oracledb.getConnection(
        db,
        function(err, connection) {
            if (err) {
                console.error(err.message);
                return;
            }
            connection.execute(
                'SELECT * FROM DeveloperCamera',
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
                            DevCameraType:result.rows[i][1],
                            DevCameraDetails:result.rows[i][2],
                        };
                        array.push(obj);
                    }
                    res.json(array);
                    doRelease(connection);
                });
        });
});
/**
 * Get All Developer Instruments
 */
router.get("/getinstruments",function(req,res){
    oracledb.getConnection(
        db,
        function(err, connection) {
            if (err) {
                console.error(err.message);
                return;
            }
            connection.execute(
                'SELECT * FROM DeveloperInstrument',
                function(err, result) {
                    if (err) {
                        console.error(err.message);
                        doRelease(connection);
                        return;
                    }
                    var array=[];
                    for(var i=0;i<result.rows.length;i++){
                        const obj={
                            DevInstrumentType:result.rows[i][1],
                            DevInstrumentDetails:result.rows[i][2],
                        };
                        array.push(obj);
                    }
                    res.json(array);
                    doRelease(connection);
                });
        });
});


/**
 * Get All Developer Objective
 */
router.get("/getobjectives",function(req,res){
    oracledb.getConnection(
        db,
        function(err, connection) {
            if (err) {
                console.error(err.message);
                return;
            }
            connection.execute(
                'SELECT * FROM DeveloperObjective',
                function(err, result) {
                    if (err) {
                        console.error(err.message);
                        doRelease(connection);
                        return;
                    }
                    var array=[];
                    for(var i=0;i<result.rows.length;i++){
                        const obj={
                            DevObjectiveType:result.rows[i][1],
                            DevObjestiveDetails:result.rows[i][2],
                        };
                        array.push(obj);
                    }
                    res.json(array);
                    doRelease(connection);
                });
        });
});





module.exports = router;