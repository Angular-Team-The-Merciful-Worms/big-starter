import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { IProject } from './project';

@Injectable()
export class ProjectsFireService {

    constructor(private db: AngularFireDatabase) { }

    getProjects() {
        return this.db.list('/projects').subscribe((response) => console.log(response));
        // return this.db.object('/projects')
        //     .do(data => {
        //         console.log('All: ' + JSON.stringify(data)); // not casting
        //     });
    }
}
