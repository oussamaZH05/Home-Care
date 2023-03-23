import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowClientPostsComponent } from './show-client-posts.component';

describe('ShowClientPostsComponent', () => {
  let component: ShowClientPostsComponent;
  let fixture: ComponentFixture<ShowClientPostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowClientPostsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowClientPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
