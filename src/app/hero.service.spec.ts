import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { HeroService } from './hero.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Hero } from './hero';

describe('HeroService', () => {

  let heroService: HeroService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let heroServiceUrl;

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
    heroService = TestBed.get(HeroService);
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    heroServiceUrl = heroService.heroesUrl;
  });


  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(heroService).toBeTruthy();
  });

  describe('#getHeroes', () => {
    let expectedHeroes: Hero[];
    beforeEach(() => {
      expectedHeroes = [
        { id: 1, name: 'A' },
        { id: 2, name: 'B' },
      ] as Hero[];
    });

    it('should return a list of heroes', () => {

      heroService.getHeroes().subscribe(
        heroes => expect(heroes).toEqual(expectedHeroes, 'should return expected heroes'),
        fail
      );

      const req = httpTestingController.expectOne(heroServiceUrl);
      expect(req.request.method).toEqual('GET');
      req.flush(expectedHeroes);
    });

    it('should return an empty list of heroes', () => {

      heroService.getHeroes().subscribe(
        heroes => {
          expect(heroes).toEqual([], 'should return empty list of heroes')
        },
        fail
      );

      const req = httpTestingController.expectOne(heroServiceUrl);
      expect(req.request.method).toEqual('GET');
      req.flush([]);
    });
  });


  describe('#getHero', () => {
    let expectedHero: Hero;

    beforeEach(() => {
      expectedHero = { id: 1, name: 'Mock' } as Hero;
    });

    it('should return a valid hero', () => {

      let heroId = 1;

      heroService.getHero(heroId).subscribe(
        heroe => expect(heroe).toEqual(expectedHero, 'should return expected heroe'),
        fail
      );

      const req = httpTestingController.expectOne(`${heroServiceUrl}/${heroId}`);
      expect(req.request.method).toEqual('GET');
      req.flush(expectedHero);
    });

    it('should return an undefined object', () => {

      let heroId = 2;
      const emsg = 'deliberate 404 error';

      heroService.getHero(heroId).subscribe(
        heroe => expect(heroe).toBeUndefined(),
        fail
      );

      const req = httpTestingController.expectOne(`${heroServiceUrl}/${heroId}`);
      expect(req.request.method).toEqual('GET');
      req.flush(emsg, { status: 404, statusText: 'Not Found' });
    });

  });

  describe('#updateHero', () => {

    it('should update the hero', () => {

      let updateHero = { id: 2, name: 'Mock Updated' } as Hero;

      heroService.updateHero(updateHero).subscribe(
        heroe => expect(heroe).toEqual(updateHero, 'should return updated heroe'),
        fail
      );

      const req = httpTestingController.expectOne(heroServiceUrl);
      expect(req.request.method).toEqual('PUT');
      expect(req.request.body).toEqual(updateHero);
      req.flush(updateHero);
    });

    it('should return an undefined object', () => {

      let updateHero = { id: 3, name: 'Mock Updated' } as Hero;

      heroService.updateHero(updateHero).subscribe(
        heroe => expect(heroe).toBeUndefined(),
        fail
      );

      const req = httpTestingController.expectOne(heroServiceUrl);
      expect(req.request.method).toEqual('PUT');
      req.flush("Deliberated Error", { status: 404, statusText: 'Not Found' });
    });

  });


  describe('#addHero', () => {

    it('should create the hero', () => {

      let createdHero = { name: 'Mock Created' } as Hero;

      heroService.addHero(createdHero).subscribe(
        heroe => expect(heroe).toEqual(createdHero, 'should return created heroe'),
        fail
      );

      const req = httpTestingController.expectOne(heroServiceUrl);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(createdHero);
      req.flush(createdHero);
    });

    it('should return an undefined object', () => {

      let createdHero = { name: 'Mock Created' } as Hero;

      heroService.addHero(createdHero).subscribe(
        heroe => expect(heroe).toBeUndefined(),
        fail
      );

      const req = httpTestingController.expectOne(heroServiceUrl);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(createdHero);
      req.flush("Deliberated Error", { status: 422, statusText: 'Some error' });
    });

  });

  describe('#deleteHero', () => {

    it('should delete the hero', () => {

      let deletedHero = { id: 3, name: 'Mock to Delete' } as Hero;

      heroService.deleteHero(deletedHero).subscribe(
        heroe => expect(heroe).toEqual(deletedHero, 'should return deleted heroe'),
        fail
      );

      const req = httpTestingController.expectOne(`${heroServiceUrl}/${deletedHero.id}`);
      expect(req.request.method).toEqual('DELETE');
      req.flush(deletedHero);
    });

    it('should return an undefined object', () => {

      let deletedHero = { id: 3, name: 'Mock to Delete' } as Hero;

      heroService.deleteHero(deletedHero).subscribe(
        heroe => expect(heroe).toBeUndefined(),
        fail
      );

      const req = httpTestingController.expectOne(`${heroServiceUrl}/${deletedHero.id}`);
      expect(req.request.method).toEqual('DELETE');
      req.flush("Deliberated Error", { status: 422, statusText: 'Some error' });
    });

  });


  describe('#searchHeroes', () => {
    let expectedSearchHeroes: Hero[];
    beforeEach(() => {
      expectedSearchHeroes = [
        { id: 1, name: 'Hero A' },
        { id: 2, name: 'Hero B' },
      ] as Hero[];
    });

    it('should return a list of heroes', () => {

      let searchTerm = 'Her';
      heroService.searchHeroes(searchTerm).subscribe(
        heroes => expect(heroes).toEqual(expectedSearchHeroes, 'should return some heroes'),
        fail
      );

      const req = httpTestingController.expectOne(`${heroServiceUrl}/?name=${searchTerm}`);
      expect(req.request.method).toEqual('GET');
      req.flush(expectedSearchHeroes);
    });

    it('should return an empty list of heroes', () => {

      let searchTerm = 'mock';
      heroService.searchHeroes(searchTerm).subscribe(
        heroes => {
          expect(heroes).toEqual([], 'should return empty list of heroes')
        },
        fail
      );

      const req = httpTestingController.expectOne(`${heroServiceUrl}/?name=${searchTerm}`);
      expect(req.request.method).toEqual('GET');
      req.flush([]);
    });
  });


});
