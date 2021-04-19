import React, {useState} from 'react';
import {Grid, Typography, Card, CardMedia, Paper, Button, TextField} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import Axios from 'axios';

function CourseInfoEdit({title, desc, img, setEditCourse, getCourseDetails, id}) {

	const [courseId] = useState(id);
	const [courseTitle, setCourseTitle] = useState(title);
    const [courseDesc, setCourseDesc] = useState(desc);
    const [courseImg, setCourseImg] = useState(img);

	const updateCourse = (id) => {
		Axios.post('https://vottron.herokuapp.com/courses/update', {
			courseId,
			courseTitle,
			courseDesc,
			courseImg
		})
		.then(() => {
			getCourseDetails(id);
			Axios.post('https://vottron.herokuapp.com/studentcourses/update/', {
				courseId,
				courseTitle,
				courseDesc,
				courseImg,
			})
			.then((res) => {
				console.log(res)
			})
		})
	}

	const handleSubmit = (e) => {
		updateCourse(id);
		setEditCourse(false);
		e.preventDefault();
	}

  	return (
	<Paper
	className="course-dashboard-paper"
	elevation={4}
	>
		<Typography
		className="dashboard-card-title"
		color="primary" 
		variant="h5"
		>
			Information
		</Typography>
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
					<Typography className="dashboard-label" variant="subtitle1">
						<label id="course-title" value="Title">Title:</label>
					</Typography>

					<TextField 
					value={courseTitle}
					variant="outlined"
					fullWidth
					onChange={(e) => setCourseTitle(e.target.value)}
					>
					</TextField>
				</Grid>
				<Grid 
				item
				className="dashboard-details-container"
				>
					<Typography className="dashboard-label" variant="subtitle1">
						<label id="course-description" value="Course description">Description:</label>
					</Typography>
					<TextField 
					value={courseDesc}
					variant="outlined"
					multiline
					fullWidth
					onChange={(e) => setCourseDesc(e.target.value)}
					rows="2"
					>
					</TextField>
				</Grid>
				<Grid 
				item
				sm={9}
				className="dashboard-details-container"
				>
					<Typography className="dashboard-label__img" variant="subtitle1">Image:</Typography>
					<TextField 
					value={courseImg}
					variant="outlined"
					fullWidth
					onChange={(e) => setCourseImg(e.target.value)}
					/>
				</Grid>
				<Grid
				item
				container
				justify="flex-end"
				spacing={2}
				>
					<Grid
					item
					// className="cancel-button"
					>
						<Button
						variant="outlined"
						color="secondary"
						onClick={() => {setEditCourse(false)}}
						startIcon={<CancelIcon></CancelIcon>}
						>
							Cancel
						</Button>
					</Grid>
					<Grid
					item
					>
						<Button
						variant="contained"
						color="primary"
						type="submit"
						value="submit"
						startIcon={<SaveIcon></SaveIcon>}
						>
							Save
						</Button>
					</Grid>
				</Grid>
      	</Grid>
    	</form>
   </Paper>
	);
}

export default CourseInfoEdit;