import React, { Fragment, Component } from "react";
import { Dialog, Button } from "material-ui";
import PropTypes from "prop-types";
import {
    DialogContent,
    DialogContentText,
    DialogTitle
} from "material-ui/Dialog";
import Add from "@material-ui/icons/Add";

import Form from "./Form";

class CreateDialog extends Component {
    state = {
        open: false
    };

    handleToggle = () => {
        this.setState({ open: !this.state.open });
    };

    handleFormSubmit = exercise => {
        this.handleToggle();
        this.props.onCreate(exercise);
    };
    render() {
        const { open } = this.state;

        const { muscles } = this.props;

        return (
            <Fragment>
                <Button variant="fab" mini onClick={this.handleToggle}>
                    <Add />
                </Button>
                <Dialog
                    open={open}
                    onClose={this.handleToggle}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">
                        Create New Exercise
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please fill out the form below...
                        </DialogContentText>
                        <Form
                            muscles={muscles}
                            onSubmit={this.handleFormSubmit}
                        />
                    </DialogContent>
                </Dialog>
            </Fragment>
        );
    }
}

CreateDialog.propTypes = {
    muscles: PropTypes.array.isRequired,
    onCreate: PropTypes.func.isRequired
};

export default CreateDialog;
