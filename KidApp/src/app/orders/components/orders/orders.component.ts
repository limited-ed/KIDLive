import { Component, OnInit } from '@angular/core';
import { OrderService, DivisionService, MessageBusService } from 'core';
import { Order, Division } from 'models';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orders: Order[];
  divisions: Division[];

  selected: Order;

  constructor( private orderService: OrderService, private divService: DivisionService, private messageBus: MessageBusService) { }

  ngOnInit(): void {
    this.messageBus.sendMessage('isLoading', true);
    forkJoin([
      this.orderService.getAll(),
      this.divService.getAll()
    ]).subscribe( ([orders, divisions]) => {
            this.messageBus.sendMessage('isLoading', false);
            this.orders = orders;
            this.divisions = divisions;
        }, error => {
            this.messageBus.sendMessage('error', 'Произошла ошибка во время загрузки данных');
    });
  }



}
