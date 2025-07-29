import { Repository } from 'typeorm';
import { Meta } from './meta.entity';
export declare class MetaService {
    private repo;
    constructor(repo: Repository<Meta>);
    create(data: Partial<Meta>): Promise<Meta>;
    findById(id: string): Promise<Meta | null>;
}
