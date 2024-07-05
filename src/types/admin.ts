export interface ISearchUserRequest {
    username: string;
}

export interface IAdjustAdminRequest {
    userId: string;
    admin_type: number;
    currentUserId: string;
}