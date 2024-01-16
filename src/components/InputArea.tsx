import { useState } from "react";
import SuggestionBox from "./SuggestionBox";
import { User } from "../types";

const InputArea = () => {
  const [activeInput, setActiveInput] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User[]>([]);
  const [searchUser, setSearchUser] = useState<string>("");
  const [highlight, setHighlight] = useState<boolean>(false);

  const handleDelete = (id: number) => {
    setSelectedUser(selectedUser.filter((user) => user.id !== id));
  };
  const handleBackspace = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && searchUser === "" && selectedUser.length > 0) {
      if (highlight) {
        setSelectedUser(selectedUser.slice(0, -1));
        setHighlight(false);
      } else {
        setHighlight(true);
      }
    }
  };

  return (
    <div className="w-full border-b-2 p-4 border-blue-700 my-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center gap-4 z-10">
      {selectedUser?.map((user, index) => {
        return (
          <div
            className={` text-black flex justify-between items-center text-center rounded-full p-1 ${
              highlight && index === selectedUser.length - 1
                ? "bg-gray-300"
                : "bg-gray-100"
            }`}
            key={user.id}
          >
            <img
              src={user.img}
              className="w-12 aspect-square rounded-full object-cover"
              alt="avatar"
            />
            <p className="text-gray-500 font-semibold">{user.name}</p>
            <p
              className="ml-4 font-semibold p-2 hover:bg-gray-300 rounded-full w-8 h-8 flex items-center justify-center cursor-pointer"
              onClick={() => {
                handleDelete(user.id);
              }}
            >
              X
            </p>
          </div>
        );
      })}

      <div className="relative">
        <input
          type="text"
          value={searchUser}
          onKeyDown={handleBackspace}
          onChange={(e) => {
            setSearchUser(e.target.value);
            highlight && setHighlight(false);
          }}
          onFocus={() => setActiveInput(true)}
          onBlur={() => {
            setTimeout(() => {
              setActiveInput(false);
            }, 500);
          }}
          className="w-full p-2 rounded appearance-none focus:outline-none h-auto"
          placeholder="Type a name..."
        />
        <SuggestionBox
          searchUser={searchUser}
          setSearchUser={setSearchUser}
          setSelectedUser={setSelectedUser}
          selectedUser={selectedUser}
          activeInput={activeInput}
        />
      </div>
    </div>
  );
};

export default InputArea;
