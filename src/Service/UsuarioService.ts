import UsuarioDAO from "../dao/dao";

export default class UsuarioService {

    public static Cadastrar <Usuario> (usuario: Usuario) {
        if(usuario === null) return null;

       return UsuarioDAO.Cadastrar(usuario);

    }

}