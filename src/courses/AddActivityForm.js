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

    const validate = {
        check: (input, num) => (input.length >= num),
        validateAll: function validateAll(...inputs) {
            for(let input of inputs){
                if(this.check(input[0], input[1]))
                    return true;
            }
            return false;
        }
    }

    const addActivity = () => {
        Axios.post('https://vottron.herokuapp.com/courses/:id/activities', {
            activityTitle,
            activityDesc,
            activitySolution,
            courseId,
            activityOrder
        }).then((res) => {
            getActivities(courseId);
            const activityId = res.data.insertId
            Axios.get('https://vottron.herokuapp.com/studentcourse/original/:id', {
                params: {
                    id: courseId
                }
            }).then((res) => {
                const studCourseId = res.data[0].courseid;
                Axios.post('https://vottron.herokuapp.com/activities/studentactivities', {
                    activityid: activityId,
                    activitytitle: activityTitle,
                    activitydescription: activityDesc,
                    activitysolution: activitySolution,
                    studentId: studCourseId,
                    activityorder: activityOrder,
                    completed: 'no'
                })
            })
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(validate.validateAll([activityTitle, 36], [activityDesc, 275], [activitySolution, 275]))
            return;
        else {
            addActivity();
            handleClose();
        }
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
                     label={`Title ${validate.check(activityTitle, 36) ? '(max 36 characters)' : ''}`}
                     value={activityTitle}
                     onChange={(e) => setActivityTitle(e.target.value)}
                     error={validate.check(activityTitle, 36)}
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
                        label={`Instructions ${validate.check(activityDesc, 275) ? '(max 275 characters)' : ''}`}
                        error={validate.check(activityDesc, 275)}
                        multiline
                        rows={4}
                        fullWidth={true} 
                        id="Instructions" 
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
                        rows={4}
                        fullWidth={true} 
                        id="Solution" 
                        label={`Solution ${validate.check(activitySolution, 275) ? '(max 275 characters)' : ''}`}
                        error={validate.check(activitySolution, 275)}
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