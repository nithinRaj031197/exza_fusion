import { Button, Container, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TabsComponent from "../component/Tabs";
import axios from "../utils/axios";

const UploadFiless = () => {
  const [frontSide, setFrontSide] = useState();
  const [backSide, setBackSide] = useState();
  const [frontSidePreview, setFrontSidePreview] = useState();
  const [backSidePreview, setBackSidePreview] = useState();
  const { processId, referenceId } = useParams();
  const [currentStep, setCurrentStep] = useState([]);
  const [show, setShow] = useState(true);
  const [loading, setLoading] = useState(false);

  const getCurrentProcess = async (processId) => {
    setLoading(true);
    const response = await axios.get(`/getCurrentVerification/${processId}`);
    console.log("res", response.data);
    if (response?.data?.length === 0) {
      setShow(false);
    } else {
      setCurrentStep(response.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    processId && getCurrentProcess(processId);
  }, []);

  //Front-Side
  useEffect(() => {
    if (!frontSide) {
      setFrontSidePreview(undefined);
      return;
    }

    const frontSideObjectUrl = URL.createObjectURL(frontSide);
    setFrontSidePreview(frontSideObjectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(frontSideObjectUrl);
  }, [frontSide]);

  //Back-side
  useEffect(() => {
    if (!backSide) {
      setBackSidePreview(undefined);
      return;
    }

    const backSideObjectUrl = URL.createObjectURL(backSide);
    setBackSidePreview(backSideObjectUrl);

    return () => URL.revokeObjectURL(backSideObjectUrl);
  }, [backSide]);

  const onSelectFrontFile = (e) => {
    if (e.target && e.target.files[0]) {
      setFrontSide(e.target.files[0]);
    }
  };

  const onSelectBackFile = (e) => {
    if (e.target && e.target.files[0]) {
      setBackSide(e.target.files[0]);
    }
  };

  const submitFileData = async (e, step) => {
    e.preventDefault();
    setLoading(true);
    try {
      let formData = new FormData();
      formData.append("attachment", frontSide);
      formData.append("attachment", backSide);
      formData.append("step", step === "DRIVINNG_LICENSE" ? "DRIVING_LICENSE" : step);
      await axios
        .post(`/uploadDocument/${referenceId}`, formData)
        .then(async (res) => {
          await getCurrentProcess(processId);
          console.log(res.data);
          setFrontSide(undefined);
          setBackSide(undefined);
          setFrontSidePreview(undefined);
          setBackSidePreview(undefined);
        })
        .catch((err) => console.error(err));
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col">
      {/* <div className="text-3xl text-start m-1 rounded-lg px-10 py-5 bg-cyan-200 ">EXZA FUSION</div> */}

      <TabsComponent
        submitFileData={submitFileData}
        currentStep={currentStep}
        frontSide={frontSide}
        backSide={backSide}
        backSidePreview={backSidePreview}
        frontSidePreview={frontSidePreview}
        onSelectFrontFile={onSelectFrontFile}
        onSelectBackFile={onSelectBackFile}
        show={show}
        loading={loading}
      />
      {/* <div className="flex flex-col divide-y-2 divide-zinc-500">
        {show ? (
          <></>
        ) : (
         <></>
        )}
      </div> */}
    </div>
  );
};

export default UploadFiless;
