import React from "react";
import PropTypes from "prop-types";

const InputNumeric = ({
    titleField,
    nameField,
    onChangeField,
    valueField,
    placeHolderField
}) => {

    return (
        <div>
            <h3> {titleField} </h3>
            <input
                type="text"
                name={nameField}
                onChange={onChangeField}
                value={valueField}
                placeholder={placeHolderField}
            />
        </div>

    );
};
InputNumeric.propTypes = {
    titleField: PropTypes.string.isRequired,
    nameField: PropTypes.string.isRequired,
    onChangeField: PropTypes.func.isRequired,
    valueField: PropTypes.string.isRequired,
    placeHolderField: PropTypes.string.isRequired
};

export default InputNumeric;
