import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, AuthenticationService, CrfService, CentresDataService } from '../_services/index';
import { Crf } from '../_models/index';
@Component({
  selector: 'app-centre',
  templateUrl: './centre.component.html',
  styleUrls: ['./centre.component.css']
})
export class CentreComponent implements OnInit {

  id:string;
  model:any={};
  uncompletedPages:any=[];
  visibilities={};
  form: Crf;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private crfService: CrfService,
    private centresDataService: CentresDataService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params : any) => {
         this.id = params["id"]; 
         this.getcrf();   
      }
   );
   
  }

  setUnCompletedSection(){
    this.uncompletedPages = [];
    for (var p in this.form.pages){
      var page = this.form[p];
      for (var v in page.variables){
        var variable = page.variables[v];
        if (!this.visibilities[variable.name])
          continue
        
        if (variable.mandatory == true){
          if (!this.model[variable.name] || this.model[variable.name] === []){
            console.log(page.page)
            this.uncompletedPages.push(page.page);
            break;
          }
        }
      }
    }
  }

  visibilityCheck(variableName, visibility){
    if (visibility === undefined){
      this.visibilities[variableName] = true;
    }else{
      this.visibilities[variableName] = eval(visibility);
    }
    return this.visibilities[variableName];
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

  save(){
    //this.setUnCompletedSection();
    if (this.model.userid){
      this.centresDataService.update(this.model).subscribe(
        data => {
          console.log("yay");
        },
        error => {
          console.log("ouch");
        }
      );
    }else{
      this.model.userid = this.id;
      this.centresDataService.create(this.model).subscribe(
        data => {
          console.log("yay");
        },
        error => {
          console.log("ouch");
        }
      );
    }
    
  }

  getcrf() {
    this.crfService.getCrf("centresdata")
        .subscribe(
            data => {
                this.form = data;
                this.setUnCompletedSection();                
            },
            error => {
                
        });
  this.centresDataService.getById(this.id).subscribe(
    data => {
      this.model = data;
    }, 
    error =>{

    });
  }

}
