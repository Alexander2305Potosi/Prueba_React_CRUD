import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { EDIT_DATA } from "../actions/Actions";
import FormData from "../components/FormData";

const mapStateToProps = state => {
  const { dataList } = state;
  return { dataList };
};

const mapDispatchToProps = dispatch => {
  return {
    editItem: (value, description, trm, key) => {
      dispatch({
        type: EDIT_DATA,
        value,
        description,
        trm,
        key
      });
    }
  };
};

const EditData = ({ itemId, editItem, dataList, close }) => {
  const itemToEdit = dataList.find(item => item.key === itemId);

  const initialState = {
    value: itemToEdit.value,
    description: itemToEdit.description,
    trm: itemToEdit.trm,
    key: itemToEdit.key
  };

  const [state, setState] = useState(initialState);
  const handleChange = e => {
    let regex = /^[0-9.,]+$/;
		if (e.target.value === '' || regex.test(e.target.value)) {
			let formatNumber =  e.target.value.toString().replaceAll('.', '');
			let numParts = formatNumber.toString().split(",");
			numParts[0] = numParts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
			let value = numParts.join(",");
			setState({ ...state, [e.target.name]: value });
		} else {
			return false;
		}
  };
  const handleSubmit = e => {
    e.preventDefault();
    editItem(state.value, state.description, state.trm, state.key);
    close();
  };
  return (
    <FormData
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      value={state.value}
      description={state.description}
      trm={state.trm}
      edit={true}
      close={close}
    />
  );
};

EditData.propTypes = {
  itemId: PropTypes.string.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(EditData);
