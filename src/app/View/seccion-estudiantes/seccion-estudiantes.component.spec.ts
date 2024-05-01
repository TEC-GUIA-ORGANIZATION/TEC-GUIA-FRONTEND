import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeccionEstudiantesComponent } from './seccion-estudiantes.component';

describe('SeccionEstudiantesComponent', () => {
  let component: SeccionEstudiantesComponent;
  let fixture: ComponentFixture<SeccionEstudiantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SeccionEstudiantesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SeccionEstudiantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
