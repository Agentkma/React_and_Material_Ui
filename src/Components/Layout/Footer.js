import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { Paper } from 'material-ui';
import Tabs, { Tab } from 'material-ui/Tabs';

const styles = theme => ({
	root: {
		flexGrow: 1,
		marginTop: theme.spacing.unit * 3
	}
});

const Footer = ({ muscles, category, onSelect }) => {
	const index = category
		? muscles.findIndex(group => group === category) + 1
		: 0;

	const handleCategoryChange = (event, index) => {
		onSelect(index === 0 ? '' : muscles[index - 1]);
	};
	//TODO FIX THIS FUNCTION....DOESN'T RETURN THE TAB
	// CreateTab = () =>
	// 	this.state.muscles.map(group => <Tab label={group} key={group} />);

	// const { classes } = this.props;

	return (
		<Paper className={styles.root}>
			<Tabs
				value={index}
				onChange={handleCategoryChange}
				indicatorColor="primary"
				textColor="primary"
				centered
			>
				<Tab label="All" key="All" />
				{muscles.map(group => <Tab label={group} key={group} />)}
			</Tabs>
		</Paper>
	);
};

// Footer.propTypes = {
// 	classes: PropTypes.object.isRequired
// };

export default withStyles(styles)(Footer);
