const express = require('express');
const router = express.Router();
const oracledb = require('oracledb');
const db={
    user          : "harshana",
    password      : "123",
    connectString : "localhost/xe"
};

router.get("", function(req, res){
    res.send("Hello You can Initialize rover here");
});
router.get("/getrovers",function(req,res){
oracledb.getConnection(
    db,
    function(err, connection) {
        if (err) {
            console.error(err.message);
            return;
        }
        connection.execute(
            'SELECT * FROM rovertable',
            function(err, result) {
                if (err) {
                    console.error(err.message);
                    doRelease(connection);
                    return;
                }
               // console.log(result.rows);
                res.json(result.rows);
                doRelease(connection);
            });
    });
function doRelease(connection) {
    connection.close(
        function(err) {
            if (err)
                console.error(err.message);
        });
}
});
router.post("/initializerover", function(req,res) {
    oracledb.getConnection(
    db,
    function(err, connection) {
        if (err) {
            console.error(err.message);
            return;
        }
        connection.execute(
            'INSERT INTO rovertable VALUES (rid_auto_increment.nextval,:name,:weight,:height,:length,:launchedDate,:landedDate,:launchedPlace,:landedPlace,:powerType)',
            {
                name: req.body.name,
                weight:req.body.weight,
                height:req.body.height,
                length:req.body.length,
                launchedDate:req.body.launchedDate,
                landedDate:req.body.landedDate,
                launchedPlace:req.body.launchedPlace,
                landedPlace:req.body.landedPlace,
                powerType:req.body.powerType
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
        function doRelease(connection) {
        connection.close(
            function(err) {
                if (err)
                    console.error(err.message);
            });
    }
});
router.put("/updaterover", function(req,res){
    oracledb.getConnection(
        db,
        function(err, connection) {
            if (err) {
                console.error(err.message);
                return;
            }
            connection.execute(
                "UPDATE rovertable SET name = :name WHERE rid= :rid",
                {
                    rid:req.body.rid,
                    name:req.body.name
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
    function doRelease(connection) {
        connection.close(
            function(err) {
                if (err)
                    console.error(err.message);
            });
    }
});
router.delete("/deleterover/:rid", function(req,res){
 oracledb.getConnection(
        db,
        function(err, connection) {
            if (err) {
                console.error(err.message);
                return;
            }
            connection.execute(
                "DELETE FROM rovertable WHERE rid = :rid",
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
    function doRelease(connection) {
        connection.close(
            function(err) {
                if (err)
                    console.error(err.message);
            });
    }

});

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
    function doRelease(connection) {
        connection.close(
            function(err) {
                if (err)
                    console.error(err.message);
            });
    }

});
router.get("/getarover/:rid",function(req,res){
    oracledb.getConnection(
        db,
        function(err, connection) {
            if (err) {
                console.error(err.message);
                return;
            }
            connection.execute(
                "BEGIN SELECT name INTO :name FROM rovertable WHERE rid = :rid; END;",
                {  // bind variables
                    rid:req.params.rid,
                    name: { dir: oracledb.BIND_OUT, type: oracledb.STRING, maxSize: 40 },
                },
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
    function doRelease(connection) {
        connection.close(
            function(err) {
                if (err)
                    console.error(err.message);
            });
    }

});



module.exports = router;