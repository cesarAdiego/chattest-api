import { Message } from "src/schemas/message.schema";

export class MessageModel {
    public id: string;
    public content: string;

    constructor(message: Message) {
        this.id = message._id;
        this.content = message.Content;
    }
}