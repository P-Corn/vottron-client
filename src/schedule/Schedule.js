import React, {useState, useEffect} from 'react';
import {Container, Grid, Typography, Button, Box} from '@material-ui/core';
import StudentCard from './StudentCard';
import ScheduleSkeleton from './ScheduleSkeleton'
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
  const [skeleton, setSkeleton] = useState(true)
  // const [monday, setMonday] = useState([])
  // const [tuesday, setTuesday] = useState([])
  // const [wednesday, setWednesday] = useState([])
  // const [thursday, setThursday] = useState([])
  // const [friday, setFriday] = useState([])

  const getStudents = () => {
    Axios.get("https://vottron.herokuapp.com/students").then((response) => {
      console.log(response)
      setStudents([...response.data]);
      setSkeleton(false)
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
          </Grid>
          <Box pb={3}/>
          <Typography variant="h6" color="textSecondary">
            Monday
          </Typography>
          <hr/>
          <Grid
          container
          spacing={7}
          className={classes.section}
          >
            {skeleton === false ?
            students.filter(student => student.weekday == "Monday").map(filteredStudent => (
              <Grid
              item
              xs={12}
              md={4}
              key={filteredStudent.studentid}
              >
                <StudentCard
                id={filteredStudent.studentid}
                name={`${filteredStudent.firstname} ${filteredStudent.lastname}`}
                course={filteredStudent.course}
                />
              </Grid>
            ))
            :
            <Grid
              item
              xs={12}
              md={4}
            >
              <ScheduleSkeleton />
            </Grid>
          }
          </Grid>
          <Typography variant="h6" color="textSecondary">
            Tuesday
          </Typography>
          <hr/>
          <Grid
          container
          spacing={5}
          className={classes.section}
          >
            {skeleton === false ?
            students.filter(student => student.weekday == "Tuesday").map(filteredStudent => (
              <Grid
              item
              xs={12}
              md={4}
              key={filteredStudent.studentid}
              >
                <StudentCard
                id={filteredStudent.studentid}
                name={`${filteredStudent.firstname} ${filteredStudent.lastname}`}
                course={filteredStudent.course}
                />
              </Grid>
            ))
            :
            <Grid
              item
              xs={12}
              md={4}
            >
              <ScheduleSkeleton />
            </Grid>
          }
          </Grid>
          <Typography variant="h6" color="textSecondary">
            Wednesday
          </Typography>
          <hr/>
          <Grid
          container
          spacing={5}
          className={classes.section}
          >
            {skeleton === false ?
            students.filter(student => student.weekday == "Wednesday").map(filteredStudent => (
              <Grid
              item
              xs={12}
              md={4}
              key={filteredStudent.studentid}
              >
                <StudentCard
                id={filteredStudent.studentid}
                name={`${filteredStudent.firstname} ${filteredStudent.lastname}`}
                course={filteredStudent.course}
                />
              </Grid>
            ))
            :
            <Grid
              item
              xs={12}
              md={4}
            >
              <ScheduleSkeleton />
            </Grid>
          }
          </Grid>
          <Typography variant="h6" color="textSecondary">
            Thursday
          </Typography>
          <hr/>
          <Grid
          container
          spacing={5}
          className={classes.section}
          >
            {skeleton === false ?
            students.filter(student => student.weekday == "Thursday").map(filteredStudent => (
              <Grid
              item
              xs={12}
              md={4}
              key={filteredStudent.studentid}
              >
                <StudentCard
                id={filteredStudent.studentid}
                name={`${filteredStudent.firstname} ${filteredStudent.lastname}`}
                course={filteredStudent.course}
                />
              </Grid>
            ))
            :
            <Grid
              item
              xs={12}
              md={4}
            >
              <ScheduleSkeleton />
            </Grid>
          }
          </Grid>
          <Typography variant="h6" color="textSecondary">
            Friday
          </Typography>
          <hr/>
          <Grid
          container
          spacing={5}
          className={classes.section}
          >
            {skeleton === false ?
            students.filter(student => student.weekday == "Friday").map(filteredStudent => (
              <Grid
              item
              xs={12}
              md={4}
              key={filteredStudent.studentid}
              >
                <StudentCard
                id={filteredStudent.studentid}
                name={`${filteredStudent.firstname} ${filteredStudent.lastname}`}
                course={filteredStudent.course}
                />
              </Grid>
            ))
            :
            <Grid
              item
              xs={12}
              md={4}
            >
              <ScheduleSkeleton />
            </Grid>
          }
          </Grid>
          
        </Container>
      </div>
    </div>
  );
}

export default Schedule;