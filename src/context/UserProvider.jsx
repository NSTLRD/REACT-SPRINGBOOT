import { useUsers } from "../hooks/userUsers";
import { UserContext } from "./UserContext"

export const UserProvider = ({children}) =>{
    const {
        users,
        userSelected,
        initialUserForm,
        visibleForm,
        handlerCloseForm,
        handlerOpenForm,
        handlerAddUser,
        handlerDeleteUser,
        handlerUserSelectedForm,
        getUsers,
      
      } = useUsers();
      

    return(
        <UserContext.Provider value={
            {
                users,
                userSelected,
                initialUserForm,
                visibleForm,
                handlerCloseForm,
                handlerOpenForm,
                handlerAddUser,
                handlerDeleteUser,
                handlerUserSelectedForm,
                getUsers,
            }
        }>
            {children}
        </UserContext.Provider>
    )

}