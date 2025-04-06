declare module 'next' {
  export interface Metadata {
    title?: string;
    description?: string;
  }
}

declare module 'next/font/google' {
  export function Inter(options: { subsets: string[] }): {
    className: string;
  };
}

declare module 'next/navigation' {
  export function notFound(): never;
} 