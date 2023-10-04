import { axiosInstance } from "../../api/axiosInstance";

export const getCart = async(token) => {
    try {
        const res = await axiosInstance.get('cart', {headers: { Authorization: `Bearer ${token}`}});

        return (await res).data;
    } catch (error) {
        if(error.response) return error.response.data;
        else throw new Error("Algo salió mal con la petición del carrito")
    }
}