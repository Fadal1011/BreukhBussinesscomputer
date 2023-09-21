import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemCommandeComponent } from './item-commande.component';

describe('ItemCommandeComponent', () => {
  let component: ItemCommandeComponent;
  let fixture: ComponentFixture<ItemCommandeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItemCommandeComponent]
    });
    fixture = TestBed.createComponent(ItemCommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
