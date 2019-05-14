/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UserAuthService } from './user-auth.service';
import { HttpClientModule } from '@angular/common/http';

describe('Service: UserAuth', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserAuthService],
      imports: [HttpClientModule],
    });
  });

  it('should ...', inject([UserAuthService], (service: UserAuthService) => {
    expect(service).toBeTruthy();
  }));
});
