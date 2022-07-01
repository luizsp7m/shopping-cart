import { ReactNode } from "react";
import { Header } from "./Header";

interface Props {
  children: ReactNode;
}

export function Layout({ children }: Props) {
  return (
    <div className="max-w-[1366px] w-full mx-auto px-8 flex flex-col overflow-hidden">
      <Header />

      <main>
        {children}
      </main>
    </div>
  );
}