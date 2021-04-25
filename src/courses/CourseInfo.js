import React, {useState} from 'react';
import {Grid, Typography, Card, CardMedia, Paper, Button, Box} from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';

function CourseInfo({courseTitle, courseDesc, courseImg, setEditCourse}) {


  // <Grid
  //       item
  //       align="right"
  //       >
  //         <Button
  //         variant="contained"
  //         color="primary"
  //         onClick={() => setEditCourse(true)}
  //         startIcon={<CreateIcon></CreateIcon>}
  //         >
  //         Edit
  //         </Button>
  //       </Grid>

  return (
    <Paper
      className="course-dashboard-paper"
      elevation={2}
    >
      <Grid
			container
			justify="space-between"
			>
				<Grid alignItems="center" xs={6} container item>
					<Grid
					item
					>
						<Typography 
						className="dashboard-card-title" 
						variant="h5"
						color="primary"
						>
						Information
						</Typography>
					</Grid>
				</Grid>
        <Grid item>
          <Button
          color="primary"
          variant="contained"
          startIcon={<CreateIcon/>}
          onClick={() => setEditCourse(true)}
          type="submit"
          >
            Edit
          </Button>
        </Grid>
		  </Grid>

      <Box pb={2} />

      <Grid direction="column" container>
        <Grid 
        item
        className="dashboard-details-container"
        >
          <Typography color="primary" className="dashboard-label" variant="subtitle1">
              Title
          </Typography>
          <Typography variant="h6">
              {courseTitle}
          </Typography>
        </Grid>
        <Grid 
        item
        className="dashboard-details-container"
        >
          <Typography color="primary" className="dashboard-label" variant="subtitle1">
              Description
          </Typography>
          <Typography variant="h6">
              {courseDesc}
          </Typography>
        </Grid>
        <Grid 
        item
        sm={9}
        md={12}
        className="dashboard-details-container"
        >
          <Typography color="primary" className="dashboard-label__img" variant="subtitle1">Image</Typography>
          <Card>
              <CardMedia
              component="img"
              image={courseImg}
              height="250"
              />
          </Card>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default CourseInfo;