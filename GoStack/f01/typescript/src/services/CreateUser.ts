/**
 * Para crar um usuário utilizaremos, email e passaword
 */

interface TechObject {
  title: string;
  experience: number;
}

interface CreateUserData {
  name?: String;
  email: String;
  password: String;
  //techs: Array< string | TechObject >;
  techs: string[];//OU quando for somente em um único formato
}

export default function createUser({ name, email, password }: CreateUserData) {
  const user = {
    name,
    email,
    password
  }

  return user;
}