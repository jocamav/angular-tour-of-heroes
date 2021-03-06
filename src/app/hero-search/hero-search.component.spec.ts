import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { HeroSearchComponent } from './hero-search.component';

import { HeroService } from '../hero.service';
import { Hero } from '../hero';
import { of } from 'rxjs';

describe('HeroSearchComponent', () => {
  let component: HeroSearchComponent;
  let fixture: ComponentFixture<HeroSearchComponent>;
  let heroerviceStub: Partial<HeroService>;

  let HEROES: Hero[] = [
    { id: 11, name: 'Mr. Mock' },
    { id: 12, name: 'Mockito' }
  ];

  heroerviceStub = {
    searchHeroes: function () { return of(HEROES); }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [HeroSearchComponent],
      providers: [{ provide: HeroService, useValue: heroerviceStub }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return some heroes', () => {
    const compiled: HTMLElement = fixture.debugElement.nativeElement;
    let links = compiled.querySelectorAll('li');
    expect(links.length).toBe(0); //FIXME: It's an async service
    links.forEach((currentLink, index) => {
      expect(currentLink.textContent).toContain(HEROES[index].name);
      expect(currentLink.querySelector('span').textContent).toBe(`${HEROES[index].id}`);
      expect(currentLink.querySelector('button.delete').textContent).toBe('x');
    });

  });

});
