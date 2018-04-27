import React, { Component, Fragment } from "react";
import CssBaseline from "material-ui/CssBaseline";
import { createMuiTheme, MuiThemeProvider } from "material-ui/styles";
import red from "material-ui/colors/red";

import { Footer, Header } from "./Layout";
import Exercises from "./Exercises";

import { exercises, muscles } from "../store";

const theme = createMuiTheme({
    palette: {
        primary: red
    }
});

class App extends Component {
    state = {
        exercises,
        exercise: {},
        editMode: false
    };

    getExercisesByMuscles() {
        return Object.entries(
            this.state.exercises.reduce((exercises, exercise) => {
                const { muscles } = exercise;

                exercises[muscles] = exercises[muscles]
                    ? [...exercises[muscles], exercise]
                    : [exercise];
                return exercises;
            }, {})
        );
    }
    handleExerciseSelected = id => {
        this.setState(({ exercises }) => ({
            exercise: exercises.find(ex => ex.id === id),
            editMode: false
        }));
    };
    handleCategorySelected = category => {
        this.setState({ category });
    };

    handleExerciseCreate = exercise => {
        this.setState(({ exercises }) => ({
            exercises: [...exercises, exercise]
        }));
    };
    handleExerciseDeleted = id => {
        this.setState(({ exercises, exercise, editMode }) => ({
            exercises: exercises.filter(ex => ex.id !== id),
            editMode: exercise.id === id ? false : editMode,
            exercise: exercise.id === id ? {} : exercise
        }));
    };

    handleExerciseSelectEdited = id => {
        this.setState(({ exercises }) => ({
            exercise: exercises.find(ex => ex.id === id),
            editMode: true
        }));
    };

    handleExerciseEdited = exercise => {
        this.setState(({ exercises }) => ({
            exercises: [
                ...exercises.filter(ex => ex.id !== exercise.id),
                exercise
            ],
            exercise,
            editMode: false
        }));
    };

    render() {
        const exercises = this.getExercisesByMuscles(),
            { category, exercise, editMode } = this.state;
        return (
            <MuiThemeProvider theme={theme}>
                <Fragment>
                    <CssBaseline />
                    <Header
                        muscles={muscles}
                        onExerciseCreate={this.handleExerciseCreate}
                    />
                    <Exercises
                        exercise={exercise}
                        category={category}
                        exercises={exercises}
                        muscles={muscles}
                        onSelect={this.handleExerciseSelected}
                        onDelete={this.handleExerciseDeleted}
                        onSelectEdit={this.handleExerciseSelectEdited}
                        onEdit={this.handleExerciseEdited}
                        editMode={editMode}
                    />
                    <Footer
                        muscles={muscles}
                        category={category}
                        onSelect={this.handleCategorySelected}
                    />
                </Fragment>
            </MuiThemeProvider>
        );
    }
}

export default App;
