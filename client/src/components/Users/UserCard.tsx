import { User } from "@/app/state/api";
import Image from "next/image";
import React from "react";

type Props = {
  user: User;
};

const UserCard = ({ user }: Props) => {
  return (
    <div className="w-full flex items-center p-2 rounded-lg bg-white shadow-slate-500 border-gray-700 dark:bg-dark-secondary">
      {user?.profilePictureUrl && (
        <Image
          src={`/${user.profilePictureUrl}`}
          alt={user.username}
          width={40}
          height={40}
          className="h-10 w-10 rounded-full mr-4"
        />
      )}
      {user?.username && (
        <h3 className="  dark:text-white text-sm">{user.username}</h3>
      )}
      {/* {user.email && <span className="text-sm text-gray-500 font-light">{user.email}</span>} */}
      {/* {user.teamId && (
        <span className="text-sm text-gray-500 font-light">{user.teamId}</span>
      )} */}
    </div>
  );
};

export default UserCard;
