import React from "react";
import Assessment from "@material-ui/icons/Assessment";
import Event from "@material-ui/icons/Event";
import Payment from "@material-ui/icons/Payment";
import Cancel from "@material-ui/icons/Cancel"
import Web from "@material-ui/icons/Web";

const data = {
  menus: [
    { text: "DashBoard", icon: <Assessment />, link: "/dashboard" },
    { text: "Event", icon: <Web />, link: "/event",},
    { text: "Create Event", icon: <Event />, link: "/create-event" },
    { text: "Payment", icon: <Payment/>, link: "/payment-plan" },
    
  ],
  
  
};

export default data;
