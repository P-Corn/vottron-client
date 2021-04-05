import React, {useState, useEffect} from 'react';
import './Students.css'
import AddIcon from '@material-ui/icons/Add';
import {Container, Typography, Button, Grid, Icon} from '@material-ui/core'
import StudentsTable from './StudentsTable';
import Axios from 'axios'; 


function Students() {

  const [courseData, setCourseData] = useState([]);

  const getCourseData = () => {
    Axios.get('https://vottron.herokuapp.com/courses/coursetitles')
    .then((response) => {
      setCourseData([...response.data]);
    })
  }

  useEffect(() => {getCourseData()}, []);

  return (
    <div className="pageBg">
      <div className="content-wrapper">
        <Container 
          maxWidth='lg'
        >
          {/* <Grid 
            container 
            justify="space-between"
            alignItems="center"
          >
            <Grid item>
              <Typography variant="h3">Students</Typography>
            </Grid>
            <Grid item>
              <Button
                color="primary"
                variant="contained"
                endIcon={<AddIcon/>}
              >
                Add Student
              </Button>
            </Grid>
          </Grid> */}
            <StudentsTable courseData={courseData}/>
        </Container>
      </div>
    </div>
  );
}

export default Students;