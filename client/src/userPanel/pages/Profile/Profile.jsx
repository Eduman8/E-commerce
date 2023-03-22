import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useAuth0 } from '@auth0/auth0-react';
import { putUser } from '../../../Redux/Actions/Actions';
import './Profile.css';
import { useDispatch } from 'react-redux';

export default function Profile() {
	const { user } = useAuth0();
	const dispatch = useDispatch()

	const [formData, setFormData] = useState({
		name: user.name,
		telephone: '',
		mail: user.email,
		direction: ''
	});

	const handleChange = (event) => {
		setFormData({
			...formData,
			[event.target.name]: event.target.value,
		});
	};

	function handleSubmit(e){
		e.preventDefault()
		dispatch(putUser(formData))
		console.log(formData);
	}

	return (
		<div className="container-Profile">
			<div className="information-Box">
				<h2 id="information">Personal Information</h2>
			</div>

			<Box
				component="form"
				noValidate
				autoComplete="off"
				sx={{
					'& .MuiTextField-root': { m: 1, width: '25ch' },
				}}
			>
				<div className="container-form">
					<TextField
						required
						id="outlined-required"
						label="Name"
						name="name"
						defaultValue={user.name}
						onChange={handleChange}
					/>

					<TextField
						disabled
						id="outlined-disabled"
						label="Email"
						defaultValue={user.email}
						name="mail"
					/>
					<TextField 
                    required 
                    id="outlined-multiline-flexible" 
                    label="DNI" 
                    name="dni"
                    onChange={handleChange}
                    />
					<TextField
						required
						id="outlined-multiline-flexible"
						label="phone number"
						name="telephone"
						maxRows={1}
                        onChange={handleChange}
					/>
					{/* <Box sx={{ minWidth: 220 }}>
						<FormControl fullWidth>
							<InputLabel id="demo-simple-select-label">Gender</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								//   value={age}
								label="Age"
								//   onChange={handleChange}
							>
								<MenuItem value="">Male</MenuItem>
								<MenuItem value="">Female</MenuItem>
								<MenuItem value="">Other</MenuItem>
							</Select>
						</FormControl>
					</Box> */}
					<TextField
						required
						id="outlined-multiline-flexible"
						label="Address"
						name="direction"
						maxRows={1}
                        onChange={handleChange}
					/>
				</div>
			</Box>
			<div className="container-Button">
				<button id="add-Button" className="btn information-btn" onClick={handleSubmit}>
					Update information
				</button>
			</div>
		</div>
	);
}
