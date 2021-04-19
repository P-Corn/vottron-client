import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {ListItem, ListItemText, ListItemAvatar, Avatar, Grid, Typography, Button, Box} from '@material-ui/core';
import { FixedSizeList } from 'react-window';
import Arrow from '@material-ui/icons/ArrowForwardIos';
import Add from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: 400,
    backgroundColor: theme.palette.background.paper,
  },
	size: {
		width: theme.spacing(4),
		fontSize: "1.15rem",
		height: theme.spacing(4),
		color: "white",
		backgroundColor: "#1f287a",
	},
	listItem: {
		paddingLeft: 16,
	}
}));

export default function ActivityList({activityData, contentControl, handleOpen}) {
  const classes = useStyles()

	function renderRow(props) {
		const { index, style } = props;
		
			return (
				<ListItem 
				className={classes.listItem} 
				onClick={() => contentControl(activityData[index])} 
				button 
				style={style}
				key={index}
				>
					<ListItemAvatar>
						<Avatar className={classes.size}>
							{index + 1}
						</Avatar>
					</ListItemAvatar>
					<ListItemText 
					primary={activityData[index].activitytitle} 
					secondary={activityData[index].activitydescription}
					/>
					<Arrow color="primary"/>
				</ListItem>
			);
	}

	renderRow.propTypes = {
		index: PropTypes.number.isRequired,
		style: PropTypes.object.isRequired,
	};

  	return (
		<div className={classes.root}>
			<Grid
			container
			justify="space-between"
			>
				<Grid
				item
				>
					<Typography 
					className="dashboard-card-title" 
					variant="h5"
					color="primary"
					>
					Activities
					</Typography>
				</Grid>
			<Grid
			item
			
			>
				<Button
				color="primary"
				variant="contained"
				onClick={handleOpen}
				startIcon={<Add/>}
				>
					Add
				</Button>
			</Grid>
		</Grid>
		<Box py={1}/>
		<FixedSizeList height={485} width="100%" itemSize={85} itemCount={activityData.length}>
			{renderRow}
		</FixedSizeList>
		</div>
  	);
}