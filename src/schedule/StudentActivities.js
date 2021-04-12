import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {ListItem, ListItemText, ListItemAvatar, Avatar, Checkbox, Divider} from '@material-ui/core';
import { FixedSizeList } from 'react-window';
import Arrow from '@material-ui/icons/ArrowForwardIos';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: 480,
    backgroundColor: theme.palette.background.paper,
  },
	size: {
		width: theme.spacing(4.3),
		fontSize: "1rem",
		height: theme.spacing(4.3),
		color: "white",
		backgroundColor: "#1f287a",
	},
	listItem: {
		paddingLeft: 16,
	}
}));

export default function StudentActivities({activityData, handleActivity}) {
    const classes = useStyles();

	function renderRow(props) {
		const { index, style } = props;
        const labelId = `checkbox-list-secondary-label-${index}`;
		
        return (
            <ListItem onClick={() => handleActivity(activityData[index])} className={classes.listItem} button style={style} key={index}>
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
    <div>
      <div className={classes.root}>
        <FixedSizeList height={485} width="100%" itemSize={90} itemCount={activityData.length}>
          {renderRow}
        </FixedSizeList>
      </div>
    </div>
  );
}