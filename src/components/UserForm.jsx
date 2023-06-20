
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { UserContext } from "../context/UserContext";



export const UserForm = ({userSelected,handlerCloseForm}) => {
  
    const {initialUserForm,handlerAddUser} = useContext(UserContext);
    const [userForm, setUserForm] = useState(initialUserForm);
    
    const {id,username,password,email,direction,otherDirection} = userForm;
    

   useEffect(() => {
         setUserForm({
            ...userSelected,
           password: "",
         });
   }, [userSelected]);

    const onInputChnage = ({target}) => {
       // console.log(target.value);
       const {name,value} = target;
         setUserForm({
                ...userForm,
                [name]: value,


         });//limpiar el formulario
    };
 
    const onSubmit = (event) =>{
      event.preventDefault();
      if(
          !username || (!password && id === 0) || !email || !direction || !otherDirection
      ){
         Swal.fire(
            'Error de validacion',
            'Debe completar todos los campos del formulario',
            'error'
          )
         
           return; 
      }

      if(!email.includes('@')){
         Swal.fire(
            'Error de validacion email',
            'El email debe ser valido, incluir un @',
            'error'
          )
         
           return; 

      }
      //console.log(userForm);


      //guardar el userForm en el listado de usuarios
      handlerAddUser(userForm);
      setUserForm(initialUserForm);
    };

    const onCloseForm = () => {
      setUserForm(initialUserForm);
      handlerCloseForm();
    };

    return(
        <>
        <form onSubmit={ onSubmit }>
         <input
         className="form-control mb-3 w-75"
         placeholder="Username"
         name="username"
         value={username}
         onChange={onInputChnage} />

         { id > 0 || <input
            className="form-control mb-3 w-75"
            type="password"
            placeholder="Password"
            name="password"
               value={password}
            onChange={onInputChnage}
            />}
        

         <input
         className="form-control mb-3 w-75"
         placeholder="Email"
         name="email"
         value={email}
         onChange={onInputChnage}
         />

         <input
         className="form-control mb-3 w-75"
         placeholder="Direction"
         name="direction"
            value={direction}
         onChange={onInputChnage}
         />

         <input
         className="form-control mb-3 w-75"
         placeholder="Other Direction"
         name="otherDirection"
            value={otherDirection}
         onChange={onInputChnage}/>
         <input type="hidden" name="id" value={id} />

            <button
            className="btn btn-primary
                      type=submit">
          {id > 0 ? "Editar" : "Crear"}
            </button>
            <button
            className="btn btn-primary mx-2"
            type="button"
            onClick={() => onCloseForm()}
            >
            Cerrar
            </button>
        </form>
        </>
    )

}