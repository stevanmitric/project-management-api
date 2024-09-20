export const permit = roles => (req, res, next) => {
  const { user } = req;

  if (user && roles.some(role => user.role.includes(role))) {
    next(); // role is allowed, so continue on the next middleware
  } else {
    res.status(403).json({ message: `Forbidden, not ${roles}` }); // user is forbidden
  }
};
