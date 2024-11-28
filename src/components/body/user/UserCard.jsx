import { Card } from "flowbite-react";
import EditUser from "./EditUser";
import DeleteUser from "./DeleteUser";
import UserDetails from "./UserDetails";
import UserStatus from "./UserStatus";
// import EditRole from "./EditRole";
// import DeleteRole from "./DeleteRole";
// import ShowDetails from "./ShowDetails";

const UserCard = ({id,userName,email,role}) => {
  return (
    <div className="w-full sm:max-w-sm mb-5 mx-auto">
      <Card>
        <h5 className="text-lg font-semibold text-gray-900">{userName}</h5>
        <h5 className="text-sm font-semibold text-gray-500">{email}</h5>
        <p className="text-sm text-gray-500">
          Role:{role}
        </p>
        <div className="mt-4 flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
            <EditUser id={id}/>
            <DeleteUser id={id}/>
            <UserDetails id={id}/>
            <UserStatus id={id}/>
          {/* <EditRole id={id} />
          <DeleteRole id={id} />
          <ShowDetails id={id} /> */}
        </div>
      </Card>
    </div>
  );
};
export default UserCard;
