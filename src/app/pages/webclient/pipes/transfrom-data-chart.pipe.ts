import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transformDataDate'
})

export class TransformDataDatePipe implements PipeTransform {

  transform(value: any, color?: any,labelS? :any): any {
    let labels = [];
    let data = [];
    value.map((dt:any) =>{
     labels.push(dt.date.split("T")[0]);
      data.push(dt.data.length);
    }); 
    let label = labelS ? labelS : 'Error Requests';

    return  {labels,data,label,color};
  }

}