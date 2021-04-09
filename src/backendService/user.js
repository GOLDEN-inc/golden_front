export const getUserByGolden = (golden) => {
  return fetch(`${process.env.REACT_APP_API_URL}/user/${golden}`, {
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
