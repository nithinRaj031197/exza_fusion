import * as React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import FormComponent from "./Form";
import ThankTemplate from "./ThankTemplate";
import { LinearProgress } from "@mui/material";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`full-width-tabpanel-${index}`} aria-labelledby={`full-width-tab-${index}`} {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function TabsComponent({
  currentStep,
  frontSide,
  backSide,
  frontSidePreview,
  backSidePreview,
  submitFileData,
  onSelectBackFile,
  onSelectFrontFile,
  show,
  loading,
  idProofNumber,
  setIdProofNumber,
}) {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <Box sx={{ bgcolor: "background.paper", width: "100", flex: 5 }}>
      {show ? (
        <>
          <AppBar position="static" sx={{ display: "flex", flexDirection: "row", justifyContent: "space-around", paddingTop: 1 }}>
            <Typography variant="h4" sx={{ flex: 1, paddingLeft: 1 }}>
              EXZA FUSION
            </Typography>
            <Tabs
              sx={{ flex: 3 }}
              value={value}
              onChange={handleChange}
              indicatorColor="secondary"
              textColor="inherit"
              variant="fullWidth"
              aria-label="full width tabs example"
            >
              {currentStep?.map((step, index) => {
                return <Tab key={index} label={step} {...a11yProps(0)} />;
              })}
            </Tabs>
          </AppBar>
          {loading && <LinearProgress color="secondary" />}

          <SwipeableViews axis={theme.direction === "rtl" ? "x-reverse" : "x"} index={value} onChangeIndex={handleChangeIndex}>
            {currentStep?.map((step, index) => {
              return (
                <TabPanel key={index} value={index} index={index} dir={theme.direction}>
                  <FormComponent
                    currentStep={step}
                    submitFileData={submitFileData}
                    frontSide={frontSide}
                    backSide={backSide}
                    backSidePreview={backSidePreview}
                    frontSidePreview={frontSidePreview}
                    onSelectFrontFile={onSelectFrontFile}
                    onSelectBackFile={onSelectBackFile}
                    loading={loading}
                    idProofNumber={idProofNumber}
                    setIdProofNumber={setIdProofNumber}
                  />
                </TabPanel>
              );
            })}
          </SwipeableViews>
        </>
      ) : (
        <>
          <AppBar position="static" sx={{ display: "flex", flexDirection: "row", justifyContent: "space-around", paddingTop: 1 }}>
            {loading && <LinearProgress color="secondary" />}
            <Typography variant="h4" sx={{ flex: 1, paddingLeft: 1 }}>
              EXZA FUSION
            </Typography>
          </AppBar>
          <ThankTemplate />
        </>
      )}
    </Box>
  );
}
