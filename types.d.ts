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
declare module 'sonner' {
  export const Toaster: React.FC<{ position?: string; richColors?: boolean }>;
  export const toast: {
    success: (message: string) => void;
    error: (message: string) => void;
    // Add more methods if 'sonner' has them
  };
}