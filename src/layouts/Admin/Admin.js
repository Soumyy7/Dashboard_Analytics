import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";

import routes from "routes.js";

import logo2 from "assets/img/logo2.webp";
import { BackgroundColorContext } from "contexts/BackgroundColorContext";

function Admin(props) {
  const mainPanelRef = React.useRef(null);
  // const [sidebarOpened, setsidebarOpened] = React.useState(
  //   document.documentElement.className.indexOf("nav-open") !== -1
  // );
  // const toggleSidebar = () => {
  //   document.documentElement.classList.toggle("nav-open");
  //   setsidebarOpened(!sidebarOpened);
  // };
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route path={prop.path} element={prop.component} key={key} exact />
        );
      } else {
        return null;
      }
    });
  };
  return (
    <BackgroundColorContext.Consumer>
      {({ color, changeColor }) => (
        <React.Fragment>
          <div className="wrapper">
            <Sidebar
              routes={routes}
              logo={{
                outterLink: "https://leadenhallanalytics.com/",
                text: "LeadenHall",
                imgSrc: logo2,
              }}
              // toggleSidebar={toggleSidebar}
            />
            <div className="main-panel" ref={mainPanelRef} data={color}>
              <AdminNavbar
              // brandText={getBrandText(location.pathname)}
              // toggleSidebar={toggleSidebar}
              // sidebarOpened={sidebarOpened}
              />
              <Routes>
                {getRoutes(routes)}
                <Route
                  path="/"
                  element={<Navigate to="/admin/dashboard" replace />}
                />
              </Routes>
            </div>
          </div>
          <FixedPlugin bgColor={color} handleBgClick={changeColor} />
        </React.Fragment>
      )}
    </BackgroundColorContext.Consumer>
  );
}

export default Admin;
