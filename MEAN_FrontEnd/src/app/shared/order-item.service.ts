import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from './order.model';
import { OrderItem } from './order-item.model';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class OrderItemService {
  formData: Order;
  orderItems: OrderItem[];
  constructor(private http: HttpClient) { }
  saveOrUpdateOrder() {
    var body = {
      ...this.formData,
      OrderItems: this.orderItems
    };
    return this.http.post(environment.apiURL + '/OrderItem', body);
  }

  postOrderItem(orderItem){
    return this.http.post(environment.apiURL + '/OrderItem', orderItem);
  }
  getOrderItemList() {
    return this.http.get(environment.apiURL + '/OrderItem').toPromise();
  }

  getOrderItemByOrderID(id:number):any {
    return this.http.get(environment.apiURL + '/OrderItem/'+id).toPromise();
  }

  deleteOrderItem(id:number) {
    return this.http.delete(environment.apiURL + '/OrderItem/'+id).toPromise();
  }

}
