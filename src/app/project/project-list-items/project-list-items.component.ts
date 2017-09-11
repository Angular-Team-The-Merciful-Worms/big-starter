import { Component, OnInit, Input } from '@angular/core';
import { IProject } from '../project';

@Component({
  selector: 'app-project-list-items',
  templateUrl: './project-list-items.component.html',
  styleUrls: ['./project-list-items.component.css']
})
export class ProjectListItemsComponent implements OnInit {
  @Input() projects: IProject[];
  @Input() number: number;

  constructor() { }

  ngOnInit() {
  }

  columnStyle(divider: number): string {
    return 'col-lg-' + 12 / divider;
  }
}
