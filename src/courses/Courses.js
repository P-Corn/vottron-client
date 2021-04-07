import React, {useState, useEffect} from 'react';
import {Container, Typography, Button, Grid, Box} from '@material-ui/core';
import CourseCard from './CourseCard';
import Add from '@material-ui/icons/Add';
import './Courses.css';
import AddCourseModal from './AddCourseModal';
import Axios from 'axios';


function Courses() {

  const [openModal, setOpenModal] = useState(false);
  const [courseData, setCourseData] = useState([])
  
  const handleOpen = () => {
    setOpenModal(true);
  }

  const handleClose = () => {
    setOpenModal(false);
  }

  const getCourse = () => {
    Axios.get("https://vottron.herokuapp.com/courses").then((response) => {
      const data = response.data;
      setCourseData([...data]);
    })
  }

  useEffect (() => {
    getCourse();
  }, [])

  return (
    <div className="pageBg">
      <div className="content-wrapper">
        <Container 
          maxWidth='lg'
        >
          <Grid 
            justify="space-between" 
            alignItems="center" 
            container
          >
            <Typography variant="h4">
              Courses
            </Typography>
            <Button
            variant="contained"
            color="primary"
            onClick={handleOpen}
            startIcon={<Add></Add>}
            >
              Add
            </Button>
          </Grid>
          <Box pb={3}/>
          <AddCourseModal
            openModal={openModal}
            handleClose={handleClose}
          ></AddCourseModal>
            <Grid
            container
            spacing={9}
            >
              {courseData.map((course) => 
                <Grid xs={12} sm={6} md={4} item key={course.courseid}>
                  <CourseCard
                    courseId={course.courseid}
                    courseTitle={course.coursetitle}
                    courseDesc={course.coursedescription}
                    courseImg={course.courseimage}
                  ></CourseCard>
                </Grid>
              )}
            </Grid>
        </Container>
      </div>
    </div>
  );
}

export default Courses;