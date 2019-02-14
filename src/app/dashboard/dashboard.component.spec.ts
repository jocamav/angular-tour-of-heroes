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

  beforeEach(async(() => {
    let HEROES: Hero[] = [
      {
        id: 10,
        name: 'Mr.Mock'
      }];
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
    //heroService = TestBed.get(HeroService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
