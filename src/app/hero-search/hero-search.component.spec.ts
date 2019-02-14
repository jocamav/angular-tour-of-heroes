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
    {
      id: 10,
      name: 'Mr.Mock'
    }];
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
});
