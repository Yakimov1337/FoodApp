import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuItemAuctionsTableItemComponent } from './menuItem-auctions-table-item.component';

describe('MenuItemAuctionsTableItemComponent', () => {
  let component: MenuItemAuctionsTableItemComponent;
  let fixture: ComponentFixture<MenuItemAuctionsTableItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [MenuItemAuctionsTableItemComponent],
}).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuItemAuctionsTableItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
