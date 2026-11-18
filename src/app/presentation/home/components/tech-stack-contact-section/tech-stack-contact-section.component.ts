import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { PROFILE_LINKS } from '../../../../shared/contants/profile-links.constant';
import { RevealDirective } from '../../../../shared/motion/reveal.directive';
import { ScrambleTextDirective } from '../../../../shared/motion/scramble-text.directive';
import { VideoBackdropComponent } from '../../../../shared/ui/video-backdrop/video-backdrop.component';

interface Channel {
  /** Chave em CONTACT.CHANNELS. */
  key: string;
  href: string;
  /** true → baixa arquivo em vez de abrir aba. */
  download?: boolean;
}

/**
 * 07 // CONTATO — fecho da Home: e-mail como canal principal (com copiar),
 * canais secundários e frentes de atuação.
 */
@Component({
  selector: 'tech-stack-contact-section',
  imports: [TranslocoModule, RevealDirective, ScrambleTextDirective, VideoBackdropComponent],
  templateUrl: './tech-stack-contact-section.component.html',
  styleUrl: './tech-stack-contact-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechStackContactSection {
  protected readonly email = PROFILE_LINKS.email;

  protected readonly channels: Channel[] = [
    { key: 'LINKEDIN', href: PROFILE_LINKS.linkedin },
    { key: 'GITHUB', href: PROFILE_LINKS.github },
    { key: 'WHATSAPP', href: PROFILE_LINKS.whatsapp },
    { key: 'RESUME', href: PROFILE_LINKS.resume, download: true },
  ];

  protected readonly fronts = ['ARCH', 'AI', 'SEC'];

  protected readonly copied = signal(false);
  private copyTimer?: ReturnType<typeof setTimeout>;

  protected async copyEmail(): Promise<void> {
    const ok = (await this.writeClipboard(this.email)) || this.legacyCopy(this.email);
    if (!ok) return; // Sem clipboard: o link mailto continua disponível.

    this.copied.set(true);
    clearTimeout(this.copyTimer);
    this.copyTimer = setTimeout(() => this.copied.set(false), 2000);
  }

  private async writeClipboard(text: string): Promise<boolean> {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      return false;
    }
  }

  /** Fallback para contextos sem Clipboard API (http, iframes, permissões). */
  private legacyCopy(text: string): boolean {
    const field = document.createElement('textarea');
    field.value = text;
    field.setAttribute('readonly', '');
    field.style.cssText = 'position:fixed;opacity:0;pointer-events:none';
    document.body.appendChild(field);
    field.select();
    try {
      return document.execCommand('copy');
    } catch {
      return false;
    } finally {
      field.remove();
    }
  }
}
