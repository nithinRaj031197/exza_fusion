import { Button, Container, Stack, Typography } from "@mui/material";
import React from "react";

const FormComponent = ({
  currentStep,
  frontSide,
  backSide,
  frontSidePreview,
  backSidePreview,
  submitFileData,
  onSelectBackFile,
  onSelectFrontFile,
  loading,
}) => {
  return (
    <>
      <div className="flex mt-2" key={currentStep}>
        <div className="flex flex-1 h-96 justify-center items-center bg-gradient-to-r from-lime-200 to-green-200 m-1 rounded-lg">
          <div className="text-2xl text-center">{currentStep} UPLOAD</div>
        </div>
        <div className="flex flex-1 h-96 justify-center items-center">
          <form onSubmit={(e) => submitFileData(e, currentStep)}>
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
                  <input
                    onChange={onSelectFrontFile}
                    hidden
                    id="frontSide"
                    name="frontSide"
                    accept="image/*"
                    type="file"
                  />
                </Button>
                <div className="h-32 w-56">{frontSide && <img className="h-32 w-56" src={frontSidePreview} />}</div>
              </Stack>
              <Stack direction="row" spacing={2} className="mb-5" alignItems="center">
                <Typography>Back Side</Typography>
                <Button variant="outlined" component="label">
                  Upload
                  <input
                    onChange={onSelectBackFile}
                    hidden
                    id="frontSide"
                    name="frontSide"
                    accept="image/*"
                    type="file"
                  />
                </Button>
                <div className="h-32 w-56">{backSide && <img className="h-32 w-56" src={backSidePreview} />}</div>
              </Stack>
            </Container>
            <Button disabled={loading} sx={{ mt: 1, mb: 2 }} color="info" fullWidth variant="contained" type="submit">
              Submit
            </Button>
          </form>
        </div>
        <hr />
      </div>
    </>
  );
};

export default FormComponent;
