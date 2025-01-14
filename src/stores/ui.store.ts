import { createSignal } from "solid-js";

const [isMobileMenuOpen, setIsMobileMenuOpen] = createSignal(false);
const [activeModal, setActiveModal] = createSignal<string | null>(null);

export const useUI = () => {
	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen());
	};

	const openModal = (modalId: string) => {
		setActiveModal(modalId);
	};

	const closeModal = () => {
		setActiveModal(null);
	};

	return {
		isMobileMenuOpen,
		activeModal,
		toggleMobileMenu,
		openModal,
		closeModal
	};
}; 