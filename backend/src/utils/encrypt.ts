import bcrypt from 'bcrypt';

const encrypt = {
  async hash(senha: string, nivel = 8): Promise<string | null> {
    try {
      const dificuldade = await bcrypt.genSalt(nivel);

      const senhaComHash = await bcrypt.hash(senha, dificuldade);

      return senhaComHash;
    } catch (e) {
      console.log(`hash failed with error ${e}`);
      return null;
    }
  },

  async validate(senha: string, senhaComHash: string): Promise<boolean> {
    try {
      return await bcrypt.compare(senha, senhaComHash);
    } catch (error) {
      console.log(error);
      return false;
    }
  },
};

export default encrypt;
