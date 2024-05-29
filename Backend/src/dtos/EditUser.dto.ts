export interface EditUserDto {
    username?: string;
    email?: string;
    password?: string;
    createdAt? : Date;
    canvasCredentials?: string;
    events?: Map<string, unknown>;
}