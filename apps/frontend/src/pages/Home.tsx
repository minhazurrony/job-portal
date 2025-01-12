import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Skeleton,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";
import { AddNewPost, Layout } from "../components";
import { useEffect, useMemo, useState } from "react";
import axios, { AxiosError } from "axios";
import { apiRoutes } from "../constants/apiRoutes";
import { useNotification } from "../contexts/NotificationContext";

export const Home: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [isCategoryLoading, setIsCategoryLoading] = useState(false);

  const access_token = window.localStorage.getItem("access_token");

  const { showNotification } = useNotification();

  const fetchCategories = async () => {
    const url = `${import.meta.env.VITE_BACKEND_URL}${apiRoutes.categories}`;

    try {
      setIsCategoryLoading(true);
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      if (res.status === 200) {
        setCategories(res?.data?.data);
      }
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError) {
        showNotification(error?.response?.data?.error, "error");
      }
    } finally {
      setIsCategoryLoading(false);
    }
  };

  const fetchJobs = async () => {
    const url = `${import.meta.env.VITE_BACKEND_URL}${apiRoutes.jobs}`;

    try {
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      if (res.status === 200) {
        setJobs(res?.data?.data);
      }
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError) {
        showNotification(error?.response?.data?.error, "error");
      }
    }
  };

  useEffect(() => {
    if (!openModal) {
      fetchCategories();
      fetchJobs();
    }
  }, [openModal]);

  // Group jobs by categories
  const groupJobsByCategory = useMemo(() => {
    const grouped = categories?.map((category: any) => ({
      id: category.id,
      name: category.name,
      openings: jobs?.filter((job: any) => job.category_name === category.name),
    }));
    return grouped;
  }, [jobs, categories]);

  const handleDeleteJob = async (jobId: string) => {
    const url = `${import.meta.env.VITE_BACKEND_URL}${apiRoutes.jobs}`;

    try {
      const res = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        data: {
          jobId,
        },
      });

      if (res.status === 200) {
        fetchJobs();
        showNotification("Job deleted successfully", "success");
      }
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError) {
        showNotification(error?.response?.data?.error, "error");
      }
    }
  };

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
        <AddNewPost open={openModal} setOpen={setOpenModal} />
      </Box>
      {isCategoryLoading
        ? Array.from({ length: 4 }).map((category: any) => {
            return <Skeleton key={category?.id} height={50} />;
          })
        : groupJobsByCategory.map((category) => {
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
                            <Button
                              variant="outlined"
                              size="small"
                              color="error"
                              onClick={() => handleDeleteJob(opening.id)}>
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
