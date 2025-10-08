import { Test, TestingModule } from '@nestjs/testing';
import { IssuanceService } from './issuance.service';
import { IssuanceController } from './issuance.controller';

describe('IssuanceService', () => {
  let service: IssuanceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IssuanceService, IssuanceController],
    }).compile();

    service = module.get<IssuanceService>(IssuanceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
