import { useContext } from "react";
import { UserRow } from "./UserRow";
import { UserContext } from "../context/UserContext";

export const UsersList = () => {


const { users } = useContext(UserContext);

    return(
        <>

        <table className="table table-hover table-striped">
           
            <thead>
                <tr>
                    <th>#</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Direction</th>
                    <th>Other Direction</th>
                    <th>update</th>
                    <th>update Route</th>
                    <th>delete</th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map(({id,username,email,direction,otherDirection}) => ( 
                        <UserRow 
                        key={id}
                        id={id}
                        username={username}
                        email={email}
                        direction={direction}
                        otherDirection={otherDirection}
               
                        
                        />
                    ))
                }
            </tbody>
        </table>
          
    </>
     
    )
};