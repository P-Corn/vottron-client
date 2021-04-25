import React, {useState} from 'react';
import {Grid, Typography, Box, Paper, Button, TextField, IconButton} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Axios from 'axios';

function CourseInfoEdit({title, desc, img, setEditCourse, getCourseDetails, id}) {

	const [courseId] = useState(id);
	const [courseTitle, setCourseTitle] = useState(title);
    const [courseDesc, setCourseDesc] = useState(desc);
    const [courseImg, setCourseImg] = useState(img);

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

	const updateCourse = (id) => {
		Axios.post('https://vottron.herokuapp.com/courses/update', {
			courseId,
			courseTitle,
			courseDesc,
			courseImg
		})
		.then(() => {
			getCourseDetails(id);
			Axios.post('https://vottron.herokuapp.com/studentcourse/update', {
				courseId,
				courseTitle,
				courseDesc,
				courseImg,
			})
			.then(() => {
				Axios.post('https://vottron.herokuapp.com/students/course', {
					courseTitle,
					title
				}).then((res) => console.log(res))
			})
		})
	}

	const handleSubmit = (e) => {
		if(validate.validateAll([courseTitle, 36], [courseDesc, 90]))
			return
		else {
			setEditCourse(false);
			updateCourse(id);
		}
		e.preventDefault();
	}

  	return (
	<Paper
	className="course-dashboard-paper"
	elevation={4}
	>
		{/* <Grid alignItems="center" xs={6} container item>
			<Grid item>
				<IconButton
					color="primary"
					onClick={() => setEditCourse(false)}
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
		</Grid> */}
		<Grid
			container
			justify="space-between"
			>
				<Grid alignItems="center" xs={6} container item>
					<Grid item>
						<IconButton
							color="primary"
							onClick={() => setEditCourse(false)}
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
			<Grid item>
				<Button
				color="primary"
				variant="contained"
				startIcon={<SaveIcon/>}
				type="submit"
				onClick={(e) => handleSubmit(e)}
				>
					Save
				</Button>
			</Grid>
		</Grid>
		<Box pb={2} />
		<form
			onSubmit={handleSubmit}
		>
			<Grid 
			direction="column" 
			container
			>
				<Grid 
				item
				className="dashboard-details-container"
				>
					<TextField 
					value={courseTitle}
					variant="outlined"
					label={`Title ${validate.check(courseTitle, 36) ? '(max 36 characters)' : ''}`}
					fullWidth
					error={validate.check(courseTitle, 36)}
					onChange={(e) => setCourseTitle(e.target.value)}
					>
					</TextField>
				</Grid>
				<Grid 
				item
				className="dashboard-details-container"
				>
					<TextField 
					value={courseDesc}
					variant="outlined"
					label={`Description ${validate.check(courseDesc, 90) ? '(max 90 characters)' : ''}`}
					multiline
					fullWidth
					error={validate.check(courseDesc, 90)}
					onChange={(e) => setCourseDesc(e.target.value)}
					rows="4"
					>
					</TextField>
				</Grid>
				<Grid 
				item
				className="dashboard-details-container"
				>
					<TextField 
					value={courseImg}
					variant="outlined"
					label="Image"
					fullWidth
					onChange={(e) => setCourseImg(e.target.value)}
					/>
				</Grid>
      		</Grid>
    	</form>
   </Paper>
	);
}

export default CourseInfoEdit;