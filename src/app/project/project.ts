export interface IProject {
    authorId?: string;
    projectId: number;
    projectName: string;
    authorName: string;
    description: string;
    category: string;
    location: number;
    dateCreated: number;
    votes: string;
    upvotedBy?: string[];
    accumulatedFunds: number;
    targetFunds: number;
    imageUrl: string;
}
