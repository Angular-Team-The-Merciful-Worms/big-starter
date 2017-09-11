import { Upload } from '../core/upload';

export interface IProject {
    authorId?: string;
    projectId: number;
    projectName: string;
    authorName: string;
    description: string;
    category: string;
    location: string;
    dateCreated: string;
    votes: number;
    accumulatedFunds: number;
    targetFunds: number;
    upvotedBy?: string[];

    imgUrl?: string;
    projectPicture?: Upload;
}
