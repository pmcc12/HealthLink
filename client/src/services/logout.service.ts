function logOut (): void {
  fetch(`${process.env.REACT_APP_HOST}/logout`, {
    method: "POST",
    headers: {
      'content-type': 'application/json'
    }
  })
  .then(res => res.json())
  .catch(console.error)
}

export default logOut