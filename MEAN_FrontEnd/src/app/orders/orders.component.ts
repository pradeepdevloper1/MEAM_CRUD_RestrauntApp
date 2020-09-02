import { Component, OnInit } from '@angular/core';
import { OrderService } from '../shared/order.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/shared/customer.model';
import { OrderItem } from 'src/app/shared/order-item.model';
import { CustomerService } from '../shared/customer.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styles: []
})
export class OrdersComponent implements OnInit {
  orderList;
  customerList:Customer[];
  orderItem:OrderItem[];
  
  constructor(private service: OrderService, private customerservice:CustomerService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.refreshList();
  }

  refreshList() {
    this.getCustomerList();  
    this.service.getOrderList().then(res => {
      this.orderList = res; 
      for(let order in this.orderList){
      this.orderList[order].CustomerID=this.getCustomerName(this.orderList[order].CustomerID);
        }
    });
   }
  getCustomerList(){
    this.customerservice.getCustomerList().then(res=>{
      this.customerList=res as [];
      });
     }
 public getCustomerName(custID):string{
  
     for(let cust in this.customerList){
      if(this.customerList[cust].CustomerID==custID){
        return this.customerList[cust].Name;
      }
    }
  }

  openForEdit(order: OrderItem) {
    this.router.navigate([`/order/edit/${order.OrderID}`]);   
  }

  onOrderDelete(id: number) {
    if (confirm('Are you sure to delete this record?')) {
      this.service.deleteOrder(id).then(res => {
        this.refreshList();
        this.toastr.warning("Deleted Successfully", "Restaurent App.");
      });
    }
  }

}
