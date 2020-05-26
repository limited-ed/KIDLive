import { FormGroup } from '@angular/forms';

export function mapToModel(group: FormGroup, model: any) {
  Object.keys(group.controls).forEach((key) => {
    const abstractControl = group.get(key);
    if (abstractControl && abstractControl instanceof FormGroup) {
      mapToModel(abstractControl, model);
    } else {
      if (typeof model[key] === 'number') {
        model[key] = abstractControl.value * 1;
      } else if (key.includes('Date')) {
        let d = (abstractControl.value as string).split('.');
        let n = new Array<number>();
        d.forEach((i) => n.push(+i));
        let date = new Date(n[2], n[1] - 1, n[0]);
        model[key] = date.toISOString();
      } else {
        model[key] = abstractControl.value;
      }
    }
  });
}
