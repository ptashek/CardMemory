export default (theme) => ({
  card: {
    transformStyle: 'preserve-3d',
    transition: 'transform 0.15s ease-in-out',
    WebkitTransformStyle: 'preserve-3d',
  },
  faceCommon: {
    fontWeight: 700,
    marginTop: '20px',
    marginLeft: '20px',
    pointerEvents: 'none',
  },
  icon: {
    fontSize: '40px',
    color: theme.palette.primary.main,
  },
  avatar: {
    position: 'absolute',
    border: '3px solid black',
    color: theme.palette.white,
    backgroundColor: theme.palette.colors.coconut600,
  },
  cardContent: {
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden',
  },
  faceUp: {
    transform: 'rotateY(180deg)',
  },
});
