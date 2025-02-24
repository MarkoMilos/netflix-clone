import { create } from "zustand";
import { devtools } from "zustand/middleware";

export interface ModalStoreInterface {
  movieId?: string;
  isOpen: boolean;
  openModal: (movieId: number) => void;
  closeModal: () => void;
}

const useInfoModal = create<ModalStoreInterface>()(
  devtools(
    set => ({
      movieId: undefined,
      isOpen: false,
      openModal: movieId => set({ movieId, isOpen: true }),
      closeModal: () => set({ movieId: undefined, isOpen: false }),
    }),
    {
      name: "InfoModalStore", // Optional, gives a name to your store in Devtools
      enabled: process.env.NODE_ENV === "development", // Disable in production
    },
  ),
);

export default useInfoModal;
