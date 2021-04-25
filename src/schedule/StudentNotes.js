import React, {useState, useEffect} from 'react';
import {Typography, TextField, Button, Box} from '@material-ui/core';
import Axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({

})

function StudentNotes({studentId, commentDate, commentText}) {

	let dateObj = new Date();

  	const classes = useStyles();

	const [comment, setComment] = useState();
	const [date, setDate] = useState();
	const [newComment, setNewComment] = useState("");

	const validate = {
        check: (input, num) => (input.length >= num),
        validateAll: function validateAll(...inputs) {
            for(let input of inputs){
                if(this.check(input[0], input[1]))
                    return true;
            }
            return false;
        }
    }

	const addComment = (newDate) => {
		Axios.post('https://vottron.herokuapp.com/studentcomments', {
			studentId,
			newComment,
			newDate
		}).then((res) => {
			console.log(res)
			setComment(newComment)
			setDate(newDate)
			setNewComment("")
		})
	}

	useEffect(() => {
		setComment(commentText);
		setDate(commentDate);
	}, [commentDate, commentText])

	const createDate = () => {
		const day = dateObj.getDate()
		const month = dateObj.getMonth() + 1
		const year = dateObj.getFullYear()
		const commentDate = `${month}/${day}/${year}`
		addComment(commentDate)
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		if(validate.validateAll([newComment, 255]))
			return
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
				<Typography color="textSecondary" variant="subtitle2">{date}</Typography>
				<Typography variant="body1">
					{comment}
				</Typography>
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
				label={`New comment ${validate.check(newComment, 255) ? '(max 255 characters)' : ''}`}
				error={validate.check(newComment, 255)}
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