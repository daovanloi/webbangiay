interface IComment {
    _id?: any;
    key?: string | any
    content: string,
    Product_id?: string,
    User_id: string,
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null,
}
export default IComment 