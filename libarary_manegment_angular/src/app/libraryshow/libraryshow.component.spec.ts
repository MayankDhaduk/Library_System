import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryshowComponent } from './libraryshow.component';

describe('LibraryshowComponent', () => {
  let component: LibraryshowComponent;
  let fixture: ComponentFixture<LibraryshowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryshowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibraryshowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
