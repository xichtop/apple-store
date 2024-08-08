import { ViewContainerRef, InjectionToken } from '@angular/core';
import { Direction } from '@angular/cdk/bidi';

export const TOAST_DATA = new InjectionToken<any>('ToastData');

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export type ToastHorizontalPosition = 'start' | 'center' | 'end' | 'left' | 'right';

export type ToastVerticalPosition = 'top' | 'bottom';

export class ToastConfig<D = any> {
  /**
   * The view container that serves as the parent for the toast for the purposes of dependency
   * injection. Note: this does not affect where the toast is inserted in the DOM.
   */
  viewContainerRef?: ViewContainerRef;

  /** The length of time in milliseconds to wait before automatically dismissing the toast. */
  duration?: number = 5000;

  /** Text layout direction for the toast. */
  direction?: Direction;

  /** Data being injected into the child component. */
  data?: D | null = null;

  /** The horizontal position to place the toast. */
  horizontalPosition?: ToastHorizontalPosition = 'center';

  /** The vertical position to place the toast. */
  verticalPosition?: ToastVerticalPosition = 'top';
}
