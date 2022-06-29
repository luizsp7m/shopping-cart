import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="max-w-[1366px] w-full mx-auto p-10">
      {children}
    </div>
  );
}