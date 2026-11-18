import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechStackFooterComponent } from './tech-stack-footer.component';

describe('TechStackFooterComponent', () => {
  let component: TechStackFooterComponent;
  let fixture: ComponentFixture<TechStackFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechStackFooterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechStackFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
