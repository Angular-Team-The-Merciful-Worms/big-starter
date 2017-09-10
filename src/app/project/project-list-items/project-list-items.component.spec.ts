import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectListItemsComponent } from './project-list-items.component';

describe('ProjectListItemsComponent', () => {
  let component: ProjectListItemsComponent;
  let fixture: ComponentFixture<ProjectListItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectListItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectListItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
