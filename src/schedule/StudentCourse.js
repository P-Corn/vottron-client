import React, {useState, useEffect} from 'react';
import {Container, Grid, Typography, Box, Paper} from '@material-ui/core';
import Axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import { useRouteMatch } from "react-router-dom";
import {withRouter} from 'react-router-dom';
import StudentActivities from './StudentActivities'
import StudentNotes from './StudentNotes'

const useStyles = makeStyles({
	paper: {
		padding: '30px'
	}
})

function StudentCourse({history}) {

  const classes = useStyles();

  const url = useRouteMatch("/schedule/:id");
  const id = url.params.id;

  const [studentData, setStudentData] = useState({});
  const [courseData, setCourseData] = useState({});
  const [activityData, setActivityData] = useState([]);
  const [commentData, setCommentData] = useState([]);

  const getStudentData = (id) => {
    Axios.get("https://vottron.herokuapp.com/students/:id", {
			params: {
					id
			}
    }).then((response) => {
      console.log(response.data)
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
					container
					spacing={5}
					>
						<Grid
						item
						xs={12}
            md={5}
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
                    <Typography variant="h4">
                      {`${studentData.firstname} ${studentData.lastname}`}
                    </Typography>
                  </Grid>
                  <Box py={4}/>
                  <Grid item>
                    <StudentNotes 
                    commentText={commentData[0].commenttext}
                    commentDate={commentData[0].commentdate}
                    studentId={studentData.studentid}/>
                  </Grid>
                </Grid>	
							{/* </Paper> */}
						</Grid>
						<Grid
						item
            xs={12}
            md={7}
						>
							<Paper className={classes.paper}>
								<Typography className={classes.cardTitle} color="primary" variant="h5">
									{courseData.coursetitle}
								</Typography>
								<StudentActivities activityData={activityData}/>
							</Paper>
						</Grid>
					</Grid>
        </Container>
      </div>
    </div>
  );
}

export default withRouter(StudentCourse);