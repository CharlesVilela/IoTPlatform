import * as EmailValidator from 'email-validator';
import UsuarioInterface from '../entities/Interfaces/UsuarioInterface';
import Usuario from '../entities/model/Usuario';

class Validations {

    public async validarPreenchimentoCamposObrigatorios(nome: string, nomeUsuario: string, email: string, senha: string): Promise<String> {

        if (nome === "" || nomeUsuario === "" || email === "" || senha === "") {
            return ("Os campos: nome, nome de usuario, e-mail e senha não podem ser vazios. Verifique e tente novamente!");
        }

        if (nome.length < 10) {
            return ("Campo Nome inválido. O campo: nome deve ter no minimo 10 caracteres!");
        }

        if (nomeUsuario.length < 4) {
            return ("Nome de Usuario inválido. O campo: nome de usuario teve ter no minimo 4 caracteres!");
        }

        if (senha.trim().length < 8 || senha.trim().length > 16) {
            return ("Senha Inválida. O campo: senha do usuário deve ter entre 8 e 16 caracteres!");
        }

        if (await this.validarEmail(email) == false) {
            return ("O E-mail informado é invalido. Informe um e-mail valido!");
        }

        return "";

    }

    public async validarEmail(email: string): Promise<boolean> {
        return EmailValidator.validate(email);
    }

    public async verifcarExisteUsuarioByEmail(email: string) {

        const buscar = await Usuario.findOne({ email: email });

        if (buscar != null) return buscar;

        return null;
    }

    public async verifcarExisteUsuarioById(id: string) {

        const buscar = await Usuario.findById(id);

        if (buscar != null) return buscar;

        return null;
    }

}

export default new Validations();