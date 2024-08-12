import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { disablePageScroll, enablePageScroll } from "scroll-lock";

import { widgetworld, logo1 } from "../assets";
import { navigation } from "../constants";
import Button from "./Button";
import MenuSvg from "../assets/svg/MenuSvg";
import { HamburgerMenu } from "./design/Header";
import { useState } from "react";
import AuthContext from "../context/AuthContext";

// import Publish from '

const Header = () => {
  const { authData, logout } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick1 = () => {
    if (location.pathname === "/widgets") {
      navigate("/myWidgets");
    } else if (location.pathname === "/myWidgets") {
      navigate("/widgets");
    }
  };

  const getButtonText = () => {
    if (location.pathname === "/Admin") {
      return "Pending Widget Approvals";
    } else if (location.pathname === "/widgets") {
      return "My Widgets";
    } else if (location.pathname === "/myWidgets") {
      return "Widgets";
    }
    return "Publish Widget"; // default text
  };

  const getButtonLink = () => {
    if (location.pathname === "/Admin") {
      return null;
    } else if (location.pathname === "/widgets") {
      return "/myWidgets";
    } else if (location.pathname === "/myWidgets") {
      return "/widgets";
    }
    return "/widgets"; // default link
  };
  const pathname = useLocation();
  const [openNavigation, setOpenNavigation] = useState(false);

  const toggleNavigation = () => {
    if (openNavigation) {
      setOpenNavigation(false);
      enablePageScroll();
    } else {
      setOpenNavigation(true);
      disablePageScroll();
    }
  };

  const handleClick = () => {
    if (!openNavigation) return;

    enablePageScroll();
    setOpenNavigation(false);
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50  border-b border-n-6 lg:bg-n-8/90 lg:backdrop-blur-sm ${
        openNavigation ? "bg-n-8" : "bg-n-8/90 backdrop-blur-sm"
      }`}
    >
      <div className="flex items-center px-5 lg:px-7.5 xl:px-10 max-lg:py-4">
        <a className="block w-[12rem] xl:mr-8" href="#hero">
          <img src={widgetworld} width={80} height={40} alt="Widget World" />
        </a>

        <nav
          className={`${
            openNavigation ? "flex" : "hidden"
          } fixed top-[5rem] left-0 right-0 bottom-0 bg-n-8 lg:static lg:flex lg:mx-auto lg:bg-transparent`}
        >
          <div className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row">
            {navigation.map((item) => (
              <a
                key={item.id}
                href={item.url}
                onClick={handleClick}
                className={`block relative font-code text-2xl uppercase text-n-1 transition-colors hover:text-color-1 ${
                  item.onlyMobile ? "lg:hidden" : ""
                } px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold ${
                  item.url === pathname.hash
                    ? "z-2 lg:text-n-1"
                    : "lg:text-n-1/50"
                } lg:leading-5 lg:hover:text-n-1 xl:px-12`}
              >
                {item.title}
              </a>
            ))}
          </div>

          <HamburgerMenu />
        </nav>

        {authData ? (
          <a
            href="/"
            onClick={logout}
            className="button hidden mr-8 text-n-1/50 transition-colors hover:text-n-1 lg:block"
          >
            Logout
          </a>
        ) : (
          <a
            href="/login"
            className="button hidden mr-8 text-n-1/50 transition-colors hover:text-n-1 lg:block"
          >
            Login
          </a>
        )}
        <Button
          className="hidden lg:flex"
          href={getButtonLink()}
          onClick={handleClick}
        >
          {getButtonText()}
        </Button>
        <Button
          className="ml-auto lg:hidden"
          px="px-3"
          onClick={toggleNavigation}
        >
          <MenuSvg openNavigation={openNavigation} />
        </Button>
      </div>
    </div>
  );
};

export default Header;
