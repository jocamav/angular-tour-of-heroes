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
    {
      id: 10,
      name: 'Mr.Mock'
    }];
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
});
