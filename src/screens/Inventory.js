import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import InventoryList from 'Containers/InventoryList';
import InventoryForm from 'Containers/InventoryForm';
import {ListAlt} from '@material-ui/icons';

export const Inventory = () => {
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <Grid
            container
            direction="column"
            className="outer-container"
        >
            <div className="primary-bg-light">
                <div className="page-header header-container">
                    <Button
                        variant="contained"
                        color="primary"
                        size="medium"
                        onClick={handleClick}
                        startIcon={<ListAlt />}
                    >
                        ADD NEW INVENTORY
                    </Button>
                </div>
                <div className="table-container">
                    <InventoryList />
                </div>
                <InventoryForm open={open} onClose={handleClose} />
            </div>
        </Grid>
    );
}

export default Inventory;
