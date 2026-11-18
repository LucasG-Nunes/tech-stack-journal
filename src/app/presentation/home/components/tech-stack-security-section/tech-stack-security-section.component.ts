import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { RevealDirective } from '../../../../shared/motion/reveal.directive';
import { TiltDirective } from '../../../../shared/motion/tilt.directive';
import { TypewriterDirective } from '../../../../shared/motion/typewriter.directive';
import { GlassCardComponent } from '../../../../shared/ui/glass-card/glass-card.component';
import { SectionHeaderComponent } from '../../../../shared/ui/section-header/section-header.component';

type TerminalLineKind = 'cmd' | 'out' | 'ok' | 'tag';

interface TerminalLine {
  kind: TerminalLineKind;
  /** Comandos são literais; saídas são chaves i18n (SECURITY.TERMINAL.*). */
  text: string;
  /** Prefixo literal em saídas (ex.: [hobby]). */
  tag?: string;
}

/**
 * 04 // SEGURANÇA OFENSIVA & DEVSECOPS
 * Terminal "digitado" + 4 práticas que levam a mentalidade ofensiva para o design.
 */
@Component({
  selector: 'tech-stack-security-section',
  imports: [TranslocoModule, RevealDirective, TiltDirective, TypewriterDirective, GlassCardComponent, SectionHeaderComponent],
  templateUrl: './tech-stack-security-section.component.html',
  styleUrl: './tech-stack-security-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechStackSecuritySection {
  protected readonly terminal: TerminalLine[] = [
    { kind: 'cmd', text: 'whoami' },
    { kind: 'out', text: 'SECURITY.TERMINAL.WHOAMI' },
    { kind: 'cmd', text: 'cat ./training.log' },
    { kind: 'tag', tag: '[hobby]', text: 'SECURITY.TERMINAL.HOBBY' },
    { kind: 'tag', tag: '[field]', text: 'SECURITY.TERMINAL.FIELD' },
    { kind: 'tag', tag: '[apply]', text: 'SECURITY.TERMINAL.APPLY' },
    { kind: 'cmd', text: './audit --target=architecture' },
    { kind: 'ok', text: 'SECURITY.TERMINAL.CHECK_GATEWAY' },
    { kind: 'ok', text: 'SECURITY.TERMINAL.CHECK_SECRETS' },
    { kind: 'ok', text: 'SECURITY.TERMINAL.CHECK_PIPELINE' },
  ];

  protected readonly practices = ['THREAT', 'PIPELINE', 'ZERO_TRUST', 'HARDENING'];
}
