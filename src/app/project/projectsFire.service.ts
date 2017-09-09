import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { IProject } from './project';

@Injectable()
export class ProjectsFireService {

    constructor(private db: AngularFireDatabase) { }

    getProjects(): Observable<IProject[]> {
        return this.db.list('/projects') as Observable<IProject[]>;

        // return this.db.object('/projects')
        //     .do(data => {
        //         console.log('All: ' + JSON.stringify(data)); // not casting
        //     });
    }

    getProjectsByCategory(category: string) {
        return this.getProjects()
            .map(projs => projs.filter(p => p.category === category));
    }
}
