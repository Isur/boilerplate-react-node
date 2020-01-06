import React, { useState, useEffect } from "react";
import { Snackbar, IconButton } from "@material-ui/core";
import * as Icons from "@material-ui/icons";
import { connect } from "react-redux";
import { IStateNotification } from "../Redux/Notifications/types";
import { IAppState, QThunkDispatch } from "../Redux/store";
import { removeNotification } from "../Redux/Notifications/actions";

interface IStateProps {
  notifications: IStateNotification,
}

interface IDispatchProps {
  close: (id: string) => void,
}

interface IOwnProps { }

interface INotifications extends IStateProps, IDispatchProps, IOwnProps { }

const Notifications = (props: INotifications) => {
  const [open, setOpen] = useState<string[]>([]);
  useEffect(() => {
    setOpen(Object.keys(props.notifications));
  }, [props.notifications]);

  const close = (id: string) => {
    setOpen(open.filter(str => id !== str));
    props.close(id);
  };

  return (
    <div className="Notifications">
      {Object.keys(props.notifications).map(notif =>
        <Snackbar key={notif}
                  open={open.includes(notif)}
                  message={
                    <span> {props.notifications[notif].message} </span>
                  }
                  autoHideDuration={3000}
                  action={
                    <IconButton key="close"
                                onClick={() => close(notif)}>
                      <Icons.Close />
                    </IconButton>
                  }
                  anchorOrigin={{ vertical: "top", horizontal: "left" }}
                  onClose={() => close(notif)} />,
      )}
    </div>
  );
};

export default connect<IStateProps, IDispatchProps, IOwnProps, IAppState>(
  state => ({
    notifications: state.notifications,
  }),
  (dispatch: QThunkDispatch) => ({
    close: id => dispatch(removeNotification(id)),
  }),
)(Notifications);
