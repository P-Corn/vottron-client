import React, {useState} from 'react';
import {Grid, Typography, Button, TextField, IconButton, Box} from '@material-ui/core';
import Save from '@material-ui/icons/Save';
import {ArrowBack} from '@material-ui/icons/';
import Axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  }));

function ActivityEdit({currentActivity, getActivities, setEditActivity, setCurrentActivity}) {
	const classes = useStyles();

    const [activityId] = useState(currentActivity.activityid);
    const [activitytitle, setActivityTitle] = useState(currentActivity.activitytitle);
    const [activitydescription, setActivityDesc] = useState(currentActivity.activitydescription);
	const [activitysolution, setActivitySolution] = useState(currentActivity.activitysolution);
    const [courseId] = useState(currentActivity.courseid);
    const [activityOrder, setActivityOrder] = useState(currentActivity.activityorder);

	const updateActivity = () => {
		Axios.post('https://vottron.herokuapp.com/activities/update', {
			activityId,
			activitytitle,
			activitydescription,
			activitysolution,
			activityOrder
		}).then((res) => {
			console.log(res)
			getActivities(courseId)
			setCurrentActivity({activitytitle, activitydescription, activitysolution})
			setEditActivity(false)
		})
	  }

	const submitData = (e) => {
		e.preventDefault();
		updateActivity();
	}

  	return (
	<div>
		<form onSubmit={submitData}>
			<Grid
                container
                justify="space-between"
                >
					<Grid alignItems="center" xs={6} container item>
						<Grid item>
							<IconButton
								color="primary"
								onClick={() => setEditActivity(false)}
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
                    variant="contained"
                    startIcon={<Save/>}
					type="submit"
                    >
                        Save
                    </Button>
                </Grid>
            </Grid>
			<Box p={2}>
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
						value={activitytitle}
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
							<label id="course-description" value="Course description">Instructions:</label>
						</Typography>
						<TextField 
						value={activitydescription}
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
					className="dashboard-details-container"
					>
						<Typography className="dashboard-label" variant="subtitle1">
							<label id="course-solution" value="Course solution">Solution:</label>
						</Typography>
						<TextField 
						value={activitysolution}
						variant="outlined"
						multiline
						fullWidth
						onChange={(e) => setActivitySolution(e.target.value)}
						rows="5"
						>
						</TextField>
					</Grid>
				</Grid>
			</Box>
    	</form>
   	</div>
	);
}

export default ActivityEdit;