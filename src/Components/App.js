import React, { Component, Fragment } from 'react';

import { Footer, Header } from './Layout';
import Exercises from './Exercises';
import { exercises, muscles } from '../store';

class App extends Component {
	state = {
		exercises,
		exercise: {}
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
			exercise: exercises.find(ex => ex.id === id)
		}));
	};
	handleCategorySelected = category => {
		this.setState({ category });
	};

	render() {
		const exercises = this.getExercisesByMuscles(),
			{ category, exercise } = this.state;
		return (
			<Fragment>
				<Header />
				<Exercises
					exercise={exercise}
					category={category}
					exercises={exercises}
					onSelect={this.handleExerciseSelected}
				/>
				<Footer
					muscles={muscles}
					category={category}
					onSelect={this.handleCategorySelected}
				/>
			</Fragment>
		);
	}
}

export default App;
