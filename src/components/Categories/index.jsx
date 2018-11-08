import React from 'react';
import withStyles from 'react-jss';
import Category from './Category';

const style = (theme) => ({
  catContainer: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    left: 0,
    fallbacks: [{ width: '100%' }, { bottom: '0' }],
    height: theme.headerHeight,
  },
  catWrapper: {
    width: 750,
    margin: '0 auto',
    height: theme.headerHeight,
    borderTopLeftRadius: theme.categorySize / 8,
    borderTopRightRadius: theme.categorySize / 8,
    overflow: 'hidden',
    backgroundColor: theme.darker,
    borderTop: theme.getBorder(theme.lighter)
  },
  placeholder: {
    height: theme.headerHeight, marginTop: theme.headerHeight / 5, width: '100%',
  },
  [theme.smaller]: {
    catWrapper: {
      width: '100%',
      height: theme.headerHeight * 0.8,
      borderRadius: 0,
    },
    placeholder: {
      height: theme.headerHeight * 0.8,
    },
  }
});

const Categories = ({ classes, categories, selected, handleClick }) => {
  return (
    <React.Fragment>
      <div className={classes.catContainer}>
        <div className={classes.catWrapper}>
          {categories.map(cat => (
            <Category
              id={cat}
              selected={cat === selected}
              handleClick={handleClick}
              key={cat} />
          ))}</div>
      </div>
      <div className={classes.placeholder}></div>
    </React.Fragment>
  )
};


export default withStyles(style)(Categories);