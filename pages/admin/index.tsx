import React from 'react';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = (context) => {
  return { props: { name: 'kalat' } };
};

const Admin = ({ name }) => {
  return (
    <>
      <h1>{name}: You are an admin</h1>
    </>
  );
};

export default Admin;
