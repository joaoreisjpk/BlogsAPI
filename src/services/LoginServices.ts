import jwt from 'jsonwebtoken';
import { Users } from '../../models';

const secret = process.env.JWT_SECRET || '';
const jwtConfig: any = { expiresIn: '1d', algorithm: 'HS256' };

const Login = async ({ email }: {email: string}) => {
  const user = await Users.findOne({ where: { email }, raw: true });

  if (!user) return { status: 400, response: { message: 'Invalid fields' } };

  const token: any = jwt.sign({ data: email }, secret, jwtConfig);

  return { status: 200, response: { token } };
};

export default { Login };
