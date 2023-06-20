import { NavLink } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";

export const UserRow = ({id,username,email,direction,otherDirection }) => {
 
 const { handlerUserSelectedForm,handlerDeleteUser} = useContext(UserContext);

    return (
    <tr>
    <td>{id}</td>
    <td>{username}</td>
    <td>{email}</td>
    <td>{direction}</td>
    <td>{otherDirection}</td>
    <td>
        <button type="button"
        className="btn btn-secondary btn-sm"
        onClick={() => handlerUserSelectedForm({
            id,
            username,
            email,
            direction,
            otherDirection,
        })}
        > Update
        </button>
    </td>

    <td>
       <NavLink className={"btn btn-secondary btn-sm"} to={'/users/edit/' + id}>

            Update Route
            </NavLink>
    </td>


    <td>
        <button type="button"
        className="btn btn-danger btn-sm"
        onClick={() =>  handlerDeleteUser(id)}
        >
            Delete
        </button>
    </td>
    </tr>

 );
}