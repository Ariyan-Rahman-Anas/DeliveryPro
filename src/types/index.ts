import type { ReactNode } from "react"

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


// table  related props
export interface TableColumn<T> {
    key: keyof T | 'index' | string;
    header: string;
    render?: (item: T) => ReactNode;
    width?: string;
    className?: string;
    headerClassName?: string;
}

export interface DataTableProps<T> {
    data?: T[];
    columns: TableColumn<T>[];
    paginationOptions?: {
        count?: number;
        current_page?: number;
        next_page?: number;
        num_pages?: number;
    };
    pageSize?: number;
    setPageSize?: (newPageSize: number) => void;
    isError?: boolean;
    errorMessage?: string;
    onPageChange?: (newPage: number) => void;
    isLoading?: boolean;
    emptyMessage?: string;
}

export interface PaginationOptions {
    count?: number;
    current_page?: number;
    next_page?: number;
    num_pages?: number;
}

export interface TablePaginationProps {
    paginationOptions: PaginationOptions;
    pageSize?: number;
    setPageSize?: (newPageSize: number) => void;
    onPageChange?: (newPage: number) => void;
}