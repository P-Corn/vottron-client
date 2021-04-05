import React, {useEffect, useState} from 'react';
import {Container, Typography, Paper, Grid, IconButton} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Axios from 'axios';
import {withRouter} from 'react-router-dom';
import { useRouteMatch } from "react-router-dom";
import StudentInfo from './StudentInfo';
import StudentInfoEdit from './StudentInfoEdit';



function StudentDashboard({history}) {


  const [studentData, setStudentData] = useState({});
  const [editStudent, setEditStudent] = useState(false);

  const url = useRouteMatch("/students/:id");
  const id = url.params.id;

  const getStudentDetails = (id) => {
    Axios.get('https://vottron.herokuapp.com/students/:id', {
      params: {
        id
      }
    }).then((response) => {
      setStudentData({...response.data[0]});
    })
  }

  useEffect(() => getStudentDetails(id), [])

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
            onClick={() => history.replace('/students')}
            >
              <ArrowBackIcon fontSize="large"/>
            </IconButton>
            <Typography variant="h4">
              Student Settings
            </Typography>
          </Grid>
          <hr></hr>
					<Grid
          container
          justify="center"
          >
            <Grid
            item
            xs={12}
            sm={9}
            md={6}
            >
              {editStudent === true ?
                <StudentInfoEdit
                id={studentData.studentid}
                firstName={studentData.firstname}
                lastName={studentData.lastname}
                course={studentData.course}
                active={studentData.active}
                dob={studentData.studentdob}
                notes={studentData.adminnotes}
                setEditStudent={setEditStudent}
                getStudentDetails={getStudentDetails}
                />
                :
                <StudentInfo
                id={studentData.studentid}
                firstName={studentData.firstname}
                lastName={studentData.lastname}
                course={studentData.course}
                active={studentData.active}
                dob={studentData.studentdob}
                notes={studentData.adminnotes}
                setEditStudent={setEditStudent}
              />
              }
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  );
}

export default withRouter(StudentDashboard);