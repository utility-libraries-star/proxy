import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Meta } from './meta.entity';

@Injectable()
export class MetaService {
  constructor(
    @InjectRepository(Meta)
    private repo: Repository<Meta>
  ) {}

  async create(data: Partial<Meta>): Promise<Meta> {
    const entity = this.repo.create(data);
    return this.repo.save(entity);
  }

  async findById(id: string): Promise<Meta | null> {
    return this.repo.findOne({ where: { id } });
  }
}
