import { Pipe, PipeTransform } from '@angular/core';
import { Status } from 'models';

const statusList: Status[]  = [
  { id: 1, title: 'Не прочитано'},
  { id: 2, title: 'На исполнении'},
  { id: 3, title: 'На согласовании'},
  { id: 4, title: 'Отклонено'},
  { id: 5, title: 'Закрыто'},
];


@Pipe({ name: 'statustitle' })
export class StatusTitlePipe implements PipeTransform {
  transform(statusId: number) {
    var s = statusList.find( f => f.id === statusId);
    return s.title;
  }
}
