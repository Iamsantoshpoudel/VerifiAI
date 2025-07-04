import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
}

export default function Section({ children, className }: SectionProps) {
  return (
    <section className={`${className} w-[92%] m-auto  pb-10`} >
      {children}
    </section>
  );
}