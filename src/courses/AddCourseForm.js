import {React, useState} from 'react';
import {TextField, Grid, Paper, Typography, Button} from '@material-ui/core';
import Axios from 'axios';


function AddCourseForm({handleClose}) {

    const createId = () => {
        return Math.floor(Math.random() * 999999);
    }

    const [courseId, setCourseId] = useState(createId);
    const [courseTitle, setCourseTitle] = useState("");
    const [courseDesc, setCourseDesc] = useState("");
    const [courseImg, setCourseImg] = useState("");

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

    const addCourse = () => {
        Axios.post('https://vottron.herokuapp.com/courses', {
            courseId,
            courseTitle,
            courseDesc,
            courseImg,
        }).then(() => console.log("added course"))
    }

    const handleSubmit = (e) => {
        if(validate.validateAll([courseTitle, 36], [courseDesc, 90])) {
            return;
        }
        else {
            handleClose();
            addCourse();
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
                Add a new class
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
                     id="Course title" 
                     label={`Title ${validate.check(courseTitle, 36) ? '(max 36 characters)' : ''}`}
                     value={courseTitle}
                     onChange={(e) => setCourseTitle(e.target.value)}
                     error={validate.check(courseTitle, 36)}
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
                        id="Description" 
                        label={`Description ${validate.check(courseDesc, 90) ? '(max 90 characters)' : ''}`}
                        value={courseDesc}
                        onChange={(e) => setCourseDesc(e.target.value)}
                        error={validate.check(courseDesc, 90)}
                    />
                </Grid>
            </Grid>
            <Grid 
             container
             justify="space-between"
             spacing={4}
             className="form-row form-row__last"
            >
                <Grid xs={12} item>
                    <TextField 
                     fullWidth={true} 
                     id="Course image" 
                     label="Image URL" 
                     value={courseImg}
                     onChange={(e) => setCourseImg(e.target.value)}
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

export default AddCourseForm;