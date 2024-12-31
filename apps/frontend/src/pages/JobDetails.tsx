import React, { useEffect, useState } from "react";
import { Layout } from "../components";
import { Box, Button, Typography } from "@mui/material";
import { apiRoutes } from "../constants/apiRoutes";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export const JobDetails: React.FC = () => {
  let { jobId } = useParams();
  const navigate = useNavigate();

  const [jobs, setJobs] = useState<any>([]);

  const access_token = window.localStorage.getItem("access_token");

  const fetchJobs = async () => {
    const url = `${import.meta.env.VITE_BACKEND_URL}${
      apiRoutes.jobs
    }?id=${jobId}`;
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (res.status === 200) {
      setJobs(res?.data?.data);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [jobId]);

  return (
    <Layout>
      <Box style={{ marginTop: 24 }}>
        <Typography variant="h5" style={{ display: "inline" }}>
          {jobs[0]?.designation} @
        </Typography>
        <Typography variant="body2" style={{ display: "inline" }}>
          {" "}
          {jobs[0]?.company}
        </Typography>
      </Box>

      <Box style={{ marginTop: 24 }}>
        <Typography variant="h6">Overview:</Typography>
        <Typography>{jobs[0]?.overview}</Typography>
      </Box>

      <Box style={{ marginTop: 24 }}>
        <Typography variant="h6">Responsibilities:</Typography>
        <Typography>{jobs[0]?.responsibilities}</Typography>
      </Box>

      <Box style={{ marginTop: 24 }}>
        <Typography variant="h6">Requirements:</Typography>
        <Typography>{jobs[0]?.requirements}</Typography>
      </Box>

      <Box style={{ marginTop: 24 }}>
        <Typography variant="h6">Qualifications:</Typography>
        <Typography>{jobs[0]?.qualifications}</Typography>
      </Box>

      <Box style={{ marginTop: 24 }}>
        <Typography variant="h6">Office Location:</Typography>
        <Typography>{jobs[0]?.office_location}</Typography>
      </Box>

      <Box style={{ marginTop: 24 }}>
        <Typography variant="h6">Salary:</Typography>
        <Typography>{jobs[0]?.salary}</Typography>
      </Box>

      <Box style={{ marginTop: 24 }}>
        <Typography variant="h6">Type:</Typography>
        <Typography>{jobs[0]?.type}</Typography>
      </Box>
      <Box style={{ marginTop: 24 }}>
        <Typography variant="h6">Location:</Typography>
        <Typography>{jobs[0]?.location}</Typography>
      </Box>
      <Box style={{ marginTop: 24 }}>
        <Typography variant="h6">Shift:</Typography>
        <Typography>{jobs[0]?.shift}</Typography>
      </Box>

      <Box style={{ marginTop: 24 }}>
        <Button variant="contained" onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </Box>
    </Layout>
  );
};
