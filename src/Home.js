import React from 'react';
import {Container, Typography, Grid, Box, Divider} from '@material-ui/core';


function Home() {

  return (
    <div className="pageBg">
      <div className="content-wrapper">
        <Container 
          maxWidth='lg'
        >
          <Typography gutterBottom variant="h5">
              Overview
          </Typography>
          <Typography variant="body">
              This classroom management web application serves the purpose of:
              <ul>
                  <li>Allowing administrators to manage students, classes, and class activities all in one place.</li>
                  <li>Providing teachers with the ability to keep track of a students progress within a class through the schedule page.</li>
                  <li>Storing class information such as activities, instructions, and solutions for the activities.</li>
              </ul>
          </Typography>
          <Box py={2}>
            <Divider/>
          </Box>
          <Typography gutterBottom variant="h5">
              How to get started
          </Typography>
          <Typography variant="body">
              Here are a few things you can do to test the application.
              <ol>
                  <li>Visit the classes page, click the "add" button, and fill out the form.</li>
                  <li>Visit the students page, click the "add" button, and fill out the form.</li>
                  <li>Visit the schedule page, click on a student, and add a new comment.</li>
              </ol>
              Feel free to add, edit, or delete anything on this website.
          </Typography>
        </Container>
      </div>
    </div>
  );
}

export default Home;