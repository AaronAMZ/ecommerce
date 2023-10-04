import { axiosInstance } from "../../api/axiosInstance"

export const getAllCategories = async () => {
    try {
        const res = await axiosInstance.get("categories");

        return res.data
    } catch (error) {
        // La petición llegó hasta el backend pero este no respondió satisfactoriamente (respondió algo fuera del status code 200)
        if(error.response) throw error.response.data;
        else throw new Error("Algo salió mal con la petición de categorias")
    }
}