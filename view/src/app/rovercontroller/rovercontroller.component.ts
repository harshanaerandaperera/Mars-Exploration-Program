import { Component, OnInit } from '@angular/core';
import{RestfullService} from '../service/restfull.service';
import {Rover} from "./rover";
import {Objectives} from "./objectives";

@Component({
  selector: 'app-rovercontroller',
  templateUrl: './rovercontroller.component.html',
})
export class RovercontrollerComponent implements OnInit {
  btnStatus:String;


  selectedComputerId:Number;
  selectedRoverName:String;
  selectedObjectiveTypeToAddTasks:String;

    /**
     *
     * Arrays That Collect data To Display
     */
  roverArray:Rover[]=[];
  objectiveArray:Objectives[]=[];

//objective id that insert into the table
  currentObjectiveId:Number;
    /**
     * Rover Task form Data
     */
    TaskDetails:String;



  constructor(private restfullService:RestfullService ) { }
  ngOnInit() {
    this.displayRovers();
    this.displayObjectives();

  }
  changeBtnStatusToDefaultPage(){
        this.btnStatus="default";

    }

  changeBtnStatusToSetObjectives(){
    this.btnStatus="setObjective"
  }
  checkBtnStatusToSetObjectives(){
    if(this.btnStatus=="setObjective"){
      return true;
    }
  }
  checkchangeBtnStatusToDisplayAddedObjectives(){
    if(this.btnStatus=="addedObjective"){
      return true;
    }
  }
  changeBtnStatusToSetTasks(){
    this.btnStatus="setTasks";
    }
  checkBtnStatusToSetTasks(){
    if(this.btnStatus=="setTasks"){
      return true;
    }
  }
   displayRovers() {
  this.restfullService.displayRoversService().subscribe(res => {
    this.roverArray=res;
  });
  }
  displayObjectives(){
    this.restfullService.displayObjectivesService().subscribe(res => {
          this.objectiveArray=res;
          console.log(this.objectiveArray);
      });
    }

  getSelectedRoverComputerIdAndRover(rid,RoverName){
    this.restfullService.getSelectedRoverComputerIdAndRoverService(rid).subscribe(res => {
        this.selectedComputerId=res.ComputerID;

      });
    this.selectedRoverName=RoverName;
    this.changeBtnStatusToSetObjectives();
    }

    addRoverObjectives(objectiveType){


    const roverObjectives={
      ObjectiveType:objectiveType,
        ComputerID:this.selectedComputerId
    };
    this.selectedObjectiveTypeToAddTasks=objectiveType;

    this.restfullService.addRoverObjectivesService(roverObjectives).subscribe(res => {
      this.changeBtnStatusToSetTasks();
        this.currentObjectiveId=res[0];
     //   console.log(this.currentObjectiveId);
      });
    }

    addRoverTasks(){
    const roverTasks={
        TaskDetails:this.TaskDetails,
        ObjectiveID:this.currentObjectiveId
    };this.TaskDetails=" ";
    this.restfullService.addRoverTasksService(roverTasks).subscribe(res => {
      });
    }




}
