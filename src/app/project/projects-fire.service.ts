import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { HttpErrorResponse } from '@angular/common/http';


import { IProject } from './project';

@Injectable()
export class ProjectsFireService {

    constructor(private db: AngularFireDatabase) { }

    getProjectByUid(uid: string) {
        return this.db.object('/projects/' + uid)
            .map(this.mapProject) as Observable<IProject>;
    }

    // unclear if a better way to extract id?
    getProjects(): Observable<IProject[]> {
        return this.db.list('/projects')
            .map(innerArray => innerArray.map(this.mapProject))
            .catch(this.handleError) as Observable<IProject[]>;
    }

    updateProjectByUid(uid: string, obj: IProject) {
        return this.db.list('/projects').update(uid, obj)
            .catch((err: any) => {
                console.log(err); // again, customize me please
            });
    }

    private mapProject(project) {
        const newProject = project;
        newProject.projectId = +project.$key + 1;
        if (!project.upvotedBy) {
            // newProject.votes = project.upvotedBy.length;
            newProject.upvotedBy = [];
            // console.log(project.upvotedBy);
        }

        // console.log(newProject);
        newProject.votes = newProject.upvotedBy.length;
        return newProject;
    }

    getProjectsByCategory(category: string): Observable<IProject[]> {
        return this.getProjects()
            .map(projs => projs.filter(p => p.category === category)) as Observable<IProject[]>;
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
