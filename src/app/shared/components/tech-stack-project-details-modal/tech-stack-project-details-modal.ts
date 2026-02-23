import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, inject, Input, Output } from '@angular/core';
import { CaseStudy } from '../../../presentation/home/components/tech-stack-case-studies/tech-stack-case-study-card/tech-stack-case-study-card.component';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';



interface ProjectResourceLink {
  LABEL: string;
  URL: string;
}

interface ProjectResourceImage {
  URL: string;
  CAPTION: string;
}

interface ProjectResources {
  LINKS?: ProjectResourceLink[];
  IMAGES?: ProjectResourceImage[];
}

interface ProjectDetailsTranslation {
  DEEP_DIVE: string;
  RESOURCES: ProjectResources;
}

@Component({
  selector: 'tech-stack-project-details-modal',
  imports: [TranslocoModule],
  templateUrl: 'tech-stack-project-details-modal.html',
  styleUrl: './tech-stack-project-details-modal.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechStackProjectDetailsModal {

  @Input() projectData!: CaseStudy;
  @Output() closed = new EventEmitter<void>();

  selectedImage: string | null = null;

openImagePreview(url: string) {
  this.selectedImage = url;
}

closeImagePreview() {
  this.selectedImage = null;
}

  private translocoService = inject(TranslocoService)
  isMaximized = false;

  @HostListener('window:keydown.escape')
  onEscape() {
    this.close();
  }

  toggleMaximize() {
    this.isMaximized = !this.isMaximized;
  }

  close() {
    this.closed.emit();
  }
  
  getProjectKey(): string {
    const parts = this.projectData.title.split('.');
    return parts[parts.length - 2];
  }


get projectDetails(): ProjectDetailsTranslation {
    const key = `PROJECTS.ITEMS.${this.getProjectKey()}`;
    
    return {
      DEEP_DIVE: this.translocoService.translate(`${key}.DEEP_DIVE`),
      RESOURCES: this.translocoService.translate<ProjectResources>(`${key}.RESOURCES`)
    };
  }

get projectLinks(): ProjectResourceLink[] | null {
  const key = `PROJECTS.ITEMS.${this.getProjectKey()}.RESOURCES.LINKS`;
  const translation = this.translocoService.translate<unknown>(key);
  
  if (typeof translation === 'string') return null;
  
  return translation as ProjectResourceLink[];
}

get projectImages(): ProjectResourceImage[] | null {
  const key = `PROJECTS.ITEMS.${this.getProjectKey()}.RESOURCES.IMAGES`;
  const translation = this.translocoService.translate<unknown>(key);
  
  if (typeof translation === 'string') return null;
  
  return translation as ProjectResourceImage[];
}
  openFullScreenImage(url: string) {
    window.open(url, '_blank');
  }}
