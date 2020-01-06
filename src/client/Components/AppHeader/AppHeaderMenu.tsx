import React, { useState } from "react";
import { Drawer, Button, Icon, List, ListItem, ListItemText } from "@material-ui/core";
import { Link } from "react-router-dom";
import routes from "../../Utils/routing";
import isMobile from "../../Hooks/ResponsiveHook";

interface IAppMenu {
  loggedIn: boolean,
  handleThemeChange: () => void,
  handleLanguageChange: () => void,
  handleLogout: () => void,
}

export const AppHeaderDropdownMenu = ({ loggedIn, handleLanguageChange, handleThemeChange, handleLogout }: IAppMenu) => {
  const [state, setState] = useState<boolean>(false);
  const mobile = isMobile();

  const handleToggleDrawer = () => setState(!state);

  const menuItems = [
    { content: lang.dictionary("menu.home"), link: routes.pages.home, logged: undefined },
    { content: lang.dictionary("menu.theme"), onClick: handleThemeChange, logged: undefined },
    { content: lang.dictionary("menu.lang"), onClick: handleLanguageChange, logged: undefined },
    { content: lang.dictionary("menu.login"), link: routes.pages.login, logged: false },
    { content: lang.dictionary("menu.register"), link: routes.pages.register, logged: false },
    { content: lang.dictionary("menu.logout"), onClick: handleLogout, logged: true },
  ];

  const drawerContent
    = <div onClick={handleToggleDrawer}>
      <List>
        {menuItems.map((item, key) => {
          if(loggedIn && item.logged === false) return null;
          if(!loggedIn && item.logged === true) return true;
          return (
            // eslint-disable-next-line react/jsx-handler-names
            <ListItem key={key} button onClick={item.onClick} component={item.link ? Link : Button} to={item.link ? item.link : null}>
              <ListItemText primary={item.content} />
            </ListItem>);
        },
        )
        }
      </List>
    </div>;
  return (
    <>
      <Button className="compact" onClick={() => handleToggleDrawer()} size="large">
        <Icon>menu</Icon>
      </Button>
      <Drawer open={state} anchor={mobile ? "top" : "right"} onClose={() => handleToggleDrawer()}>
        {drawerContent}
      </Drawer>
    </>
  );
};
