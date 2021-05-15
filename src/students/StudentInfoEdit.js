import React, {useEffect, useState} from 'react';
import {Grid, Typography, Box, Paper, Button, TextField, MenuItem, IconButton} from '@material-ui/core';
import {Create, Close, Check} from '@material-ui/icons';
import Save from '@material-ui/icons/Save';
import Axios from 'axios';
import {ArrowBack} from '@material-ui/icons/';

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
		e.preventDefault();
		if(validate.validateAll(
			[firstNameVal, 19], 
			[lastNameVal, 19], 
			[month, 3],
			[day, 3],
			[year, 5]))
		{
			return
		} else {
			updateCourse();
			setEditStudent(false);
		}
	}

  	return (
		<Paper
		className="paper"
		elevation={2}
		>
			<form onSubmit={handleSubmit}>
				<Grid
				container
				justify="space-between"
				>
					<Grid alignItems="center" xs={6} container item>
						<Grid item>
							<IconButton
								color="primary"
								onClick={() => setEditStudent(false)}
							>
								<ArrowBack/>
							</IconButton>
						</Grid>
						<Grid
						item
						>
							<Typography 
							className="dashboard-card-title" 
							variant="h5"
							color="primary"
							>
							Edit
							</Typography>
						</Grid>
					</Grid>
					<Grid
					item
					
					>
						<Button
						color="primary"
						variant="outlined"
						type="submit"
						onClick={(e) => handleSubmit(e)}
						>
							Save
						</Button>
					</Grid>
				</Grid>
				<Box pb={3}/>
				<Grid direction="row" alignItems="flex-end" container spacing={4}>
					{/* <Grid
					item container
					alignItems="center"
					justify="space-between"
					className="student-info-header"
					>
						<Grid
						item
						lg={4}
						>
							<Typography variant="h5" color="primary">
								Information
							</Typography>
						</Grid>
						<Grid
						item
						align="right"
						lg={8}
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
					</Grid> */}

					<Grid 
					item
					className="dashboard-details-container"
					sm={6}
        			xs={12}
					>
						<TextField
						fullWidth
						label={`First name ${validate.check(firstNameVal, 19) ? '(max 18 characters)' : ''}`}
						value={firstNameVal}
						onChange={(e) => setFirstName(e.target.value)}
						error={validate.check(firstNameVal, 19)}
						required
						/>
					</Grid>

					<Grid 
					item
					className="dashboard-details-container"
					sm={6}
        			xs={12}
					>
						<TextField
							fullWidth
							label={`Last name ${validate.check(lastNameVal, 19) ? '(max 18 characters)' : ''}`}
							value={lastNameVal}
							error={validate.check(lastNameVal, 19)}
							onChange={(e) => setLastName(e.target.value)}
							required
						/>
					</Grid>

					<Grid 
					item
					className="dashboard-details-container"
					sm={6}
        			xs={12}
					>
						<TextField
							select
							id="Course"
							label="Course"
							fullWidth
							value={courseVal}
							onChange={(e) => setCourse(e.target.value)}
							required
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
							error={validate.check(month, 3)}
						/>
						<Box display="inline" mr={2}></Box>
						<TextField
							value={day}
							label="DD"
							onChange={(e) => setDay(e.target.value)}
							className="dob-field"
							error={validate.check(day, 3)}
						/>
						<Box display="inline" mr={2}></Box>
						<TextField
							value={year}
							label="YYYY"
							onChange={(e) => setYear(e.target.value)}
							className="dob-field"
							error={validate.check(year, 5)}
						/>
					</Grid>

					<Grid 
					item
					className="dashboard-details-container"
					sm={6}
        			xs={12}
					>
						<TextField
							fullWidth
							select
							value={activeVal}
							onChange={(e) => setActive(e.target.value)}
							label="Active"
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

					{/* <Grid 
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
					</Grid> */}
					
				</Grid>
			</form>  
    	</Paper>
  	);
}

export default StudentInfoEdit;