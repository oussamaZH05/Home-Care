import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchNurseComponent } from './search-nurse.component';

describe('SearchNurseComponent', () => {
  let component: SearchNurseComponent;
  let fixture: ComponentFixture<SearchNurseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchNurseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchNurseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
