import { useState } from "react";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { NavigationData } from "../../utils/constants";
import { Link } from "react-router-dom";

const NavigationBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        className={`${
          isOpen ? `w-[13%]` : `w-[4.5%]`
        } min-h-[90vh]  transition-[width] ease-in-out duration-500 p-6 text-end hidden lg:block shadow-xl bg-secondary `}
      >
        <div className="flex items-center justify-between ">
          <button
            className=" text-3xl text-primary  "
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {isOpen ? (
              <MdKeyboardDoubleArrowLeft />
            ) : (
              <MdKeyboardDoubleArrowRight />
            )}
          </button>
        </div>
        {NavigationData.map((item) => (
          <Link key={item?.id} to={item?.path}>
            <div className="flex items-center  gap-5 mt-10  p-2 cursor-pointer">
              <div className="text-primary text-lg    hover:text-hoverBlue">
                {item?.icon}
              </div>
              <div
                className="transition duration-700 ease-in-out transform opacity-0 text-primary text-start   "
                style={{ opacity: isOpen ? 1 : 0 }}
              >
                {item?.name}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default NavigationBar;
