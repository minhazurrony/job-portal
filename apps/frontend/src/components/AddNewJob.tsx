import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Autocomplete } from "@mui/material";
import { useEffect, useState } from "react";
import { apiRoutes } from "../constants/apiRoutes";
import axios, { AxiosError } from "axios";
import { useNotification } from "../contexts/NotificationContext";

type AddNewPostProps = {
  open: boolean;
  setOpen: (param: any) => void;
};

export const AddNewPost: React.FC<AddNewPostProps> = ({ open, setOpen }) => {
  const [categories, setCategories] = useState([]);

  const access_token = window.localStorage.getItem("access_token");

  const { showNotification } = useNotification();

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

  useEffect(() => {
    if (open) {
      fetchCategories();
    }
  }, [open]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const categoriOptions = categories.map((category: any) => ({
    label: category.name,
    value: category.id,
  }));

  const [formData, setFormData] = useState({
    category_id: { label: "", value: "" },
    designation: "",
    company: "",
    type: { label: "", value: "" },
    location: "",
    shift: { label: "", value: "" },
    overview: "",
    responsibilities: "",
    requirements: "",
    qualifications: "",
    office_location: "",
    salary: "",
  });

  const handleInputChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const publishPost = async () => {
    const url = `${import.meta.env.VITE_BACKEND_URL}${apiRoutes.jobs}`;

    // Prepare the payload correctly
    const payload = {
      ...formData,
      category_id: formData.category_id.value,
      type: formData.type.value,
      shift: formData.shift.value,
    };

    try {
      // Correct usage of axios to send the POST request
      const res = await axios.post(url, payload, {
        headers: {
          Authorization: `Bearer ${access_token}`, // Ensure this token is available
        },
      });

      // Handle success response
      if (res.status === 201) {
        showNotification("Job added successfully", "success");
        handleClose(); // Close form or modal after successful submission
      }
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError) {
        showNotification(error?.response?.data?.error, "error");
      }
    }
  };

  return (
    <React.Fragment>
      <Button variant="contained" onClick={handleClickOpen}>
        Add New Job
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            publishPost();
          },
        }}>
        <DialogTitle>Add New Post</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill the form to publish a new job to a specific category.
          </DialogContentText>

          <Autocomplete
            disablePortal
            options={categoriOptions}
            size="small"
            fullWidth
            value={formData.category_id}
            onChange={(_, newValue: any) => {
              setFormData({ ...formData, category_id: newValue });
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Category"
                margin="normal"
                name="category_id"
              />
            )}
          />

          <TextField
            margin="normal"
            name="designation"
            label="Designation"
            fullWidth
            variant="outlined"
            size="small"
            value={formData.designation}
            onChange={handleInputChange}
          />

          <TextField
            margin="normal"
            name="company"
            label="Company"
            fullWidth
            variant="outlined"
            size="small"
            value={formData.company}
            onChange={handleInputChange}
          />

          <Autocomplete
            disablePortal
            options={[
              { label: "Part Time", value: "Part Time" },
              { label: "Full Time", value: "Full Time" },
            ]}
            size="small"
            fullWidth
            renderInput={(params) => (
              <TextField {...params} label="Type" margin="normal" name="type" />
            )}
            value={formData.type}
            onChange={(_, newValue: any) => {
              setFormData({ ...formData, type: newValue });
            }}
          />

          <TextField
            margin="normal"
            name="location"
            label="Location"
            fullWidth
            variant="outlined"
            size="small"
            value={formData.location}
            onChange={handleInputChange}
          />

          <Autocomplete
            disablePortal
            options={[
              { label: "Day", value: "Day" },
              { label: "Night", value: "Night" },
            ]}
            size="small"
            fullWidth
            renderInput={(params) => (
              <TextField
                {...params}
                label="Shift"
                margin="normal"
                name="shift"
              />
            )}
            value={formData.shift}
            onChange={(_, newValue: any) => {
              setFormData({ ...formData, shift: newValue });
            }}
          />

          <TextField
            name="overview"
            label="Overview"
            multiline
            maxRows={12}
            fullWidth
            margin="normal"
            value={formData.overview}
            onChange={handleInputChange}
          />

          <TextField
            name="responsibilities"
            label="Responsibilities"
            multiline
            maxRows={12}
            fullWidth
            margin="normal"
            value={formData.responsibilities}
            onChange={handleInputChange}
          />

          <TextField
            name="requirements"
            label="Requirements"
            multiline
            maxRows={12}
            fullWidth
            margin="normal"
            value={formData.requirements}
            onChange={handleInputChange}
          />

          <TextField
            name="qualifications"
            label="Qualifications"
            multiline
            maxRows={12}
            fullWidth
            margin="normal"
            value={formData.qualifications}
            onChange={handleInputChange}
          />

          <TextField
            margin="normal"
            name="office_location"
            label="Office_location"
            fullWidth
            variant="outlined"
            size="small"
            value={formData.office_location}
            onChange={handleInputChange}
          />

          <TextField
            margin="normal"
            id="salary"
            name="salary"
            label="Salary"
            fullWidth
            variant="outlined"
            size="small"
            value={formData.salary}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Publish</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
