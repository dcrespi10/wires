import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'admissionsFilter'
})
export class AdmissionsFilterPipe implements PipeTransform {

  transform(allAdmissions: any, filterText: string, filterStatus: string, moduleName: string): any {
    return allAdmissions.filter(admission => this.filteredRecord(admission, filterText, filterStatus, moduleName));
  }

  private filteredRecord(admission, filterText: string, filterStatus: string, moduleName: string){
    try
    {
      var state:boolean = true;
      var text:boolean = admission.IdentificativeNumber.indexOf(filterText) > -1 || filterText == undefined || filterText.length == 0;
      if (admission.module != moduleName){
        return false;
      }
      if (filterStatus=="Uncomplete"){
        state = !admission.deleted && admission.complete != true;
      }
      else if (filterStatus=="Errors"){
        state = !admission.deleted && admission.hasErrors;
      }
      else if (filterStatus == 'Deleted'){
        state = admission.deleted;
      }
      else{
        state = !admission.deleted;
      }
      return state && text;
    }
    catch
    {
      return true;
    }
    
  }

}
