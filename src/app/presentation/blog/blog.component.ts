import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { SeoService } from '../../core/services/seo/seo.service';
import { TechStackUnderConstructionModalComponent } from '../../shared/components/tech-stack-under-construction-modal/tech-stack-under-construction-modal.component';
import {
  ENGINEERING_LOGS,
  EngineeringLog,
  LOG_TRACKS,
  LogTrack,
} from '../../shared/contants/engineering-logs.constant';
import { PROFILE_LINKS } from '../../shared/contants/profile-links.constant';
import { RevealDirective } from '../../shared/motion/reveal.directive';
import { ScrambleTextDirective } from '../../shared/motion/scramble-text.directive';
import { TickerDirective } from '../../shared/motion/ticker.directive';
import { ModalService } from '../../shared/services/ModalService';
import { LogCardComponent } from '../../shared/ui/log-card/log-card.component';
import { SectionHeaderComponent } from '../../shared/ui/section-header/section-header.component';
import { VideoBackdropComponent } from '../../shared/ui/video-backdrop/video-backdrop.component';

interface TrackSummary {
  key: LogTrack;
  count: number;
}

/**
 * /blog — Engineering Lab (AXIOM).
 * Hero com status honesto do lab, filtro por trilha e fila de publicação.
 */
@Component({
  selector: 'tech-stack-blog',
  imports: [
    TranslocoModule,
    RouterLink,
    RevealDirective,
    ScrambleTextDirective,
    TickerDirective,
    LogCardComponent,
    SectionHeaderComponent,
    VideoBackdropComponent,
  ],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogComponent {
  private readonly modalService = inject(ModalService);
  private readonly seo = inject(SeoService);

  protected readonly linkedin = PROFILE_LINKS.linkedin;
  protected readonly logs = ENGINEERING_LOGS;

  protected readonly drafts = this.logs.filter(log => log.status === 'DRAFT').length;
  protected readonly published = this.logs.length - this.drafts;

  protected readonly tracks: TrackSummary[] = LOG_TRACKS.map(key => ({
    key,
    count: this.logs.filter(log => log.track === key).length,
  }));

  /** null = todas as trilhas. */
  protected readonly activeTrack = signal<LogTrack | null>(null);

  protected readonly visibleLogs = computed<EngineeringLog[]>(() => {
    const track = this.activeTrack();
    return track ? this.logs.filter(log => log.track === track) : this.logs;
  });

  constructor() {
    // Meta próprio da rota; reaplica ao trocar de idioma.
    inject(TranslocoService)
      .selectTranslate<string[]>(['BLOG.SEO_TITLE', 'BLOG.SEO_DESCRIPTION'])
      .pipe(takeUntilDestroyed())
      .subscribe(([title, description]) => this.seo.updateMetaTags({ title, description }));
  }

  protected selectTrack(track: LogTrack | null): void {
    this.activeTrack.set(track);
  }

  protected openLog(): void {
    this.modalService.open(TechStackUnderConstructionModalComponent);
  }
}
