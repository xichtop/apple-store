import {
  ComponentType,
  Overlay,
  OverlayConfig,
  OverlayRef
} from '@angular/cdk/overlay';

import {
  ComponentPortal,
  TemplatePortal
} from '@angular/cdk/portal';

import {
  ComponentRef,
  EmbeddedViewRef,
  Inject,
  Injectable,
  InjectionToken,
  Injector,
  OnDestroy,
  Optional,
  SkipSelf,
  TemplateRef,
} from '@angular/core';

import { TOAST_DATA, ToastConfig, ToastType } from './toast.config';
import { ToastContainer } from './toast.container';
import { ToastComponent } from './toast.component';
import { ToastRef } from './toast.ref';


export function TOAST_DEFAULT_OPTIONS_FACTORY(): ToastConfig {
  return new ToastConfig();
}

export const TOAST_DEFAULT_OPTIONS = new InjectionToken<ToastConfig>(
  'toast-default-options',
  {
    providedIn: 'root',
    factory: TOAST_DEFAULT_OPTIONS_FACTORY,
  },
);


@Injectable({ providedIn: 'root' })
export class ToastService implements OnDestroy {

  private _toastRefAtThisLevel: ToastRef<any> | null = null;

  toastComponent = ToastComponent;
  toastContainerComponent = ToastContainer;

  get _openedToastRef(): ToastRef<any> | null {
    const parent = this._parentToast;
    return parent ? parent._openedToastRef : this._toastRefAtThisLevel;
  }

  set _openedToastRef(value: ToastRef<any> | null) {
    if (this._parentToast) {
      this._parentToast._openedToastRef = value;
    } else {
      this._toastRefAtThisLevel = value;
    }
  }

  constructor(
    private _overlay: Overlay,
    private _injector: Injector,
    @Optional() @SkipSelf() private _parentToast: ToastService,
    @Inject(TOAST_DEFAULT_OPTIONS) private _defaultConfig: ToastConfig,
  ) { }

  open(
    type: ToastType,
    title: string,
    message: string,
    config?: ToastConfig,
  ): ToastRef<ToastComponent> {
    const _config = {
      ...this._defaultConfig,
      ...config,
      data: { title, message, type },
    };

    return this._attach(this.toastComponent, _config) as ToastRef<ToastComponent>;
  }

  info(
    message: string,
    title: string = '',
  ): ToastRef<ToastComponent> {
    return this.open('info', title, message);
  }

  success(
    message: string,
    title: string = '',
  ): ToastRef<ToastComponent> {
    return this.open('success', title, message);
  }

  warning(
    message: string,
    title: string = '',
  ): ToastRef<ToastComponent> {
    return this.open('warning', title, message);
  }

  error(
    message: string,
    title: string = '',
  ): ToastRef<ToastComponent> {
    return this.open('error', title, message);
  }

  dismiss(): void {
    if (this._openedToastRef) {
      this._openedToastRef.dismiss();
    }
  }

  ngOnDestroy() {
    if (this._toastRefAtThisLevel) {
      this._toastRefAtThisLevel.dismiss();
    }
  }

  private _attachToastContainer(
    overlayRef: OverlayRef,
    config: ToastConfig,
  ): ToastContainer {
    const userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;
    const injector = Injector.create({
      parent: userInjector || this._injector,
      providers: [{ provide: ToastConfig, useValue: config }],
    });

    const containerPortal = new ComponentPortal(
      this.toastContainerComponent,
      config.viewContainerRef,
      injector,
    );
    const containerRef: ComponentRef<ToastContainer> = overlayRef.attach(containerPortal);
    return containerRef.instance;
  }

  private _attach<T>(
    content: ComponentType<T> | TemplateRef<T>,
    userConfig?: ToastConfig,
  ): ToastRef<T | EmbeddedViewRef<any>> {
    const config = { ...new ToastConfig(), ...this._defaultConfig, ...userConfig };
    const overlayRef = this._createOverlay(config);
    const container = this._attachToastContainer(overlayRef, config);
    const toastRef = new ToastRef<T | EmbeddedViewRef<any>>(container, overlayRef);

    if (content instanceof TemplateRef) {
      const portal = new TemplatePortal(content, null!, {
        $implicit: config.data,
        toastRef,
      } as any);

      toastRef.instance = container.attachTemplatePortal(portal);
    } else {
      const injector = this._createInjector(config, toastRef);
      const portal = new ComponentPortal(content, undefined, injector);
      const contentRef = container.attachComponentPortal<T>(portal);

      // We can't pass this via the injector, because the injector is created earlier.
      toastRef.instance = contentRef.instance;
    }

    this._animateToast(toastRef, config);
    this._openedToastRef = toastRef;
    return this._openedToastRef;
  }

  private _animateToast(toastRef: ToastRef<any>, config: ToastConfig) {
    // When the toast is dismissed, clear the reference to it.
    toastRef.afterDismissed().subscribe(() => {
      // Clear the toast ref if it hasn't already been replaced by a newer toast.
      if (this._openedToastRef == toastRef) {
        this._openedToastRef = null;
      }
    });

    if (this._openedToastRef) {
      // If a toast is already in view, dismiss it and enter the
      // new toast after exit animation is complete.
      this._openedToastRef.afterDismissed().subscribe(() => {
        toastRef.containerInstance.enter();
      });
      this._openedToastRef.dismiss();
    } else {
      // If no toast is in view, enter the new toast.
      toastRef.containerInstance.enter();
    }

    // If a dismiss timeout is provided, set up dismiss based on after the toast is opened.
    if (config.duration && config.duration > 0) {
      toastRef.afterOpened().subscribe(() => toastRef._dismissAfter(config.duration!));
    }
  }

  /**
   * Creates a new overlay and places it in the correct location.
   * @param config The user-specified toast config.
   */
  private _createOverlay(config: ToastConfig): OverlayRef {
    const overlayConfig = new OverlayConfig();
    overlayConfig.direction = config.direction;

    let positionStrategy = this._overlay.position().global();
    // Set horizontal position.
    const isRtl = config.direction === 'rtl';
    const isLeft =
      config.horizontalPosition === 'left' ||
      (config.horizontalPosition === 'start' && !isRtl) ||
      (config.horizontalPosition === 'end' && isRtl);
    const isRight = !isLeft && config.horizontalPosition !== 'center';
    if (isLeft) {
      positionStrategy.left('0');
    } else if (isRight) {
      positionStrategy.right('0');
    } else {
      positionStrategy.centerHorizontally();
    }
    // Set horizontal position.
    if (config.verticalPosition === 'top') {
      positionStrategy.top('0');
    } else {
      positionStrategy.bottom('0');
    }

    overlayConfig.positionStrategy = positionStrategy;
    return this._overlay.create(overlayConfig);
  }

  private _createInjector<T>(
    config: ToastConfig,
    toastRef: ToastRef<T>
  ): Injector {
    const userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;

    return Injector.create({
      parent: userInjector || this._injector,
      providers: [
        { provide: ToastRef, useValue: toastRef },
        { provide: TOAST_DATA, useValue: config.data },
      ],
    });
  }
}
