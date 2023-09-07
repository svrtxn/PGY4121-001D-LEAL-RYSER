import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InfoClasePage } from './info-clase.page';

describe('InfoClasePage', () => {
  let component: InfoClasePage;
  let fixture: ComponentFixture<InfoClasePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(InfoClasePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
