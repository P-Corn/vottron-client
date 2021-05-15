import React, {useState, useEffect} from 'react';
import './Students.css'
import AddIcon from '@material-ui/icons/Add';
import {Container, Typography, Button, Grid, Icon} from '@material-ui/core'
import StudentsTable from './StudentsTable';
import StudentsListMobile from './StudentsListMobile';
import Axios from 'axios'; 


function Students() {

  const [courseData, setCourseData] = useState([]);
  const [studentData, setStudentData] = useState([]);
  const [windowWidth, setWindowWidth] = useState([]);

  const getStudents = () => {
    Axios.get("https://vottron.herokuapp.com/students").then((response) => {
      const data = response.data;
      // let dataArray = [...rows];
      console.log(data)
      setStudentData([...data]);
    })
  }

  console.log(studentData)

  const getCourseData = () => {
    Axios.get('https://vottron.herokuapp.com/courses/coursetitles')
    .then((response) => {
      setCourseData([...response.data]);
    })
  }

  useEffect(() => {
    getCourseData(); 
    getStudents();
  }, []);

  window.addEventListener('resize', () => {setWindowWidth(window.innerWidth)})

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
          {windowWidth <= 800 ?
            <StudentsListMobile 
            courseData={courseData} 
            studentData={studentData}
            getStudents={getStudents}
            />
            :
            <StudentsTable
            courseData={courseData}
            studentData={studentData} 
            getStudents={getStudents}
            />
          }
        </Container>
      </div>
    </div>
  );
}

export default Students;