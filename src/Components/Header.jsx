import * as React from 'react';
import { useNavigate } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import "antd/dist/antd.min.css";
import { Avatar } from "antd";
import { Auth } from 'aws-amplify';
import { useEffect } from "react";

export default function Header(props) {

 // export default function Header({user} , {customer}) {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [thirdanchorEl, setTHirdAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const thidPartyMenu = Boolean(thirdanchorEl);

  // console.log("Header props.customerId: ",   props.customerId)  ;
  // console.log("Header props.cognitoEntity: ", props.cognitoEntity)  ;
  // console.log("Header props.customerEntity: ", props.customerEntity)  ;
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const signOut = async () => {
    try {
        await Auth.signOut();
        window.location.reload();
    } catch (error) {
        console.log('error signing out: ', error);
    }
}
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClickThirdParty = (event) => {
    setTHirdAnchorEl(event.currentTarget);
  };
  const handleCloseThirdParty = () => {
    setTHirdAnchorEl(null);
  };

  useEffect(() => {
    //console.log("props.stravaData.PartyId: ", props.stravaData.PartyId);
    //fetchActivities(props.stravaData.PartyId);
  }, [props]);

  return (
    <AppBar className="headerDiv">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography className="ThreeSixtyDSLDiv" noWrap component="div">
              <img
                src={process.env.PUBLIC_URL + "/360log.jpeg"}
                width="150"
                height={50}
              />
            </Typography>

            <div className="menuItems">
            <div> </div>
              <div>
                <a href="../#" className="menuItems">
                  Dashboards
                </a>
              </div>

              
              <KeyboardArrowDownIcon className="ArrowIcon" />
              <div
                id="thirdParties"
                aria-controls={thidPartyMenu ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={thidPartyMenu ? "true" : undefined}
                onClick={handleClickThirdParty}
              >
                <p className="menuItems">3rd Parties</p>
              </div>
              <KeyboardArrowDownIcon
                // id="thirdParties"
                aria-controls={thidPartyMenu ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={thidPartyMenu ? "true" : undefined}
                onClick={handleClickThirdParty}
                className="ArrowIcon"
              />
              <Menu
                id="thirdParties"
                anchorEl={thirdanchorEl}
                open={thidPartyMenu}
                onClose={handleCloseThirdParty}
                MenuListProps={{
                  "aria-labelledby": "thirdParties",
                }}
              >
        
  
          
     
                <MenuItem onClick={() => navigate("ThirdParty", {state:{customerEntity:props.customerEntity}}  )}>Connect 3rd Parties</MenuItem>
              </Menu>
              
            </div>




            
            <div className="rightDiv">
              <IconButton
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                className="avatarIcon"
              >
                <Avatar
                  shape="circle"
                  size={37}
                  src="https://joeschmoe.io/api/v1/random"
                />
              </IconButton>
              <KeyboardArrowDownIcon
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                className="ArrowIcon"
              />
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={() => navigate("Profile", {state:{customerEntity:props.customerEntity}}  )}>Profile</MenuItem>
                <MenuItem onClick={signOut}>Logout</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </Container>
      </AppBar>
  );
}