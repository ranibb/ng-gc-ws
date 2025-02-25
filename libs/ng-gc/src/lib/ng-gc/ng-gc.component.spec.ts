import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgGcComponent } from './ng-gc.component';

describe('NgGcComponent', () => {
  let component: NgGcComponent;
  let fixture: ComponentFixture<NgGcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgGcComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NgGcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
