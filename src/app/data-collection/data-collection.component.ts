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

  errorsList = [
    {"errorId":1, "label":"Starting date cannot be greater than ending date", "formula":"this.model.start >= this.model.end"}
  ];

  constructor() {}

  ngOnInit() {
    
  }

  emitValueChanged(){
    this.unsavedState = true;
    this.valueHasChangedEmitter.emit(true);
    this.checkCompleteness();
  }
  
  errorIsVisible(errorString){
    return eval(errorString);
  }

  visibilityCheck(variableName, visibility){
    if (visibility === undefined){      
      this.visibilities[variableName] = true;
    }else{
      this.visibilities[variableName] = eval(visibility);
      
    }
    if (!this.visibilities[variableName]){
      this.model[variableName] = undefined;
    }
    return this.visibilities[variableName];    
  }
  
  checkCompleteness(){
    this.model.complete = true;
    this.uncompletedPages = [];
    for (var pindex in this.form.pages){
      var page = this.form.pages[pindex];
      for (var vindex in page.variables){
        var variableName = page.variables[vindex].name;
        if (!this.model[variableName] && page.variables[vindex].mandatory == true && this.visibilities[variableName]){
            this.model.complete = false;
            this.uncompletedPages.push(page.page);            
        }
      }
    }
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
    console.log(this.model[checklistName]);
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
    this.emitValueChanged();
  }
}
