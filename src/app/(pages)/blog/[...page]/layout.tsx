import { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export function metadata() {
  return {
    title: "My Latest Updates",
    description:
      "Explore the latest updates and insights on various topics, including technology, lifestyle, and more. Stay informed with our engaging blog posts covering a wide range of subjects.",
  };
}
