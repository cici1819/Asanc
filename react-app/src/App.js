import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import CurrentUserTasks from './components/Task/CurrentUserTasks';
import LoginForm from './components/auth/LoginForm/LoginForm';
import SignUpForm from './components/auth/SignupForm/SignUpForm';
import MainPage from './components/MainPage';
import HomePage from './components/HomePage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const [showSidebar, setShowSidebar] = useState();
	const toggleSidebar = () => {
		setShowSidebar(!showSidebar);
		localStorage.setItem('sidebar', !showSidebar)
	}

	// const sessionUser = useSelector((state) => state.session.user);



	useEffect(() => {
		(async () => {
			await dispatch(authenticate());
			if (!localStorage.getItem("sidebar")) {
				localStorage.setItem("sidebar", true);
				setShowSidebar(true);
			} else {
				if (localStorage.getItem("sidebar") === 'false'){
					setShowSidebar(false);
				} else {
					setShowSidebar(true);
				}
			}

				setLoaded(true);


		})();
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>

      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/home' exact={true} >
          <HomePage show={showSidebar} toggle={toggleSidebar} />
        </ProtectedRoute>
        <ProtectedRoute path='/home/:projectId/list' exact={true} >
          <MainPage show={showSidebar} toggle={toggleSidebar}/>
        </ProtectedRoute>
        <ProtectedRoute path='/tasks' exact={true} >
          <CurrentUserTasks show={showSidebar} toggle={toggleSidebar}/>
        </ProtectedRoute>

        <ProtectedRoute path='/users' exact={true} >
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <Route path='/' exact={true} >
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
