import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { HttpErrorResponse } from '@angular/common/http';


import { IProject } from './project';

@Injectable()
export class ProjectsFireService {

    constructor(private db: AngularFireDatabase) { }

    getProjects(): Observable<IProject[]> {
        return this.db.list('/projects')
            .catch(this.handleError) as Observable<IProject[]>;
    }

    getProjectsByCategory(category: string): Observable<IProject[]> {
        return this.getProjects()
            .map(projs => projs.filter(p => p.category === category));
    }

    // not sure it works for FireBase - does not hurt atm
    private handleError(err: HttpErrorResponse) {
        let errorMessage = '';
        if (err.error instanceof Error) {
            errorMessage = `An error occurred: ${err.error.message}`;
        } else {
            errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        console.error(errorMessage);
        return Observable.throw(errorMessage);
    }
}
