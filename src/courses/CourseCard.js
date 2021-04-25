import React from 'react';
import {Card, CardActionArea, CardContent, CardMedia, Typography} from '@material-ui/core';
import { withRouter} from 'react-router-dom';


function CourseCard({courseId, courseTitle, courseDesc, courseImg, history}) {
  return (
    <Card>
        <CardActionArea
            onClick={() => history.push(`/courses/${courseId}`)}
        >
            <CardMedia
                component="img"
                height="190"
                image={courseImg}
            />
            <CardContent className="card-content">
                <Typography gutterBottom variant="h5" component="h2">
                {courseTitle}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                {courseDesc}
                </Typography>
            </CardContent>
        </CardActionArea>
    </Card>
  );
}

export default withRouter(CourseCard);