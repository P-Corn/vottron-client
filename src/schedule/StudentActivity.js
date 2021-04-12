import React from 'react';
import {Grid, Typography, Divider, Box} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	flexItem: {
		flex: "46%"
	}
});

function StudentActivity({data}) {
	const classes = useStyles();

  return (
    <div>
			<Grid
			container
			direction="column"
			>
				<Grid item>
					<Typography gutterBottom variant="h5">
						{data.activitytitle}
					</Typography>
				</Grid>
				<Grid item>
					<Typography variant="body1">
						{data.activitydescription}
					</Typography>
				</Grid>
			</Grid>

			<Box pt={2} pb={3}>
				<Divider/>
			</Box>

			<Grid
			container
			direction="row"
			justify="space-evenly"
			>
				<Grid md={5} item>
					<Typography color="primary" gutterBottom variant="h6">
						Steps to completion
					</Typography>
					<Typography variant="body1">
						<li>1. Write the program and what not</li>
						<li>2. Do the testing on the program</li>
						<li>3. Do the testing on the program</li>
					</Typography>
				</Grid>

				<Divider flexItem orientation="vertical"/>

				<Grid md={5} item>
					<Typography color="primary" gutterBottom variant="h6">
						Solution
					</Typography>
					<Typography variant="body1">
						Here's the solution to the activity
					</Typography>
				</Grid>
			</Grid>
		</div>
  );
}

export default StudentActivity;