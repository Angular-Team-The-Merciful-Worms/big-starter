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

    getProfilePicture() {
        const path = this.basePath + this.authService.currentUserId + '/profilePicture/avatar';
        return this.getUpload(path);
    }

    uploadProfilePicture(upload: Upload) {
        const path = this.basePath + this.authService.currentUserId + '/profilePicture/avatar';
        this.pushUpload(upload, path);
    }

    // Executes the file uploading to firebase https://firebase.google.com/docs/storage/web/upload-files
    private pushUpload(upload: Upload, path: string) {
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

    private deleteUpload(upload: Upload) {
        this.deleteFileData(upload.$key)
            .then(() => {
                this.deleteFileStorage(upload.name);
            })
            .catch(error => console.log(error));
    }

    // Writes the file details to the realtime db
    private saveFileData(upload: Upload, path: string) {
        this.db.list(`${path}/`).push(upload);
    }

    // Writes the file details to the realtime db
    private deleteFileData(key: string) {
        return this.db.list(`${this.basePath}/`).remove(key);
    }

    // Firebase files must have unique names in their respective storage dir
    // So the name serves as a unique key
    private deleteFileStorage(name: string) {
        const storageRef = firebase.storage().ref();
        storageRef.child(`${this.basePath}/${name}`).delete();
    }
}
