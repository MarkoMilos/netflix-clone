import { create } from "zustand";
import { devtools } from "zustand/middleware";

/**
 * Interface defining the structure and actions for the info modal store.
 * This modal is used to display detailed information about content items.
 */
export interface ModalStoreInterface {
  /** The ID of the content currently being displayed in the modal, undefined when modal is closed */
  contentId?: number;
  /** Boolean flag indicating whether the modal is currently open/visible */
  isOpen: boolean;
  /** Function to open the modal with specific content */
  openModal: (contentId: number) => void;
  /** Function to close the modal and reset the state */
  closeModal: () => void;
}

/**
 * Zustand store hook for managing the info modal state throughout the application.
 *
 * This hook provides a global state management solution for controlling the visibility
 * and content of an information modal. It's commonly used to show detailed information
 * about movies, TV shows, or other content items.
 *
 * @example
 * ```tsx
 * const { isOpen, contentId, openModal, closeModal } = useInfoModal();
 *
 * // Open modal with content ID 123
 * openModal(123);
 *
 * // Close modal
 * closeModal();
 * ```
 *
 * @returns {ModalStoreInterface} The modal store with state and actions
 */
const useInfoModal = create<ModalStoreInterface>()(
  devtools(
    set => ({
      // Initial state: modal is closed with no content selected
      contentId: undefined,
      isOpen: false,

      // Action to open the modal with specific content
      openModal: contentId => set({ contentId, isOpen: true }),

      // Action to close the modal and clear the selected content
      closeModal: () => set({ contentId: undefined, isOpen: false }),
    }),
    {
      name: "InfoModalStore", // Gives a name to your store in Devtools
      enabled: process.env.NODE_ENV === "development", // Disable in production
    },
  ),
);

export default useInfoModal;
