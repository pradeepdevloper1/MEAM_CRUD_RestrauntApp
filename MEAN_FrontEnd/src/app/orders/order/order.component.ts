import { CustomerService } from './../../shared/customer.service';
import { OrderService } from './../../shared/order.service';
import { OrderItemService } from './../../shared/order-item.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { OrderItemsComponent } from '../order-items/order-items.component';
import { Customer } from 'src/app/shared/customer.model';
import { Order } from 'src/app/shared/order.model';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderItem } from 'src/app/shared/order-item.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styles: []
})
export class OrderComponent implements OnInit {
  customerList: Customer[];
  order:Order;
  orderItems:OrderItem[];
  isValid: boolean = true;

  constructor(private orderservice: OrderService,
    private customerService: CustomerService,
    private orderItemService: OrderItemService,
    private dialog: MatDialog,   
    private toastr: ToastrService,
    private router: Router,
    private currentRoute: ActivatedRoute) { }

  ngOnInit() {
    let orderID = this.currentRoute.snapshot.paramMap.get('id');
  
    if (orderID == null)
      this.resetForm();
    else {
      this.orderservice.getOrderByID(parseInt(orderID)).then(res => {
        this.order=res;      
        this.orderservice.formData = this.order[0];     
      });
      this.orderItemService.getOrderItemByOrderID(parseInt(orderID)).then(res => {
        this.orderItems=res;
        this.orderservice.orderItems =  this.orderItems;
      });
    }

    this.customerService.getCustomerList().then(res => this.customerList = res as Customer[]);
  }

  resetForm(form?: NgForm) {
    if (form = null)
      form.resetForm();
    this.orderservice.formData = {
      OrderID: 0,
      OrderNo: Math.floor(100000 + Math.random() * 900000).toString(),
      CustomerID:'103',
      PMethod: '',
      GTotal: 0,
      DeletedOrderItemIDs: ''
    };
    this.orderservice.orderItems = [];
  }

  AddOrEditOrderItem(orderItemIndex, OrderID) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    dialogConfig.data = { orderItemIndex, OrderID };
    this.dialog.open(OrderItemsComponent, dialogConfig).afterClosed().subscribe(res => {
      this.updateGrandTotal();
    });
  }


  onDeleteOrderItem(orderItemID: number, i: number) {
    if (orderItemID != null)
      this.orderservice.formData.DeletedOrderItemIDs += orderItemID + ",";
    this.orderservice.orderItems.splice(i, 1);
    this.updateGrandTotal();
  }

  updateGrandTotal() {
    this.orderservice.formData.GTotal = this.orderservice.orderItems.reduce((prev, curr) => {
      return prev + curr.Total;
    }, 0);
    this.orderservice.formData.GTotal = parseFloat(this.orderservice.formData.GTotal.toFixed(2));
  }

  validateForm() {
    this.isValid = true;
    if (this.orderservice.formData.CustomerID =='')
      this.isValid = false;
    else if (this.orderservice.orderItems.length == 0)
      this.isValid = false;
    return this.isValid;
  }


  onSubmit(form: NgForm) {
    if (this.validateForm()) {
      this.orderservice.saveOrUpdateOrder().subscribe(res => {
        this.resetForm();
        this.toastr.success('Submitted Successfully', 'Restaurent App.');
        this.router.navigate(['/orders']);
      })
    }
  }

}
