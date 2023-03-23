import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientPostComponent } from './client-post.component';

describe('ClientPostComponent', () => {
  let component: ClientPostComponent;
  let fixture: ComponentFixture<ClientPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
