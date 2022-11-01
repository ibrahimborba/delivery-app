import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/HeaderProducts';
import TableDetails from '../components/TableCheckout';

export default function CustomerOrderDetails() {
  return (
    <>
      <Header />
      <TableDetails />
    </>
  );
}
