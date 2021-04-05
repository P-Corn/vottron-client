import React, {useState} from 'react';
import {Grid, Typography, Card, CardMedia, Paper, Button} from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';

function CourseInfo({courseTitle, courseDesc, courseImg, setEditCourse}) {

  return (
    <Paper
      className="course-dashboard-paper"
      elevation={2}
    >
      <Typography 
      className="dashboard-card-title" 
      variant="h5"
      color="primary"
      >
        Information
      </Typography>
      <Grid direction="column" container>
        <Grid 
        item
        className="dashboard-details-container"
        >
          <Typography className="dashboard-label" variant="subtitle2">
              Title:
          </Typography>
          <Typography variant="h6">
              {courseTitle}
          </Typography>
        </Grid>
        <Grid 
        item
        className="dashboard-details-container"
        >
          <Typography className="dashboard-label" variant="subtitle2">
              Description:
          </Typography>
          <Typography variant="h6">
              {courseDesc}
          </Typography>
        </Grid>
        <Grid 
        item
        sm={8}
        md={10}
        className="dashboard-details-container"
        >
          <Typography className="dashboard-label__img" variant="subtitle2">Image:</Typography>
          <Card>
              <CardMedia
              component="img"
              image={courseImg}
              height="230"
              />
          </Card>
        </Grid>
        <Grid
        item
        align="right"
        >
          <Button
          variant="contained"
          color="primary"
          onClick={() => setEditCourse(true)}
          startIcon={<CreateIcon></CreateIcon>}
          >
          Edit
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default CourseInfo;