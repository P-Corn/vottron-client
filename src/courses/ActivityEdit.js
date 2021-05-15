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

	const updateActivity = () => {
		Axios.post('https://vottron.herokuapp.com/activities/update', {
			activityId,
			activitytitle,
			activitydescription,
			activitysolution,
			activityOrder
		}).then((res) => {
			getActivities(courseId)
			setEditActivity(false)
			Axios.post('https://vottron.herokuapp.com/studentactivities/update', {
				activityId,
				activitytitle,
				activitydescription,
				activitysolution,
				activityOrder
			}).then((res) => {
				console.log(res)
				setCurrentActivity({activitytitle, activitydescription, activitysolution})
			})
		})
	  }

	const submitData = (e) => {
		e.preventDefault();
        if(validate.validateAll([activitytitle, 36], [activitydescription, 275], [activitysolution, 275]))
            return;
        else {
            updateActivity();
        }
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
                    variant="outlined"
					type="submit"
                    >
                        Save
                    </Button>
                </Grid>
            </Grid>
			<Box>
				<Grid 
				direction="column" 
				container
				>
					<Grid 
					item
					className="dashboard-details-container"
					>
						{/* <Typography className="dashboard-label" variant="subtitle1">
							<label id="course-title" value="Title">{`Title ${validate.check(activitytitle, 36) ? '(max 36 characters)' : ''}`}</label>
						</Typography> */}

						<TextField 
						value={activitytitle}
						label={`Title ${validate.check(activitytitle, 36) ? '(max 36 characters)' : ''}`}
						fullWidth
						error={validate.check(activitytitle, 36)}
						onChange={(e) => setActivityTitle(e.target.value)}
						>
						</TextField>
					</Grid>
					<Grid 
					item
					className="dashboard-details-container"
					>
						<TextField 
						value={activitydescription}
						multiline
						label={`Instructions ${validate.check(activitydescription, 255) ? '(max 255 characters)' : ''}`}
						fullWidth
						error={validate.check(activitydescription, 255)}
						onChange={(e) => setActivityDesc(e.target.value)}
						rows="3"
						>
						</TextField>
					</Grid>
					<Grid 
					item
					className="dashboard-details-container"
					>
						<TextField 
						value={activitysolution}
						error={validate.check(activitysolution, 255)}
						label={`Solution ${validate.check(activitysolution, 255) ? '(max 255 characters)' : ''}`}
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