import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Container,
  Typography,
} from "@mui/material";
import { TopBar } from "../components";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";

const categories = [
  {
    id: 1,
    name: "Digital Marketing",
    openings: [
      {
        id: 1,
        position: "Cheif Marketing Officer",
      },
      {
        id: 2,
        position: "SEO Expert",
      },
    ],
  },
  {
    id: 2,
    name: "Development",
    openings: [],
  },
  {
    id: 3,
    name: "Engineering",
    openings: [],
  },
  {
    id: 4,
    name: "Sales & Marketing",
    openings: [],
  },
];

export const Home: React.FC = () => {
  return (
    <>
      <TopBar />
      <Container>
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
        {categories.map((category) => {
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
                  category.openings.map((opening) => {
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
                        <Typography>{opening.position}</Typography>
                        <Link to={`/jobs/${opening.id}`}>
                          <Button variant="outlined" size="medium">
                            Apply Now
                          </Button>
                        </Link>
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
      </Container>
    </>
  );
};
