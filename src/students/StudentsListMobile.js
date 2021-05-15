import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Divider, Paper, ListItem, ListItemText, Grid, Typography, Button, ListItemAvatar, Avatar } from '@material-ui/core';
import AddIcon from "@material-ui/icons/Add";
import AddStudentModal from "./AddStudentModal";
import { FixedSizeList } from 'react-window';
import {Face, Class} from '@material-ui/icons/';
import { withRouter } from 'react-router';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        height: '500px'
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
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
    },
    avatar: {
        background: '#3f51b5',
    }
}));

function StudentsListMobile({studentData, getStudents, courseData, history}) {
    const classes = useStyles();
    const [openModal, setOpenModal] = React.useState(false);

    const handleOpen = () => {
        setOpenModal(true);
    };

    const handleClose = () => {
        setOpenModal(false);
    };

    function renderRow(props) {
		const { index, style } = props;
		
			return (
                <>
				<ListItem 
				className={classes.listItem}  
				button 
				style={style}
				key={index}
				>
                    <ListItemAvatar>
                        <Avatar className={classes.avatar}>
                            <Face/>
                        </Avatar>
                    </ListItemAvatar>
					<ListItemText 
					primary={studentData[index].firstname} 
					secondary={studentData[index].course}
                    onClick={() => history.push(`/students/${studentData[index].studentid}`)}
					/>
				</ListItem>
                </>
			);
	}

    return (
    <div>
        <Grid 
        justify="space-between"
        alignItems="center" 
        container
        >
            <Grid item>
                <Typography variant="h4">
                    Students
                </Typography>
            </Grid>
            <Grid item>
                <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon></AddIcon>}
                onClick={handleOpen}
                >
                    Add
                </Button>
            </Grid>
        </Grid>
        <Box pb={3}/>
        <AddStudentModal 
          openModal={openModal}
          handleClose={handleClose}
          courseData={courseData}
          getStudents={getStudents}
        />
        {/* <List className={classes.root}>
            {
            studentData.map((student, index) => (
                <ListItem button key={index}>
                    <ListItemText 
                    primary={`${student.firstname} ${student.lastname}`}
                    secondary={student.course}
                    />
                </ListItem>
            ))
            }
        </List> */}
        <Paper>
            <FixedSizeList height={650} width="100%" itemSize={75} itemCount={studentData.length}>
                {renderRow}
            </FixedSizeList>
        </Paper>
    </div>
    )
}

export default withRouter(StudentsListMobile)