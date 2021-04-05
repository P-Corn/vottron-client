import React, {useState} from 'react';
import {Grid, Typography, Card, CardMedia, Paper, Button, TextField} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import Axios from 'axios';
import { useRouteMatch } from "react-router-dom";

function ActivityEdit({setEditActivity, clickedActivity, getActivities}) {

	const {activityid, activitytitle, activitydescription, courseid, activityorder} = clickedActivity;

    const [activityId] = useState(activityid);
    const [activityTitle, setActivityTitle] = useState(activitytitle);
    const [activityDesc, setActivityDesc] = useState(activitydescription);
    const [courseId] = useState(courseid);
    const [activityOrder, setActivityOrder] = useState(activityorder);

    const updateActivity = () => {
        Axios.post('https://vottron.herokuapp.com/activities/update', {
            activityId,
            activityTitle,
            activityDesc,
            courseId,
            activityOrder
        }).then(() => getActivities(courseId))
    }

	const handleSubmit = (e) => {
		updateActivity();
		setEditActivity(false);
		e.preventDefault();
	}

  	return (
	<div>
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
					value={activityTitle}
					variant="outlined"
					fullWidth
					onChange={(e) => setActivityTitle(e.target.value)}
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
					value={activityDesc}
					variant="outlined"
					multiline
					fullWidth
					onChange={(e) => setActivityDesc(e.target.value)}
					rows="3"
					>
					</TextField>
				</Grid>
				<Grid 
				item
				sm={9}
				className="dashboard-details-container"
				>
					<Typography className="dashboard-label__img" variant="subtitle1">Activity Order:</Typography>
					<TextField
					select
					// onChange={(e) => setCourseDesc(e.target.value)}
					>
					</TextField>
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
						onClick={() => {setEditActivity(false)}}
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
   	</div>
	);
}

export default ActivityEdit;