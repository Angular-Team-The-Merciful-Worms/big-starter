import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { IProject } from "./project";

@Injectable()

export class ProjectService {
    private _projectUrl: string = '../../assets/temp.projects.many.json';

    constructor(private _http: HttpClient) { }
    
        getProjectsByCategory(category: string): Observable<IProject[]> {
            return this._http.get<IProject[]>(this._projectUrl)
            .map((projects: IProject[]) => projects.filter(p => p.category === category))
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
        }

        getProjects(): Observable<IProject[]> {
            return this._http.get<IProject[]>(this._projectUrl)
                .do(data => console.log('All: ' + JSON.stringify(data)))
                .catch(this.handleError);
        }
    
        getProject(id: number): Observable<IProject> {
            return this.getProjects()
                .map((projects: IProject[]) => projects.find(p => p.projectId === id));
        }
    
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