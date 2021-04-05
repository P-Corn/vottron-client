import React, {useState, useEffect} from 'react';
import {Container, Grid, Typography, Button} from '@material-ui/core';
import StudentCard from './StudentCard';
import Axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  section: {
    marginBottom: '25px'
  }
})

function Schedule() {

  const classes = useStyles();

  const [students, setStudents] = useState([])

  const getStudents = () => {
    Axios.get("https://vottron.herokuapp.com/students").then((response) => {
      console.log(response.data)
      // let dataArray = [...rows];
      setStudents([...response.data]);
      console.log(students)
    })
  }

  useEffect (() => {
    getStudents();
  },[])

  return (
    <div className="pageBg">
      <div className="content-wrapper">
        <Container
          maxWidth="lg"
        >
          <Grid 
            justify="space-between" 
            alignItems="center" 
            container
          >
            <Typography gutterBottom variant="h4">
              Schedule
            </Typography>
            <Button
            variant="contained"
            color="primary"
            >
              Change View
            </Button>
          </Grid>
          {/* <hr></hr> */}
          <Typography variant="h6" color="textSecondary">
            Monday
          </Typography>
          <hr/>
          <Grid
          container
          spacing={5}
          className={classes.section}
          >
            {students.map((student) => (
              <Grid
              item
              xs={12}
              md={4}
              >
                <StudentCard
                id={student.studentid}
                name={`${student.firstname} ${student.lastname}`}
                course={student.course}
                />
              </Grid>
            ))}
          </Grid>
          <Typography variant="h6" color="textSecondary">
            Tuesday
          </Typography>
          <hr/>
          <h5>Work in progress...</h5>
        </Container>
      </div>
    </div>
  );
}

export default Schedule;