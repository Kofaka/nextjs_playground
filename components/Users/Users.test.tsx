import { wait, render, screen } from 'test-utils';
import { GraphQLError } from 'graphql';
// Api
import { GET_USERS } from 'api/users/queries';
// Types
import { Users_users } from 'api/users/types/Users';
// Helpers
import { generateFakeEntities } from 'helpers/misc';
// Components
import Users, { fakeUsers } from './Users';

const MOCKED_REQUEST_ERROR_MESSAGE =
  'Cannot return null for non-nullable field Query.users.';

const MOCKED_GET_USERS_REQUEST = {
  request: {
    query: GET_USERS,
  },
  result: {
    data: {
      users: generateFakeEntities<Users_users>(
        { __typename: 'users' } as Users_users,
        ['name', 'rocket', 'twitter'],
        5
      ),
    },
  },
};

const MOCKED_GET_USERS_REQUEST_WITH_DELAY = {
  ...MOCKED_GET_USERS_REQUEST,
  delay: 600,
};

const MOCKED_GET_USERS_REQUEST_ERROR = {
  ...MOCKED_GET_USERS_REQUEST,
  result: {
    data: null,
    errors: [new GraphQLError(MOCKED_REQUEST_ERROR_MESSAGE)],
  },
  error: new Error(MOCKED_REQUEST_ERROR_MESSAGE),
};

describe('components/Users/Users', () => {
  it('should render basic components', async () => {
    render(<Users />, {
      wrapperProps: {
        mocks: [MOCKED_GET_USERS_REQUEST],
      },
    });
    await wait();
    await wait();

    expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument();

    ['Name', 'Rocket', 'Twitter'].forEach((name) => {
      expect(screen.getByText(name)).toBeInTheDocument();
    });

    MOCKED_GET_USERS_REQUEST.result.data.users.forEach(
      ({ name, rocket, twitter }) => {
        expect(screen.getByText(name as string)).toBeInTheDocument();
        expect(screen.getByText(rocket as string)).toBeInTheDocument();
        expect(screen.getByText(twitter as string)).toBeInTheDocument();
      }
    );
  });

  it('should render the loader while GET_USERS query processing', async () => {
    render(<Users />, {
      wrapperProps: {
        mocks: [MOCKED_GET_USERS_REQUEST_WITH_DELAY],
      },
    });

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

    // Table with users
    MOCKED_GET_USERS_REQUEST_WITH_DELAY.result.data.users.forEach(
      ({ name }) => {
        expect(screen.queryByText(name as string)).not.toBeInTheDocument();
      }
    );

    await wait(MOCKED_GET_USERS_REQUEST_WITH_DELAY.delay);
    await wait();

    expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument();
  });

  it('should render the "fakeUsers" in case GET_USERS query have "Cannot return null for non-nullable field Query.users." error', async () => {
    render(<Users />, {
      wrapperProps: {
        mocks: [MOCKED_GET_USERS_REQUEST_ERROR],
      },
    });
    await wait();
    await wait();

    fakeUsers.slice(0, 9).forEach(({ name, rocket, twitter }) => {
      expect(screen.getByText(name as string)).toBeInTheDocument();
      expect(screen.getByText(rocket as string)).toBeInTheDocument();
      expect(screen.getByText(twitter as string)).toBeInTheDocument();
    });
  });
});
