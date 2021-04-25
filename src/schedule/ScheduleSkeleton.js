import React from 'react';
import {Card, Grid, CardActionArea, Divider, Typography, Box} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles({
	root: {
		minWidth: 275,
	},
	details: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'start',
		padding: 16
	},
	cardContent: {
		width: '100%'
	},
	icon: {
		fontSize: 25,
		marginRight: '8px',
	},
	card: {
		backgroundColor: '#3f51b5'
	},
	white: {
		color: 'white'
	},
	textContainer: {
		display: 'flex',
		alignItems: 'center'
	}
});

function ScheduleSkeleton() {
	const classes = useStyles();

  return (
    <div>
		<Card>
			<CardActionArea 
			>
				<div className={classes.details}>
					<div className={classes.iconContainer}>
						{/* <AccountCircle className={classes.icon} color="primary"/> */}
					</div>
					<div className={classes.cardContent}>
					{/* <Box pb={1}/> */}
						<Typography className={classes.textContainer} variant="h5" component="h2">
							<Skeleton variant="circle" width="30px" height="30px" className={classes.icon}/>
                            <Skeleton width="250px" variant="text"/>
						</Typography>
						<Box pt={.9}/>
						<Divider variant="fullWidth"/>
						<Box pb={1.3}/>
						<Typography className={classes.textContainer} color="textSecondary">
                            <Skeleton variant="circle" width="30px" height="30px" className={classes.icon}/>
                            <Skeleton width="200px" variant="text"/>
						</Typography>
					</div>
				</div>
			</CardActionArea>
		</Card>
    </div>
  );
}

export default ScheduleSkeleton;