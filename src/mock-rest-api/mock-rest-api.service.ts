import { Injectable } from '@nestjs/common';

@Injectable()
export class MockRestApiService {
  // Data for an example. There should be a logic for getting data from Stripe on Production
  private account = [
    {
      id: 1,
      name: 'John Doe',
      payments: true,
      email: 'john.doe@example.com',
      dashboard: 'https://example.com/dashboard/john',
      options: {
        setting1: true,
        setting2: false
      }
    },
    {
      id: 2,
      name: 'Jane Smith',
      payments: false,
      email: 'jane.smith@example.com',
      dashboard: '',
      options: {
        setting1: false,
        setting2: true
      }
    },
    {
      id: 3,
      name: 'Alice Johnson',
      payments: true,
      email: 'alice.johnson@example.com',
      dashboard: 'https://example.com/dashboard/alice',
      options: {
        setting1: true,
        setting2: true
      }
    },
    {
      id: 4,
      name: 'Bob Williams',
      payments: false,
      email: 'bob.williams@example.com',
      dashboard: '',
      options: {
        setting1: false,
        setting2: false
      }
    },
    {
      id: 5,
      name: 'Emily Brown',
      payments: true,
      email: 'emily.brown@example.com',
      dashboard: 'https://example.com/dashboard/emily',
      options: {
        setting1: true,
        setting2: false
      }
    },
    {
      id: 6,
      name: 'Michael Davis',
      payments: true,
      email: 'michael.davis@example.com',
      dashboard: 'https://example.com/dashboard/michael',
      options: {
        setting1: true,
        setting2: true
      }
    },
    {
      id: 7,
      name: 'Sarah Wilson',
      payments: false,
      email: 'sarah.wilson@example.com',
      dashboard: '',
      options: {
        setting1: false,
        setting2: true
      }
    },
    {
      id: 8,
      name: 'David Martinez',
      payments: true,
      email: 'david.martinez@example.com',
      dashboard: 'https://example.com/dashboard/david',
      options: {
        setting1: true,
        setting2: false
      }
    },
    {
      id: 9,
      name: 'Laura Rodriguez',
      payments: false,
      email: 'laura.rodriguez@example.com',
      dashboard: '',
      options: {
        setting1: false,
        setting2: true
      }
    },
    {
      id: 10,
      name: 'Kevin Lee',
      payments: true,
      email: 'kevin.lee@example.com',
      dashboard: 'https://example.com/dashboard/kevin',
      options: {
        setting1: true,
        setting2: true
      }
    }
  ];

  getDashboardLink(email: string) {
    const currentAccount = this.account.find(
      ({ email: accountEmail }) => accountEmail === email
    );

    if (currentAccount) {
      return { link: currentAccount.dashboard };
    }

    // Moving to Login page
    return { link: 'https://example.com/dashboard/login' };
  }
}
