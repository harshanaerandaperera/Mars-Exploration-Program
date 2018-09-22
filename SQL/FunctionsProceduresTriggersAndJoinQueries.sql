------||----Functions BEGIN----||-----

create type Distance_Array as table of number;

CREATE OR REPLACE FUNCTION getTraversalDistance(D_A IN Distance_Array ) 
RETURN NUMBER
IS
totalDistance NUMBER;
BEGIN
    totalDistance:=0;
    FOR i IN 1..D_A.COUNT LOOP
        totalDistance := D_A(i)+totalDistance;
    END LOOP;
  
    UPDATE ROVERMAP
    SET TraversalDistance = totalDistance
    WHERE RoverID = 1;
    
    RETURN totalDistance;
END;

--getTraversalDistance call
declare
      myarray Distance_Array; 
begin
      myarray := Distance_Array();
      myarray.extend(3);
      myarray(1) := 20;
      myarray(2) := 5;
      myarray(3) := 9;
     dbms_output.put_line(getTraversalDistance( myarray ));
end;
 

---------------------------------------||----Functions END-----||--------------------------------------------------------------------
--------------------------------------||----Procedures BEGIN----||-------------------------------------------------------------------


create PACKAGE mypkg IS
  TYPE numtype IS TABLE OF NUMBER INDEX BY BINARY_INTEGER;
  PROCEDURE updateMap(rid IN NUMBER,traversalP IN VARCHAR2 ,traversalDistances IN numtype);
END;
/




create PACKAGE BODY mypkg IS
 PROCEDURE updateMap(rid IN NUMBER,traversalP IN VARCHAR2, traversalDistances IN numtype) IS
totalDistance NUMBER;
BEGIN
    totalDistance:=0;
    FOR i IN 1..traversalDistances.COUNT LOOP
        totalDistance := traversalDistances(i)+totalDistance;
    END LOOP;

    UPDATE RoverMap
    SET TRAVERSALPATH = traversalP,TRAVERSALDISTANCE = totalDistance 
    WHERE ROVERID=rid;
    END;
END;
/


create PROCEDURE getCreatedRover(RID IN int, RName OUT VARCHAR2,RWeight OUT NUMBER,RHeight OUT NUMBER,RLength OUT NUMBER,RLaunchedDate OUT VARCHAR2,RLandedDate OUT VARCHAR2,RLandedPlace OUT VARCHAR2,RPowerType OUT VARCHAR2,RComputerID OUT int,ROperatingSystem OUT VARCHAR2,RRam OUT NUMBER,RMemoryCapacity OUT NUMBER) AS
BEGIN
  SELECT RoverName,Weight,Height,Length,LaunchedDate,LandedDate,LandedPlace,PowerType INTO RName,RWeight,RHeight,RLength,RLaunchedDate,RLandedDate,RLandedPlace,RPowerType FROM Rover WHERE RoverID = RID;
  SELECT ComputerID,OperatingSystem,Ram,MemoryCapacity INTO RComputerID,ROperatingSystem,RRam,RMemoryCapacity FROM RoverComputer WHERE RoverID = RID;
END;
/



create OR REPLACE PROCEDURE DELETEROVER (RID IN NUMBER)
IS
  BEGIN
    DELETE FROM ROVERMAP WHERE ROVERID=RID;
    DELETE FROM TASK WHERE OBJECTIVEID IN(SELECT OBJECTIVEID FROM OBJECTIVE WHERE COMPUTERID=(SELECT COMPUTERID FROM ROVERCOMPUTER WHERE ROVERID=(RID)));
    DELETE FROM OBJECTIVE WHERE COMPUTERID IN(SELECT COMPUTERID FROM ROVERCOMPUTER WHERE ROVERID=(RID));
    DELETE FROM ROVERCOMPUTER WHERE ROVERID=RID;
    DELETE FROM CAMERA WHERE ROVERID=RID;
    DELETE FROM INSTRUMENT WHERE ROVERID=RID;
    DELETE FROM SENSOR WHERE ROVERID=RID;
    DELETE FROM ROVER WHERE ROVERID=RID;
  END;
/





create PROCEDURE GENERATEREPORT(RID IN NUMBER,TID IN NUMBER)
IS
RCID NUMBER;
RS VARCHAR2(3000);
BEGIN
SELECT COMPUTERID INTO RCID FROM ROVERCOMPUTER WHERE ROVERID=RID;
SELECT MESSAGE INTO RS FROM TRANSMISSION WHERE TRANSMISSIONID=TID;
INSERT INTO REPORT(REPORTID, REPORTTYPE, SUMMARY, COMPUTERID, TRANSMISSIONID) VALUES(REPORTID_AUTO_INCREMENT.nextval,'GENERAL',RS,RCID,TID);
END;
/




--------------------------------------||-----Procedures END-----||-------------------------------------------------------------------

--------------------------------------||----Triggers BEGIN-----||--------------------------------------------------------------------

create trigger INCREMENTOBJECTIVEIDANDRETURN
  before insert
  on OBJECTIVE
  for each row
  DECLARE
BEGIN
  :new.ObjectiveID := ObjectiveID_auto_increment.NEXTVAL;
END;
/


create trigger ITRANSMISSIONIDANDRETURN
  before insert
  on TRANSMISSION
  for each row
  DECLARE
  BEGIN
    :new.TRANSMISSIONID := TRANSMISSIONID_AUTO_INCREMENT.NEXTVAL;
  END;
/



create trigger ROVERTRIGGER
  before insert
  on ROVER
  for each row
  DECLARE
BEGIN
  :new.RoverID := RoverID_auto_increment.NEXTVAL;
END;
/


--when insert new rover to Rover table then get the inserted landed position and update RoverMap's current position
create trigger SETCURRENTPOSITION
  after insert
  on ROVER
  DECLARE
LP VARCHAR2(100);
LastRoverID int;
BEGIN
    SELECT MAX(RoverID) INTO LastRoverID from Rover;
    SELECT LandedPlace INTO LP FROM Rover WHERE RoverID=LastRoverID;
    INSERT INTO RoverMap (MapID,CurrentPosition,RoverID) VALUES(MAPID_AUTO_INCREMENT.NEXTVAL,LP,LastRoverID); 
END;
/


--IF ROVER LANDED DATE IS LESS THAN OR EQUAL TO THE LAUNCHED DATE,THEN ROLLBACK
create trigger ROVERDATEVALIDATE
  before insert
  on ROVER
  for each row
  BEGIN
    IF :NEW.LANDEDDATE <= :NEW.LAUNCHEDDATE
    THEN
      ROLLBACK ;
    END IF;
  END;
/




--------------------------------------||----Triggers END----||-----------------------------------------------------------------------


--------------------------------------------Join Queries----------------------------------------------


----get Rover Details along with Sensorcount ,cameracount,InstrumentCount--------------------
SELECT  R.ROVERID,R.ROVERNAME,R.WEIGHT,R.HEIGHT,R.LENGTH,R.LAUNCHEDDATE,R.LANDEDDATE,R.LANDEDPLACE,R.POWERTYPE,COUNT(DISTINCT S.SENSORID) AS SENSORCOUNT,COUNT(DISTINCT C.CAMERAID) AS CAMERACOUNT,COUNT(DISTINCT I.INSTRUMENTID) AS INSTRUMENTCOUNT
FROM ROVER R
  LEFT JOIN SENSOR S ON R.ROVERID = S.ROVERID
  LEFT JOIN INSTRUMENT I ON  I.ROVERID= R.ROVERID
  LEFT  JOIN CAMERA C ON C.ROVERID = R.ROVERID
GROUP BY  R.ROVERID,R.ROVERNAME,R.WEIGHT,R.HEIGHT,R.LENGTH,R.LAUNCHEDDATE,R.LANDEDDATE,R.LANDEDPLACE,R.POWERTYPE
ORDER BY R.ROVERID DESC;


SELECT TASKDETAILS FROM TASK WHERE OBJECTIVEID IN(SELECT OBJECTIVEID FROM OBJECTIVE WHERE COMPUTERID=(SELECT COMPUTERID FROM ROVERCOMPUTER WHERE ROVERID=(19)));


SELECT R.ROVERID,R.ROVERNAME
FROM ROVER R,ROVERCOMPUTER RC,OBJECTIVE O
WHERE R.ROVERID=RC.ROVERID AND RC.COMPUTERID=O.COMPUTERID
GROUP BY R.ROVERID,R.ROVERNAME;







SELECT R.RoverName,RC.OperatingSystem
FROM Rover R,RoverComputer RC
WHERE R.RoverID=RC.RoverID AND R.R=1;


SELECT R.*,RC.*
FROM ROVER R,ROVERCOMPUTER RC
WHERE R.ROVERID=RC.ROVERID AND R.ROVERID=1;

SELECT *
FROM INSTRUMENT
WHERE ROVERID=1;

SELECT *
FROM CAMERA
WHERE ROVERID=1;

SELECT DISTINCT C.CAMERATYPE,I.INSTRUMENTTYPE,S.SENSORTYPE
FROM CAMERA C,INSTRUMENT I,SENSOR S,ROVER R
WHERE R.ROVERID=C.ROVERID AND R.ROVERID=I.ROVERID AND R.ROVERID=S.ROVERID AND R.ROVERID=1;