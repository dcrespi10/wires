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
  pageVisibilities={};
  errors={};
  id:any;
  constructor() {}

  ngOnInit() {
    //this.checkCompleteness();
    this.hasErrors();
  }

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

  emitValueChanged(){
    this.unsavedState = true;
    this.valueHasChangedEmitter.emit(true);
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
      if (!this.pageVisibilities[variableName]){
        this.model[variableName] = undefined;
      }
      return this.pageVisibilities[variableName];    
    }
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
    console.log(this.model[checklistName]);
    this.emitValueChanged();
  }
}
