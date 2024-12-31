import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";
import { Layout } from "../components";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { apiRoutes } from "../constants/apiRoutes";

export const Home: React.FC = () => {
  const [categories, setCategories] = useState([]);
  const [jobs, setJobs] = useState([]);

  const access_token = window.localStorage.getItem("access_token");

  const fetchCategories = async () => {
    const url = `${import.meta.env.VITE_BACKEND_URL}${apiRoutes.categories}`;
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (res.status === 200) {
      setCategories(res?.data?.data);
    }
  };

  const fetchJobs = async () => {
    const url = `${import.meta.env.VITE_BACKEND_URL}${apiRoutes.jobs}`;
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
    fetchCategories();
    fetchJobs();
  }, []);

  // Group jobs by categories
  const groupJobsByCategory = useMemo(() => {
    const grouped = categories.map((category: any) => ({
      id: category.id,
      name: category.name,
      openings: jobs.filter((job: any) => job.category_name === category.name),
    }));
    return grouped;
  }, [jobs, categories]);

  return (
    <Layout>
      <Box style={{ marginTop: 20, marginBottom: 32 }} textAlign={"center"}>
        <Typography
          variant="h4"
          fontWeight="700"
          textTransform="uppercase"
          fontSize={32}>
          Browse Open Positions
        </Typography>
        <Typography>
          We are always on the lookout for talented people
        </Typography>
      </Box>

      <Box
        style={{
          marginBottom: 32,
          display: "flex",
          justifyContent: "center",
        }}>
        <Button variant="contained">Publish New Job</Button>
      </Box>
      {groupJobsByCategory.map((category) => {
        return (
          <Accordion
            key={category.id}
            style={{
              margin: "12px 0",
              backgroundColor: "#f5f5f5",
              boxShadow: "none",
              borderRadius: 8,
              border: "2px solid #0003",
            }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header">
              <Typography variant="h6">{category.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {category?.openings?.length > 0 ? (
                category.openings.map((opening: any) => {
                  return (
                    <div
                      key={opening.id}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        backgroundColor: "white",
                        padding: 8,
                        borderRadius: 8,
                        marginBottom: 8,
                      }}>
                      <Typography>{opening.designation}</Typography>
                      <Box style={{ display: "flex", gap: 8 }}>
                        <Link to={`/jobs/${opening.id}`}>
                          <Button variant="outlined" size="small">
                            View
                          </Button>
                        </Link>
                        <Button variant="outlined" size="small" color="error">
                          Delete
                        </Button>
                      </Box>
                    </div>
                  );
                })
              ) : (
                <Typography>No job openings right now.</Typography>
              )}
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Layout>
  );
};
