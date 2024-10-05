import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { SessionService } from './session.service';

@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post('set-name')
  async setName(
    @Body('name') name: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const nameRegex = /^[A-Za-z\s]+$/;

    if (!name || !nameRegex.test(name.trim())) {
      return res.status(400).json({
        message: 'Invalid name. Only letters are allowed.',
      });
    }

    req.session.regenerate(async (err) => {
      if (err) {
        return res.status(500).send('Error regenerating session');
      }

      req.session.name = name;

      req.session.cookie.expires = new Date(Date.now() + 500000);
      req.session.cookie.maxAge = 500000;

      await this.sessionService.create(name);

      return res.json({ message: 'Name stored in new session', name });
    });
  }

  @Post('end-session')
  endSession(@Req() req: Request, @Res() res: Response) {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).send('Error ending session');
      }

      res.clearCookie('connect.sid');
      return res.json({ message: 'Session ended successfully' });
    });
  }

  @Get('chat')
  helloWorld(@Req() req: Request, @Res() res: Response) {
    if (req.session.name) {
      res.send(200);
    } else {
      res.status(403).send('Forbidden: No active session');
    }
  }
}
