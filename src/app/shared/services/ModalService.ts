/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable, ComponentRef, createComponent, ApplicationRef, EnvironmentInjector, Type, inject } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ModalService {
  private componentRef?: ComponentRef<any>;
    private appRef = inject(ApplicationRef);
    private injector = inject( EnvironmentInjector)
  constructor(

  ) {}

public open<T>(component: Type<T>, data?: Partial<T>): void {
  if (this.componentRef) return;

  this.componentRef = createComponent(component, {
    environmentInjector: this.injector
  });

  if (data) {
    Object.assign(this.componentRef.instance, data);
  }

  this.appRef.attachView(this.componentRef.hostView);
  const domElem = (this.componentRef.hostView as any).rootNodes[0] as HTMLElement;
  document.body.appendChild(domElem);


  domElem.setAttribute('tabindex', '-1'); 
  domElem.style.outline = 'none';

  setTimeout(() => {
    domElem.focus();
  }, 0);


  this.componentRef.instance.closed.subscribe(() => this.close());
  document.body.style.overflow = 'hidden';
}

  public close(): void {
    if (this.componentRef) {
      this.appRef.detachView(this.componentRef.hostView);
      this.componentRef.destroy();
      this.componentRef = undefined;
      document.body.style.overflow = 'auto';
    }
  }
}