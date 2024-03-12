import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuItemAuctionsTableComponent } from './menuItem-auctions-table.component';

describe('MenuItemAuctionsTableComponent', () => {
  let component: MenuItemAuctionsTableComponent;
  let fixture: ComponentFixture<MenuItemAuctionsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [MenuItemAuctionsTableComponent],
}).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuItemAuctionsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
