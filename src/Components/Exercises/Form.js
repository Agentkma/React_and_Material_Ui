import React, { Component } from "react";
import { TextField, Button } from "material-ui";
import { InputLabel } from "material-ui/Input";
import { MenuItem } from "material-ui/Menu";
import { FormControl } from "material-ui/Form";
import Select from "material-ui/Select";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";

const styles = theme => ({
    formControl: {
        minWidth: 500
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2
    }
});

class Form extends Component {
    state = this.getInitialState();

    getInitialState() {
        const { exercise } = this.props;
        return exercise
            ? exercise
            : {
                  title: "",
                  description: "",
                  muscles: ""
              };
    }

    static getDerivedStateFromProps({ exercise }) {
        return exercise || null;
    }
    handleToggle = () => {
        this.setState({ open: !this.state.open });
    };

    handleSubmit = () => {
        //TODO: validate
        const { exercise } = this.props;

        this.props.onSubmit({
            // by using ...this.state AFTER the id: ... IF this.state already
            //has an id key then it will overide the one above.....
            //which is the case when editing
            id: this.state.title.toLocaleLowerCase().replace(/ /g, "-"),
            ...this.state
        });

        this.setState(this.getInitialState());
    };

    handleChange = name => ({ target: { value } }) => {
        this.setState({
            [name]: value
        });
    };
    render() {
        const { muscles: categories, classes, exercise } = this.props,
            { title, description, muscles } = this.state;

        return (
            <form>
                <TextField
                    className={classes.formControl}
                    label="Title"
                    value={title}
                    onChange={this.handleChange("title")}
                    margin="normal"
                />
                <br />
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="muscles">Muscles</InputLabel>
                    <Select
                        className={classes.formControl}
                        value={muscles}
                        onChange={this.handleChange("muscles")}
                    >
                        {categories.map(category => {
                            return (
                                <MenuItem key={category} value={category}>
                                    {category}
                                </MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>
                <br />

                <TextField
                    className={classes.formControl}
                    multiline
                    rows="4"
                    label="Description"
                    value={description}
                    onChange={this.handleChange("description")}
                    margin="normal"
                />
                <br />

                <Button
                    onClick={this.handleSubmit}
                    color="primary"
                    variant="raised"
                >
                    {exercise ? "Edit" : "Create"}
                </Button>
            </form>
        );
    }
}
Form.propTypes = {
    classes: PropTypes.object.isRequired,
    muscles: PropTypes.array.isRequired
};

export default withStyles(styles)(Form);
