import React, { useState } from "react";
import style from "../style/sidebar.module.css";
import csc_logo from "../../../assets/images/csc_logo.png";

const Sidebar: React.FC = () => {
  const data = [
    {
      name: "Dashboard",
      url: "/",
      child: [
        {
          name: "2",
          child: [],
          url: "/2",
        },
        {
          name: "69",
          child: [],
          url: "/69",
        },
      ],
    },
    {
      name: "About",
      url: "/about",
      child: [
        {
          name: "a",
          child: [],
          url: "/about/a",
        },
        {
          name: "b",
          child: [],
          url: "/about/b",
        },
      ],
    },
  ];
  //   const location = useLocation();
  //   const isActiveLink = (url: string) => {
  //     console.log(location.pathname, url);
  //     return location.pathname.startsWith(url);
  //   };
  const [openItem, setOpenItem] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    if (openItem === index) {
      setOpenItem(null);
    } else {
      setOpenItem(index);
    }
  };
  return (
    <div className={style.sidebar_main_div}>
      <div className={style.sub_div}>
        <img src={csc_logo} alt="" />
        {data.map((item, index) => (
          <div key={index}>
            <h5 onClick={() => toggleItem(index)}>{item.name}</h5>
            {openItem === index && item.child.length > 0 && (
              <>
                {item.child.map((childItem, childIndex) => (
                  <h5 key={childIndex}>{childItem.name}</h5>
                ))}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
