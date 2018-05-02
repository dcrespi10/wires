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
  //uncompletedPages:any=[];
  visibilities={};
  pageVisibilities={};
  errors={};
  moduleLabels = {
    "wires": "Wires",
    "openabdomen": "Open Abdomen",
    "infections": "IAI"
  };
  id:any;
  constructor() {}

  ngOnInit() {}

  getRandomBlock(variableName){
    //randomization service must be called
    var value = 'A';
    this.model[variableName] = value;    
  }

  hasErrors(){
    var errorsFound = false;
    for (var idx in this.errors){
      if (this.errors[idx] == true){
        errorsFound = true;
        break;
      }
    }
    this.model.hasErrors = errorsFound;
    return errorsFound;
  }

  emitValueChanged(variableName){
    this.unsavedState = true;
    this.valueHasChangedEmitter.emit(true);
    //this.checkSingleCompleteness(variableName);
    this.checkCompleteness();
    this.hasErrors();
  }

  errorIsVisible(errorId, errorString){
    var errorState = eval(errorString);
    this.errors[errorId] = errorState;    
    return errorState;
  }

  visibilityCheck(variableName, visibility, objectType="variable"){
    if (objectType == "variable"){
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
    else {
      if (visibility === undefined){      
        this.pageVisibilities[variableName] = true;
      }else{
        this.pageVisibilities[variableName] = eval(visibility);        
      }
      if (this.pageVisibilities[variableName] == false){
        if (this.model.uncompletedPages && this.model.uncompletedPages.indexOf(variableName) > -1){
          this.model.uncompletedPages.splice(this.model.uncompletedPages.indexOf(variableName), 1);
        }        
      }
      this.checkCompleteness();
      return this.pageVisibilities[variableName];    
    }
  }  

  variableIsCompleted(variable){
    var variableCompleted: boolean = false;
    if (variable.type == 'multi')
    {
      if (!this.model[variable.name]){
        variableCompleted = true;
      }
      else if (this.model[variable.name].length == 0){
        variableCompleted = true;
      }      
    }
    else if (variable.type == 'string' || variable.type == 'number' || variable.type == 'integer')
    {
      if (!this.model[variable.name]){
        variableCompleted = true;
      }else if ( this.model[variable.name].length == 0){
        variableCompleted = true;
      }        
    }
    else {
      variableCompleted = !this.model[variable.name];
    }
    return !variableCompleted;
  }

  checkSingleCompleteness(){}
  

  checkCompleteness(){
    this.model.complete = true;
    this.model.uncompletedPages = [];
    for (var pindex in this.form.pages){
      
      var page = this.form.pages[pindex];
      if (this.pageVisibilities[page.page] != true)
      {
        continue;
      }
      for (var vindex in page.variables){
        var variableName = page.variables[vindex].name;
        var variableCompleted = this.variableIsCompleted(page.variables[vindex]);
        if (!variableCompleted && page.variables[vindex].mandatory == true && this.visibilities[variableName]){
          this.model.complete = false;
          if (this.model.uncompletedPages.indexOf(page.page) == -1){
            this.model.uncompletedPages.push(page.page);            
          }        
            
        }
      }
    }
  }

  formulaValue(variableName, formula){
    var value = "";
    if (formula === undefined){
      return;
    }else{
      value = eval(formula);      
    }    
    this.model[variableName] = value;
    return value;
  }

  setChecklistValue(checklistName, value){
    if (this.model[checklistName]){
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
    this.emitValueChanged(checklistName);
  }
}
