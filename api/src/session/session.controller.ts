import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { SessionService } from './session.service';
import { MessageDTO } from './session.dto';

@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post('save-message')
  async saveMessage(
    @Body() message: MessageDTO,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const name = req.session.name;

    if (!name) {
      return res.status(403).send('Forbidden: No active session');
    }

    await this.sessionService.addMessage(name, message);

    return res.json({ message: 'Message saved successfully' });
  }

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

    const nameExists = await this.sessionService.exists(name);
    if (nameExists) {
      return res.status(409).json({
        message: 'Name already exists in the database.',
      });
    }

    req.session.regenerate(async (err) => {
      if (err) {
        return res.status(500).send('Error regenerating session');
      }
      const expireInMs = 3600000;

      req.session.name = name;

      req.session.cookie.expires = new Date(Date.now() + expireInMs);
      req.session.cookie.maxAge = expireInMs;

      await this.sessionService.create(name);

      return res.json({ message: 'Name stored in new session', name });
    });
  }

  @Post('end-session')
  async endSession(@Req() req: Request, @Res() res: Response) {
    const name = req.session.name;

    if (!name) {
      return res.status(403).send('Forbidden: No active session');
    }

    await this.sessionService.endSession(name);

    req.session.destroy((err) => {
      if (err) {
        return res.status(500).send('Error ending session');
      }

      res.clearCookie('connect.sid');
      return res.json({ message: 'Session ended successfully' });
    });
  }

  @Get('chat')
  Chat(@Req() req: Request, @Res() res: Response) {
    if (req.session.name) {
      res.send(200);
    } else {
      res.status(403).send('Forbidden: No active session');
    }
  }
}
