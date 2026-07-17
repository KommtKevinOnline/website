declare module '#auth-utils' {
  interface User {
    id: string;
    login: string;
    displayName: string;
    avatar: string;
  }

  interface UserSession {}
}

export {};
