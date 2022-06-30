import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function Layout({ children }: Props) {
  return (
    <div className="max-w-[1366px] w-full mx-auto p-10">
      {children}
    </div>
  );
}