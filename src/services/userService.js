import axios from "axios"

const BASE_URL = 'http://localhost:8012/users'
export const findAll = async() => {

try {
    const response  = await axios.get(BASE_URL);
    return response;
} catch (error) {
    console.error(error);
    
}

return null;


}

export const save = async({username, email, password, direction, otherDirection}) => {

    try {
        return  await axios.post(BASE_URL, {
            username, 
            email, 
            password, 
            direction, 
            otherDirection,
        });

    } catch (error) {
        console.error(error);
    }
    return undefined;

}


export const update = async({id, username, email, direction, otherDirection}) => {

    try {
        return await axios.put(`${BASE_URL}/${id}`,{
        username,
        email,
        direction,
        otherDirection,
    });
    } catch (error) {
        console.error(error);
    }
    return undefined;
}

export const remove = async (id) => {
try {
    await axios.delete(`${BASE_URL}/${id}`);
} catch (error) {
    console.error(error);
    
}
}
