import React, {useState, useEffect} from 'react';
import {Container, Grid, Typography, Box, Paper, Button, IconButton} from '@material-ui/core';
import Axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import { useRouteMatch } from "react-router-dom";
import {withRouter} from 'react-router-dom';
import StudentActivities from './StudentActivities'
import StudentNotes from './StudentNotes'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import StudentActivity from './StudentActivity'

const useStyles = makeStyles((theme) => ({
	paper: {
		padding: '30px',
    [theme.breakpoints.down('sm')]: {
      paddingLeft: '20px',
      paddingRight: '20px',
    },
	},
  cardTitle: {
    marginBottom: '10px',
  }
}))

function StudentCourse({history}) {

  const classes = useStyles();

  const url = useRouteMatch("/schedule/:id");
  const id = url.params.id;

  const [studentData, setStudentData] = useState({});
  const [courseData, setCourseData] = useState({});
  const [activityData, setActivityData] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [commentDate, setCommentDate] = useState("");
  const [singleActivity, setSingleActivity] = useState(false);
  const [singleActivityData, setSingleActivityData] = useState([])

  const handleActivity = (activity) => {
    setSingleActivity(true)
    setSingleActivityData({...activity})
  }

  const getStudentData = (id) => {
    Axios.get("https://vottron.herokuapp.com/students/:id", {
			params: {
					id
			}
    }).then((response) => {
      // let dataArray = [...rows];
      setStudentData({...response.data[0]});
    })
  }

  const getCourseData = (id) => {
    Axios.get("https://vottron.herokuapp.com/studentcourse/:id", {
			params: {
					id
			}
    }).then((response) => {
      setCourseData({...response.data[0]});
      console.log(response)
    })
  }

  const getActivityData = (id) => {
    Axios.get("https://vottron.herokuapp.com/studentactivities/:id", {
			params: {
					id
			}
    }).then((response) => {
		  console.log(response)
      setActivityData([...response.data]);
    })
  }

  const getCommentData = (id) => {
    Axios.get("https://vottron.herokuapp.com/studentcomments/:id", {
			params: {
					id
			}
    }).then((response) => {
		  console.log(response)
      if(response.data[0]) {
        setCommentText(response.data[0].commenttext)
        setCommentDate(response.data[0].commentdate)
      }
    })
  }

  useEffect (() => {
    getStudentData(id);
    getCommentData(id);
    getCourseData(id);
    getActivityData(id);
  },[])

  return (
    <div className="pageBg">
      <div className="content-wrapper">
        <Container
          maxWidth="lg"
        >
          <Grid 
            justify="flex-start" 
            alignItems="center" 
            container
          >
            <Button size="large" variant="text" color="primary" onClick={() => history.push('/schedule')} startIcon={<ArrowBackIcon/>}>
              Go back
            </Button>
          </Grid>
          <Box pb={3}/>
          <Grid
					container
					spacing={5}
					>
						<Grid
						item
						xs={12}
            md={4}
						>
							{/* <Paper className={classes.paper}> */}
                <Grid
                container
                direction="column"
                >
                  <Grid item>
                    <Typography className={classes.cardTitle} color="primary" variant="h6">
                      Student
                    </Typography>
                    <hr></hr>
                    <Box pb={1}/>
                    <Typography variant="h5">
                      {`${studentData.firstname} ${studentData.lastname}`}
                    </Typography>
                  </Grid>
                  <Box py={4}/>
                  <Grid item>
                    <StudentNotes 
                    commentText={commentText}
                    commentDate={commentDate}
                    studentId={studentData.studentid}/>
                  </Grid>
                </Grid>	
							{/* </Paper> */}
						</Grid>
						<Grid
						item
            xs={12}
            md={8}
						>
							<Paper className={classes.paper}>
                {singleActivity === false ?
                  <div>
                    <Typography className={classes.cardTitle} color="primary" variant="h5">
                    {courseData.coursetitle} Activities
                    </Typography>
                    <StudentActivities handleActivity={handleActivity} activityData={activityData}/>
                  </div>
                  :
                  <div>
                    <Button
                    startIcon={<ArrowBackIcon/>}
                    color="primary"
                    variant="text"
                    onClick={() => setSingleActivity(false)}
                    >
                      back
                    </Button>
                    <Box pb={2}/>
                    <StudentActivity
                    data={singleActivityData}
                    />
                  </div>
                }
							</Paper>
						</Grid>
					</Grid>
        </Container>
      </div>
    </div>
  );
}

export default withRouter(StudentCourse);