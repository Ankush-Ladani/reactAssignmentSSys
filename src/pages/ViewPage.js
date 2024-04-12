import React, { Suspense, lazy } from 'react';
import { useMount, useSetState } from 'react-use';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { fetchUserData } from '../redux/action/UsersAction';
import UserCard from '../components/UserCard';
import ThemeToggle from '../components/ThemeToggle';

const Comp = lazy(() => import('../components/ListSkeleton'));

export default function ViewPage() {
  const navigate = useNavigate();
  const [state, setState] = useSetState({
    usersList: []
  });

  const getUsersList = async () => {
    const response = await fetchUserData();
    if (response.data) {
      if (response.data.data && response.data.data instanceof Array) {
        const usersList = response.data.data;
        setState({ usersList });
      }
    }
  };

  useMount(() => {
    getUsersList();
  });

  return (
    <div>
      ViewPage
      <Button onClick={() => navigate('/')} variant="outlined">
        Go to home page
      </Button>
      <ThemeToggle />
      <Suspense fallback={<Comp listsToRender={6} />}>
        {state.usersList.length == 0 ? (
          <Comp listsToRender={6} />
        ) : (
          state.usersList.map((user, index) => (
            <UserCard
              key={index}
              avatar={user.avatar}
              firstName={user.first_name}
              lastName={user.last_name}
              email={user.email}
              id={user.id}
              deleteButton
              getUsersList={getUsersList}
            />
          ))
        )}
      </Suspense>
      {/* {state.usersList.map((user, index) => (
        <UserCard
          key={index}
          avatar={user.avatar}
          firstName={user.first_name}
          lastName={user.last_name}
          email={user.email}
          id={user.id}
          deleteButton
          getUsersList={getUsersList}
        />
      ))} */}
    </div>
  );
}
