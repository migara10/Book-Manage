import React from 'react';
import {Navigate} from "react-router-dom";
import DeleteBooks from '../Components/Books/DeleteBooks';

function AdminRouteGuard() {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    if(currentUser && (currentUser.role === "admin")){
      return <DeleteBooks />
    } else {
      return <Navigate to="/dashboard/" />
    }
}

export default AdminRouteGuard