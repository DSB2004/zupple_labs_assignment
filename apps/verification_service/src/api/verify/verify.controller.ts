import { Controller, Post, Body } from '@nestjs/common';
import { VerifyService } from './verify.service';
import { VerifyDTO } from './verify.dto';

@Controller('verify')
export class VerifyController {
  constructor(private readonly service: VerifyService) {}

  @Post()
  async handleVerify(@Body() data: VerifyDTO) {
    return this.service.verify(data);
  }
}
