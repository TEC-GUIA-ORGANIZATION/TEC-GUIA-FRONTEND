import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPasswordForgottenComponent } from './login-password-forgotten.component';

describe('LoginPasswordForgottenComponent', () => {
  let component: LoginPasswordForgottenComponent;
  let fixture: ComponentFixture<LoginPasswordForgottenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginPasswordForgottenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginPasswordForgottenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
