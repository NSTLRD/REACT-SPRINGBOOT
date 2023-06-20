
import { useReducer, useState } from "react";
import { usersReducer } from "../reducers/usersReducer";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { findAll, remove, save, update } from "../services/userService";


const initialUsers = [];
  
  const initialUserForm = {
    id: 0,
    username: "",
    password: "",
    email: "",
    direction: "",
    otherDirection: "",
  }


export const useUsers = () => {
    //usamos useReducer para manejar el estado de los usuarios
  const [users, dispatch] = useReducer( usersReducer, initialUsers);
  //usamos useState para manejar el estado de un usuario seleccionado
  const [userSelected, setUserSelected] = useState(initialUserForm);
  const [visibleForm, setVisibleForm] = useState(false);
  const navigate = useNavigate();

  const getUsers = async() =>{
    const result = await findAll();
    console.log(result);
    dispatch({
      type:'loadingUser',
      payload: result.data,
    });
  }

  const handlerAddUser = async(user) => {
    //console.log(user);

    let response;

    if(user.id === 0){
   response = await save(user);
    } else {
      response = await update(user);
    }

    dispatch({
      type:(user.id === 0) ? "addUser" : "updateUser",
      payload: response.data,
    });

    Swal.fire(
       (user.id === 0) ? 
       'Cliente Creado':
       'Cliente Actualizado',
       (user.id === 0) ? 
       'El cliente se ha creado correctamente' : 
       'El cliente se ha actualizado correctamente',
        'Success'
      );
      handlerCloseForm();
      navigate('/users');

  };

  const handlerDeleteUser = (id) => {
   // console.log(id);
    Swal.fire({
        title: 'Esta seguro que desea eliminar el cliente?',
        text: "Cuidado el cliente sera eliminado!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Eliminar!'
      }).then((result) => {
        if (result.isConfirmed) {
          remove(id);
            dispatch({
                type: "deleteUser",
                payload: id,
              });  
          Swal.fire(
            'Cliente Eliminado!',
            'El Cliente se ha Eliminado con exito.',
            'success'
          )
        }
      })
  };

  const handlerUserSelectedForm = (user) => {
  //console.log(user);
  //pasamos un clon del usuario seleccionado usando el operador spread
  setVisibleForm(true);
  setUserSelected({...user});

  };

const handlerOpenForm = () => {
    setVisibleForm(true);
  };

const handlerCloseForm = () => {
    setVisibleForm(false);
    setUserSelected(initialUserForm);
  };


   
    return {
        users,
        userSelected,
        initialUserForm,
        visibleForm,
        handlerOpenForm,
        handlerCloseForm,
        handlerAddUser,
        handlerDeleteUser,
        handlerUserSelectedForm,
        getUsers,

    }
}