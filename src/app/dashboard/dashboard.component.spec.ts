import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { DashboardComponent } from './dashboard.component';
import { Component } from '@angular/core';
import { HeroService } from '../hero.service';
import { Hero } from '../hero'
import { of } from 'rxjs';

@Component({ selector: 'app-hero-search', template: '' })
class HeroSearchComponent { }

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  let heroService: HeroService;
  let heroerviceStub: Partial<HeroService>;

  let HEROES: Hero[] = [
    { id: 11, name: 'Mr. Nice' },
    { id: 12, name: 'Narco' },
    { id: 13, name: 'Bombasto' },
    { id: 14, name: 'Celeritas' },
    { id: 15, name: 'Magneta' },
    { id: 16, name: 'RubberMan' },
    { id: 17, name: 'Dynama' },
    { id: 18, name: 'Dr IQ' },
    { id: 19, name: 'Magma' },
    { id: 20, name: 'Tornado' }
  ];

  beforeEach(async(() => {

    heroerviceStub = {
      getHeroes: function () { return of(HEROES); }
    };

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [DashboardComponent, HeroSearchComponent],
      providers: [{ provide: HeroService, useValue: heroerviceStub }]
    })
      .compileComponents();
    // UserService from the root injector
    heroService = TestBed.get(HeroService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 4 heroes (from #1 to #4)', () => {

    const compiled: HTMLElement = fixture.debugElement.nativeElement;
    let links = compiled.querySelectorAll('a');
    expect(links.length).toBe(4);

    links.forEach((currentLink, index) => {
      expect(currentLink.textContent).toContain(HEROES[index + 1].name);
    });

  });
});
