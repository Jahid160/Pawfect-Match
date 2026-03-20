"use client";

import { useCartStore } from "@/lib/useCartStore";
import { useRef } from "react";

export default function CartStoreInitializer({ count }) {
  const initialized = useRef(false);


  if (!initialized.current) {
    useCartStore.setState({ cartCount: count });
    initialized.current = true;
  }

  return null;
}