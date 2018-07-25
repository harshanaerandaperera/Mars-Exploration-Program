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
    res.send("Hello You can Initialize rover here");
});


/**
 * Initializerover With Before Insert Trigger
 */
router.post("/initializerover", function(req,res) {
    oracledb.getConnection(
        db,
        function(err, connection) {
            if (err) {
                console.error(err.message);
                return;
            }
            connection.execute(
                'INSERT INTO Rover(RoverName,Weight,Height,Length,LaunchedDate,LandedDate,LandedPlace,PowerType) VALUES (:RoverName,:Weight,:Height,:Length,:LaunchedDate,:LandedDate,:LandedPlace,:PowerType)RETURN RoverID INTO :RoverID',
                {
                    RoverID : {type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
                    RoverName: req.body.RoverName,
                    Weight:req.body.Weight,
                    Height:req.body.Height,
                    Length:req.body.Length,
                    LaunchedDate:req.body.LaunchedDate,
                    LandedDate:req.body.LandedDate,
                    LandedPlace:req.body.LandedPlace,
                    PowerType:req.body.PowerType
                },

                { autoCommit: true },
                function(err, result) {
                    if (err) {
                        console.error(err.message);
                        doRelease(connection);
                        return;
                    }
                    res.json(result.outBinds.RoverID);
                    doRelease(connection);
                });
        });
});

/**
 *  Add Rover Brain
 */
router.post("/addroverbrain", function(req,res) {
    oracledb.getConnection(
        db,
        function(err, connection) {
            if (err) {
                console.error(err.message);
                return;
            }
            connection.execute(
                'INSERT INTO RoverComputer VALUES(ComputerID_auto_increment.nextval,:OperatingSystem,:Ram,:MemoryCapacity,:RoverID)',
                {
                    OperatingSystem: req.body.OperatingSystem,
                    Ram:req.body.Ram,
                    MemoryCapacity:req.body.MemoryCapacity,
                    RoverID:req.body.RoverID

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

/**
 * Add Rover Sensors
 */
router.post("/addroversensors", function(req,res) {
    oracledb.getConnection(
        db,
        function(err, connection) {
            if (err) {
                console.error(err.message);
                return;
            }
            connection.execute(
                'INSERT INTO Sensor VALUES(SensorID_auto_increment.nextval,:SensorType,:MountedLocation,:RoverID)',
                {
                    SensorType: req.body.SensorType,
                    MountedLocation:req.body.sensorMountedLocation,
                    RoverID:req.body.RoverID
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

/**
 * Add Rover Vision
 */
router.post("/addRovervision", function(req,res) {
    oracledb.getConnection(
        db,
        function(err, connection) {
            if (err) {
                console.error(err.message);
                return;
            }
            connection.execute(
                'INSERT INTO Camera VALUES(CameraID_auto_increment.nextval,:CameraType,:MountedLocation,:RoverID)',
                {
                    CameraType: req.body.CameraType,
                    MountedLocation:req.body.MountedLocation,
                    RoverID:req.body.RoverID
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

/**
 * Add Rover Instruments
 */
router.post("/addroverinstruments", function(req,res) {
    oracledb.getConnection(
        db,
        function(err, connection) {
            if (err) {
                console.error(err.message);
                return;
            }
            connection.execute(
                'INSERT INTO Instrument VALUES(InstrumentID_auto_increment.nextval,:InstrumentType,:MountedLocation,:RoverID)',
                {
                    InstrumentType: req.body.InstrumentType,
                    MountedLocation:req.body.instrumentMountedLocation,
                    RoverID:req.body.RoverID
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


/**
 * PLSQL Procedure getCreatedRover Created Rover Report
 */
router.get("/getroverswithcomputerid/:rid",function(req,res){
    oracledb.getConnection(
        db,
        function(err, connection) {
            if (err) {
                console.error(err.message);
                return;
            }
            connection.execute(
                "BEGIN getCreatedRover(:RoverID,:RoverName,:Weight,:Height,:Length,:LaunchedDate,:LandedDate,:LandedPlace,:PowerType,:ComputerID,:OperatingSystem,:Ram,:MemoryCapacity); END;",
                {  // bind variables
                    RoverID:   req.params.rid,
                    RoverName: { dir: oracledb.BIND_OUT, type: oracledb.STRING},
                    Weight: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER},
                    Height: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER},
                    Length: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER},
                    LaunchedDate: { dir: oracledb.BIND_OUT, type: oracledb.STRING},
                    LandedDate: { dir: oracledb.BIND_OUT, type: oracledb.STRING},
                    LandedPlace: { dir: oracledb.BIND_OUT, type: oracledb.STRING},
                    PowerType: { dir: oracledb.BIND_OUT, type: oracledb.STRING},
                    ComputerID: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER},
                    OperatingSystem: { dir: oracledb.BIND_OUT, type: oracledb.STRING},
                    Ram: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER},
                    MemoryCapacity: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER},
                },
                function(err, result) {
                    if (err) {
                        console.error(err.message);
                        doRelease(connection);
                        return;
                    }
                    res.json(result.outBinds);
                    doRelease(connection);
                });
        });
});

/**
 *Get Sensors that added for initialized Rover (Report)
 */
router.get("/getroversensorsbyrid/:rid",function(req,res){
    oracledb.getConnection(
        db,
        function(err, connection) {
            if (err) {
                console.error(err.message);
                return;
            }
            connection.execute(
                "SELECT SENSORTYPE,MOUNTEDLOCATION FROM SENSOR WHERE ROVERID= :rid",
                {  // bind variables
                    rid:req.params.rid,

                },
                { outFormat: oracledb.OBJECT },
                function(err, result) {
                    if (err) {
                        console.error(err.message);
                        doRelease(connection);
                        return;
                    }
                    res.json(result.rows);
                });
        });
});

/**
 * Get Cameras that added for initialized Rover (Report)
 */
router.get("/getrovercamerasbyrid/:rid",function(req,res){
    oracledb.getConnection(
        db,
        function(err, connection) {
            if (err) {
                console.error(err.message);
                return;
            }
            connection.execute(

                "SELECT CAMERATYPE,MOUNTEDLOCATION FROM CAMERA WHERE ROVERID= :rid",
                {  // bind variables
                    rid:req.params.rid,

                },
                { outFormat: oracledb.OBJECT },
                function(err, result) {
                    if (err) {
                        console.error(err.message);
                        doRelease(connection);
                        return;
                    }
                    res.json(result.rows);
                });
        });
});

/**
 * Get Instruments that added for initialized Rover (Report)
 */
router.get("/getroverinstrumentsbyrid/:rid",function(req,res){
    oracledb.getConnection(
        db,
        function(err, connection) {
            if (err) {
                console.error(err.message);
                return;
            }
            connection.execute(
                "SELECT INSTRUMENTTYPE,MOUNTEDLOCATION FROM INSTRUMENT WHERE ROVERID= :rid",
                {  // bind variables
                    rid:req.params.rid,

                },
                { outFormat: oracledb.OBJECT },
                function(err, result) {
                    if (err) {
                        console.error(err.message);
                        doRelease(connection);
                        return;
                    }
                    res.json(result.rows);
                });
        });
});


/**
 * Get All Rovers With Parts Count
 */
router.get("/getallroverswithpartscount",function(req,res){
    oracledb.getConnection(
        db,
        function(err, connection) {
            if (err) {
                console.error(err.message);
                return;
            }connection.execute(
                'SELECT  R.ROVERID,R.ROVERNAME,R.WEIGHT,R.HEIGHT,R.LENGTH,R.LAUNCHEDDATE,R.LANDEDDATE,R.LANDEDPLACE,R.POWERTYPE,COUNT(DISTINCT S.SENSORID) AS SENSORCOUNT,COUNT(DISTINCT C.CAMERAID) AS CAMERACOUNT,COUNT(DISTINCT I.INSTRUMENTID) AS INSTRUMENTCOUNT FROM ROVER R LEFT JOIN SENSOR S ON R.ROVERID = S.ROVERID LEFT JOIN INSTRUMENT I ON  I.ROVERID= R.ROVERID LEFT  JOIN CAMERA C ON C.ROVERID = R.ROVERID GROUP BY  R.ROVERID,R.ROVERNAME,R.WEIGHT,R.HEIGHT,R.LENGTH,R.LAUNCHEDDATE,R.LANDEDDATE,R.LANDEDPLACE,R.POWERTYPE ORDER BY R.ROVERID DESC',
                function(err, result) {
                    if (err) {
                        console.error(err.message);
                        doRelease(connection);
                        return;
                    }
                    var array=[];
                    for(var i=0;i<result.rows.length;i++){
                        const obj={
                            RoverID:result.rows[i][0],
                            RoverName:result.rows[i][1],
                            Weight:result.rows[i][2],
                            Height:result.rows[i][3],
                            Length:result.rows[i][4],
                            LaunchedDate:result.rows[i][5],
                            LandedDate:result.rows[i][6],
                            LandedPlace:result.rows[i][7],
                            powertype:result.rows[i][8],
                            SENSORCOUNT:result.rows[i][9],
                            CAMERACOUNT:result.rows[i][10],
                            INSTRUMENTCOUNT:result.rows[i][11]
                        };
                        array.push(obj);
                    }
                    res.json(array);
                    doRelease(connection);
                });
        });
});


/**
 * Update Rover Query
 */
router.put("/updaterover", function(req,res){
    oracledb.getConnection(
        db,
        function(err, connection) {
            if (err) {
                console.error(err.message);
                return;
            }
            connection.execute(
                "UPDATE ROVER SET ROVERNAME = :RName,WEIGHT=:RWeight,HEIGHT=:RHeight,LENGTH=:RLength,POWERTYPE=:RPowerType WHERE ROVERID= :rid",
                {
                    rid:req.body.rid,
                    RName:req.body.RoverName,
                    RWeight:req.body.Weight,
                    RHeight:req.body.Height,
                    RLength:req.body.Length,
                    RPowerType:req.body.PowerType

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



/**
 * Delete A Particular Rover With A Procedure
 */
router.delete("/roverdelete/:rid", function(req,res){
    oracledb.getConnection(
        db,
        function(err, connection) {
            if (err) {
                console.error(err.message);
                return;
            }
            connection.execute(
                "BEGIN DELETEROVER(:rid); END;",
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
                    console.log(result);
                    doRelease(connection);
                });
        });
});


//extra
/**
 * Oracle Delete Query
 */
router.delete("/deleterover/:rid", function(req,res){
 oracledb.getConnection(
        db,
        function(err, connection) {
            if (err) {
                console.error(err.message);
                return;
            }
            connection.execute(
                "DELETE FROM rover WHERE roverid = :rid",
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
                    console.log(result);
                    doRelease(connection);
                });
 });
});


/**
 * PLSQL Function
 */
//extra
router.get("/getrovercount",function(req,res){
    oracledb.getConnection(
        db,
        function(err, connection) {
            if (err) {
                console.error(err.message);
                return;
            }
            connection.execute(
                "BEGIN :totalRovers := totalRover(); END;",
                { totalRovers: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 40 } },
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

//extra
router.post("/addDistance",function(req,res){
    oracledb.getConnection(
        db,
        function(err, connection) {
            if (err) {
                console.error(err.message);
                return;
            }
            connection.execute(
                "BEGIN mypkg.myinproc(:id, :vals); END;",
                {
                    id: req.body.id,
                    vals: { type: oracledb.NUMBER,
                        dir: oracledb.BIND_IN,
                        val:req.body.vals
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


module.exports = router;