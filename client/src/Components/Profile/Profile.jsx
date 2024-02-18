import React, { useEffect, useState } from "react";
import axiosInstance from "../../auth/axiosInstance";
import { useUser } from "./../../UserContext.jsx";
import moment from 'moment';

function Profile() {
  const { user } = useUser();
  const [allUsers, setAllUsers] = useState(null);

  useEffect(() => {
    getAllUserData();
  }, []);

  const getAllUserData = async () => {
    await axiosInstance
      .get("/auth/users")
      .then((res) => {
        setAllUsers(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex flex-col md:flex-row">
      {user && (
        <div className="user md:w-[50%]">
          <div className="from flex flex-col bg-zinc-400 p-3 m-3 rounded-[5px]">
            <h3 className="text-center text-indigo-800 font-semibold">
              User Details
            </h3>
            <div className="row-item flex">
              <p>
                Name : <strong>{user.firstName}</strong>
              </p>
            </div>
            <div className="row-item flex">
              <p>
                Email : <strong>{user.email}</strong>
              </p>
            </div>
            <div className="row-item flex">
              <p>
                Username : <strong>{user.userName}</strong>
              </p>
            </div>
            <div className="row-item flex">
              <p>
                Role : <strong>{user.role}</strong>
              </p>
            </div>
          </div>
        </div>
      )}
      {allUsers && (
        <div className="user md:w-[50%]">
          <div className="from flex flex-col bg-zinc-400 p-1 m-2 rounded-[5px]">
            <h3 className="text-center text-indigo-800 font-semibold">
              All Users Details
            </h3>
            {allUsers.map((userData) => (
              <div key={userData._id} className="flex flex-col">
                <div className="flex items-start justify-between">
                  <span className="rounded-[50%] bg-red-200 p-2 m-1 border-indigo-800 border-[2px] w-12 h-12 flex justify-center items-center font-semibold">
                    {userData.firstName.slice(0, 2)}
                  </span>
                  <div className="">
                    <p className="">{userData.userName}</p>
                    <p className="">Role: {userData.role}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Register Date</p>
                    <p className="">{moment(userData.createData).format("MM/DD/YYYY")}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
