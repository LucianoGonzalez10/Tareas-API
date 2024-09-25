const url = "http://localhost:3000/";

export async function getTareas() {
    try{
        const response = await fetch(`${url}tareas`,{method: 'GET'});
        if(!response.ok){
            throw new Error(`Error: ${response.status}`);
        }
        return await response.json();
    }
    catch(error){
        console.log(error);
    }
}

export async function postTareas(tarea) {
    let cabecera = new Headers();
    cabecera.append("Content-Type", "application/json");
    
    let inicializador = {
        method: 'POST',
        headers: cabecera,
        body: JSON.stringify({name: tarea})
    };
    try{
        const response = await fetch(`${url}tareas`, inicializador);
        if(!response.ok){
            throw new Error(`Error: ${response.status}`);
        }
        return await response.json(); 
    }
    catch(error){
        console.log(error);
        throw error;
    }
}

export async function putTareas(tarea, id) {    
    const response = await fetch(`${url}tareas/${id}`, {
        method: 'PUT',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({name: tarea})
        });
    try{
        if(!response.ok){
            throw new Error(`Error: ${response.status}`);
        }
        return await response.json();
    }
    catch(error){
        console.log(error);
        throw error;
}
};

export async function deleteTareas(id) {
    try{
        const response = await fetch(`${url}tareas/${id}`,{method: 'DELETE'});
        if(!response.ok){
            throw new Error(`Error: ${response.status}`);
        }
        return true;
    }
    catch(error){
        console.log(error);
    }
    
}
