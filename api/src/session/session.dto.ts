import { IsString } from 'class-validator';

export class MessageDTO {
  @IsString()
  role: string;

  @IsString()
  content: string;
}
