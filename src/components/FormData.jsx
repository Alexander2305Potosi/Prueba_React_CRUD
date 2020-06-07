import React, { useState } from "react";
import PropTypes from "prop-types";
import { optionsSelect } from "../utils";
import InputNumeric from './InputNumeric';

const FormData = ({
  handleSubmit,
  handleChange,
  value,
  description,
  trm,
  edit,
  close,
  resetData
}) => {
  console.log(description);
  const initialValidation = {
    value: value.trim().length > 0,
    description: description.trim().length > 0,
    trm: trm.trim().length > 0,
    valueChanged: false,
    descriptionChanged: false,
    trmChanged: false
  };

  const [validation, seValidation] = useState(initialValidation);
  const validate = e => {
    if (e.target.name === "value") {
      seValidation({
        ...validation,
        value: e.target.value.trim().length > 0,
        valueChanged: true
      });
    } else if (e.target.name === "trm") {
      seValidation({
        ...validation,
        trm: e.target.value.trim().length > 0,
        trmChanged: true
      });
    } else {
      seValidation({
        ...validation,
        description: e.target.value.trim().length > 0,
        descriptionChanged: true
      });
    }
  };
  const validAndHandleCHnage = e => {
    handleChange(e);
    validate(e);
  };

  const submitDisabled = () => {
    if (edit) {
      return (
        (validation.valueChanged ||  validation.trmChanged) &&
        validation.value &&
        validation.trm
      );
    }
    return (
      validation.valueChanged &&
      validation.descriptionChanged &&
      validation.trmChanged &&
      validation.value &&
      validation.description &&
      validation.trm
    );
  };
  return (
    <div>
      <form>
        <h2> {edit ? "Editar Información" : "Agregar Información"} </h2>

        <InputNumeric
          titleField="Valor"
          nameField="value"
          onChangeField={validAndHandleCHnage}
          valueField={value}
          placeHolderField="Ingresar Valor"
        />

        <p
          className="error"
          style={{
            display:
              !validation.value && validation.valueChanged ? "block" : "none"
          }}
        >
          Valor Incorrecto
        </p>

        <InputNumeric
          titleField="TRM"
          nameField="trm"
          onChangeField={validAndHandleCHnage}
          valueField={trm}
          placeHolderField="Ingresar TRM"
        />
        <p
          className="error"
          style={{
            display:
              !validation.trm && validation.trmChanged ? "block" : "none"
          }}
        >
          TRM Incorrecto
          </p>

        <div>
          <h3> Descripción </h3>
          <select name="description" value={description} onChange={validAndHandleCHnage}>
            {optionsSelect.map(item => (
              <option selected={item.isSelect}  disabled={item.id === '-1'} value={item.id} >{item.name}</option>
            ))}

          </select>
        </div>


        <p
          className="error"
          style={{
            display:
              !validation.description && validation.descriptionChanged ? "block" : "none"
          }}
        >
          Seleccione Descripción
          </p>


          <div>
        <button
          className={`bt  ${submitDisabled() ? "bt-good" : "bt-disabled"}`}
          type="button"
          onClick={handleSubmit}
        >
          {edit ? "Editar" : "Agregar"}
        </button>

        <button type="button" className="bt" onClick={close}>
          Cerrar
        </button>

        <button
          className="bt bt-good"
          type="button"
          onClick={resetData}
          style={{
            display:
            !edit ? "block" : "none"
          }}
        >
          Limpiar Información
        </button>

        </div>

      </form>
    </div>
  );
};

FormData.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  trm: PropTypes.string.isRequired,
  edit: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired
};

export default FormData;