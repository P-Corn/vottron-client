import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {ListItem, ListItemText, ListItemAvatar, Avatar, Checkbox, ListItemSecondaryAction} from '@material-ui/core';
import { FixedSizeList } from 'react-window';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: 480,
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

export default function StudentActivities({activityData}) {
    const classes = useStyles();
    const [checked, setChecked] = React.useState([1])

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
    
        if (currentIndex === -1) {
          newChecked.push(value);
        } else {
          newChecked.splice(currentIndex, 1);
        }
    
        setChecked(newChecked);
    };

	function renderRow(props) {
		const { index, style } = props;
        const labelId = `checkbox-list-secondary-label-${index}`;
		
        return (
            <ListItem className={classes.listItem} button style={style} key={index}>
                <ListItemAvatar>
                    <Avatar className={classes.size}>
                        {index + 1}
                    </Avatar>
                </ListItemAvatar>
                <ListItemText 
                primary={activityData[index].activitytitle} 
                secondary={activityData[index].activitydescription}
                />
                <Checkbox
                    edge="end"
                    onChange={handleToggle(index)}
                    checked={checked.indexOf(index) !== -1}
                    inputProps={{ 'aria-labelledby': labelId }}
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