import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {ListItem, ListItemText, ListItemAvatar, Avatar, Divider} from '@material-ui/core';
import { FixedSizeList } from 'react-window';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: 400,
    backgroundColor: theme.palette.background.paper,
  },
	size: {
		width: theme.spacing(4.5),
		fontSize: "1.15rem",
		height: theme.spacing(4.5),
		color: "white",
		backgroundColor: "#1f287a",
	},
	listItem: {
		paddingLeft: 3,
	}
}));

export default function ActivityList({activityData, contentControl}) {
  const classes = useStyles();

	function renderRow(props) {
		const { index, style } = props;
		
			return (
				<ListItem className={classes.listItem} onClick={() => contentControl(activityData[index])} button style={style} key={index}>
					<ListItemAvatar>
						<Avatar className={classes.size}>
							{index + 1}
						</Avatar>
					</ListItemAvatar>
					<ListItemText 
					primary={activityData[index].activitytitle} 
					secondary={activityData[index].activitydescription}
					/>
				</ListItem>
			);
	}

	renderRow.propTypes = {
		index: PropTypes.number.isRequired,
		style: PropTypes.object.isRequired,
	};

  return (
    <div className={classes.root}>
      <FixedSizeList height={485} width="100%" itemSize={92} itemCount={activityData.length}>
        {renderRow}
      </FixedSizeList>
    </div>
  );
}