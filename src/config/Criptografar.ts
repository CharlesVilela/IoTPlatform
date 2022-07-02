import crypto from 'crypto';

class Criptografar {

    DADOS_CRIPTOGRAFAR = {
        algoritmo: "aes256",
        codificacao: "utf8",
        segredo: "chaves",
        tipo: "hex"
    };

    public async criptografar(senha: string): Promise<String> {
        const cipher = crypto.createCipher(this.DADOS_CRIPTOGRAFAR.algoritmo, this.DADOS_CRIPTOGRAFAR.segredo);
        cipher.update(senha);
        const senhaCripto = cipher.final(this.DADOS_CRIPTOGRAFAR.tipo);

        return senhaCripto;
    };

    public async descriptografar(senha: string): Promise<String> {
        const decipher = crypto.createDecipher(this.DADOS_CRIPTOGRAFAR.algoritmo, this.DADOS_CRIPTOGRAFAR.segredo);
        decipher.update(Buffer.from(senha, "hex"));
        return decipher.final().toString();
    };

}

export default new Criptografar;