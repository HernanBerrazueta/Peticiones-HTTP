const jokeURL = 'https://api.chucknorris.io/jokes/random';
const usuariosURL = 'https://reqres.in/api/users?page=2';

//Cloudinary
const cloudPreset = 'mfyz9vu5';
const cloudURL    = 'https://api.cloudinary.com/v1_1/hernanberrazueta/upload';

const obtenerChiste = async () => {

    try {
        const resp = await fetch(jokeURL);
        if(!resp.ok) throw 'no se pudo realizar la petición';
        const { id, value } = await resp.json();
        return { id, value }
    } catch (error) {
        throw error;
        // return {
        //     id: 'No se encontro'
        // }
    }
}

const obtenerUsuarios = async() => {
    const resp = await fetch(usuariosURL);
    const {data:usuarios} = await resp.json();
    return usuarios;
}

const subirImagen = async(archivoSubir) => {
    const formData = new FormData();
    formData.append('upload_preset', cloudPreset);
    formData.append('file', archivoSubir);

    try {
        const resp = await fetch(cloudURL, {
            method: 'POST',
            body: formData
        });
        if(resp.ok){
            const cloudResp = await resp.json();
            console.log(cloudResp);
            return cloudResp.secure_url;
        } else {
            throw await resp.json();
        }
    } catch (error) {
        throw error;
    }
}

export {
    obtenerChiste,
    obtenerUsuarios,
    subirImagen
}
