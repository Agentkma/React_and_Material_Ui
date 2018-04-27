import React, { Fragment } from "react";
import PropTypes from "prop-types";
import {
    Grid,
    Paper,
    Typography,
    IconButton,
    ListItemSecondaryAction
} from "material-ui";
import List, { ListItem, ListItemText } from "material-ui/List";
import { Edit, Delete } from "@material-ui/icons";
import Form from "./Form";

const styles = {
    paper: {
        padding: 20,
        marginTop: 10,
        marginBottom: 10,
        height: "70vh",
        overflowY: "auto"
    },
    rightPaperTypography: {
        padding: 20,
        marginTop: 10,
        marginBottom: 10
    },
    headline: {
        textTransform: "capitalize"
    }
};

const Exercises = ({
    exercises,
    muscles,
    category,
    exercise,
    exercise: {
        id,
        title = "Welcome!",
        description = "Please selected exercise from list on the left."
    },
    onSelect,
    onDelete,
    onSelectEdit,
    onEdit,
    editMode
}) => {
    // const { exercise } = this.props;
    const { paper, headline, rightPaperTypography } = styles;
    return (
        <Grid container>
            <Grid item sm>
                <Paper style={paper}>
                    {exercises.map(
                        ([group, exercises]) =>
                            !category || category === group ? (
                                <Fragment key={group}>
                                    <Typography
                                        variant="headline"
                                        style={headline}
                                    >
                                        {group}
                                    </Typography>

                                    <List component="ul">
                                        {exercises.map(({ id, title }) => (
                                            <ListItem
                                                button
                                                key={id}
                                                onClick={() => onSelect(id)}
                                            >
                                                <ListItemText primary={title} />
                                                <ListItemSecondaryAction>
                                                    <IconButton>
                                                        <Edit
                                                            onClick={() =>
                                                                onSelectEdit(id)
                                                            }
                                                        />{" "}
                                                    </IconButton>
                                                    <IconButton>
                                                        <Delete
                                                            onClick={() =>
                                                                onDelete(id)
                                                            }
                                                        />{" "}
                                                    </IconButton>
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                        ))}
                                    </List>
                                </Fragment>
                            ) : null
                    )}
                </Paper>
            </Grid>
            <Grid item sm>
                <Paper style={paper}>
                    {editMode ? (
                        <Form
                            muscles={muscles}
                            onSubmit={onEdit}
                            exercise={exercise}
                        />
                    ) : (
                        <Fragment>
                            <Typography
                                variant="display1"
                                style={rightPaperTypography}
                            >
                                {title}
                            </Typography>
                            <Typography
                                variant="subheading"
                                style={rightPaperTypography}
                            >
                                {description}
                            </Typography>
                        </Fragment>
                    )}
                </Paper>
            </Grid>
        </Grid>
    );
};

Exercises.propTypes = {
    muscles: PropTypes.array.isRequired,
    exercises: PropTypes.array.isRequired,
    exercise: PropTypes.object.isRequired,
    category: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onSelectEdit: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    editMode: PropTypes.bool.isRequired
};

export default Exercises;
