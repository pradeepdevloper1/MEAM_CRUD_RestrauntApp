import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from './order.model';
import { OrderItem } from './order-item.model';
import { environment } from 'src/environments/environment';
import { OrderItemService } from './order-item.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  formData: Order;
  orderItems: OrderItem[];
  genOrderID=this.generateId();
  genOrderItemID=this.generateId();

  constructor(private http: HttpClient,private orderItemsService:OrderItemService) { }

  saveOrUpdateOrder() {
    var body = {
      ...this.formData,
      OrderItems: this.orderItems
    };
    console.log(this.formData);
    console.log(this.orderItems);
    if(this.formData.OrderID==0){
      body.OrderID=this.genOrderID;
      this.orderItems[0].OrderID=this.genOrderID;
      this.orderItems[0].OrderItemID=this.genOrderItemID;
      // return this.orderItemsService.postOrderItem(this.orderItems[0]);
      // this.postOrderItemsData(this.orderItems[0]);
      return this.http.post(environment.apiURL + '/Order', body);
     }
     else {
      return this.http.put(environment.apiURL + `/Order/${this.formData.OrderID}`, body);
     }
  }

 generateId(){
   return Math.floor(100000 + Math.random() * 900000);
 }
  postOrderItemsData(orderItems){
  
    return this.orderItemsService.postOrderItem(orderItems);
  }
  getOrderList() {
    return this.http.get(environment.apiURL + '/Order').toPromise();
  }

  getOrderByID(id:number):any {
    console.log(environment.apiURL + '/Order/'+id);  
    return this.http.get(environment.apiURL + '/Order/'+id).toPromise();
  }

  deleteOrder(id:number) {
    return this.http.delete(environment.apiURL + '/Order/'+id).toPromise();
  }

}
