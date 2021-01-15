import { Component, OnInit } from '@angular/core';
import { OrderService, DivisionService, MessageBusService } from 'core';
import { Order, Division } from 'models';
import { forkJoin } from 'rxjs';
import { cloneObj } from 'core/common/cloneObj';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  orders: Order[];
  divisions: Division[];

  selected: Order;
  editedOrder: Order;

  editVisible = false;
  answerVisible = false;
  viewVisible = false;

  constructor(
    private orderService: OrderService,
    private divService: DivisionService,
    private messageBus: MessageBusService
  ) {}

  ngOnInit(): void {
    this.messageBus.sendMessage('isLoading', true);
    let subscription = forkJoin([
      this.orderService.getAll(),
      this.divService.getAll(),
    ]).subscribe(
      ([orders, divisions]) => {
        this.messageBus.sendMessage('isLoading', false);
        this.orders = orders;
        this.divisions = divisions;
      },
      (error) => {
        this.messageBus.sendMessage(
          'error',
          'Произошла ошибка во время загрузки данных'
        );
      },
      () => {
        subscription.unsubscribe();
      }
    );
  }

  clickAdd() {
    this.editedOrder = {
      id: 0,
      answer: '',
      authorId: 0,
      closeDate: null,
      divisionId: 0,
      endDate: '',
      orderFiles: [],
      orderText: '',
      rejectText: '',
      shortText: '',
      startDate: new Date(),
      statusId: 1,
      toUserId: 0,
    } as Order;
    this.editVisible = true;
  }

  clickEdit() {
    this.editedOrder = cloneObj(this.selected);
    this.editVisible = true;
  }

  clickAnswer() {
    if (!this.selected) {
      return;
    }
    this.editedOrder = cloneObj(this.selected);
    this.answerVisible = true;
  }

  clickReject(){
    this.editedOrder = cloneObj(this.selected);
    this.viewVisible = true;
  }

  rowClick(order: Order) {
    this.selected = order;
  }

  afterEdit(order: Order) {
    let i = this.orders.findIndex((f) => f.id === order.id);
    if (i === -1) {
      this.orders.push(order);
    } else {
      this.orders[i] = order;
    }
  }
}
