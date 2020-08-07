export default (theme) => ({
  modal: {
    marginTop: 'calc(10%)',
    marginLeft: 'calc(30%)',
  },
  paper: {
    position: 'absolute',
    maxWidth: '640px',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2),
  },
});
