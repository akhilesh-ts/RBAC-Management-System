import { Card } from "flowbite-react";
import EditRole from "./EditRole";
import DeleteRole from "./DeleteRole";
import ShowDetails from "./ShowDetails";

const RoleCard = ({ id, role, permissions }) => {
  return (
    <div className="w-full sm:max-w-sm mb-5 mx-auto">
      <Card>
        <h5 className="text-lg font-semibold text-gray-900">{role}</h5>
        <p className="text-sm text-gray-500">
          Permissions: {permissions.join(', ')}
        </p>
        <div className="mt-4 flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
          <EditRole id={id} />
          <DeleteRole id={id} />
          <ShowDetails id={id} />
        </div>
      </Card>
    </div>
  );
};
export default RoleCard;
