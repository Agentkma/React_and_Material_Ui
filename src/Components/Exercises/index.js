import React, { Fragment } from 'react';
import { Grid, Paper, Typography } from 'material-ui';
import List, { ListItem, ListItemText } from 'material-ui/List';

const styles = {
	paper: {
		padding: 20,
		marginTop: 10,
		marginBottom: 10,
		height: '70vh',
		overflowY: 'auto'
	},
	rightPaperTypography: {
		padding: 20,
		marginTop: 10,
		marginBottom: 10
	},
	headline: {
		textTransform: 'capitalize'
	}
};

const Exercises = ({
	exercise: {
		id,
		title = 'Welcome!',
		description = 'Please selected exercise from list on the left.'
	},
	exercises,
	category,
	onSelect
}) => {
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
					<Typography variant="display1" style={rightPaperTypography}>
						{title}
					</Typography>
					<Typography
						variant="subheading"
						style={rightPaperTypography}
					>
						{description}
					</Typography>
				</Paper>
			</Grid>
		</Grid>
	);
};

export default Exercises;
