import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { HeroesComponent } from './heroes.component';

import { HeroService } from '../hero.service';
import { Hero } from '../hero';
import { of } from 'rxjs';

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;

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

  heroerviceStub = {
    getHeroes: function () { return of(HEROES); }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [HeroesComponent],
      providers: [{ provide: HeroService, useValue: heroerviceStub }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have all the heroes', () => {

    const compiled: HTMLElement = fixture.debugElement.nativeElement;
    let links = compiled.querySelectorAll('li');
    expect(links.length).toBe(HEROES.length);
    links.forEach((currentLink, index) => {
      expect(currentLink.textContent).toContain(HEROES[index].name);
      expect(currentLink.querySelector('span').textContent).toBe(`${HEROES[index].id}`);
      expect(currentLink.querySelector('button.delete').textContent).toBe('x');
    });

  });
});
