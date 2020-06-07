export const urlCreate = 'https://httpbin.org/post';
export const optionsSelect = [
    { id: '-1', name: 'Seleccione', isSelect: 'selected' },
    { id: '0', name: 'Item 1', isSelect: '' },
    { id: '1', name: 'Item 2', isSelect: '' },
    { id: '2', name: 'Item 3', isSelect: '' },
    { id: '3', name: 'Item 4', isSelect: '' },
    { id: '4', name: 'Item 5', isSelect: '' }
];

export const getTextDescription = idDesciption => {
    let nameSelect = optionsSelect.filter(element => element.id === idDesciption);
    if(nameSelect.length===0){
        return 'Información no disponible';
    }else {
        return nameSelect = nameSelect[0].name;
    }
};
