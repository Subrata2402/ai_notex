import React from 'react';
import SideBar from './sidebar/SideBar';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Fab } from '@mui/material';
import { GrAdd } from 'react-icons/gr';
import { SnackbarProvider } from 'notistack';

function Layout() {
  const location = useLocation();

  return (
    <SnackbarProvider maxSnack={3}>
      <div className="layout">
        <SideBar />
        <Outlet />
      </div>

      {/* Add a floating action button to add notes */}
      {
        location.pathname === '/' &&
        <Link to='/add-notes'>
          <Fab color="primary" aria-label="add" className='add-notes-button'>
            <GrAdd size={30} />
          </Fab>
        </Link>
      }
    </SnackbarProvider>
  )
}

export default Layout;