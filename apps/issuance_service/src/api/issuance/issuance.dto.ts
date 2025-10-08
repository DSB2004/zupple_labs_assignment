import { IsString, IsUUID } from 'class-validator';

export class IssueCredentialDTO {
  @IsString()
  credentialSecret: string;

  @IsUUID('4')
  userId: string;
}
