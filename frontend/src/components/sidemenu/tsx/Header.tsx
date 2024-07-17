import React from "react";
import style from "../styles/Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

interface HeaderProps {
  screenToggle: (value: boolean) => void;
  smallScreenShow: boolean;
}

const Header: React.FC<HeaderProps> = ({ screenToggle, smallScreenShow }) => {
  const clickIcon: () => void = () => {
    screenToggle(!smallScreenShow);
  };
  return (
    <div className={style.main_head}>
      <div className="">
        <FontAwesomeIcon
          className={style.ham_icon}
          onClick={clickIcon}
          icon={faBars}
        />
      </div>
    </div>
  );
};

export default Header;
