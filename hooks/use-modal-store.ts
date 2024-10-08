
import { create } from "zustand";
// import { persist } from "zustand/middleware";

export type ModalType = "createServer";

interface ModalStore {
  type: ModalType | null;
  isOpen: boolean;
  onOpen: (type: ModalType) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  isOpen: false,
  onOpen: (type) => set({ isOpen: true, type }),
  onClose: () => set({ type: null, isOpen: false }),
}));

// export const useModal = create<ModalStore>()(
//   persist(
//     (set) => ({
//       type: null,
//       isOpen: false,
//       onOpen: (type) => set({ isOpen: true, type }),
//       onClose: () => set({ type: null, isOpen: false }),
//     }),
//     {
//       name: "modal-store",
//     }
//   )
// )