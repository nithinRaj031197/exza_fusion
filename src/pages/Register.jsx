import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  createTheme,
  CssBaseline,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  LinearProgress,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { generateApplicationNumber } from "../utils/helper";

import axios from "../utils/axios";

const initialValues = {
  name: "",
  email: "",
  mobile: "",
};

const theme = createTheme();

const Register = () => {
  const [inputValues, setInputValues] = useState(initialValues);
  const [dob, setDob] = useState(null);
  const [loanVal, setLoanVal] = useState("homeLoan");
  const [gender, setGender] = useState("Male");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputValues = (e) => {
    setInputValues({ ...inputValues, [e.target.name]: e.target.value });
  };

  const handleChange = (event) => {
    setLoanVal(event.target.value);
  };

  const handleGender = (event) => {
    setGender(event.target.value);
  };

  const generateUUID = uuidv4();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = {
        applicationNumber: generateApplicationNumber(),
        category: "HNI",
        businessKey: generateUUID,
        applicant: {
          name: inputValues.name,
          email: inputValues.email,
          contactNumber: inputValues.mobile,
          dob,
          gender,
        },
        referenceId: generateUUID,
        description: "DO any thing",
        toWhichEntity: "KYC",
        request: "ICICI",
      };
      console.log("data", data);

      const response = await axios.post("/start-kyc", data);
      console.log("respnseee", response?.data);
      if (response.status === 200) {
        const processId = response.data?.processId;
        //navigate(`/process/${processId}/${generateUUID}`);
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <ThemeProvider theme={theme}>
        {!isSubmitted ? (
          <Grid container component="main" sx={{ height: "100vh" }}>
            <CssBaseline />

            <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
              {loading && <LinearProgress color="secondary" />}
              <Box
                sx={{
                  my: 8,
                  mx: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                  <TextField
                    onChange={handleInputValues}
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    autoFocus
                  />
                  <TextField
                    onChange={handleInputValues}
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    type="email"
                    autoComplete="email"
                  />
                  <TextField
                    sx={{ marginBottom: 3 }}
                    onChange={handleInputValues}
                    margin="normal"
                    required
                    fullWidth
                    type="text"
                    label="Mobile"
                    id="mobile"
                    name="mobile"
                    autoComplete="mobile"
                    inputProps={{ maxLength: 10 }}
                  />
                  <Grid container spacing={6}>
                    <Grid item>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="Date Of Birth"
                          value={dob}
                          onChange={(newValue) => {
                            setDob(newValue?.toISOString() ?? null);
                          }}
                          renderInput={(params) => <TextField name="dob" {...params} sx={{ cursor: "pointer" }} />}
                        />
                      </LocalizationProvider>
                    </Grid>
                    <Grid item>
                      <FormControl>
                        <FormLabel id="gender">Gender</FormLabel>
                        <RadioGroup aria-labelledby="gender" defaultValue="Male" name="gender" onChange={handleGender}>
                          <Stack direction="row">
                            <FormControlLabel value="Male" control={<Radio />} label="Male" />
                            <FormControlLabel value="Female" control={<Radio />} label="Female" />
                            <FormControlLabel value="Other" control={<Radio />} label="Other" />
                          </Stack>
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Button disabled={loading} type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                    Sign In
                  </Button>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={8} md={6} component={Paper} square>
              <>
                <FormControl
                  sx={{
                    my: 8,
                    mx: 4,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  <FormLabel id="loanType" sx={{ fontSize: 20 }}>
                    LOANS
                  </FormLabel>
                  <RadioGroup
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                    aria-labelledby="loanType"
                    name="loanType"
                    value={loanVal}
                    onChange={handleChange}
                  >
                    <Card sx={{ minWidth: 275, my: 2, minHeight: 200 }}>
                      <CardContent className="bg-zinc-300">
                        <FormControlLabel className="bg-zinc-300" value="homeLoan" control={<Radio />} label="Home Loan" />
                      </CardContent>
                    </Card>
                    <Card sx={{ minWidth: 275, my: 2, minHeight: 200 }}>
                      <CardContent className="bg-red-300">
                        <FormControlLabel value="personalLoan" control={<Radio />} label="Personal Loan" />
                      </CardContent>
                    </Card>
                    <Card sx={{ minWidth: 275, my: 2, minHeight: 200 }}>
                      <CardContent className="bg-amber-300">
                        <FormControlLabel value="vehicleLoan" control={<Radio />} label="Vehicle Loan" />
                      </CardContent>
                    </Card>
                    <Card sx={{ minWidth: 275, my: 2, minHeight: 200 }}>
                      <CardContent className="bg-orange-300">
                        <FormControlLabel value="educationLoan" control={<Radio />} label="Education Loan" />
                      </CardContent>
                    </Card>
                  </RadioGroup>
                </FormControl>
              </>
            </Grid>
          </Grid>
        ) : (
          <Paper elevation="5" sx={{ margin: 10, height: "50vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Typography>To continue the procedure, please check your email a link has been shared.!</Typography>
          </Paper>
        )}
      </ThemeProvider>
    </>
  );
};

export default Register;
