import {
  ChangeDetectorRef,
  Component,
  ComponentRef,
  EmbeddedViewRef,
  NgZone,
  OnDestroy,
  ViewChild,
} from '@angular/core';

import {
  BasePortalOutlet,
  CdkPortalOutlet,
  ComponentPortal,
  DomPortal,
  TemplatePortal,
} from '@angular/cdk/portal';

import { AnimationEvent } from '@angular/animations';
import { Observable, Subject } from 'rxjs';

import { toastAnimations } from './toast.animation';


@Component({
  standalone: true,
  selector: 'toast-container',
  template: '<ng-template cdkPortalOutlet />',
  animations: [toastAnimations.toastState],
  imports: [CdkPortalOutlet],
  host: {
    'class': 'm-4 flex flex-col',
    '[@state]': '_animationState',
    '(@state.done)': 'onAnimationEnd($event)',
  },
})
export class ToastContainer extends BasePortalOutlet implements OnDestroy {

  /** Whether the component has been destroyed. */
  private _destroyed = false;

  /** The portal outlet inside of this container into which the toast content will be loaded. */
  @ViewChild(CdkPortalOutlet, { static: true }) _portalOutlet: CdkPortalOutlet = undefined!;

  /** Subject for notifying that the toast has exited from view. */
  readonly _onExit: Subject<void> = new Subject();

  /** Subject for notifying that the toast has finished entering the view. */
  readonly _onEnter: Subject<void> = new Subject();

  /** The state of the toast animations. */
  _animationState = 'void';

  constructor(
    private _ngZone: NgZone,
    private _changeDetectorRef: ChangeDetectorRef,
  ) {
    super();
  }

  attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T> {
    const result = this._portalOutlet.attachComponentPortal(portal);
    return result;
  }

  attachTemplatePortal<C>(portal: TemplatePortal<C>): EmbeddedViewRef<C> {
    const result = this._portalOutlet.attachTemplatePortal(portal);
    return result;
  }

  override attachDomPortal = (portal: DomPortal) => {
    const result = this._portalOutlet.attachDomPortal(portal);
    return result;
  };

  onAnimationEnd(event: AnimationEvent) {
    const { fromState, toState } = event;

    if ((toState === 'void' && fromState !== 'void') || toState === 'hidden') {
      this._completeExit();
    }

    if (toState === 'visible') {
      const onEnter = this._onEnter;

      this._ngZone.run(() => {
        onEnter.next();
        onEnter.complete();
      });
    }
  }

  enter(): void {
    if (!this._destroyed) {
      this._animationState = 'visible';
      this._changeDetectorRef.markForCheck();
      this._changeDetectorRef.detectChanges();
    }
  }

  exit(): Observable<void> {
    this._ngZone.run(() => {
      this._animationState = 'hidden';
      this._changeDetectorRef.markForCheck();
    });

    return this._onExit;
  }

  ngOnDestroy() {
    this._destroyed = true;
    this._completeExit();
  }

  private _completeExit() {
    queueMicrotask(() => {
      this._onExit.next();
      this._onExit.complete();
    });
  }

}
