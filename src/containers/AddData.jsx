import React, { useState } from 'react';
import { v1 } from 'uuid';
import { connect } from 'react-redux';
import { ADD_DATA } from '../actions/Actions';
import FormData from '../components/FormData';
import axios from 'axios'
import { urlCreate } from "../utils";

const mapStateToProps = (state) => {
	const { dataList } = state;
	return { dataList };
};

const mapDispatchToProps = (dispatch) => {
	return {
		addItem: (value, description, trm) =>
			dispatch({
				type: ADD_DATA,
				value,
				description,
				trm,
				key: v1()
			})
	};
};

const AddData = ({ addItem, close }) => {
	const initialState = {
		value: '',
		description: '-1',
		trm: ''
	};
	const [state, setState] = useState(initialState);
	const handleChange = (e) => {
		let regex = /^[0-9.,]+$/;
		if (e.target.value === '' || regex.test(e.target.value)) {
			let formatNumber = e.target.value.split('.').join('')
			let numParts = formatNumber.split(",");
			numParts[0] = numParts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
			let value = numParts.join(",");
			setState({ ...state, [e.target.name]: value });
		} else {
			return false;
		}

	};

	const clearForm = (e) => {
		setState({ ...state, value: '', trm: '', description: '-1' });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		axios.post(urlCreate, state).then(res => {
			if (res.status === 200) {
				const value = state.value.trim();
				const description = state.description.trim();
				const trm = state.trm.trim();
				addItem(value, description, trm);
				close();
				setState(initialState);
			}
		});
	};

	return (
		<FormData
			handleSubmit={handleSubmit}
			handleChange={handleChange}
			value={state.value}
			description={state.description}
			trm={state.trm}
			edit={false}
			close={close}
			resetData={clearForm}
		/>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(AddData);