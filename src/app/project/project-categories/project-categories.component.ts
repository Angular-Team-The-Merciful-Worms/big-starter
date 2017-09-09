import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-categories',
  templateUrl: './project-categories.component.html',
  styleUrls: ['./project-categories.component.css']
})
export class ProjectCategoriesComponent implements OnInit {
  categories: string[];
  constructor() { }

  ngOnInit() {
    this.categories = ['Individual', 'Group', 'Community'];
  }
}
