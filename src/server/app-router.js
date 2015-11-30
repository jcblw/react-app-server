
export default (path) => {
  let _path
  switch (path) {
    case '/hello':
      _path = 'Hello'
      break
    default:
      _path = 'App'
  }
  return _path
}
