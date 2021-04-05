import React from 'react';
import {Card, Grid, CardActionArea, CardContent, Typography, IconButton} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Arrow from '@material-ui/icons/ArrowForwardIos';
import {withRouter} from 'react-router-dom';

const useStyles = makeStyles({
	root: {
		minWidth: 275,
	},
	details: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	icon: {
		marginRight: '12px',
	}
});

function StudentCard({name, course, id, history}) {
	const classes = useStyles();

  return (
    <div>
			<Card>
				<CardActionArea 
				onClick={() => history.push(`/schedule/${id}`)}
				>
					<div className={classes.details}>
						<CardContent>
							<Typography variant="h5" component="h2">
								{name}
							</Typography>
							<Typography color="textSecondary">
								{course}
							</Typography>
						</CardContent>
						<div className={classes.icon}>
							<Arrow color="primary"/>
						</div>
					</div>
				</CardActionArea>
			</Card>
    </div>
  );
}

export default withRouter(StudentCard);