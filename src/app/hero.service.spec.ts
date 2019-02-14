import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { HeroService } from './hero.service';
import { HttpClient } from '@angular/common/http';

describe('HeroService', () => {

  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // Import the HttpClient mocking services
      imports: [HttpClientTestingModule],
      // Provide the service-under-test and its dependencies
      providers: [
        HeroService
      ]
    });

    // as they will be referenced by each test.
    //httpClient = TestBed.get(HttpClient);
  });

  it('should be created', () => {
    const service: HeroService = TestBed.get(HeroService);
    expect(service).toBeTruthy();
  });
});
