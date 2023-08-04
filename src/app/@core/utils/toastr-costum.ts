import { Injectable } from "@angular/core";
import { NbToastrService, NbToastrConfig, NbGlobalPosition, NbGlobalPhysicalPosition, NbComponentStatus, NbGlobalLogicalPosition } from "@nebular/theme";

@Injectable()
export class ToastrCostum {

    constructor(private toastrService: NbToastrService) {}
  
    config: NbToastrConfig;
  
    index = 1;
    destroyByClick = true;
    duration = 2000;
    hasIcon = true;
    position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
    preventDuplicates = false;
    status: NbComponentStatus = 'primary';
  

    showToast(type: NbComponentStatus, title: string, body: string) {
      const config = {
        status: type,
        destroyByClick: this.destroyByClick,
        duration: this.duration,
        hasIcon: this.hasIcon,
        position: this.position,
        preventDuplicates: this.preventDuplicates,
      };
      const titleContent = title ? title : '';
  
      this.toastrService.show(
        body,
        titleContent,
        config);
    }
  
  }
  
export enum TOASTR_STATUS {
    PRIMARY =  'primary',
    SUCCESS = 'success',
    INFO = 'info',
    WARNING = 'warning',
    DANGER = 'danger',
   }