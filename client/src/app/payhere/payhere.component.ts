import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Md5 } from 'ts-md5';

@Component({
  selector: 'app-payhere',
  templateUrl: './payhere.component.html',
  styleUrls: ['./payhere.component.scss'],
})
export class PayhereComponent implements OnInit {
  payment = {
    sandbox: true,
    merchant_id: environment.PAYHERE_MERCHANT_ID, // Replace your Merchant ID
    return_url: 'https://d08a-112-134-240-64.ap.ngrok.io/api/payment/return', // Important
    cancel_url: 'https://d08a-112-134-240-64.ap.ngrok.io/api/payment/cancel', // Important
    notify_url: 'https://d08a-112-134-240-64.ap.ngrok.io/api/payment',
    order_id: 'ItemNo12345',
    items: 'Door bell wireles',
    amount: '1000.00',
    currency: 'LKR',
    hash: '45D3CBA93E9F2189BD630ADFE19AA6DC', // *Replace with generated hash retrieved from backend
    first_name: 'Saman',
    last_name: 'Perera',
    email: 'samanp@gmail.com',
    phone: '0771234567',
    address: 'No.1, Galle Road',
    city: 'Colombo',
    country: 'Sri Lanka',
    delivery_address: 'No. 46, Galle road, Kalutara South',
    delivery_city: 'Kalutara',
    delivery_country: 'Sri Lanka',
    custom_1: '',
    custom_2: '',
  };

  constructor() {}

  ngOnInit(): void {
    this.payment = {
      ...this.payment,
    };
    var md5 = new Md5();
    md5.appendStr(environment.PAYHERE_SECRET);
    const secret = md5.end()?.toString().toUpperCase();
    console.log(secret);
    md5 = new Md5();
    md5
      .appendStr(this.payment.merchant_id)
      .appendStr(this.payment.order_id)
      .appendStr(this.payment.amount)
      .appendStr(this.payment.currency)
      .appendStr(secret!);

    // Generate the MD5 hex string
    const hash = md5.end()?.toString().toUpperCase();
    this.payment.hash = hash!;
    console.log(this.payment.hash);

    window.payhere.onCompleted = function onCompleted(orderId: string) {
      console.log('Payment completed. OrderID:' + orderId);
      alert('New Payhere payment: OrderID: ' + orderId);
      //Note: validate the payment and show success or failure page to the customer
    };

    // Called when user closes the payment without completing
    window.payhere.onDismissed = function onDismissed() {
      //Note: Prompt user to pay again or show an error page
      console.log('Payment dismissed');
    };

    // Called when error happens when initializing payment such as invalid parameters
    window.payhere.onError = function onError(error: string) {
      // Note: show an error page
      console.log('Error:' + error);
    };
  }

  startPayment() {
    window.payhere.startPayment(this.payment);
  }
}
