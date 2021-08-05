import Link from "next/link";

import { useFetch } from "../../helpers/hooks";
import { UserApi } from "../../api";

const UserList = () => {
  const [{ users }, isLoading] = useFetch(UserApi.all);

  return (
    <>
      <ul className="text-center">
        {!isLoading && users
          ? users.map((user, index) => {
              return (
                <li className="my-2" key={index}>
                  <Link href={"http://localhost:3000/users/" + user?.username}>
                    <a className="">{user.username}</a>
                  </Link>
                </li>
              );
            })
          : null}
      </ul>
      <div className="h-full my-96" />
    </>
  );
};

export default UserList;
