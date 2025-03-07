import { create } from "zustand";

export const useNavigationStore = create((set,get)=> ({
    openNavigation: true,
    setOpenNavigation: (newState) => {
        set({openNavigation: newState})
    },
}));