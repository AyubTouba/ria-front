import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLogrequestComponent } from './list-logrequest.component';

describe('ListLogrequestComponent', () => {
  let component: ListLogrequestComponent;
  let fixture: ComponentFixture<ListLogrequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListLogrequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListLogrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
