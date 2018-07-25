import {Injectable} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class RestfullService {

  constructor(private http: Http) {
  }

  initializeRoverService(initializeRover) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/createrover/initializerover', initializeRover, {headers: headers}).map(res => res.json());
  }

  displayRoversService() {
    return this.http.get("http://localhost:3000/createrover/getallroverswithpartscount").map(res => res.json());
  }

  displayAddedObjectivesService(selectedComputerId) {
    return this.http.get("http://localhost:3000/controlrover/getaddedobjectives/" + selectedComputerId).map(res => res.json());
  }

    getSelectedRoverComputerIdAndRoverService(rid){
        return this.http.get("http://localhost:3000/createrover/getroverswithcomputerid/" + rid).map(res => res.json());

    }

  addRoverBrainService(roverBrain) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/createrover/addroverbrain', roverBrain, {headers: headers}).map(res => res.json());
  }

  addRoverSensorsService(roverSensors) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/createrover/addroversensors', roverSensors, {headers: headers}).map(res => res.json());
  }

  addRoverVisionService(roverVision) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/createrover/addRovervision', roverVision, {headers: headers}).map(res => res.json());
  }



  addRoverInstrumentsService(roverInstrument) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/createrover/addroverinstruments', roverInstrument, {headers: headers}).map(res => res.json());
  }

  addRoverObjectivesService(roverObjectives) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/controlrover/addroverobjectives', roverObjectives, {headers: headers}).map(res => res.json());
  }

  addRoverTasksService(roverTasks) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/controlrover/addrovertasks', roverTasks, {headers: headers}).map(res => res.json());
  }
    updateRoverService(update){
        return this.http.put("http://localhost:3000/createrover/updaterover",update).map(res => res.json());
    }

    deleteARoverService(id){
        return this.http.delete("http://localhost:3000/createrover/roverdelete/"+id).map(res=>res.json());
        }
    getCreatedRoverSensorsServices(id){
        return this.http.get("http://localhost:3000/createrover/getroversensorsbyrid/" + id).map(res => res.json());

    }
    getCreatedRoverCamerasServices(id){
      return this.http.get("http://localhost:3000/createrover/getrovercamerasbyrid/" + id).map(res => res.json());
  }

    getCreatedRoverInstrumentsServices(id){
        return this.http.get("http://localhost:3000/createrover/getroverinstrumentsbyrid/" + id).map(res => res.json());

    }




    /**
     * Developer Services
     */

    addDeveloperCamerasService(cameraTypes) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('http://localhost:3000/developer/cameras', cameraTypes, {headers: headers}).map(res => res.json());
    }
    addDeveloperInstrumentsService(instrumentTypes) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('http://localhost:3000/developer/instruments', instrumentTypes, {headers: headers}).map(res => res.json());
    }
    addDeveloperSensorsService(sensor) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('http://localhost:3000/developer/sensors', sensor, {headers: headers}).map(res => res.json());
    }
    addDeveloperOperatingSystemsService(os) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('http://localhost:3000/developer/os', os, {headers: headers}).map(res => res.json());
    }
    addDeveloperoperObjectivesTypesService(objective) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('http://localhost:3000/developer/objectives', objective, {headers: headers}).map(res => res.json());
    }
    displayDeveloperCamerasService() {
        return this.http.get("http://localhost:3000/developer/getcameras").map(res => res.json());
    }
    DeveloperOperatingSystemService() {
        return this.http.get("http://localhost:3000/developer/getoperatingsystems").map(res => res.json());
    }
    displayDeveloperSensorsService() {
        return this.http.get("http://localhost:3000/developer/getsensors").map(res => res.json());
    }
    displayDeveloperInstrumentsService() {
        return this.http.get("http://localhost:3000/developer/getinstruments").map(res => res.json());
    }
    displayObjectivesService(){
        return this.http.get("http://localhost:3000/developer/getobjectives").map(res => res.json());

    }


    /**
     * Discover Mass Routes
     */
    displayRoversAddedToObjectsService(){
        return this.http.get("http://localhost:3000/discovermass/getallroverswithobjectives").map(res => res.json());

    }

    updateRoverMapService(update) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('http://localhost:3000/discovermass/updatemap', update, {headers: headers}).map(res => res.json());
    }

    getObjectivesService(rid){
        return this.http.get("http://localhost:3000/discovermass/getobjectivetype/"+rid).map(res => res.json());
        }

    getTasksService(rid){
        return this.http.get("http://localhost:3000/discovermass/gettaskdetails/"+rid).map(res => res.json());
        }

    transmitDataService(transmitiondata){

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('http://localhost:3000/discovermass/transmition', transmitiondata, {headers: headers}).map(res => res.json());
    }
    getSelectedRoverCurrentPositionService(id){
        return this.http.get("http://localhost:3000/discovermass/getrovercurrentposition/" + id).map(res => res.json());

    }

    getSelectedRoverTraversalDistanceService(id){
        return this.http.get("http://localhost:3000/discovermass/gettraversaldistance/" + id).map(res => res.json());

    }

    generateReportService(transid){
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('http://localhost:3000/discovermass/generatereport', transid, {headers: headers}).map(res => res.json());
        }


}
