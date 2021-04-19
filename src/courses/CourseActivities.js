import React, {useState, useEffect} from 'react';
import {Paper, Typography, Button, Grid, Box} from '@material-ui/core';
import AddActivityModal from './AddActivityModal';
import ActivityList from './ActivityList';
import Activity from './Activity';
import Axios from 'axios'
import { useRouteMatch } from "react-router-dom";

function CourseActivities() {

  const url = useRouteMatch("/courses/:id");
  const id = url.params.id;

  const [openModal, setOpenModal] = useState(false);
  const [singleActivity, setSingleActivity] = useState(false);
  const [clickedActivity, setClickedActivity] = useState({})
  const [activityData, setActivityData] = useState([])

  const contentControl = (activity) => {
    setSingleActivity(true)
    setClickedActivity(activity)
    console.log(activity.activityorder)
  }

  // const updateActivity = () => {
  //   
  // }

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
      <AddActivityModal
        openModal={openModal}
        handleClose={handleClose}
        activityData={activityData}
        getActivities={getActivities}
      />
      {singleActivity === true ?
        <Activity
        clickedActivity={clickedActivity}
        getActivities={getActivities}
        setSingleActivity={setSingleActivity}
        />
        :
        <ActivityList 
        contentControl={contentControl}
        activityData={activityData}
        handleOpen={handleOpen}
        />
      }
    </Paper>
  ); 
}

export default CourseActivities;