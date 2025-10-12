import { Body, Controller, Post, Get } from '@nestjs/common';
import { IssuanceService } from './issuance.service';
import { IssueCredentialDTO } from './issuance.dto';

@Controller('issuance')
export class IssuanceController {
  constructor(private readonly service: IssuanceService) {}

  @Get()
  handleHealth() {
    return 'Working Fine!';
  }

  @Post()
  async handleCredIssuance(@Body() body: IssueCredentialDTO) {
    return await this.service.issueCred(body);
  }
}
