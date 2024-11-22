export interface IMessage {
    id: number;
    conId?: string;
    logTime?: string;
    message: string;
    userId: string;
}