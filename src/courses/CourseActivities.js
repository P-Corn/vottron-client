import React, {useState, useEffect} from 'react';
import {Paper, Typography, Button, Grid} from '@material-ui/core';
import AddActivityModal from './AddActivityModal';
import ActivityList from './ActivityList';
import ActivityEdit from './ActivityEdit';
import AddCircleIcon from '@material-ui/icons/Add';
import Axios from 'axios'
import { useRouteMatch } from "react-router-dom";

function CourseActivities() {

  const url = useRouteMatch("/courses/:id");
  const id = url.params.id;

  const [openModal, setOpenModal] = useState(false);
  const [editActivity, setEditActivity] = useState(false);
  const [clickedActivity, setClickedActivity] = useState({})
  const [activityData, setActivityData] = useState([])

  const contentControl = (activity) => {
    setEditActivity(!editActivity)
    setClickedActivity(activity)
    console.log(activity.activityorder)
  }

  const getActivities = (id) => {
    Axios.get('https://vottron.herokuapp.com/activities/:id', {
      params: {
        id
      }
    }).then((response) => {
      console.log(response)
      setActivityData([ ...response.data]);
    })
  }

  useEffect(() => getActivities(id), [])

  const handleOpen = () => {
    setOpenModal(true);
  }

  const handleClose = () => {
    setOpenModal(false);
  }
  
  return (
    <Paper 
    elevation={2}
    className="course-dashboard-paper">
      <Grid
      container
      justify="space-between"
      >
        <Grid
        item
        >
          <Typography 
          className="dashboard-card-title" 
          variant="h5"
          color="primary"
          >
            Activities
          </Typography>
        </Grid>
        <Grid
        item
        >
          <Button
          color="primary"
          variant="contained"
          onClick={handleOpen}
          startIcon={<AddCircleIcon/>}
          >
            Add
          </Button>
        </Grid>
      </Grid>

      <AddActivityModal
        openModal={openModal}
        handleClose={handleClose}
        activityData={activityData}
        getActivities={getActivities}
      />
      {editActivity === true ?
        <ActivityEdit
        setEditActivity={setEditActivity}
        clickedActivity={clickedActivity}
        getActivities={getActivities}
        />
        :
        <ActivityList 
        contentControl={contentControl}
        activityData={activityData}
        />
      }
    </Paper>
  ); 
}

export default CourseActivities;