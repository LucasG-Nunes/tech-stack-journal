/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ApplicationRef,
  ComponentRef,
  EnvironmentInjector,
  Injectable,
  Type,
  createComponent,
  inject,
  signal,
} from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ModalService {
  private componentRef?: ComponentRef<any>;
  private appRef = inject(ApplicationRef);
  private injector = inject(EnvironmentInjector);
  /** Elemento que abriu o modal; recebe o foco de volta ao fechar. */
  private returnFocusTo: HTMLElement | null = null;

  /**
   * true enquanto há um modal aberto. Os fundos animados (canvas/vídeo) pausam
   * enquanto isso: ficam escondidos atrás do overlay e, se continuassem
   * desenhando, forçariam o backdrop-filter do modal a refazer o blur a cada frame.
   */
  readonly isOpen = signal(false);

  public open<T>(component: Type<T>, data?: Partial<T>): void {
    if (this.componentRef) return;

    this.returnFocusTo = document.activeElement instanceof HTMLElement ? document.activeElement : null;

    this.componentRef = createComponent(component, {
      environmentInjector: this.injector,
    });

    if (data) {
      Object.assign(this.componentRef.instance, data);
    }

    this.appRef.attachView(this.componentRef.hostView);
    const domElem = (this.componentRef.hostView as any).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);

    domElem.setAttribute('tabindex', '-1');
    domElem.style.outline = 'none';

    // preventScroll: o host é fixed, mas evita qualquer ajuste de scroll da página.
    requestAnimationFrame(() => domElem.focus({ preventScroll: true }));

    this.componentRef.instance.closed.subscribe(() => this.close());
    // Sem relayout: html usa scrollbar-gutter: stable (styles.scss), então a
    // largura da página não muda quando a barra de rolagem some.
    document.body.style.overflow = 'hidden';
    this.isOpen.set(true);
  }

  public close(): void {
    if (this.componentRef) {
      this.appRef.detachView(this.componentRef.hostView);
      this.componentRef.destroy();
      this.componentRef = undefined;
      document.body.style.overflow = '';
      this.isOpen.set(false);
      this.returnFocusTo?.focus({ preventScroll: true });
      this.returnFocusTo = null;
    }
  }
}
