import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "myFilter",
})
export class MyFilterPipe implements PipeTransform {
  transform(objs: any, term: any): any {
    if (term === undefined) {
      return objs;
    }
    return objs.filter((obj) => {
      return (
        obj.firstName.toLowerCase().includes(term.toLowerCase()) ||
        obj.lastName.toLowerCase().includes(term.toLowerCase())
      );
    });
  }
}
