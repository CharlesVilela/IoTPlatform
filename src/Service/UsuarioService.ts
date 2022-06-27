import Usuario from "../entities/model/Usuario";
import usuarioInterface from "../entities/Interfaces/UsuarioInterface";
import FieldValidation from "../validations/FieldValidation";
import { Exception } from "handlebars/runtime";


class UsuarioService {

    public async cadastrar(usuario: usuarioInterface): Promise<usuarioInterface> {

        try {
            console.log(usuario.nomeUsuario);
            if (usuario.nomeUsuario === "" || usuario.email === "" || usuario.senha === "") {
                throw new FieldValidation("Os campos: nome de usuario, e-mail e senha não podem ser vazios. Verifique e tente novamente!");
            }

            if (usuario.senha.trim().length < 8 || usuario.senha.trim().length > 16) {
                throw new Error(
                    "Senha Inválida. O campo: senha do usuário deve ter entre 8 e 16 caracteres!"
                );
            }
            return usuario;

        } finally { }
    }
}

export default new UsuarioService();
