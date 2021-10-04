import iPatient from "../interfaces/patient.interface";

function logIn(email: string, password: string): Promise<iPatient> {
  return fetch(`${process.env.REACT_APP_HOST}/login`, {
    method: "Post",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => res.json())
    .catch(console.error);
}

export default logIn;
