import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  afterNextRender,
  inject,
  signal,
} from '@angular/core';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { CaseStudy } from '../../../presentation/home/components/tech-stack-case-studies/tech-stack-case-study-card/tech-stack-case-study-card.component';
import { GsapService } from '../../../core/motion/gsap.service';
import { AX_DURATION, AX_EASE } from '../../../core/motion/motion.tokens';
import { TickerDirective } from '../../motion/ticker.directive';

interface ProjectResourceLink {
  LABEL: string;
  URL: string;
}

interface ProjectResourceImage {
  URL: string;
  CAPTION: string;
}

/**
 * Dossiê de projeto (modal AXIOM).
 *
 * Criado dinamicamente pelo ModalService, que atribui `projectData` e escuta `closed`.
 * - Entrada/saída com GSAP só em transform + opacity. O véu (com backdrop-filter)
 *   e o painel animam separados: opacidade num ANCESTRAL do véu o transformaria
 *   em "backdrop root" e o blur só apareceria no fim do fade.
 * - Dados derivados de i18n calculados uma vez (ngOnInit), não a cada change detection.
 * - Esc fecha a imagem ampliada primeiro, depois o dossiê.
 * - Deep dive, referências e evidências sempre visíveis; "expandir" só muda o tamanho.
 */
@Component({
  selector: 'tech-stack-project-details-modal',
  imports: [TranslocoModule, TickerDirective],
  templateUrl: 'tech-stack-project-details-modal.html',
  styleUrl: './tech-stack-project-details-modal.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechStackProjectDetailsModal implements OnInit {
  @Input() projectData!: CaseStudy;
  @Output() closed = new EventEmitter<void>();

  protected readonly isMaximized = signal(false);
  protected readonly selectedImage = signal<ProjectResourceImage | null>(null);

  private readonly transloco = inject(TranslocoService);
  private readonly motion = inject(GsapService);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private closing = false;

  protected projectKey = '';
  protected links: ProjectResourceLink[] = [];
  protected images: ProjectResourceImage[] = [];

  constructor() {
    afterNextRender(() => this.animateIn());
  }

  @HostListener('window:keydown.escape')
  protected onEscape(): void {
    if (this.selectedImage()) {
      this.selectedImage.set(null);
      return;
    }
    this.close();
  }

  ngOnInit(): void {
    const parts = this.projectData.title.split('.');
    this.projectKey = parts[parts.length - 2];
    this.links = this.resource<ProjectResourceLink>('LINKS').filter(link => !!link.LABEL);
    this.images = this.resource<ProjectResourceImage>('IMAGES');
  }

  /**
   * Expandir/recolher: o tamanho muda de uma vez (sem transition de
   * width/max-height, que fazia relayout a cada frame) e o painel "assenta"
   * com uma animação curta de scale + opacity, toda no compositor.
   */
  protected toggleMaximize(): void {
    this.isMaximized.update(value => !value);
    if (this.motion.prefersReducedMotion()) return;

    this.motion
      .load()
      .then(({ gsap }) =>
        this.motion.outside(() =>
          gsap.fromTo(
            this.q('.dossier-modal__panel'),
            { scale: 0.985, autoAlpha: 0.7 },
            { scale: 1, autoAlpha: 1, duration: AX_DURATION.fast * 1.5, ease: AX_EASE.out, clearProps: 'transform' },
          ),
        ),
      )
      .catch(() => undefined);
  }

  protected openImage(image: ProjectResourceImage): void {
    this.selectedImage.set(image);
  }

  protected closeImage(): void {
    this.selectedImage.set(null);
  }

  /** Anima a saída e só então avisa o ModalService. */
  close(): void {
    if (this.closing) return;
    this.closing = true;

    if (this.motion.prefersReducedMotion()) {
      this.closed.emit();
      return;
    }

    this.motion
      .load()
      .then(({ gsap }) =>
        this.motion.outside(() =>
          gsap
            .timeline({ onComplete: () => this.closed.emit() })
            .to(this.q('.dossier-modal__panel'), {
              autoAlpha: 0,
              y: 16,
              scale: 0.98,
              force3D: true,
              duration: AX_DURATION.fast,
              ease: 'power2.in',
            })
            .to(this.q('.dossier-modal__backdrop'), { autoAlpha: 0, duration: AX_DURATION.fast }, '<0.1'),
        ),
      )
      .catch(() => this.closed.emit());
  }

  // ---------------------------------------------------------------- dados i18n
  /** Transloco devolve a própria chave (string) quando ela não existe. */
  private resource<T>(kind: 'LINKS' | 'IMAGES'): T[] {
    const value = this.transloco.translate<unknown>(`PROJECTS.ITEMS.${this.projectKey}.RESOURCES.${kind}`);
    return Array.isArray(value) ? (value as T[]) : [];
  }

  // ------------------------------------------------------------------ motion
  private animateIn(): void {
    if (this.motion.prefersReducedMotion()) return;

    this.motion
      .load()
      .then(({ gsap }) =>
        this.motion.outside(() => {
          gsap
            .timeline({ defaults: { ease: AX_EASE.out } })
            .from(this.q('.dossier-modal__backdrop'), { autoAlpha: 0, duration: AX_DURATION.fast })
            .from(
              this.q('.dossier-modal__panel'),
              { autoAlpha: 0, y: 32, scale: 0.97, force3D: true, duration: AX_DURATION.base, clearProps: 'transform' },
              '<0.05',
            )
            .from(
              this.host.querySelectorAll('[data-dossier-item]'),
              { autoAlpha: 0, y: 16, stagger: 0.06, duration: AX_DURATION.base, clearProps: 'transform' },
              '<0.15',
            );
        }),
      )
      .catch(() => undefined);
  }

  private q(selector: string): Element | null {
    return this.host.querySelector(selector);
  }
}
