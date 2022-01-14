function hintCreator(){
    const hint = emptyData();

    return {
        hint: {
            ...hint,
            ...updateData(hint),
            ...deleteHint(hint.data),
        }
    }
}

function updateData(hint){
    const key = "updateData";
    const code = (args) => {
        //Fill in the blanks
        for(const [key, value] of Object.entries(args)){
           hint[key] = value;
        }
    }

    return createObjectTemplate(key, code);
}

function deleteHint(hint){
    const key = "deleteHint";
    const code = () => {
        //Fill in the blanks
    }

    return createObjectTemplate(key, code);
}

function createObjectTemplate(functionKey, code){
    const object = {};
    object[functionKey] = code;
    return object;
}

function emptyData(){
    return { 
        "data": {
            "id": 0,
            "text": "",
        }
    }
}

export {
    hintCreator
}