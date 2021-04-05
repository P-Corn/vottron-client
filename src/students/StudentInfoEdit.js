import React, {useEffect, useState} from 'react';
import {Grid, Typography, Box, Paper, Button, TextField, MenuItem} from '@material-ui/core';
import {Create, Close, Check} from '@material-ui/icons';
import Axios from 'axios';

function StudentInfoEdit({firstName, lastName, id, course, active, dob, notes, setEditStudent, getStudentDetails}) {

	const dobSplit = dob.split("/");

    const [firstNameVal, setFirstName] = useState(firstName);
    const [lastNameVal, setLastName] = useState(lastName);
    const [idVal] = useState(id);
    const [courseVal, setCourse] = useState(course);
    const [activeVal, setActive] = useState(active);
	const [month, setMonth] = useState(dobSplit[0]);
	const [day, setDay] = useState(dobSplit[1]);
	const [year, setYear] = useState(dobSplit[2]);
    const [dobVal, setDob] = useState(dob);
    const [notesVal, setNotes] = useState(notes);
	const [courses, setCourses] = useState([]);
	
	const activeChoices = [
		"Yes",
		"No"
	]

	const getCourseTitles = () => {
		Axios.get('https://vottron.herokuapp.com/courses/coursetitles')
		.then((response) => {
		setCourses([...response.data]);
		})
	}

  	useEffect(() => {getCourseTitles()}, []);

	const updateCourse = () => {
		Axios.post('https://vottron.herokuapp.com/students/update', {
			idVal,
			firstNameVal,
			lastNameVal,
			courseVal,
			activeVal,
			dobVal: `${month}/${day}/${year}`,
			notesVal
		})
		.then((res) => {
			getStudentDetails(idVal);
		})
	}

	const handleSubmit = (e) => {
		updateCourse();
		setEditStudent(false);
		e.preventDefault();
	}

  	return (
		<Paper
		className="student-dashboard-paper"
		elevation={2}
		>
			<form onSubmit={handleSubmit}>
				<Grid direction="row" alignItems="flex-end" container spacing={4}>
					<Grid
					item container
					alignItems="center"
					justify="space-between"
					className="student-info-header"
					>
						<Grid
						item
						lg={6}
						>
							<Typography variant="h5" color="primary">
								Information
							</Typography>
						</Grid>
						<Grid
						item
						align="right"
						lg={6}
						>
							<Button
							variant="outlined"
							color="secondary"
							className="can"
							startIcon={<Close></Close>}
							onClick={() => setEditStudent(false)}
							>
							Cancel
							</Button>
							<Box display="inline" px={1}/>
							<Button
							variant="contained"
							color="primary"
							startIcon={<Check></Check>}
							type="submit"
							>
							Save
							</Button>
						</Grid>
					</Grid>

					<Grid 
					item
					className="dashboard-details-container"
					sm={6}
        			xs={12}
					>
						<Typography className="dashboard-label" variant="subtitle2">
								First name:
						</Typography>
						<Box>
							<TextField
							fullWidth
							value={firstNameVal}
							onChange={(e) => setFirstName(e.target.value)}
							/>
						</Box>
						
					</Grid>

					<Grid 
					item
					className="dashboard-details-container"
					sm={6}
        			xs={12}
					>
						<Typography className="dashboard-label" variant="subtitle2">
								Last name:
						</Typography>
						<TextField
							fullWidth
							value={lastNameVal}
							onChange={(e) => setLastName(e.target.value)}
						/>
					</Grid>

					<Grid 
					item
					className="dashboard-details-container"
					sm={6}
        			xs={12}
					>
						<Typography className="dashboard-label" variant="subtitle2">
							Course:
						</Typography>
						<TextField
							select
							id="Course"
							fullWidth
							value={courseVal}
							onChange={(e) => setCourse(e.target.value)}
						>
							{courses.map((course) => (
								<MenuItem 
								key={course.coursetitle}
								value={course.coursetitle}
								onChange={(e) => setCourse(e.target.value)}
								>
									{course.coursetitle}
								</MenuItem>
                        	))}
						</TextField>
					</Grid>
					
					<Grid 
					item
					className="dashboard-details-container"
					sm={6}
        			xs={12}
					>
						<Typography className="dashboard-label" variant="subtitle2">
							DOB:
						</Typography>
						<TextField
							value={month}
							label="MM"
							onChange={(e) => setMonth(e.target.value)}
							className="dob-field"
						/>
						<Box display="inline" mr={2}></Box>
						<TextField
							value={day}
							label="DD"
							onChange={(e) => setDay(e.target.value)}
							className="dob-field"
						/>
						<Box display="inline" mr={2}></Box>
						<TextField
							value={year}
							label="YYYY"
							onChange={(e) => setYear(e.target.value)}
							className="dob-field"
						/>
					</Grid>

					<Grid 
					item
					className="dashboard-details-container"
					sm={6}
        			xs={12}
					>
						<Typography className="dashboard-label" variant="subtitle2">
							Active:
						</Typography>
						<TextField
							fullWidth
							select
							value={activeVal}
							onChange={(e) => setActive(e.target.value)}
						>
							{activeChoices.map((choice) => (
								<MenuItem 
								key={choice}
								value={choice}
								onChange={(e) => setActive(e.target.value)}
								>
									{choice}
								</MenuItem>
                        	))}
						</TextField>
					</Grid>

					<Grid 
					item
					className="dashboard-details-container"
					sm={6}
        			xs={12}
					>
						<Typography className="dashboard-label" variant="subtitle2">
							Notes:
						</Typography>
						<TextField
							value={notesVal}
							multiline
							fullWidth
							rows={2}
							onChange={(e) => setNotes(e.target.value)}
						/>
					</Grid>
					
				</Grid>
			</form>  
    	</Paper>
  	);
}

export default StudentInfoEdit;