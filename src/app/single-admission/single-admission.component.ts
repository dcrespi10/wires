import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AlertService, AuthenticationService, CrfService, DataService } from '../_services/index';


@Component({
  selector: 'single-admission',
  templateUrl: './single-admission.component.html',
  styleUrls: ['./single-admission.component.css']
})
export class SingleAdmissionComponent implements OnInit {

  @Input() admissionid: string;
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
}
