import { useMutation } from "@tanstack/react-query";

const { default: api } = require("@/utils/interceptors");
const { UPLOAD_IMAGE } = require("./constant");

const uploadImage = async (file) => {
    try{
        const formData = new FormData();
        formData.append("file", file);
        const { data } = await api.post(UPLOAD_IMAGE, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return data;

    } catch (error) {
        console.error("Failed to upload image:", error);
        throw new Error("Failed to upload image");
    }
};

export function useUploadImage() {
    return useMutation({
        mutationFn: uploadImage,
    });
}