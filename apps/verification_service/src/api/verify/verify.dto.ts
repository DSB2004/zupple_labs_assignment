import { IsUUID ,IsString} from 'class-validator';

export class VerifyDTO {
  @IsString()
  credentialType: string;

  @IsUUID('4')
  userId: string;
}
