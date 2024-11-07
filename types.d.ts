import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: number;
    email: string;
    role: Role;       
  }

  interface Session {
    user: User;
  }
}
// declarations.d.ts
declare module '@/hooks/useAction' {
  export const useAction: () => any; 
}
