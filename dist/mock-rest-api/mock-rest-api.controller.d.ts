import { MockRestApiService } from './mock-rest-api.service';
export declare class MockRestApiController {
    private readonly mockRestApiService;
    constructor(mockRestApiService: MockRestApiService);
    getData(email: any): Promise<any>;
}
