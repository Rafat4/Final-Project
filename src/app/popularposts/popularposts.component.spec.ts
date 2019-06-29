import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularpostsComponent } from './popularposts.component';

describe('PopularpostsComponent', () => {
  let component: PopularpostsComponent;
  let fixture: ComponentFixture<PopularpostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopularpostsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopularpostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
