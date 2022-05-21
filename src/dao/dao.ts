import Usuario from "../model/Usuario";

export default class UsuarioDAO {
 
 public static async Cadastrar <Usuario> (usuario: Usuario) {
    await Usuario.create(usuario);
 }

}