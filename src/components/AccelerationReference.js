import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import InfoIcon from '@material-ui/icons/Info';

function SimpleDialog(props) {
  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle style={{ textAlign: "center" }} id="simple-dialog-title">Acceleration Reference</DialogTitle>
      <img src={require("./accelerometer_reference.png")} />
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default function SimpleDialogDemo() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ display: "inline-flex" }}>
      <Button  color="primary" style={{ minWidth:0, marginLeft: 10, padding:0 }} onClick={handleClickOpen}>
        <InfoIcon style={{ fontSize:'22px' }} />
      </Button>
      <SimpleDialog open={open} onClose={handleClose} />
    </div>
  );
}
