import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersTableItemComponent } from './orders-table-item.component';

describe('OrdersTableItemComponent', () => {
  let component: OrdersTableItemComponent;
  let fixture: ComponentFixture<OrdersTableItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [OrdersTableItemComponent],
}).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersTableItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
