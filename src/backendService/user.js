export const getAllUsers = () => {
  return fetch(`${process.env.REACT_APP_API_URL}/users`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      return err;
    });
};

export const getUserByGolden = (golden, token) => {
  return fetch(`${process.env.REACT_APP_API_URL}/user/${golden}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      return err;
    });
};

export const updateUserByGolden = (golden, token, user) => {
  const userObj = {
    name: user.userName,
    email: user.userEmail,
    golden: user.userGolden,
    pix: user.userPix,
    wpp: user.userWpp,
  };
  return fetch(`${process.env.REACT_APP_API_URL}/user/${golden}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(userObj),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      return err;
    });
};

export const getBalanceByGolden = (golden) => {
  return fetch(`${process.env.REACT_APP_API_URL}/user/${golden}/balance`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      return err;
    });
};

export const getWithDrawByGolden = (golden) => {
  return fetch(`${process.env.REACT_APP_API_URL}/user/${golden}/withdraw`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      return err;
    });
};
