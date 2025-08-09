import { useContext, useState, Fragment } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Stack, Typography, ListItem, Collapse, Box } from "@mui/material";
//Icons
import { ExpandLess, ExpandMore } from "@mui/icons-material";
//Import from project
import { AuthContext } from "../../Context/AuthContext";
import logoSystem from "../../Assets/school_logo.svg";
import { menuDataArray, collapseDataArray } from "./MenuData";
import "./menu.scss";

// Collapse menu config

export default function Menu() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useContext(AuthContext);

  const menuData = menuDataArray();
  const menuCollapseData = collapseDataArray();

  // Keep track of open collapse menus by subName
  const [openCollapse, setOpenCollapse] = useState({});

  const toggleCollapse = (subName) => {
    setOpenCollapse((prev) => {
      const isCurrentlyOpen = prev[subName];
      // Close all collapses, then toggle the clicked one
      return { [subName]: !isCurrentlyOpen };
    });
  };

  const isRouteActive = (menu, pathname) => {
    if (menu.route === pathname) return true;

    if (menu.subMenuData?.some((sub) => sub.route === pathname)) return true;

    // Check all collapseData for any subMenuData inside this menu
    return menu.subMenuData?.some((sub) =>
      menuCollapseData
        .filter((c) => c.subName === sub.subName)
        .some((c) =>
          c.collapseData?.some((collapse) => collapse.route === pathname)
        )
    );
  };

  // Helper: Find the currently active subMenu
  const subMenu = menuData.find((menu) =>
    menu.subMenuData?.some(
      (sub) =>
        sub.route === location.pathname ||
        menuCollapseData
          .find((c) => c.subName === sub.subName)
          ?.collapseData?.some(
            (collapse) => collapse.route === location.pathname
          )
    )
  );

  return (
    <Box className="menu-container">
      <Stack direction="row" sx={{ height: "100vh" }}>
        {/* ============================================ Main Menu ========================================== */}
        <Stack direction="column" spacing={3} className="main-menu">
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            className="logo-container"
          >
            <img src={logoSystem} style={{ width: "45px" }} alt="logo" />
          </Stack>

          <Box>
            {menuData.map((menu) => (
              <ListItem
                key={menu.name}
                className={
                  isRouteActive(menu, location.pathname)
                    ? "menu-list-item-active"
                    : "menu-list-item"
                }
                onClick={() => {
                  navigate(menu.route);
                  setOpenCollapse({});
                }}
              >
                <Box className="box-container">
                  <Box className="box-top" />
                  <Stack
                    className="icon-container"
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                  >
                    {menu.icon}
                  </Stack>
                  <Box className="box-bottom" />
                </Box>
              </ListItem>
            ))}
          </Box>
        </Stack>

        {/* ========================================= Sub Menu ============================================== */}

        <Stack direction="column" spacing={6} className="sub-menu">
          <Typography className="main-title">{subMenu?.name}</Typography>
          <Box className="sub-menu-body">
            <Stack direction="column" spacing={0.5}>
              {subMenu?.subMenuData?.map((menu) => {
                const collapseMenu = menuCollapseData.find(
                  (c) => menu.subName === c.subName
                );

                return (
                  <Fragment key={menu.subName}>
                    {!menu.isCollapse ? (
                      // ========================================== Normal sub menu ===================================
                      <ListItem
                        disablePadding
                        onClick={() => {
                          navigate(menu.route);
                          setOpenCollapse({});
                        }}
                        className={
                          location.pathname === menu.route
                            ? "subMenu-list-item-active"
                            : "subMenu-list-item"
                        }
                      >
                        <Stack direction="row" spacing={1.4}>
                          <Stack direction="column" justifyContent="center">
                            {menu.icon}
                          </Stack>
                          <Typography className="list-item-text">
                            {menu.subName}
                          </Typography>
                        </Stack>
                      </ListItem>
                    ) : (
                      // ========================================== Collapsible sub menu =================================
                      <ListItem
                        disablePadding
                        onClick={() => toggleCollapse(menu.subName)}
                        className="subMenu-list-item"
                      >
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          sx={{ width: "100%", marginRight: "14px" }}
                        >
                          <Stack direction="row" spacing={1.4}>
                            {/* <Stack direction="column" justifyContent="center">
                            {menu.icon}
                          </Stack> */}
                            {openCollapse[menu.subName] ? (
                              <Stack
                                direction="column"
                                justifyContent="center"
                                alignItems="center"
                                className="expand-icon"
                              >
                                <ExpandMore
                                  style={{ color: "#fff", fontSize: "20px" }}
                                />
                              </Stack>
                            ) : (
                              <Stack
                                direction="column"
                                justifyContent="center"
                                alignItems="center"
                                className="expand-icon"
                              >
                                <ExpandLess
                                  style={{ color: "#fff", fontSize: "20px" }}
                                />
                              </Stack>
                            )}
                            <Typography className="list-item-text">
                              {menu.subName}
                            </Typography>
                          </Stack>
                        </Stack>
                      </ListItem>
                    )}

                    {/* ======================================= Collapse items ================================================ */}
                    {menu.isCollapse &&
                      collapseMenu?.collapseData?.length > 0 && (
                        <Collapse
                          in={openCollapse[menu.subName]}
                          timeout="auto"
                          unmountOnExit
                        >
                          <Stack direction="column" spacing={1}>
                            {collapseMenu.collapseData.map((row) => (
                              <ListItem
                                key={row.route}
                                disablePadding
                                onClick={() => navigate(row.route)}
                                className={
                                  location.pathname === row.route
                                    ? "subMenu-list-item-active"
                                    : "subMenu-list-item"
                                }
                              >
                                <Stack
                                  direction="row"
                                  spacing={1.4}
                                  sx={{ paddingLeft: "14px" }}
                                >
                                  <Stack
                                    direction="column"
                                    justifyContent="center"
                                  >
                                    {row.icon}
                                  </Stack>
                                  <Typography className="list-item-text">
                                    {row.subName}
                                  </Typography>
                                </Stack>
                              </ListItem>
                            ))}
                          </Stack>
                        </Collapse>
                      )}
                  </Fragment>
                );
              })}
            </Stack>
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
}
