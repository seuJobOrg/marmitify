import "@testing-library/jest-dom";

// Mock fetch global para testes
global.fetch = jest.fn();

// Mock NextAuth
jest.mock("next-auth/react", () => ({
  SessionProvider: ({ children }: { children: React.ReactNode }) => children,
  useSession: () => ({
    data: null,
    status: "unauthenticated",
  }),
}));

// Mock de variáveis de ambiente para testes
process.env.NEXTAUTH_URL = "http://localhost:3000";
process.env.NEXTAUTH_SECRET = "test-secret";
