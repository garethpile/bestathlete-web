import React from "react";
import Dialog from '@mui/material/Dialog';
import MuiDialogTitle from '@mui/material/DialogTitle';
import MuiDialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";

import { withStyles } from "@mui/styles";


const styles = theme => ({
  root: {
    margin: 0,
    padding: "15px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    // width: 700,
    backgroundColor: "#ed143d",
  },
  whiteColor : {
    color: "white !important",

  },
  dialogPaper: {
    minHeight: '80vh',
    maxHeight: '80vh',

  },
  closeButton: {
    position: "absolute",
    right: "10px",
    color: "white !important"
  }
});
const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose } = props;
  return (
      <MuiDialogTitle disableTypography className={`${classes.root}` }>
        <Typography className={`${classes.whiteColor}`} variant="h6">{children}</Typography>
        {onClose ? (
            <IconButton
                aria-label="close"
                className={classes.closeButton}
                onClick={onClose}
            >
              <CloseIcon />
            </IconButton>
        ) : null}
      </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: "20px"
  }
}))(MuiDialogContent);


const Modal = props => {
  // const handleClickOpen = () => {
  //   props.closeHandler();
  // };
  const handleClose = () => {
    props.closeHandler();
  };
  // const handleChange = event => {
  //   // console.log(event);
  // };
  return (
      <div>
        <Dialog
            //classes={props.size ? '' : {paper: styles.dialogPaper}}
            onClose={handleClose}
            maxWidth={props.size ? props.size : "lg"}
            aria-labelledby="customized-dialog-title"
            open={props.open}
            fullWidth={props.fullWidth ? props.fullWidth : true}
        >
          <DialogTitle onClose={handleClose}>
            {props.header ?  props.header : 'Create Applicant'}
          </DialogTitle>
          <DialogContent dividers>
              {props.children}
          </DialogContent>
        </Dialog>
      </div>
  );
};

export default Modal;
