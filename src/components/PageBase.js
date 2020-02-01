import React from "react";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import globalStyles from "../styles";
import GlobalStyles from "../styles.scss";
import { orange } from "@material-ui/core/colors";



const PageBase = props => {
  const { title, navigation } = props;

  const styles = {
    paper: {
      minHeight: 344,
      padding: 0
    },
    legend: {
      paddingTop: 20
    },
    pieChartDiv: {
      height: 290,
      textAlign: "center"
    },
    header: {
      fontSize: 24,
      fontWeight: 300,
      backgroundColor: orange[600],
      color: "white",
      lineHeight: "48px",
      paddingLeft: "10px"
    }
  };

  return (
    <div>
      <span style={globalStyles.navigation}>{navigation}</span>

      <Paper style={globalStyles.paper}>
      <div style={{ ...GlobalStyles.title, ...styles.header }}>
        Create Event
      </div>

        <Divider  />
        {props.children}

        <div style={globalStyles.clear} />
      </Paper>
    </div>
  );
};

PageBase.propTypes = {
  title: PropTypes.string,
  navigation: PropTypes.string,
  children: PropTypes.element
};

export default PageBase;
