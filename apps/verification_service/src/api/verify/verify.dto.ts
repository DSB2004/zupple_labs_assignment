import { IsUUID, IsString } from 'class-validator';

export class VerifyDTO {
  @IsString()
  credentialSecret: string;

  @IsUUID('4')
  userId: string;
}
