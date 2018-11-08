import React from 'react';
import withStyles from 'react-jss';

const style = (theme) => ({
  sortButton: {
    width: '16.66666%',
    height: theme.headerHeight * 0.8,
    float: 'left',
    position: 'relative',
    cursor: 'pointer',
    transition: 'color .6s',
    color: 'rgba(255, 255, 255, 0.8)',
    opacity: 0.6,
    '&:hover': { backgroundColor: theme.primary, color: 'white', opacity: 1 },
  },
  isSelected: { backgroundColor: theme.primary, color: 'white', opacity: 1 },
  title:
    { position: 'absolute', bottom: 8, width: '100%', textAlign: 'center' },
  icon: {
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundSize: theme.categorySize + 'px ' + theme.categorySize + 'px',
    position: 'absolute',
    top: 0,
    width: '100%',
    height: theme.categorySize * 1.5,
  },
  [theme.smaller]: {
    sortButton: {
      height: theme.headerHeight * 0.8,
    },
    title: {
      fontSize: '12px'
    },
    logo: {
      position: 'absolute',
      top: 5,
      width: '100%',
      height: 38
    },
    icon: {
      position: 'absolute',
      top: 5,
      width: '100%',
      height: 38
    }
  }
});

const Category = ({ id, classes, selected, handleClick }) => {
  const name = id.charAt(0).toUpperCase() + id.substr(1);
  return (
    <div
      className={`${classes.sortButton} ${selected ? classes.isSelected : null}`}
      onClick={() => handleClick(id)}
    >
      <div className={classes.title}>{name}</div>
      <div className={classes.icon} style={{
        backgroundImage: `url(./img/${id.toLowerCase()}_w.svg`
      }}>
      </div>
    </div>
  )
};


export default withStyles(style)(Category);