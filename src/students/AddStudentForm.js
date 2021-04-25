import {React, useState} from 'react';
import {TextField, Grid, Paper, Typography, Button, Box, MenuItem} from '@material-ui/core';
import Axios from 'axios';


function AddStudentForm({courseData, handleClose, getStudents}) {

    const dateObj = new Date();

    const createId = () => {
        return Math.floor(Math.random() * 1000)
    }

    const [studentId, setStudentId] = useState(createId);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [adminNotes, setAdminNotes] = useState("");
    const [course, setCourse] = useState("");
    const [month, setMonth] = useState("");
    const [day, setDay] = useState("");
    const [dob, setDob] = useState("");
    const [year, setYear] = useState("");
    const [courses] = useState([...courseData]);
    // const [enrollDate] = useState("2021/01/01");
    const [weekDay, setWeekDay] = useState("")
    const [weekDays] = useState(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]);

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

    const addStudent = (dob, {courseid, coursetitle, coursedescription, courseimage}, enrollDate) => {
        Axios.post('https://vottron.herokuapp.com/students', {
            studentId,
            firstName,
            lastName,
            adminNotes,
            course: course.coursetitle,
            dob,
            enrollDate,
            active: 'Yes',
            weekDay
        })
        .then(((res) => {
            handleClose();
            getStudents();
            Axios.post('https://vottron.herokuapp.com/courses/studentcourse', {
                studentId,
                coursetitle,
                coursedescription,
                courseimage,
                courseid
            }).then((res) => {
                Axios.get('https://vottron.herokuapp.com/activities/:id', {
                    params: {
                        id: courseid,
                    }
                }).then((res) => {
                    let activityData = [...res.data];
                    for(let activity of activityData){
                        const {activityid, activitytitle, activitydescription, activitysolution, activityorder} = activity;
                        Axios.post('https://vottron.herokuapp.com/activities/studentactivities', {
                            activitytitle,
                            activitydescription,
                            activitysolution,
                            studentId,
                            activityid,
                            activityorder,
                            completed: 'incomplete'
                        }).then((res) => {
                            console.log(res)
                        })
                    }
                })
            })
        }))
    }

    const createDate = (dob, courseChoice) => {
		const enrollDay = dateObj.getDate()
		const enrollMonth = dateObj.getMonth() + 1
		const enrollYear = dateObj.getFullYear()
		const enrollDate =  `${enrollMonth}/${enrollDay}/${enrollYear}`
        console.log(`${enrollMonth}/${enrollDay}/${enrollYear}`)
        addStudent(dob, courseChoice, enrollDate)
	}

    const handleSubmit = (e, courseChoice) => {
        e.preventDefault();
        if(validate.validateAll(
           [firstName, 19], 
           [lastName, 19], 
           [month, 3],
           [day, 3],
           [year, 5])) 
           {
                return
           }
        else {
            const dob = `${month}/${day}/${year}`;
            createDate(dob, courseChoice);
        }
    }

  return (
    <Paper className="form-container">
        <form 
            className="add-student-form"
            onSubmit={(e) => handleSubmit(e, course)}
        >
            <Typography
                variant="h4"
                className="form-row"
            >
                Add a new student
            </Typography>
            <Grid 
             container
             justify="space-between"
             spacing={4}
             className="form-row"
            >
                <Grid xs={12} sm={6} item>
                    <TextField 
                     fullWidth={true} 
                     id="First name"
                     label={`First name ${validate.check(firstName, 19) ? '(max 18 characters)' : ''}`}
                     value={firstName}
                     onChange={(e) => setFirstName(e.target.value)}
                     error={validate.check(firstName, 19)}
                     required
                    />
                </Grid>
                <Grid xs={12} sm={6} item>
                    <TextField 
                     fullWidth={true} 
                     id="Last name"
                     label={`Last name ${validate.check(lastName, 19) ? '(max 18 characters)' : ''}`}
                     value={lastName}
                     error={validate.check(lastName, 19)}
                     onChange={(e) => setLastName(e.target.value)}
                     required
                     />
                </Grid>
            </Grid>
            {/* <Grid 
             container
             spacing={4}
             className="form-row"
            >
                <Grid xs={12} item>
                    <TextField
                        multiline
                        rows={4}
                        fullWidth={true} 
                        id="Notes" 
                        label="Notes"
                        value={adminNotes}
                        onChange={(e) => setAdminNotes(e.target.value)}
                    />
                </Grid>
            </Grid> */}
            <Grid 
             container
             justify="space-between"
             spacing={4}
             alignItems="flex-end"
             className="form-row form-row__last"
            >
                <Grid xs={12} sm={6} item>
                    <TextField 
                     fullWidth={true} 
                     id="Course" 
                     label="Course" 
                     select
                     value={course}
                     onChange={(e) => setCourse(e.target.value)}
                     required
                    >
                        {courses.map((course) => (
                            <MenuItem 
                            key={course.coursetitle} 
                            value={course}
                            onChange={(e) => setCourse(e.target.value)}
                            >
                                {course.coursetitle}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid xs={12} sm={6} item>
                    <Typography className="dashboard-label" variant="subtitle2">
						DOB:
					</Typography>
					    <TextField
							// value="month"
							label="MM"
							onChange={(e) => setMonth(e.target.value)}
							className="dob-field"
                            type="number"
                            inputmode="numeric"
                            error={validate.check(month, 3)}
						/>
						<Box display="inline" mr={2}></Box>
						<TextField
							// value={dobVal}
							label="DD"
							onChange={(e) => setDay(e.target.value)}
							className="dob-field"
                            type="number"
                            inputmode="numeric"
                            error={validate.check(day, 3)}
						/>
						<Box display="inline" mr={2}></Box>
						<TextField
							// value={dobVal}
							label="YYYY"
							onChange={(e) => setYear(e.target.value)}
							className="dob-field"
                            type="number"
                            inputmode="numeric"
                            error={validate.check(year, 5)}
						/>
                </Grid>
            </Grid>
            <Grid 
             container
             justify="space-between"
             spacing={4}
             alignItems="flex-end"
             className="form-row form-row__last"
            >
                <Grid xs={12} sm={6} item>
                    <TextField 
                     fullWidth={true} 
                     id="week day" 
                     label="Day of class" 
                     select
                     value={weekDay}
                     onChange={(e) => setWeekDay(e.target.value)}
                     required
                    >
                        {weekDays.map((day) => (
                            <MenuItem 
                            key={day}
                            value={day}
                            onChange={(e) => setWeekDay(e.target.value)}
                            >
                                {day}
                            </MenuItem>
                        ))}
                    </TextField>
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

export default AddStudentForm;