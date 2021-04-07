import React, {useState, useEffect} from 'react';
import {Typography, TextField, Button, Box} from '@material-ui/core';
import Axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({

})

function StudentNotes({studentId, commentDate, commentText}) {

	let date = new Date();

  const classes = useStyles();

	const [newComment, setNewComment] = useState("");

	const addComment = (newDate) => {
		Axios.post('https://vottron.herokuapp.com/studentcomments', {
			studentId,
			newComment,
			newDate
		}).then((res) => {
			console.log(res)
		})
	}

	const createDate = () => {
		const day = date.getDate()
		const month = date.getMonth() + 1
		const year = date.getFullYear()
		const commentDate = `${month}/${day}/${year}`
		addComment(commentDate)
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		createDate();
	}

  return (
    <div>
			<Typography variant="h6" color="primary">
				Latest Comment
			</Typography>
			<hr></hr>
			<Box pb={1}/>
			<div>
				<Typography color="textSecondary" variant="subtitle2">{commentDate}</Typography>
				<Typography variant="h6">{commentText}</Typography>
			</div>
			<Box py={2}/>
			<form onSubmit={(e) => handleSubmit(e)}>
				<TextField
				fullWidth
				variant="outlined"
				multiline
				rows="4"
				value={newComment}
				onChange={(e) => setNewComment(e.target.value)}
				/>
				<Box py={1}/>
				<Button
				variant="contained"
				color="primary"
				position="right"
				type="submit"
				>
					Add Comment
				</Button>
			</form>
    </div>
  );
}

export default StudentNotes;