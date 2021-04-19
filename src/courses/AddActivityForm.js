import {React, useState} from 'react';
import {TextField, Grid, Paper, Typography, Button} from '@material-ui/core';
import Axios from 'axios';
import { useRouteMatch } from "react-router-dom";


function AddActivityForm({getActivities, handleClose, activityData}) {

    const url = useRouteMatch("/courses/:id");
    const id = url.params.id;

    const [activityTitle, setActivityTitle] = useState("");
    const [activityDesc, setActivityDesc] = useState("");
    const [activitySolution, setActivitySolution] = useState("");
    const [courseId] = useState(id);
    const [activityOrder] = useState(activityData.length + 1);

    const addActivity = () => {
        Axios.post('https://vottron.herokuapp.com/courses/:id/activities', {
            activityTitle,
            activityDesc,
            activitySolution,
            courseId,
            activityOrder
        }).then((res) => {
            getActivities(courseId);
        })
    }

    const handleSubmit = (e) => {
        addActivity();
        handleClose();
        e.preventDefault();
    }

  return (
    <Paper className="form-container">
        <form 
            className="add-student-form"
            onSubmit={handleSubmit}
        >
            <Typography
                variant="h4"
                className="form-row"
            >
                Add a new activity
            </Typography>
            <Grid 
             container
             justify="space-between"
             spacing={4}
             className="form-row"
            >
                <Grid xs={12}item>
                    <TextField 
                     fullWidth={true} 
                     id="Activity title" 
                     label="Title" 
                     value={activityTitle}
                     onChange={(e) => setActivityTitle(e.target.value)}
                    />
                </Grid>
            </Grid>
            <Grid 
             container
             spacing={4}
             className="form-row"
            >
                <Grid xs={12} item>
                    <TextField
                        multiline
                        rows={3}
                        fullWidth={true} 
                        id="Instructions" 
                        label="Instructions"
                        value={activityDesc}
                        onChange={(e) => setActivityDesc(e.target.value)}
                    />
                </Grid>
            </Grid>
            <Grid 
             container
             spacing={4}
             className="form-row"
            >
                <Grid xs={12} item>
                    <TextField
                        multiline
                        rows={5}
                        fullWidth={true} 
                        id="Solution" 
                        label="Solution"
                        value={activitySolution}
                        onChange={(e) => setActivitySolution(e.target.value)}
                    />
                </Grid>
            </Grid>
            <Grid 
                container
                justify="flex-end"
            >
                <Grid item>
                    <Button
                        variant="contained"
                        color="primary"
                        className="submit-btn"
                        type="submit"
                        value="submit"
                    >
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </form>
    </Paper>
  );
}

export default AddActivityForm;