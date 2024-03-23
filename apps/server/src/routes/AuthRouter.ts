import express, { Request, Response } from 'express';
import { IAuth } from '../types/types';
import { Router } from 'express-serve-static-core';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const sendEmail = require('../Notfications/Notfications');

class AuthRouter implements IAuth {
  router: Router;
  model: any;

  constructor(model: any) {
    this.router = express.Router();
    this.model = model;
    this.initializeRoutes();
  }

  public register = async (req: Request, res: Response): Promise<void> => {
    const { email, password, role, username } = req.body;
    const roleString = role ? 'Teacher' : 'Student';
    const bycryptPassword = await bcrypt.hash(password, 10);
    try {
      const user = await this.model.create({
        email,
        password: bycryptPassword,
        role: roleString,
        username
      });
      const token = jwt.sign({ user }, process.env.JWT_SECRET as string, {
        expiresIn: 60 * 60
      });
      sendEmail(
        email,
        'Registered to our Website',
        username
      );
      res.status(201).json({ email, roleString, username, token, _id: user._id });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  public login = async (req: Request, res: Response): Promise<void> => {
    try {
      const user = await this.model.findOne
      ({ email: req.body.email });
      if (!user) {
        throw new Error('Invalid credentials, please try again');
      }
      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (!isMatch) {
        throw new Error('Invalid credentials, please try again');
      }
      const token = jwt.sign({ user },
        process.env.JWT_SECRET as string,
        { expiresIn: 60 * 60 });
      const { email, role, username, _id } = user;
      res.status(200).json({ email, role, username, _id, token });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  initializeRoutes(): void {
    this.router.post('/register', this.register);
    this.router.post('/login', this.login);
  }


}

export default AuthRouter;
