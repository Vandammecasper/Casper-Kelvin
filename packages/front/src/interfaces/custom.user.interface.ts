export enum Role {
    SUPER_ADMIN = 'SUPER_ADMIN',
    ADMIN = 'ADMIN',
    USER = 'USER',
  }
  
  export interface CustomUser {
    id?: string
    uid: string
    name: string
    locale?: string
    role: Role
    createdAt?: string
    updatedAt?: string
  }
  