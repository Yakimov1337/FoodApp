import { TestBed } from '@angular/core/testing';

import { MenuItemsService } from './menuItems.service';

describe('MenuItemsService', () => {
  let service: MenuItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuItemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
