export interface AuthState {
    user: {
        _id: string,
        name: string,
        email: string,
        role: string
    } | null,
    accessToken: string | null
    refreshToken: string | null
}

export interface LoginFormData {
    email: string
    password: string
}

export interface RegistrationFormData {
    name: string
    email: string
    password: string
    role: string
}

export interface NavLinkPropsI {
    to: string;
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    isActive?: boolean;
}