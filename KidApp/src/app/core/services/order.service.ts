import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/operators';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Configuration } from 'app.constants';
import { Order } from 'models';
import { map } from 'rxjs/operators';


@Injectable()
export class OrderService {

    private readonly apiPath = '/api/order/';

    constructor(private http: HttpClient) {

    }

    getAll(): Observable<Order[]> {
        return this.http.get(Configuration.Server + this.apiPath) as Observable<Order[]>;
    }

    edit(order: Order): Observable<any> {
        return this.http.put(Configuration.Server + this.apiPath + order.id.toString(), order);
    }

    add(order: Order): Observable<Order> {
        return this.http.post(Configuration.Server + this.apiPath, order) as Observable<Order>;
    }

    delete(orderId: number): Observable<any> {
        return this.http.delete(Configuration.Server + this.apiPath + orderId);
    }

}
