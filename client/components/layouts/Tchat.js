import { useEffect, useState } from "react";
import classnames from "classnames";
import { FaRocketchat } from "react-icons/fa";

import { useFetch, useToggle } from "../../helpers/hooks";
import { UserApi } from "../../api";
import { useUserContext } from "../../context/user";
import { img } from "../../ressources/routes";

const UserPopup = () => {
  return (
    <div className="px-1 cursor-pointer my-2.5 text-white rounded-full">
      <img src={img.default.avatar} className="rotate-180 rounded-full" alt="avatar" width={50} />
    </div>
  );
};

const Tchat = () => {
  const { isLogin, user } = useUserContext();

  const [open, toggleOpen] = useToggle(false);
  const [max, setMax] = useState(1000);
  const [notifications, setNotifications] = useState(0);

  const [{ rooms }, isLoading] = useFetch(UserApi.getRooms, null, [isLogin], null, isLogin);

  useEffect(() => {
    setNotifications(Math.floor(Math.random() * 15));
  }, []);

  if (!isLogin || isLoading) return null;

  return (
    <>
      <div className="fixed bottom-5 left-8">
        <button
          onClick={() => {
            if (max === 200) setMax(1000);
            else setMax(200);
          }}
          className="px-4 py-0.5 bg-red-700 text-white rounded-lg"
        >
          Switch - {max}
        </button>
      </div>
      <div className="fixed bottom-5 right-8">
        <div
          className={classnames("fixed transform duration-200", {
            "-bottom-96": !open,
            "bottom-20": open,
          })}
        >
          <div
            className="custom-scroll mb-5 py-0.5 bg-gray-200 shadow-lg rounded-full overflow-y-auto"
            style={{ maxHeight: `${max}px` }}
          >
            {rooms?.map((room, index) => (
              <UserPopup key={index} data={room} />
            ))}
          </div>
        </div>
        <div className="relative">
          <button
            onClick={toggleOpen}
            className={classnames(
              "cursor-pointer p-3 text-white shadow-md bg-gradient-to-r from-red-500 to-yellow-600 rounded-full transition duration-200 delay-50",
              { "ring ring-offset-1 ring-red-500": open }
            )}
          >
            <FaRocketchat size={30} />
          </button>
          {notifications > 0 ? (
            <div
              onClick={toggleOpen}
              className="absolute cursor-pointer select-none -top-1 -right-2 flex h-6 w-6"
            >
              <span className="animate-ping absolute h-full w-full rounded-full bg-red-500 opacity-75" />
              <span className="rounded-full h-6 w-full bg-red-600 text-white text-center">
                {notifications}
              </span>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Tchat;
