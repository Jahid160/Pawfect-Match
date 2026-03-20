"use client";

import { useCartStore } from "@/lib/useCartStore";
import { useEffect, useRef } from "react";

export default function CartStoreInitializer({ count }) {
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      useCartStore.setState({ cartCount: count });
      initialized.current = true;
    }
  }, [count]);

  return null;
}