import { OverlayRef } from '@angular/cdk/overlay';
import { Observable, Subject } from 'rxjs';
import { ToastContainer } from './toast.container';

/** Event that is emitted when a toast is dismissed. */
export interface ToastDismiss {
  /** Whether the toast was dismissed using the action button. */
  dismissedByAction: boolean;
}

/** Maximum amount of milliseconds that can be passed into setTimeout. */
const MAX_TIMEOUT = Math.pow(2, 31) - 1;

/**
 * Reference to a toast dispatched from the toast service.
 */
export class ToastRef<T> {
  /** The instance of the component making up the content of the toast. */
  instance: T = null!;

  /**
   * The instance of the component making up the content of the toast.
   * @docs-private
   */
  containerInstance: ToastContainer;

  /** Subject for notifying the user that the toast has been dismissed. */
  private readonly _afterDismissed = new Subject<ToastDismiss>();

  /** Subject for notifying the user that the toast has opened and appeared. */
  private readonly _afterOpened = new Subject<void>();

  /** Subject for notifying the user that the toast action was called. */
  private readonly _onAction = new Subject<void>();

  /**
   * Timeout ID for the duration setTimeout call. Used to clear the timeout if the toast is
   * dismissed before the duration passes.
   */
  private _durationTimeoutId: number | any;

  /** Whether the toast was dismissed using the action button. */
  private _dismissedByAction = false;

  constructor(
    containerInstance: ToastContainer,
    private _overlayRef: OverlayRef,
  ) {
    this.containerInstance = containerInstance;
    containerInstance._onExit.subscribe(() => this._finishDismiss());
  }

  /** Dismisses the toast. */
  dismiss(): void {
    if (!this._afterDismissed.closed) {
      this.containerInstance.exit();
    }
    clearTimeout(this._durationTimeoutId);
  }

  /** Marks the toast action clicked. */
  dismissWithAction(): void {
    if (!this._onAction.closed) {
      this._dismissedByAction = true;
      this._onAction.next();
      this._onAction.complete();
      this.dismiss();
    }
    clearTimeout(this._durationTimeoutId);
  }

  /**
   * Marks the toast action clicked.
   * @deprecated Use `dismissWithAction` instead.
   * @breaking-change 8.0.0
   */
  closeWithAction(): void {
    this.dismissWithAction();
  }

  /** Dismisses the toast after some duration */
  _dismissAfter(duration: number): void {
    // Note that we need to cap the duration to the maximum value for setTimeout, because
    // it'll revert to 1 if somebody passes in something greater (e.g. `Infinity`). See #17234.
    this._durationTimeoutId = setTimeout(() => this.dismiss(), Math.min(duration, MAX_TIMEOUT));
  }

  /** Marks the toast as opened */
  _open(): void {
    if (!this._afterOpened.closed) {
      this._afterOpened.next();
      this._afterOpened.complete();
    }
  }

  /** Cleans up the DOM after closing. */
  private _finishDismiss(): void {
    this._overlayRef.dispose();

    if (!this._onAction.closed) {
      this._onAction.complete();
    }

    this._afterDismissed.next({ dismissedByAction: this._dismissedByAction });
    this._afterDismissed.complete();
    this._dismissedByAction = false;
  }

  /** Gets an observable that is notified when the toast is finished closing. */
  afterDismissed(): Observable<ToastDismiss> {
    return this._afterDismissed;
  }

  /** Gets an observable that is notified when the toast has opened and appeared. */
  afterOpened(): Observable<void> {
    return this.containerInstance._onEnter;
  }

  /** Gets an observable that is notified when the toast action is called. */
  onAction(): Observable<void> {
    return this._onAction;
  }

}
