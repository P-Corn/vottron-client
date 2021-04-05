import React, {useState, useEffect} from 'react';
import {Grid, Typography, Box, Paper, Button} from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import Axios from 'axios';

function StudentInfo({firstName, lastName, id, course, active, dob, notes, setEditStudent}) {

  return (
    <Paper
      className="student-dashboard-paper"
      elevation={2}
    >
      {/* <Typography 
      className="dashboard-card-title" 
      variant="h5"
      color="primary"
      >
        Information
      </Typography> */}
      
      <Grid direction="row" container>
        <Grid
        item container
        alignItems="center"
        justify="space-between"
        className="student-info-header"
        >
          <Grid
          item
          lg={6}
          >
            <Typography variant="h5" color="primary">
              Information
            </Typography>
          </Grid>
          <Grid
          item
          align="right"
          lg={6}
          >
            <Button
            variant="contained"
            color="primary"
            startIcon={<CreateIcon></CreateIcon>}
            onClick={() => setEditStudent(true)}
            >
            Edit
            </Button>
          </Grid>
        </Grid>

        <Grid 
        item
        className="dashboard-details-container"
        sm={6}
        xs={12}
        >
          <Typography className="dashboard-label" variant="subtitle2">
              First name:
          </Typography>
          <Box>
            <Typography variant="h6" fontWeight={700}>
                {firstName}
            </Typography>
          </Box>
          
        </Grid>

        <Grid 
        item
        className="dashboard-details-container"
        sm={6}
        xs={12}
        >
          <Typography className="dashboard-label" variant="subtitle2">
              Last name:
          </Typography>
          <Typography variant="h6">
            {lastName}
          </Typography>
        </Grid>

        <Grid 
        item
        className="dashboard-details-container"
        sm={6}
        xs={12}
        >
          <Typography className="dashboard-label" variant="subtitle2">
            Course:
          </Typography>
          <Typography fontWeight="fontWeightBold" variant="h6">
            {course}
          </Typography>
        </Grid>
        
        <Grid 
        item
        className="dashboard-details-container"
        sm={6}
        xs={12}
        >
          <Typography className="dashboard-label" variant="subtitle2">
            DOB:
          </Typography>
          <Typography fontWeight="fontWeightBold" variant="h6">
            {dob}
          </Typography>
        </Grid>

        <Grid 
        item
        className="dashboard-details-container"
        sm={6}
        xs={12}
        >
          <Typography className="dashboard-label" variant="subtitle2">
            Active:
          </Typography>
          <Typography fontWeight="fontWeightBold" variant="h6">
            {active}
          </Typography>
        </Grid>

        <Grid 
        item
        className="dashboard-details-container"
        sm={6}
        xs={12}
        >
          <Typography className="dashboard-label" variant="subtitle2">
            Notes:
          </Typography>
          <Typography fontWeight="fontWeightBold" variant="h6">
            {notes}
          </Typography>
        </Grid>
        
      </Grid>  
    </Paper>
  );
}

export default StudentInfo;