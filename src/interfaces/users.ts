export interface LoginForm {
    email: string;
    password: string;
}

export interface registerForm {
    name: string;
    email: string;
    password: string;
}

export interface LoginResult {
    success: boolean;
    errorMessage?: string;
}