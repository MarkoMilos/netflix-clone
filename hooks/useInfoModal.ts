import { create } from "zustand";
import { devtools } from "zustand/middleware";

export interface ModalStoreInterface {
  contentId?: number;
  isOpen: boolean;
  openModal: (contentId: number) => void;
  closeModal: () => void;
}

const useInfoModal = create<ModalStoreInterface>()(
  devtools(
    set => ({
      contentId: undefined,
      isOpen: false,
      openModal: contentId => set({ contentId, isOpen: true }),
      closeModal: () => set({ contentId: undefined, isOpen: false }),
    }),
    {
      name: "InfoModalStore", // Gives a name to your store in Devtools
      enabled: process.env.NODE_ENV === "development", // Disable in production
    },
  ),
);

export default useInfoModal;
