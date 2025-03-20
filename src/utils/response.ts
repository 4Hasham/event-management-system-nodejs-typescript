export interface APIResponse {
    success: Boolean,
    message: String,
    record: Object
};

export enum CODES {
    OK = 200,
    CREATED = 201,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403
};