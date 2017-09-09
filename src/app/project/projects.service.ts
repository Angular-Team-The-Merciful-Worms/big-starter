import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { IProject } from './project';

@Injectable()
export class ProjectsService {

    constructor(private db: AngularFireDatabase) { }

    getProjects() {
        return this.db.object('/projects').subscribe((response) => console.log(response));
        // return this.db.list('projects')
        //     .do(data => {
        //         console.log('All: ' + JSON.stringify(data)); // not casting
        //     });
    }
}
