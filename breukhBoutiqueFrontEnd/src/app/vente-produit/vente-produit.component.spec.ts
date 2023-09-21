import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenteProduitComponent } from './vente-produit.component';

describe('VenteProduitComponent', () => {
  let component: VenteProduitComponent;
  let fixture: ComponentFixture<VenteProduitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VenteProduitComponent]
    });
    fixture = TestBed.createComponent(VenteProduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
