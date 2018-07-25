import {Component, OnInit} from '@angular/core';
import {RestfullService} from '../service/restfull.service';
import {Devcameras} from "./devcameras";
import {Devsensors} from "./devsensors";
import {Devinstruments} from "./devinstruments";
import {Rover} from "../rovercontroller/rover";
import {Router} from '@angular/router'
import {Roversensors} from "./roversensors";
import {Rovercameras} from "./rovercameras";
import {Roverinstruments} from "./roverinstruments";
import {FlashMessagesService} from "angular2-flash-messages";

@Component({
    selector: 'app-creator',
    templateUrl: './creator.component.html',
})
export class CreatorComponent implements OnInit {

    btnStatus: String;

    selectedRidToUpdateRover: Number;


    roverArray: Rover[] = [];

    /**
     *
     * Arrays That Collect Display Drop Down Details
     */
    devOperatingSystemArray: String[] = [];
    devSensorArray: Devsensors[] = [];
    devCameraArray: Devcameras[] = [];
    devInstrumentArray: Devinstruments[] = [];
    sensors: Roversensors[] = [];
    cameras: Rovercameras[] = [];
    instruments: Roverinstruments[] = [];

    /**
     * Initialize Rover Form Data
     */
    currentRid: Number;
    RoverName: String;
    Weight: Number;
    Height: Number;
    Length: Number;
    LaunchedDate: String;
    LandedDate: String;
    LandedPlace: String;
    PowerType: String;
    /**
     * Add Rover Brain Form Data
     */
    OperatingSystem: String;
    Ram: Number;
    MemoryCapacity: Number;
    /**
     * Add Rover Sensors Form Data
     */
    SensorType: String;
    sensorMountedLocation: String;
    /**
     *Add Rover Vision Form Data
     */
    CameraType: String;
    // CameraCount:Number;
    MountedLocation: String;
    /**
     * Add Rover Instruments Form Data
     */
    InstrumentType: String;
    // InstrumentCount:Number;
    instrumentMountedLocation: String;
    /**
     *Add New Part Form Data
     */
    rovernewpart: String;

    /**
     * Update Rover Form
     */
    roverUpdateParts: String;


    /**
     *
     * @param {RestfullService} restfullService
     * @param router
     * @param flashMessages
     */
    constructor(
        private restfullService: RestfullService,
        private router: Router,
        private flashMessage: FlashMessagesService
    ) {
    }

    ngOnInit() {
        this.DeveloperOperatingSystem();
        this.displayDeveloperSensors();
        this.displayDeveloperCameras();
        this.displayDeveloperInstruments();
        this.displayRovers();

    }

//functions
    changeBtnStatusToInitializeRover() {
        this.btnStatus = "initializeRover"


}

checkBtnStatusToInitializeRover() {
if (this.btnStatus == "initializeRover") {
return true;
}
}

changeBtnStatusToDashboard() {
this.btnStatus = "dashboard"
}


changeBtnStatusToAddBrain() {
this.btnStatus = "addBrain"
}

checkBtnStatusToAddBrain() {
if (this.btnStatus == "addBrain") {
return true;
}
}

changeBtnStatusToAddSensors() {
this.btnStatus = "addSensors"
}

checkBtnStatusToAddSensors() {
if (this.btnStatus == "addSensors") {
return true;
}
}

changeBtnStatusToAddVision() {
this.btnStatus = "addVision"
}

checkBtnStatusToAddVision() {
if (this.btnStatus == "addVision") {
return true;
}
}

changeBtnStatusToAddInstruments() {
this.btnStatus = "addInstruments"
}

checkBtnStatusToAddInstruments() {
if (this.btnStatus == "addInstruments") {
return true;
}
}

changeBtnStatusToDisplayRoverDesign() {
this.btnStatus = "roverDesign";
this.getCreatedRoverSensors(this.currentRid);
this.getCreatedRoverCameras(this.currentRid);
this.getCreatedRoverInstruments(this.currentRid);

}

checkBtnStatusToDisplayRoverDesign() {
if (this.btnStatus == "roverDesign") {
return true;
}
}

initializeRover() {
const initializeRover = {
RoverName: this.RoverName,
Weight: this.Weight,
Height: this.Height,
Length: this.Length,
LaunchedDate: this.LaunchedDate,
LandedDate: this.LandedDate,
LandedPlace: this.LandedPlace,
PowerType: this.PowerType,
};
this.restfullService.initializeRoverService(initializeRover).subscribe(res => {
    /* this.router.navigate(['/developerpage']);
this.flashMessage.show('Project Due Date Can Not Be Before The Start Date!', {
    cssClass: 'alert-danger',
    timeout: 2000
});*/
               this.changeBtnStatusToAddBrain();
            this.currentRid = res[0];


            // console.log( this.currentRid);
        });
    }

    addRoverBrain() {
        const roverBrain = {
            OperatingSystem: this.OperatingSystem,
            Ram: this.Ram,
            MemoryCapacity: this.MemoryCapacity,
            RoverID: this.currentRid
        };
        console.log(roverBrain);
        this.restfullService.addRoverBrainService(roverBrain).subscribe(res => {
            this.changeBtnStatusToAddSensors();
            /* this.flashMessages.show('Project Due Date Can Not Be Before The Start Date!', {cssClass: 'alert-danger', timeout: 2000});
             this.router.navigate(['/home']);*/
        });
    }

    addRoverVision() {
        const roverVision = {
            CameraType: this.CameraType,
            // CameraCount: this.CameraCount,
            MountedLocation: this.MountedLocation,
            RoverID: this.currentRid
        };
        this.CameraType = " ";
        //   this.CameraCount=0;
        this.MountedLocation = " ";


        this.restfullService.addRoverVisionService(roverVision).subscribe(res => {
        });
    }

    addRoverInstruments() {
        const roverInstrument = {
            InstrumentType: this.InstrumentType,
            // InstrumentCount: this.InstrumentCount,
            instrumentMountedLocation: this.instrumentMountedLocation,
            RoverID: this.currentRid
        };
        this.InstrumentType = " ";
        // this.InstrumentCount=0;
        this.instrumentMountedLocation = " ";

        this.restfullService.addRoverInstrumentsService(roverInstrument).subscribe(res => {
            // this.changeBtnStatusToDisplayRoverDesign();
        });
    }

    addRoverSensors() {
        const roverSensors = {
            SensorType: this.SensorType,
            sensorMountedLocation: this.sensorMountedLocation,
            RoverID: this.currentRid
        };
        this.SensorType = " ";
        this.sensorMountedLocation = " ";


        this.restfullService.addRoverSensorsService(roverSensors).subscribe(res => {

        });
    }

    DeveloperOperatingSystem() {
        this.restfullService.DeveloperOperatingSystemService().subscribe(res => {
            this.devOperatingSystemArray = res;
        });
    }

    displayDeveloperSensors() {
        this.restfullService.displayDeveloperSensorsService().subscribe(res => {
            this.devSensorArray = res;
        });
    }

    displayDeveloperCameras() {
        this.restfullService.displayDeveloperCamerasService().subscribe(res => {
            this.devCameraArray = res;
        });
    }

    displayDeveloperInstruments() {
        this.restfullService.displayDeveloperInstrumentsService().subscribe(res => {
            this.devInstrumentArray = res;
        });
    }

//Manage Rovers

    changeBtnStatusToDisplayRovers() {
        this.btnStatus = "displayRovers"
    }

    checkBtnStatusToDisplayRovers() {
        if (this.btnStatus == "displayRovers") {
            return true;
        }
    }

    changeBtnStatusToAddNewParts(rid) {
        this.btnStatus = "addNewPart";
        this.currentRid = rid;
        for (var i = 0; i < this.roverArray.length; i++) {
            if (this.roverArray[i].RoverID == rid) {
                this.RoverName = this.roverArray[i].RoverName;
            }
        }
    }

    checkBtnStatusToAddNewParts() {
        if (this.btnStatus == "addNewPart") {
            return true;
        }
    }

    displayRovers() {
        this.restfullService.displayRoversService().subscribe(res => {
            this.roverArray = res;
        });
    }

    changeBtnStatusToAddNewSensorCameraInstrument() {
        if (this.rovernewpart == "Sensors") {
            this.btnStatus = "addNewSensor"
        }
        if (this.rovernewpart == "Cameras") {
            this.btnStatus = "addNewCamera"
        }
        if (this.rovernewpart == "Instruments") {
            this.btnStatus = "addNewInstrument"
        }

    }

    checkBtnStatusToAddNewSensor() {
        if (this.btnStatus == "addNewSensor") {
            return true;
        }
    }

    checkBtnStatusToAddNewCamera() {
        if (this.btnStatus == "addNewCamera") {
            return true;
        }
    }

    checkBtnStatusToAddNewInstrument() {
        if (this.btnStatus == "addNewInstrument") {
            return true;
        }
    }

    findUpdateToBeRover(rid) {
        this.changeBtnStatusToRoverUpdate();
        this.selectedRidToUpdateRover = rid;
        for (var i = 0; i < this.roverArray.length; i++) {
            if (this.roverArray[i].RoverID == rid) {
                this.RoverName = this.roverArray[i].RoverName;
                this.Weight = this.roverArray[i].Weight;
                this.Height = this.roverArray[i].Height;
                this.Length = this.roverArray[i].Length;
                this.PowerType = this.roverArray[i].powertype
            }
        }

    }

    changeBtnStatusToRoverUpdate() {
        this.btnStatus = "roverUpdate"
    }

    checkBtnStatusToRoverUpdate() {
        if (this.btnStatus == "roverUpdate") {
            return true;
        }

    }

    updateRover() {

        const update = {
            rid: this.selectedRidToUpdateRover,
            RoverName: this.RoverName,
            Weight: this.Weight,
            Height: this.Height,
            Length: this.Length,
            PowerType: this.PowerType,
        };
        this.restfullService.updateRoverService(update).subscribe(res => {
            alert("Updated Rover Successfully");
            this.changeBtnStatusToDisplayRovers();
        });

    }

    deleteARover(id) {
            if(confirm("Are you sure want to delete this rover?")){
                this.restfullService.deleteARoverService(id).subscribe(res => {
                });
            }
    }

    getCreatedRoverSensors(rid) {
        this.restfullService.getCreatedRoverSensorsServices(rid).subscribe(res => {
            this.sensors = res;
            //console.log(this.sensors);

        });

    }

    getCreatedRoverCameras(rid) {
        this.restfullService.getCreatedRoverCamerasServices(rid).subscribe(res => {
            this.cameras = res;
            //console.log(this.sensors);

        });

    }

    getCreatedRoverInstruments(rid) {
        this.restfullService.getCreatedRoverInstrumentsServices(rid).subscribe(res => {
            this.instruments = res;
        });

    }

}

