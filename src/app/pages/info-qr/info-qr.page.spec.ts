import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InfoQrPage } from './info-qr.page';

describe('InfoQrPage', () => {
  let component: InfoQrPage;
  let fixture: ComponentFixture<InfoQrPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(InfoQrPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
