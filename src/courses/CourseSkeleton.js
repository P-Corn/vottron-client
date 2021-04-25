import React from 'react';
import {Card, CardActionArea, CardContent, Typography} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    media: {
        height: '190px'
    }
})

function CourseSkeleton() {
    const classes = useStyles();

  return (
    <Card>
        <CardActionArea
        >
            <Skeleton
                variant="rect"
                className={classes.media}
            />
            <CardContent className="card-content">
                <Typography gutterBottom variant="h5" component="h2">
                    <Skeleton variant="text"/>
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    <Skeleton variant="text"/>
                </Typography>
            </CardContent>
        </CardActionArea>
    </Card>
  );
}

export default CourseSkeleton;