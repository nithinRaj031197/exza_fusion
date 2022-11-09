import { Button, Container, Stack, Typography } from "@mui/material";
import React from "react";

const Rough = () => {
  return (
    <>
      <div className="flex flex-col">
        <div className="text-3xl text-start m-1 rounded-lg px-10 py-5 bg-cyan-200 ">EXZA FUSION</div>
        <div className="flex mt-2">
          <div className="flex flex-1 h-96 justify-center items-center bg-gradient-to-r from-lime-200 to-green-200 m-1 rounded-lg">
            <div className="text-2xl text-center">AADHAR CARD UPLOAD</div>
          </div>
          <div className="flex flex-1 h-96 justify-center items-center">
            <form>
              <Container
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Stack direction="row" spacing={2} className="mb-5" alignItems="center">
                  <Typography>Front Side</Typography>
                  <Button variant="outlined" component="label">
                    Upload
                    <input hidden id="frontSide" name="frontSide" accept="image/*" type="file" />
                  </Button>
                  <div className="h-32 w-56">{/* {frontSide && <img className="h-32 w-56" />} */}</div>
                </Stack>
                <Stack direction="row" spacing={2} className="mb-5" alignItems="center">
                  <Typography>Back Side</Typography>
                  <Button variant="outlined" component="label">
                    Upload
                    <input o hidden id="frontSide" name="frontSide" accept="image/*" type="file" />
                  </Button>
                  <div className="h-32 w-56">{/* {backSide && <img className="h-32 w-56" />} */}</div>
                </Stack>
              </Container>
              <Button sx={{ mt: 1, mb: 2 }} fullWidth variant="contained" type="submit">
                Submit
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Rough;
