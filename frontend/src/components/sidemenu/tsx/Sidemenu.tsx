import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "../styles/sidemenu.css";
import icon from "../../../assets/icons/Object.png";
import svgicon from "../../../assets/icons/Vector.svg";
import { NavLink } from "react-router-dom";
import Menu from "./Menu";
import Header from "./Header";
import csc_img from "../../../assets/images/csc_logo.png";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Sidemenu: React.FC = () => {
  const [smallScreenShow, setSmallSecreenShow] = useState<boolean>(false);
  const [a, setA] = useState<boolean>(false);
  const screenToggle = (value: boolean): void => {
    setSmallSecreenShow(value);
  };

  const data = [
    {
      path: "/dashboard",
      name: "Dashboard",
      image: icon,
      subRoutes: [
        {
          path: "/dashboard/a",
          name: "Dashboard a",
          image: icon,
        },
      ],
    },
    {
      path: "/home",
      name: "Community Clinic information",
      image: svgicon,
      subRoutes: [
        {
          path: "/home/a",
          name: "Home s",
          image: icon,
        },
        {
          path: "/home/b",
          name: "Home b",
          image: icon,
        },
      ],
    },
    {
      path: "/work",
      name: "Work",
      image: icon,
      subRoutes: [],
    },
  ];

  const [cross, setCross] = useState<boolean>(false);
  const handleCross = (): void => setCross(true);
  useEffect(() => {
    const handleResize = () => {
      setSmallSecreenShow(window.innerWidth <= 786);
      setA(window.innerWidth <= 786);
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="w-100">
      <Header screenToggle={screenToggle} smallScreenShow={smallScreenShow} />
      <div className="d-flex">
        <div
          style={{ position: "fixed", top: "0" }}
          className={smallScreenShow ? "main_hide" : "main_ss"}
        >
          <motion.div
            animate={{ width: cross ? "40px" : "260px" }}
            className="side_menu"
          >
            <section>
              <div className="d-flex justify-content-between">
                {!cross && (
                  <div>
                    <img className="csc_logo" src={csc_img} alt="" />
                  </div>
                )}
                {cross && <div style={{ height: "65px" }}></div>}

                {!a && (
                  <div onClick={() => setCross(!cross)} className="hh">
                    X
                  </div>
                )}
              </div>
              {data.map((item) => {
                if (item.subRoutes && item.subRoutes.length) {
                  return (
                    <Menu item={item} cross={cross} handleCross={handleCross} />
                  );
                }

                return (
                  <NavLink to={item.path} key={item.name} className="nav_link">
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
                  </NavLink>
                );
              })}
            </section>
          </motion.div>
        </div>

        <div className={cross ? "working_part_width" : "working_part"}>
          <h1>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum. Why do we use it? It is
            a long established fact that a reader will be distracted by the
            readable content of a page when looking at its layout. The point of
            using Lorem Ipsum is that it has a more-or-less normal distribution
            of letters, as opposed to using 'Content here, content here', making
            it look like readable English. Many desktop publishing packages and
            web page editors now use Lorem Ipsum as their default model text,
            and a search for 'lorem ipsum' will uncover many web sites still in
            their infancy. Various versions have evolved over the years,
            sometimes by accident, sometimes on purpose (injected humour and the
            like). Where does it come from? Contrary to popular belief, Lorem
            Ipsum is not simply random text. It has roots in a piece of
            classical Latin literature from 45 BC, making it over 2000 years
            old. Richard McClintock, a Latin professor at Hampden-Sydney College
            in Virginia, looked up one of the more obscure Latin words,
            consectetur, from a Lorem Ipsum passage, and going through the cites
            of the word in classical literature, discovered the undoubtable
            source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de
            Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by
            Cicero, written in 45 BC. This book is a treatise on the theory of
            ethics, very popular during the Renaissance. The first line of Lorem
            Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section
            1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is
            reproduced below for those interested. Sections 1.10.32 and 1.10.33
            from "de Finibus Bonorum et Malorum" by Cicero are also reproduced
            in their exact original form, accompanied by English versions from
            the 1914 translation by H. Rackham.
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Sidemenu;
