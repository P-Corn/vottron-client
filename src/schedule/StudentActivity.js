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
					<Typography color="primary" variant="subtitle1">
						Title
					</Typography>
					<Typography gutterBottom variant="h5">
						{data.activitytitle}
					</Typography>
				</Grid>
				<Box pt={2} pb={3}>
					<Divider/>
				</Box>
				<Grid item>
					<Typography color="primary" variant="subtitle1">
						Instructions
					</Typography>
					<Typography variant="h6">
						{data.activitydescription}
					</Typography>
				</Grid>
				<Box pt={2} pb={3}>
					<Divider/>
				</Box>
				<Grid item>
					<Typography color="primary" variant="subtitle1">
						Solution
					</Typography>
					<Typography variant="h6">
						{data.activitysolution}
					</Typography>
				</Grid>
			</Grid>
		</div>
  );
}

export default StudentActivity;