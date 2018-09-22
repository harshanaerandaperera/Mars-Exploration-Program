---Rover Creation--------Main Tables------------


CREATE TABLE Rover (
  RoverID NUMBER,
  RoverName VARCHAR2(80) NOT NULL,
  Weight NUMBER NOT NULL,
  Height NUMBER NOT NULL,
  Length NUMBER NOT NULL,
  LaunchedDate DATE NOT NULL,
  LandedDate DATE NOT NULL,
  LandedPlace VARCHAR2(100) NOT NULL,
  PowerType VARCHAR2(40) NOT NULL,
  CONSTRAINT pk_Rover PRIMARY KEY(RoverID)
);
CREATE SEQUENCE RoverID_auto_increment start with 1 increment by 1;


CREATE TABLE RoverComputer (
  ComputerID NUMBER,
  OperatingSystem VARCHAR2(80) NOT NULL,
  Ram NUMBER NOT NULL,
  MemoryCapacity NUMBER NOT NULL,
  RoverID NUMBER ,
  CONSTRAINT pk_RoverComputer PRIMARY KEY(ComputerID),
  CONSTRAINT fk0_RoverComputer FOREIGN KEY(RoverID) REFERENCES Rover(RoverID)
);
CREATE SEQUENCE ComputerID_auto_increment start with 1 increment by 1;


CREATE TABLE Objective (
  ObjectiveID NUMBER,
  ObjectiveType VARCHAR2(100),
  ComputerID NUMBER,
  CONSTRAINT pk_Objective PRIMARY KEY(ObjectiveID),
  CONSTRAINT fk0_Objective FOREIGN KEY(ComputerID) REFERENCES RoverComputer(ComputerID)
);
CREATE SEQUENCE ObjectiveID_auto_increment start with 1 increment by 1;


CREATE TABLE Report (
  ReportID NUMBER,
  ReportType VARCHAR2(100),
  Summary VARCHAR2(500),
  ComputerID NUMBER,
  TransmissionID NUMBER,
  CONSTRAINT pk_Report PRIMARY KEY(ReportID),
  CONSTRAINT fk0_Report FOREIGN KEY(ComputerID) REFERENCES RoverComputer(ComputerID),
  CONSTRAINT fk1_Report FOREIGN KEY(TransmissionID) REFERENCES Transmission(TransmissionID)
);
CREATE SEQUENCE ReportID_auto_increment start with 1 increment by 1;

CREATE TABLE Transmission (
  TransmissionID NUMBER,
  Receiver VARCHAR2(50),
  Message VARCHAR2(255),
  TransmissionDate DATE,
  CONSTRAINT pk_Transmission PRIMARY KEY(TransmissionID)
);
CREATE SEQUENCE TransmissionID_auto_increment start with 1 increment by 1;


CREATE TABLE Task (
  TaskID NUMBER,
  TaskDetails VARCHAR2(255),
  ObjectiveID NUMBER,
  CONSTRAINT pk_Task PRIMARY KEY(TaskID),
  CONSTRAINT fk0_Task FOREIGN KEY(ObjectiveID) REFERENCES Objective(ObjectiveID)
);
CREATE SEQUENCE TaskID_auto_increment start with 1 increment by 1;


CREATE TABLE RoverMap (
  MapID NUMBER,
  CurrentPosition VARCHAR2(100),
  TraversalPath VARCHAR2(300),
  TraversalDistance NUMBER,
  RoverID NUMBER ,
  CONSTRAINT pk_RoverMap PRIMARY KEY(MapID),
  CONSTRAINT fk0_RoverMap FOREIGN KEY(RoverID) REFERENCES Rover(RoverID)
);
CREATE SEQUENCE MapID_auto_increment start with 1 increment by 1;

CREATE TABLE Camera (
  CameraID NUMBER,
  CameraType VARCHAR2(200),
  MountedLocation VARCHAR2(150),
  RoverID NUMBER ,
  CONSTRAINT pk_Camera PRIMARY KEY(CameraID),
  CONSTRAINT fk0_Camera FOREIGN KEY(RoverID) REFERENCES Rover(RoverID)
);
CREATE SEQUENCE CameraID_auto_increment start with 1 increment by 1;


CREATE TABLE Instrument (
  InstrumentID NUMBER,
  InstrumentType VARCHAR2(200),
  MountedLocation VARCHAR2(150),
  RoverID NUMBER ,
  CONSTRAINT pk_Instrument PRIMARY KEY(InstrumentID),
  CONSTRAINT fk0_Instrument FOREIGN KEY(RoverID) REFERENCES Rover(RoverID)
);
CREATE SEQUENCE InstrumentID_auto_increment start with 1 increment by 1;


CREATE TABLE Sensor (
  SensorID NUMBER,
  SensorType VARCHAR2(200),
  MountedLocation VARCHAR2(150),
  RoverID NUMBER ,
  CONSTRAINT pk_Sensor PRIMARY KEY(SensorID),
  CONSTRAINT fk0_Sensor FOREIGN KEY(RoverID) REFERENCES Rover(RoverID)
);
CREATE SEQUENCE SensorID_auto_increment start with 1 increment by 1;