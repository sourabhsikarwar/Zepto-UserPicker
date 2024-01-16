import { useEffect, useState } from "react";
import { user } from "../constants";
import { User } from "../types";

const SuggestionBox = ({
  searchUser,
  setSearchUser,
  setSelectedUser,
  selectedUser,
  activeInput,
}: {
  searchUser: string;
  setSearchUser: (arg0: string) => void;
  setSelectedUser: (arg0: any[]) => void;
  selectedUser: any[];
  activeInput: boolean;
}) => {
  const [suggestions, setSuggestions] = useState<User[]>([]);

  useEffect(() => {
    const filteredUser: User[] = user.filter((user) => {
      return !selectedUser?.find((selected) => selected.id === user.id);
    });
    const filteredUserWithRef: User[] = filteredUser.filter((user) => {
      return user.name.toLowerCase().includes(searchUser.toLowerCase());
    });
    setSuggestions(filteredUserWithRef);
  }, [searchUser, selectedUser]);

  return activeInput ? (
    <div className="absolute top-12 left-0 shadow-xl rounded z-20 bg-white w-full max-h-72 overflow-y-scroll transition-all duration-500 ease-in-out scrollCustom">
      {suggestions?.map((user) => (
        <div
          key={user.id}
          onClick={(e) => {
            setSelectedUser([...selectedUser, user]);
            setSearchUser("");
          }}
          className="flex items-center gap-4 w-full justify-start hover:bg-gray-100 p-4 cursor-pointer"
        >
          <img
            src={user.img}
            className="w-8 md:w-12 aspect-square rounded-full object-cover"
            alt=""
          />
          <div className="flex flex-col">
            <h1 className="font-semibold text-sm">{user.name}</h1>
            <p className="text-sm text-gray-400">{user.desc}</p>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <></>
  );
};

export default SuggestionBox;
