import { Component, OnInit } from '@angular/core';
import{RestfullService} from '../service/restfull.service';


@Component({
  selector: 'app-developer',
  templateUrl: './developer.component.html',
})
export class DeveloperComponent implements OnInit {

    btnStatus:String;
    /**
     *Manage Camera Form Data
     */
    DevCameraType:String;
    DevCameraDetails:String;

    /**
     * Manage Instruments Form Data
     */
    DevInstrumentType:String;
    DevInstrumentDetails:String;
    /**
     * Manage Sensors Form Data
     */
    DevSensorType:String;
    DevSensorDetails:String;
    /**
     * -Manage Operating Systems Form Data
     */
    DevOperatingSystem:String;
    /**
     * Manage Objectives Form Data
     */
    DevObjectiveType:String;
    DevObjestiveDetails:String;

  constructor(private restfullService:RestfullService ) { }

  ngOnInit() {
  }
changeBtnStatusToDeveloperDashboard(){
    this.btnStatus="DeveloperDashboard";
}
checkBtnStatusToDeveloperDashboard(){
    if(this.btnStatus=="DeveloperDashboard"){
        return true;
    }
}
  changeBtnStatusToManageCamera(){
    this.btnStatus="ManageCamera";
  }
  checkBtnStatusToManageCamera(){
    if(this.btnStatus=="ManageCamera"){
      return true;
    }
  }
    changeBtnStatusToManageInstruments(){
        this.btnStatus="ManageInstruments";
    }

    checkBtnStatusToManageInstruments(){
        if(this.btnStatus=="ManageInstruments"){
            return true;
        }
    }
    changeBtnStatusToManageSensors(){
        this.btnStatus="ManageSensors";
    }
     checkBtnStatusToManageSensors(){
           if(this.btnStatus=="ManageSensors"){
               return true;
           }
       }
    changeBtnStatusToManageOperatingSystems(){
      this.btnStatus="ManageOperatingSystems";
  }
     checkBtnStatusToManageOperatingSystems(){
            if(this.btnStatus=="ManageOperatingSystems"){
                return true;
            }
        }
    changeBtnStatusToManageObjectives(){
        this.btnStatus="ManageObjectives";
      }
     checkBtnStatusManageObjectives(){
           if(this.btnStatus=="ManageObjectives"){
               return true;
           }
       }
    addDeveloperCameras(){
        const camera={
            DevCameraType:this.DevCameraType,
            DevCameraDetails:this.DevCameraDetails
        };
        this.DevCameraType=" ";
        this.DevCameraDetails=" ";
        this.restfullService.addDeveloperCamerasService(camera).subscribe(res => {
        });
    }
    addDeveloperInstruments(){
        const instrument={
            DevInstrumentType:this.DevInstrumentType,
            DevInstrumentDetails:this.DevInstrumentDetails
        };
        this.DevInstrumentType=" ";
        this.DevInstrumentDetails=" ";
        this.restfullService.addDeveloperInstrumentsService(instrument).subscribe(res => {
        });
    }
    addDeveloperSensors(){
        const sensor={
            DevSensorType:this.DevSensorType,
            DevSensorDetails:this.DevSensorDetails
        };
        this.DevSensorType=" ";
        this.DevSensorDetails=" ";
        this.restfullService.addDeveloperSensorsService(sensor).subscribe(res => {
        });
    }
    addDevelOperoperatingSystems(){
        const os={
            DevOperatingSystem:this.DevOperatingSystem
        };
        this.DevOperatingSystem=" ";
        this.restfullService.addDeveloperOperatingSystemsService(os).subscribe(res => {
        });
    }

    addDeveloperoperObjectivesTypes(){
        const objective={
            DevObjectiveType:this.DevObjectiveType,
            DevObjestiveDetails:this.DevObjestiveDetails
        };
        this.DevObjectiveType=" ";
        this.DevObjestiveDetails=" ";
        this.restfullService.addDeveloperoperObjectivesTypesService(objective).subscribe(res => {
        });
    }

}
