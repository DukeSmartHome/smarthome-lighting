{
  'ledGroup': {
    width: 700,
    height: 120,
    margin: 'auto',
    marginBottom: 10,
    textAlign: 'left',
    borderRadius: 6,
    color: 'black',
    background: 'rgba(255, 255, 255, 0.8)',
    cursor: 'pointer'
  },
  'ledGroup .name': {
    fontSize: '2em',
    float: 'left',
    height: 70,
    lineHeight: 70,
    marginLeft: 30,
    width: '100%'
  },
  'ledFunc': {
    textTransform: 'capitalize',
    background: 'rgba(255, 255, 255, 0.8)',
    display: 'inline-block',
    float: 'left',
    padding: '6px 12px',
    borderRadius: 6,
    marginLeft: 10,
    color: 'fff'
  },
  'ledFunc.off': {marginLeft: 30, backgroundColor: '333', borderColor: '111'},
  'ledFunc.on': {backgroundColor: 'f0ad4e', borderColor: 'eea236'},
  'ledFunc.warm':
      {color: '888', backgroundColor: 'ecd863', borderColor: 'f0ad4e'},
  'ledFunc.high':
      {color: '555', backgroundColor: 'ebec63', borderColor: 'bcbc4f'},
  'ledFunc.red': {backgroundColor: 'd9534f', borderColor: 'd43f3a'},
  'ledFunc.green': {backgroundColor: '5cb85c', borderColor: '4cae4c'},
  'ledFunc.blue': {backgroundColor: '337ab7', borderColor: '2e6da4'},
  'ledFunc.party': {
    background:
        'linear-gradient(135deg, #f43030 0%, #34f731 49%, #1433ff 100%)',
    fallbacks: [
      {
        background:
            '-webkit-linear-gradient(-45deg, #f43030 0%, #34f731 49%, #1433ff 100%)'
      },
      {
        background:
            '-moz-linear-gradient(-45deg, #f43030 0%, #34f731 49%, #1433ff 100%)'
      },
      {background: 'f43030'}
    ]
  },
  '@media (max-width: 750px)': {
    'ledGroup':
        {height: 135, width: '100%', marginBottom: 5, borderRadius: '0'},
    'ledGroup .name': {
      width: '100%',
      margin: '0',
      textAlign: 'center',
      fontSize: '1.3em',
      lineHeight: 50,
      height: 45
    },
    'ledFunc': {
      display: 'inline-block',
      float: 'left',
      textAlign: 'center',
      fontSize: '9em',
      borderRadius: 6,
      marginLeft: '0',
      color: 'fff',
      width: '23%',
      margin: '5px 1%',
      height: 32,
      boxSizing: 'border-box',
      fallbacks: [{borderRadius: '0'}]
    },
    'ledFunc.off': {marginLeft: '1%'},
    'vSpace': {height: 70},
  }
};