import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchProduitComponent } from './search-produit.component';

describe('SearchProduitComponent', () => {
  let component: SearchProduitComponent;
  let fixture: ComponentFixture<SearchProduitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchProduitComponent]
    });
    fixture = TestBed.createComponent(SearchProduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
