import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NavLink, useLocation } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa";

interface MenuItem {
  name: string;
  path: string;
  image: string;
  subRoutes: { path: string; name: string; image: string }[];
}

interface MenuProps {
  item: MenuItem;
  cross: boolean;
  handleCross: () => void;
}

const menuAnimation = {
  hidden: {
    opacity: 0,
    height: 0,
    padding: 0,
    transition: { duration: 0.3, when: "afterChildren" },
  },
  show: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.3,
      when: "beforeChildren",
    },
  },
};

const Menu: React.FC<MenuProps> = ({ item, cross, handleCross }) => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const menuToggle: () => void = () => {
    if (!cross) setOpenMenu(!openMenu);
  };
  const location = useLocation();

  useEffect(() => {
    // Check if the current location matches any subRoute path
    const isSubRouteOpen = item.subRoutes.some((route) =>
      location.pathname.startsWith(route.path)
    );

    // Open the dropdown if the current URL matches any subRoute
    if (isSubRouteOpen) {
      setOpenMenu(true);
    }
  }, [location.pathname, item.subRoutes]);

  useEffect(() => {
    if (cross) setOpenMenu(false);
  }, [cross]);
  return (
    <>
      <div className="s_menu" onClick={menuToggle}>
        <div>
          <img className="menu_image" src={item.image} alt="" />
        </div>
        <AnimatePresence>
          {!cross && (
            <motion.div className="menu_name">
              <p>{item.name}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {!cross && (
          <div className="arrow">
            <FaAngleDown />
          </div>
        )}
      </div>
      {openMenu && (
        <motion.div
          className="menu_con"
          variants={menuAnimation}
          initial="hidden"
          animate="show"
          exit="hidden"
        >
          {item.subRoutes.map((rt) => (
            <NavLink to={rt.path} key={rt.name} className="nav_link">
              <div>
                <img src={rt.image} alt="" />
              </div>
              <AnimatePresence>
                <motion.div
                  className={cross ? "menu_name display_hidden" : "menu_name"}
                >
                  <p>{rt.name}</p>
                </motion.div>
              </AnimatePresence>
            </NavLink>
          ))}
        </motion.div>
      )}
    </>
  );
};

export default Menu;
