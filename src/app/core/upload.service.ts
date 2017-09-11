import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase';

import { AuthService } from './auth.service';
import { Upload } from './upload';

@Injectable()
export class UploadService {

    constructor(private db: AngularFireDatabase, private authService: AuthService) { }
    private basePath = '/users/';
    upload: FirebaseObjectObservable<Upload>;
    uploads: FirebaseListObservable<Upload[]>;

    public uploadProjectPicture(upload: Upload, id: number) {
        const path = '/projects/' + id + '/projectPicture';
        this.pushUpload(upload, path, id);
    }

    public getProfilePicture() {
        const path = this.basePath + this.authService.currentUserId + '/profilePicture/avatar';
        return this.getUpload(path);
    }

    public uploadProfilePicture(upload: Upload) {
        const path = this.basePath + this.authService.currentUserId + '/profilePicture/avatar';
        this.pushUpload(upload, path);
    }

    public deleteProfilePicture(upload: Upload) {
        const path = this.basePath + this.authService.currentUserId + '/profilePicture/avatar';
        this.deleteUpload(upload, path);
    }

    private deleteUpload(upload: Upload, path: string) {
        this.deleteFileData(upload.$key, path)
            .then(() => {
                this.deleteFileStorage(upload.name, path);
            })
            .catch(error => console.log(error));
    }

    // Executes the file uploading to firebase https://firebase.google.com/docs/storage/web/upload-files
    private pushUpload(upload: Upload, path: string, id?: number) {
        const storageRef = firebase.storage().ref();
        const uploadTask = storageRef.child(`${path}`).put(upload.file);

        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
            (snapshot) => {
                // upload in progress
                const snap = snapshot as firebase.storage.UploadTaskSnapshot;
                upload.progress = (snap.bytesTransferred / snap.totalBytes) * 100;
            },
            (error) => {
                // upload failed
                console.log(error);
            },
            () => {
                // upload success
                upload.url = uploadTask.snapshot.downloadURL;
                upload.name = upload.file.name;
                this.saveFileData(upload, path);
                if (!!id) {
                    this.db.object(`/projects/${id}/imageUrl`).set(uploadTask.snapshot.downloadURL);
                }
                return upload;
            }
        );
    }

    private getUploads(query = {}, path: string) {
        this.uploads = this.db.list(path, {
            query: query
        });

        return this.uploads;
    }

    private getUpload(path: string) {
        this.upload = this.db.object(path);
        return this.upload;
    }

    // Writes the file details to the realtime db
    private saveFileData(upload: Upload, path: string) {
        this.db.list(`${path}/`).push(upload);
    }

    // Writes the file details to the realtime db
    private deleteFileData(key: string, path: string) {
        return this.db.list(path).remove(key);
    }

    // Firebase files must have unique names in their respective storage dir
    // So the name serves as a unique key
    private deleteFileStorage(name: string, path: string) {
        const storageRef = firebase.storage().ref();
        storageRef.child(path).delete();
    }
}
