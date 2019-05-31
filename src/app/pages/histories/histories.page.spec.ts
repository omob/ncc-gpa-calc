import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriesPage } from './histories.page';

describe('HistoriesPage', () => {
  let component: HistoriesPage;
  let fixture: ComponentFixture<HistoriesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoriesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoriesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
