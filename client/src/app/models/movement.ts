export class Movement {
    constructor(
        public _id: string,
        public assigneeId: string,
        public assignee: string,
        public productId: string,
        public product: string,
        public inOut: boolean,
        public createdAt: number = null,
        public updatedAt: number = null
    ) { }
}