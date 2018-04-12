import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const user = [
      { id: 11, username: 'justin' },
    ];
    return {user};
  }
}
