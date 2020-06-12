export class message{
    constructor(
        public _id: string,
        public text: string,
        public viewed: string,
        public created_at: string,
        public emitter: string,
        public receiver: string
    ){}
}