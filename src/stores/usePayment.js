import { create } from "zustand";

export const useBase64Store = create((set) => ({
  base64Image: "",
  setBase64Image: (image) => set({ base64Image: image }),
}));
