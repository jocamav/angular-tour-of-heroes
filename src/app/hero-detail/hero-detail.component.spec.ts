import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { RouterTestingModule } from '@angular/router/testing';
import { HeroDetailComponent } from './hero-detail.component';

import { HeroService } from '../hero.service';
import { Hero } from '../hero';
import { of } from 'rxjs';

describe('HeroDetailComponent', () => {
  let component: HeroDetailComponent;
  let fixture: ComponentFixture<HeroDetailComponent>;

  let heroerviceStub: Partial<HeroService>;

  beforeEach(async(() => {
    let hero: Hero = {
      id: 10,
      name: 'Mr.Mock'
    };

    heroerviceStub = {
      getHero: function () { return of(hero); }
    };

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule, FormsModule
      ],
      declarations: [HeroDetailComponent],
      providers: [{ provide: HeroService, useValue: heroerviceStub }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
