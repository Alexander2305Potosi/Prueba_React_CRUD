import React, { useState } from "react";
import { connect } from "react-redux";
import AddData from "./AddData";
import EditData from "./EditData";
import Modal from "../components/Modal";
import { DELETE_DATA } from "../actions/Actions";
import { getTextDescription } from "../utils";

const mapStateToProps = state => {
  const { dataList } = state;
  return { dataList };
};
const mapDispatchToProps = dispatch => {
  return {
    removeItem: key => dispatch({ type: DELETE_DATA, key })
  };
};
const ListData = ({ dataList, removeItem }) => {
  const initialModalState = {
    visible: false,
    editMode: false,
    itemId: ""
  };
  const [editorState, setEditorlState] = useState(initialModalState);

  const openAddItem = () => {
    setEditorlState({ visible: true, editMode: false, itemId: "" });
  };

  const openEditItem = key => {
    setEditorlState({ visible: true, editMode: true, itemId: key });
  };

  const close = e => {
    setEditorlState({ visible: false, editMode: false, itemId: "" });
  };

  return (
    <div>
      <h1>Listado de Información</h1>


      <button type="button" className="bt bt-good bt-add" onClick={openAddItem}>
        Agregar Información
      </button>
      <Modal visible={editorState.visible} close={close}>
        {editorState.editMode ? (
          <EditData itemId={editorState.itemId} close={close} />
        ) : (
            <AddData close={close} />
          )}
      </Modal>

      <table class="table border shadow">
        <thead class="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Valor</th>
            <th scope="col">Descripcion</th>
            <th scope="col">TRM</th>
            <th>Accion</th>
          </tr>
        </thead>
        <tbody>
          {dataList.map((item, index) => (
            <tr>
              <th scope="row">{index + 1}</th>
              <td>{item.value}</td>
              <td>{getTextDescription(item.description)}</td>
              <td>{item.trm}</td>
              <td>
                <button type="button" className="bt" onClick={() => {
                  openEditItem(item.key);
                }}>
                  Editar
        </button>
                <button className="bt bt-danger" type="button" onClick={() => {
                  removeItem(item.key);
                }}>
                  Eliminar
        </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(ListData);
