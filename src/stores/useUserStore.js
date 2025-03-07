import { create } from "zustand";

const initDefaultValue = {
    id: '',
    fisrtName: '',
    lastName: '',
    email: '',
    phone: '',
    avtar: '',
    isLogged: false,
}

export const useUserStore = create((set, get) => ({
    dataUser: initDefaultValue,
    survey: {},
    setDataUser: (newData) => {
        set({ dataUser: newData });
    },
    setSurvey: (newSurvey) => {
        set({ survey: newSurvey });
    },
}));