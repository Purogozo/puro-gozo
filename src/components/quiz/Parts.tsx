"use client";

import { motion } from "motion/react";
import { useReducedMotion, staggerContainer, staggerItem } from "@/lib/motion";

export function Stagger({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      variants={staggerContainer(reduced)}
      initial="initial"
      animate="animate"
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Item({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div variants={staggerItem(reduced)} className={className}>
      {children}
    </motion.div>
  );
}

export function Eyebrow({
  children,
  dark = false,
}: {
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <Item>
      <p className={`eyebrow ${dark ? "text-rose" : "text-rose"}`}>{children}</p>
    </Item>
  );
}

export function Headline({
  children,
  dark = false,
  size = "lg",
}: {
  children: React.ReactNode;
  dark?: boolean;
  size?: "lg" | "md";
}) {
  return (
    <Item>
      <h1
        className={`font-serif ${
          size === "lg"
            ? "text-[1.75rem] sm:text-[2.15rem]"
            : "text-[1.45rem] sm:text-[1.75rem]"
        } leading-[1.12] tracking-[-0.01em] ${
          dark ? "text-marfim" : "text-indigo"
        }`}
        style={{ fontWeight: 700 }}
      >
        {children}
      </h1>
    </Item>
  );
}

export function Subhead({
  children,
  dark = false,
}: {
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <Item>
      <p
        className={`font-sans text-[0.98rem] leading-relaxed ${
          dark ? "text-nevoa" : "text-lavanda"
        }`}
        style={{ fontWeight: 300 }}
      >
        {children}
      </p>
    </Item>
  );
}

export function Body({
  paragraphs,
  dark = false,
}: {
  paragraphs: string[];
  dark?: boolean;
}) {
  return (
    <>
      {paragraphs.map((p, i) => (
        <Item key={i}>
          <p
            className={`font-sans text-[0.98rem] leading-relaxed ${
              dark ? "text-marfim/85" : "text-tinta/85"
            }`}
            style={{ fontWeight: 300 }}
          >
            {p}
          </p>
        </Item>
      ))}
    </>
  );
}
