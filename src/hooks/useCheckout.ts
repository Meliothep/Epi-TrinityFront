import { createSignal } from "solid-js";
import { checkoutService } from "../services/checkout.service";

export const useCheckout = () => {
  const [isOpen, setIsOpen] = createSignal(false);
  const [error, setError] = createSignal<string | null>(null);

  const openCheckout = async () => {
    try {
      setError(null);
      setIsOpen(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to open checkout");
      console.error("Checkout error:", err);
    }
  };

  const closeCheckout = () => {
    setIsOpen(false);
    setError(null);
  };

  return {
    isOpen,
    error,
    openCheckout,
    closeCheckout
  };
};

// Create a singleton instance for global state
const globalCheckout = useCheckout();
export default globalCheckout; 