import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyData } from './empty-data';

describe('EmptyData', () => {
  let component: EmptyData;
  let fixture: ComponentFixture<EmptyData>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmptyData]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmptyData);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
