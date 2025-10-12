import { hash, compare } from "bcrypt";

export class Hash {
  SALT_ROUNDS = 12;

  HashPassword = async (password: string): Promise<string> => {
    return await hash(password, this.SALT_ROUNDS);
  };

  ComparePassword = async (
    password: string,
    hashedPassword: string
  ): Promise<boolean> => {
    return await compare(password, hashedPassword);
  };
}
