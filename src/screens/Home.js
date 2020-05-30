import React from 'react';
import {
  Switch,
  Route
} from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';

import Dashboard from 'Screens/Dashboard';
import Patients from 'Screens/Patients';
import PatientDetail from 'Screens/PatientDetail';
import FacilityDetails from 'Screens/FacilityDetails';
import AddPatient from 'Screens/AddPatient';
import Hospitals from 'Screens/Patients/Hospitals';
import Hcc from 'Screens/Patients/Hcc';
import CareCenters from 'Screens/Patients/CareCenters';
import PrivateQuarantine from 'Screens/Patients/PrivateQuarantine';
import Transfer from 'Screens/Transfer';
import Facilities from 'Screens/Facilities';
import Profile from 'Screens/Profile';
import Inventory from 'Screens/Inventory';
import ManageUsers from 'Screens/Facilities/ManageUsers';
import DoctorAttendant from 'Screens/Facilities/DoctorAttendant';
import Beds from 'Screens/Facilities/Beds';
import Reports from 'Screens/Reports';
import Settings from 'Screens/Settings';
import ErrorPage from 'Screens/ErrorPage';
import NavigationPanel from 'Containers/NavigationPanel';
import MenuIcon from '@material-ui/icons/Menu';
import logo from 'Assets/images/logo.svg';

function Home() {
  const [open, setOpen] = React.useState(false);

    const toggleDrawer = (isOpen) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOpen(isOpen);
    };
    return (
        <React.Fragment>
            <Hidden mdUp>
                <div className="mob-header">
                        <Button onClick={toggleDrawer(true)}><MenuIcon /></Button>
                        <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
                            <NavigationPanel />
                        </Drawer>
                        <img className="mob-logo" src={logo} alt="covid care" />
                </div>
            </Hidden>
            <Grid container className="container-wrap">
                <Grid item md={2} className="container-wrap__navigation">
                    <Hidden smDown>
                        <NavigationPanel />
                    </Hidden>
                </Grid>
                <Grid item xs={12} md={10} className="full-heigh-container">
                    <Switch>
                        <Route exact path={`/`} component={Dashboard} />
                        <Route path={`/dashboard`} component={Dashboard} />
                        <Route path={`/facilities/beds`} component={Beds} />
                        <Route path={`/facilities/doctor-attendant`} component={DoctorAttendant} />
                        <Route path={`/facilities/manage-users`} component={ManageUsers} />
                        <Route path={`/facilities/:facilityId`} component={FacilityDetails} />
                        <Route path={`/facilities`} component={Facilities} />
                        <Route exact path={`/patients`} component={Patients} />
                        <Route path={`/patients/add`} component={AddPatient} />
                        <Route path={`/patients/hospitals`} component={Hospitals} />
                        <Route path={`/patients/hcc`} component={Hcc} />
                        <Route path={`/patients/care-centers`} component={CareCenters} />
                        <Route path={`/patients/private-quarantine`} component={PrivateQuarantine} />
                        <Route path={`/patients/:patientId`} component={PatientDetail} />
                        <Route path={`/transfer`} component={Transfer} />
                        <Route path={`/reports`} component={Reports} />
                        <Route path={`/settings`} component={Settings} />
                        <Route path={`/profile`} component={Profile} />
                        <Route path={`/inventory`} component={Inventory} />
                        <Route path={`/error/:errorCode`}>
                            <ErrorPage text="Oops! Error occured." />
                        </Route>
                        <Route path='*' exact={true}>
                            <ErrorPage title={404} text="Page Not Found!" />
                        </Route>
                    </Switch>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default Home;
