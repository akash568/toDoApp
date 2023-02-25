export interface List {
    id: number,
    note: string,
    dueDate?: string,
    creationDate: string,
    color: string,
    type: number,
    file?: processedFile[],
    isComplete: boolean
}

export interface processedFile {
    name: string;
    result: string;
}  