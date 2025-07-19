// src/types/next-auth.d.ts
import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      accessToken?: string;
      provider?: string;
    };
    token?: string;
  }

  interface JWT {
    id?: string;
    accessToken?: string;
    provider?: string;
  }

  interface User {
    id: string;
    token?: string; // Add token property
    username?: string; // Add username property
    email?: string;
    name?: string;
    image?: string;
  }
}
