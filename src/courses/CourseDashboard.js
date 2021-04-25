import React, {useEffect, useState} from 'react';
import {Container, Typography, Paper, Grid, IconButton, Fade} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useRouteMatch } from "react-router-dom";
import Axios from 'axios';
import CourseInfo from './CourseInfo'
import CourseInfoEdit from './CourseInfoEdit'
import {withRouter} from 'react-router-dom';
import CourseActivities from './CourseActivities';


function CourseDashboard({history}) {

  const [courseData, setCourseData] = useState({});
  const [editCourse, setEditCourse] = useState(false);

  const url = useRouteMatch("/courses/:id");
  const id = url.params.id;

  const getCourseDetails = (id) => {
    Axios.get('https://vottron.herokuapp.com/courses/:id', {
      params: {
        id
      }
    }).then((response) => {
      setCourseData({...response.data[0]});
    })
  }

  useEffect(() => getCourseDetails(id), [])

  return (
    <div className="pageBg">
      <div className="content-wrapper">
        <Container 
          maxWidth='lg'
        >
          <Grid 
            justify="flex-start" 
            alignItems="center" 
            container
          >
            <IconButton
            color="primary"
            onClick={() => history.replace('/courses')}
            >
              <ArrowBackIcon fontSize="large"/>
            </IconButton>
            <Typography variant="h4">
              Course Settings
            </Typography>
          </Grid>
          <Grid
            container
            spacing={6}
            justify="center"
          >
            <Grid
              xs={12}
              sm={12}
              md={7}
              lg={5}
              item
              className="dashboard-grid-item"
            >
              {editCourse === true ?
              <CourseInfoEdit
                id={courseData.courseid}
                title={courseData.coursetitle}
                desc={courseData.coursedescription}
                img={courseData.courseimage}
                setEditCourse={setEditCourse}
                getCourseDetails={getCourseDetails}
              />
              :
              <CourseInfo
                courseId={courseData.courseid}
                courseTitle={courseData.coursetitle}
                courseDesc={courseData.coursedescription}
                courseImg={courseData.courseimage}
                setEditCourse={setEditCourse}
              />}
            </Grid>
            <Grid
              xs={12}
              sm={12}
              md={7}
              lg={7}
              item
              className="dashboard-grid-item"
            >
                <CourseActivities/>
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  );
}

export default withRouter(CourseDashboard);