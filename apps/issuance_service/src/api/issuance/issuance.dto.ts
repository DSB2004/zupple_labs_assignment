import { IsString, IsUUID } from 'class-validator';

export class IssueCredentialDTO {
  @IsString()
  credentialType: string;

  @IsUUID('4')
  userId: string;
}
