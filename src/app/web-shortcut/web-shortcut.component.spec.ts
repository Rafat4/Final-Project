import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebShortcutComponent } from './web-shortcut.component';

describe('WebShortcutComponent', () => {
  let component: WebShortcutComponent;
  let fixture: ComponentFixture<WebShortcutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebShortcutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebShortcutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
