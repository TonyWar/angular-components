import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  // tslint:disable-next-line: no-any
  transform(items: any[] | undefined, field: string, value: string): any[] {
    if (!items) { return []; }
    if (!value || value.length === 0) { return items; }

    return items.filter(it =>
      it[field]
        .toLowerCase()
        .indexOf(value.toLowerCase()) !== -1);
  }

}
