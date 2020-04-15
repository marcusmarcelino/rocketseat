import { Request, Response } from 'express';
import createUser from './services/CreateUser';

export function helloWorld(request: Request, response: Response) {
  const user = createUser({
    email: 'marcus@gmail.com',
    password: '123456',
    techs: [
      'Node.js', 
      'ReactJS', 
      'React Native',
      //{ title: 'Javascript', experience: 100 },
      //{ title: 'React Native', experience: 1000 }
    ],
  });
  
  console.log(user.email);

  return response.json({ message: 'Hello Wordl' });
}