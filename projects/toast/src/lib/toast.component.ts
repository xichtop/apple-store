import { Component, Inject } from '@angular/core';

import { ToastRef } from './toast.ref';
import { TOAST_DATA, ToastType } from './toast.config';
import { NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';


@Component({
  standalone: true,
  selector: 'toast',
  templateUrl: './toast.component.html',
  imports: [
    NgSwitch, NgSwitchCase, NgSwitchDefault
  ]
})
export class ToastComponent {

  constructor(
    public toastRef: ToastRef<ToastComponent>,
    @Inject(TOAST_DATA) public data: {
      title: string;
      message: string;
      type: ToastType;
    },
  ) {}

  action(): void {
    this.toastRef.dismissWithAction();
  }

  dismiss(): void {
    this.toastRef.dismiss();
  }

}