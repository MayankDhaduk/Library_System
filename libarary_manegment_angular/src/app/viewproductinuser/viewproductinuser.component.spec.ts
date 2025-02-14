import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewproductinuserComponent } from './viewproductinuser.component';

describe('ViewproductinuserComponent', () => {
  let component: ViewproductinuserComponent;
  let fixture: ComponentFixture<ViewproductinuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewproductinuserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewproductinuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
