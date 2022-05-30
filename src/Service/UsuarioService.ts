import UsuarioDAO from "../dao/dao";

import status from "../config/statusCode";

export default class UsuarioService {

    public static Cadastrar <Usuario> (usuario: Usuario) {
        if(usuario === null) return null;
        
        UsuarioDAO.Cadastrar(usuario);
        
        return status.created;
    }

}