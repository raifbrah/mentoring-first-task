import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditUserComponent } from './create-edit-user.component';

describe('AddEditUserComponent', () => {
  let component: CreateEditUserComponent;
  let fixture: ComponentFixture<CreateEditUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEditUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateEditUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
