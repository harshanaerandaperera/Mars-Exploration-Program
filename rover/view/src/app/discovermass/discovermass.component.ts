import { Component, OnInit } from '@angular/core';
import {Path} from "./path";
import {Element} from "./element";
import{RestfullService} from '../service/restfull.service';
import {Rover} from '../rovercontroller/rover'
import {Obje} from "./obje";
import {Tasks} from "./tasks";
import {applySourceSpanToExpressionIfNeeded} from "@angular/compiler/src/output/output_ast";

@Component({
  selector: 'app-discovermass',
  templateUrl: './discovermass.component.html',
})
export class DiscovermassComponent implements OnInit {
  btnStatus:String;
  Currentdate:Date;
  //Arrays That collected data

    /**
     *
     *Final Transmission Data
     */
    waypoints:String[]=[];
  paths:Path[]=[];
  stringWayPoints:String;
  traversalDistances=[]=[];
  elementArray:Element[]=[];
  selectedrovertraversaldistance:Number;
  transmissionId:String;

  //Objects In Path Array
  point1:String;
  point2:String;

  objectives:Obje[]=[];
  tasks:Tasks[]=[];
transmitionMessage:String;


  count:any=0;
  /**
   * Acquire Elements Form Data
   */
  elementtype:String;
  amount:Number;
    distance:String;
  /**
   * Select Way Points Form Data
   */
  selectedWayPoint:String;
  currenttraversalroverid:Number;
  currenttraversalrovername:String;
  selectedrovercurrentposition:String;
  roverArray:Rover;

  //arrays

    mySummery:String[]=[];
    elementStringArray:String[]=[];
    elementString:String;
    objectiveStringArray:String[]=[];
    objectiveString:String;
    tasksArray:String[]=[];
    tasksString:String;


    /**
     *
     * @param {RestfullService} restfullService
     */

  constructor(private restfullService:RestfullService) { }

  ngOnInit() {
    this.getCurrentDate();
    this.displayRoversAddedToObjects();
  }

    changeBtnStatusToDiscoverMarsDashboard(){
        this.btnStatus="DiscoverMarsDashBoard"
    }
    changeBtnStatusToDisplayDiscoverMras(){
        this.btnStatus="DiscoverMras"
    }
    checkBtnStatusToDisplaDiscoverMras(){
        if(this.btnStatus=="DiscoverMras"){
            return true;
        }
    }
  changeBtnStatusToSelectWayPoints(rid,name){
    this.btnStatus="SelectWayPoint";
      this.currenttraversalroverid=rid;
      this.currenttraversalrovername=name;
      this.getSelectedRoverCurrentPosition(rid);
  }
  checkBtnStatusToSelectWayPoints(){
    if(this.btnStatus=="SelectWayPoint"){
      return true;
    }
  }
  changeBtnStatusToDisplayTravarlPath(){
    this.btnStatus="displayTravarsalpath";
  }

  checkBtnStatusToDisplayTravarlPath(){
    if(this.btnStatus=="displayTravarsalpath"){
      return true;
    }
  }
  changeBtnStatusToAcquireElement(point1,point2){
    this.btnStatus="addElelment"
    this.point1=point1;
    this.point2=point2;
    if(this.count-1>=this.waypoints.length){
      this.count=this.waypoints.length;
    }
    this.paths=[];
  }
  checkBtnStatusToAcquireElement(){
    if(this.btnStatus=="addElelment"){
      return true;
    }
  }
  changeBtnStatusToSendReport(){
    this.btnStatus="SendReport";
  }
  checkBtnStatusToSendReport(){
    if(this.btnStatus=="SendReport"){
      return true;
    }
  }
  changeBtnStatusToGenerateReport(){
    this.btnStatus="generateReport";
  }

  checkBtnStatusToGenerateReport(){
    if(this.btnStatus=="generateReport"){
      return true;
    }
  }

  removeWayPointGaleCrator(){
   for (var i=0;i<this.waypoints.length;i++) {
       if(this.waypoints[i]=="Gale Crator" || this.selectedrovercurrentposition=="Gale Crator"){
           return true;
       }
   }
  }

    removeWayPointMountanSharp(){
        for (var i=0;i<this.waypoints.length;i++) {
            if(this.waypoints[i]=="Mountan Sharp" || this.selectedrovercurrentposition=="Mountan Sharp"){
                return true;
            }
        }
    }
    removeWayPointVallesMarineris(){
        for (var i=0;i<this.waypoints.length;i++) {
            if(this.waypoints[i]=="Valles Marineris" || this.selectedrovercurrentposition=="Valles Marineris"){
                return true;
            }
        }
    }
    removeWayPointHellasPlanitia(){
        for (var i=0;i<this.waypoints.length;i++) {
            if(this.waypoints[i]=="Hellas Planitia" || this.selectedrovercurrentposition=="Hellas Planitia"){
                return true;
            }
        }
    }
    removeWayPointMartianIcecaps(){
        for (var i=0;i<this.waypoints.length;i++) {
            if(this.waypoints[i]=="Martian Icecaps" || this.selectedrovercurrentposition=="Martian Icecaps"){
                return true;
            }
        }
    }






    addWayPointToAnArray(){
    this.waypoints.push(this.selectedWayPoint);
    }

    acquireElementsToAnArray(){
    const obj={
      elementtype:this.elementtype,
      amount:this.amount
    };
    this.traversalDistances.push(this.distance);
    this.elementArray.push(obj);
    this.elementtype=" ";
    this.amount=0;
    this.distance=" ";
    }

  acquireElementsToAnArrayDone()
  {
    console.log( this.elementArray);
    this.changeBtnStatusToSendReport();
  }

  displayTraversalPath(){


    this.count++;
    for (var i = 0; i < this.count; i++) {
      const obj = {
        point1: this.waypoints[i],
        point2: this.waypoints[i + 1]
      };
      this.paths.push(obj);

  }
      this.stringWayPoints= this.waypoints.join();
      this.changeBtnStatusToDisplayTravarlPath();
      /*const update={
          rid:this.currenttraversalroverid,
         // string:string
      }
*/
      /*this.restfullService.updateRoverService(update).subscribe(res => {
          this.changeBtnStatusToDisplayRovers();
      });*/


  }


  validateLastButton(point1){
    if(point1==this.waypoints[this.waypoints.length-1]){
      return true;
    }

  }


  displayRoversAddedToObjects(){
    this.restfullService.displayRoversAddedToObjectsService().subscribe(res => {
          this.roverArray=res;
      });

  }


  updateRoverMap(){
      const update={
            rid:this.currenttraversalroverid,
            traversalPath:this.stringWayPoints,
            traversalDistances: this.traversalDistances,

        };
        console.log(update);
        this.restfullService.updateRoverMapService(update).subscribe(res => {
            this.changeBtnStatusToDisplayDiscoverMras();
            this.changeBtnStatusToGenerateReport();
            this.getObjectives();
            this.getTasks();
            this.getSelectedRoverTraversalDistance(this.currenttraversalroverid);
        });





  }

    getObjectives(){
    this.restfullService.getObjectivesService(this.currenttraversalroverid).subscribe(res => {
       this.objectives=res;
    });
    }
//test
    getObjectivesExtra(rid){
        this.restfullService.getObjectivesService(rid).subscribe(res => {
            this.objectives=res;

        });
    }



    getTasks(){
        this.restfullService.getTasksService(this.currenttraversalroverid).subscribe(res => {
            this.tasks=res;
            console.log(this.tasks);
        });
    }

getCurrentDate(){
    this.Currentdate = new Date();
}

createString(){

      console.log("Elements"+this.elementArray[0].amount);
      console.log("objectives"+this.objectives[0]);
      console.log("tasks"+this.tasks[0]);

      for(var i=0;i<this.elementArray.length;i++){
        this.elementStringArray.push(this.elementArray[i].elementtype);
        this.elementStringArray.push(this.elementArray[i].amount.toString());
      }
      this.elementString=this.elementStringArray.join();

      for(var i=0;i<this.objectives.length;i++){
        this.objectiveStringArray.push(this.objectives[i].OBJECTIVETYPE)
    }
    this.objectiveString=this.objectiveStringArray.join();

    for(var i=0;i<this.tasks.length;i++){
        this.tasksArray.push(this.tasks[i].TASKDETAILS)
    }
    this.tasksString=this.tasksArray.join();

    //console.log(this.elementString.join());

    this.mySummery.push("Way Points = "+this.stringWayPoints);
    this.mySummery.push(" | Found Elements = "+this.elementString);
    this.mySummery.push(" | Objectives = "+this.objectiveString);
    this.mySummery.push(" | Tasks = "+this.tasksString);
    this.mySummery.push(" | Traversal Distance = "+this.selectedrovertraversaldistance.toString());
this.transmitionMessage=this.mySummery.join();
}


transmitData(){
      console.log("date"+this.Currentdate.toString());
    this.createString();
    const transmitiondata = {
        Message:this.transmitionMessage,
        TransmissionDate:this.Currentdate.toString()
    };
    this.restfullService.transmitDataService(transmitiondata).subscribe(res => {
        this.transmissionId=res.outBinds.TransmissionID[0];
        alert("Data Send To Earth Successfully");
        //this.generateReportt();


        });
    }

    getSelectedRoverCurrentPosition(rid){
        this.restfullService.getSelectedRoverCurrentPositionService(rid).subscribe(res => {
            this.selectedrovercurrentposition=res;

        });

    }
    getSelectedRoverTraversalDistance(rid){
        this.restfullService.getSelectedRoverTraversalDistanceService(rid).subscribe(res => {
            this.selectedrovertraversaldistance=res;
            this.transmitData();

        });


    }


    generateReportt(){

        const transid={
            tid:this.transmissionId,
            rid:this.currenttraversalroverid
        };
        //console.log("Hello");

        this.restfullService.generateReportService(transid).subscribe(res => {
            alert("Report Generated Successfully from "+this.currenttraversalrovername);
        });
  }





}
