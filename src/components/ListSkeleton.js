import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { deleteUserData } from '../redux/action/UsersAction';
import UpdateUserModal from '../pages/UpdateUserModal';

export const UserSkeleton = (props) => {
  const [open, setOpen] = useState(false);

  const deleteUser = async (id) => {
    await deleteUserData(id);
    await props.getUsersList();
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card sx={{ display: 'flex', marginBottom: '16px' }}>
      <div
        style={{
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          marginRight: '16px',
          backgroundColor: 'gray'
        }}></div>

      <div sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <div
            style={{
              width: '220px',
              height: '30px',
              backgroundColor: 'gray'
            }}></div>
          <div
            style={{
              width: '220px',
              height: '30px',
              marginTop: '5px',
              backgroundColor: 'gray'
            }}></div>
          <div
            style={{
              width: '220px',
              height: '30px',
              marginTop: '5px',
              backgroundColor: 'gray',
              marginBottom: '5px'
            }}></div>
          <div style={{ display: 'flex' }}>
            <div
              style={{
                width: '105px',
                height: '30px',
                marginTop: '5px',
                marginRight: '10px',
                backgroundColor: 'gray'
              }}></div>
            <div
              style={{
                width: '105px',
                height: '30px',
                marginTop: '5px',
                backgroundColor: 'gray'
              }}></div>
          </div>
        </CardContent>
      </div>
      <UpdateUserModal
        name={`${props.firstName} ${props.lastName}`}
        id={props.id}
        open={open}
        handleClose={handleClose}
        getUsersList={props.getUsersList}
      />
    </Card>
  );
};

UserSkeleton.propTypes = {
  avatar: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string,
  id: PropTypes.number,
  getUsersList: PropTypes.func
};

const ListSkeleton = ({ listsToRender }) => {
  return (
    <>
      {Array(listsToRender)
        .fill(1)
        .map((card, index) => (
          <UserSkeleton key={index} />
        ))}
    </>
  );
};

export default ListSkeleton;
