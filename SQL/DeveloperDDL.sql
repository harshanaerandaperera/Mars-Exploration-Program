--For the test data we have to create a developer tables, actualy it's insert update delete for some dropdowns

CREATE TABLE DeveloperCamera (
    DevCameraID NUMBER,
    DevCameraType VARCHAR2(200),
    DevCameraDetails VARCHAR2(500),
    CONSTRAINT pk_DeveloperCamera PRIMARY KEY(DevCameraID)
);
CREATE SEQUENCE DevCameraID_auto_increment start with 1 increment by 1;


CREATE TABLE DeveloperInstrument (
    DevInstrumentID NUMBER,
    DevInstrumentType VARCHAR2(200),
    DevInstrumentDetails VARCHAR2(500),
    CONSTRAINT pk_DeveloperInstrument PRIMARY KEY(DevInstrumentID)
);
CREATE SEQUENCE DevInstrumentID_auto_increment start with 1 increment by 1;


CREATE TABLE DeveloperSensor (
    DevSensorID NUMBER,
    DevSensorType VARCHAR2(200),
    DevSensorDetails VARCHAR2(500),
    CONSTRAINT pk_DeveloperSensor PRIMARY KEY(DevSensorID)
);
CREATE SEQUENCE DevSensorID_auto_increment start with 1 increment by 1;


CREATE TABLE DeveloperOperatingSystem (
    DevOsID NUMBER,
    DevOperatingSystem VARCHAR2(200),
    CONSTRAINT pk_DeveloperOperatingSystem PRIMARY KEY(DevOsID)
);
CREATE SEQUENCE DevOsID_auto_increment start with 1 increment by 1;


CREATE TABLE DeveloperObjective (
    DevObjectiveID NUMBER,
    DevObjectiveType VARCHAR2(200),
    DevObjestiveDetails VARCHAR2(500),
    CONSTRAINT pk_DeveloperObjective PRIMARY KEY(DevObjectiveID)
);
CREATE SEQUENCE DevObjectiveID_auto_increment start with 1 increment by 1;