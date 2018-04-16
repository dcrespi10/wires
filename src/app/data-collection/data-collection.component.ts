import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AlertService, AuthenticationService, CrfService, DataService } from '../_services/index';


@Component({
  selector: 'data-collection',
  templateUrl: './data-collection.component.html',
  styleUrls: ['./data-collection.component.css']
})
export class DataCollectionComponent implements OnInit {

  @Input() collectionId: string;
  @Input() userid: string;
  @Input() form: any;
  @Input() model: any = {};
  @Input() unsavedState: boolean;
  @Output() valueHasChangedEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
  uncompletedPages:any=[];
  visibilities={};
  id:any;
  
  constructor() {}

  ngOnInit() {}

  emitValueChanged(){
    this.unsavedState = true;
    this.valueHasChangedEmitter.emit(true);
  }
  
  visibilityCheck(variableName, visibility){
    if (visibility === undefined){
      this.visibilities[variableName] = true;
    }else{
      this.visibilities[variableName] = eval(visibility);
    }
    return this.visibilities[variableName];
  }
  setUnCompletedSection(){

  }

  formulaValue(variableName, formula){
    if (formula === undefined){
      return;
    }else{
      this.model[variableName] = eval(formula);
    }    
    console.log(this.model[variableName]);
  }

  setChecklistValue(checklistName, value){
    if (checklistName in this.model){
      var index = this.model[checklistName].indexOf(value, 0);
      if (index > -1) {
        this.model[checklistName].splice(index, 1);
      }
      else{
        this.model[checklistName].push(value);
      }
    }
    else{
      this.model[checklistName] = [];
      this.model[checklistName].push(value);
    }
  }
}
