export default async function ({ $auth, route, redirect, store }) {
  if (!$auth.loggedIn) {
    redirect('/login')
  }
}
