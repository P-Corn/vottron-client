import React, {useState, useEffect} from 'react';
import {Container, Grid, Typography, Button, Paper} from '@material-ui/core';
import Axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import { useRouteMatch } from "react-router-dom";
import {withRouter} from 'react-router-dom';
import StudentActivities from './StudentActivities'

const useStyles = makeStyles({
	paper: {
		padding: '30px'
	},
	cardTitle: {
		paddingBottom: "20px"
	}
})

function StudentCourse({history}) {

  const classes = useStyles();

  const url = useRouteMatch("/schedule/:id");
  const id = url.params.id;

  const [studentData, setStudentData] = useState({});
  const [courseData, setCourseData] = useState({});
  const [activityData, setActivityData] = useState([]);

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
      setActivityData([...response.data]);
    })
  }

  useEffect (() => {
    getStudentData(id);
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
						lg={5}
						>
							<Paper className={classes.paper}>
								<Typography className={classes.cardTitle} color="primary" variant="h5">
									Student Info
								</Typography>
								<Typography variant="h4">
									{`${studentData.firstname} ${studentData.lastname}`}
								</Typography>
							</Paper>
						</Grid>
						<Grid
						item
						lg={7}
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