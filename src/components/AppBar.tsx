import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Button from '@mui/material/Button';
import { Link, useMatch, useResolvedPath } from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react";

export default function MenuAppBar() {
	const [auth, setAuth] = React.useState(false);

	const handleChange = (event: any) => {
		setAuth(event.target.checked);
	};

  const { loginWithRedirect } = useAuth0();
  const { logout } = useAuth0();

	return (
		<Box sx={{ flexGrow: 1 }}>
			<FormGroup>
				<FormControlLabel
					control={
						<Switch
							checked={auth}
							onChange={handleChange}
							aria-label="login switch"
						/>
					}
					label={auth ? 'Logged In' : 'Not Logged in'}
				/>
			</FormGroup>
			<AppBar style={{background:'#a1bf6e'}} position="static">
				<Toolbar>
					<Typography variant="h6" component="div"
						sx={{ flexGrow: 1 }}>
						<CustomLink to="/">Mangrove Monitoring</CustomLink>
					</Typography>
					{auth && (
						<div style={{ display: 'flex', gap: '30px' }}>
							<CustomLink to="/Visualization">Visualization</CustomLink>
							<CustomLink to="/AboutUs">About Us</CustomLink>
              <Button onClick={() => logout()}>Log Out</Button>
						</div>
					)}
          {!auth && (
						<div style={{ display: 'flex', gap: '10px' }}>
							<CustomLink to="/Visualization">Visualization</CustomLink>
              <CustomLink to="/AboutUs">About Us</CustomLink>
              <Button onClick={() => loginWithRedirect()}>Log In</Button>
						</div>
					)}
				</Toolbar>
			</AppBar>
		</Box>
	);
}

function CustomLink({ to, children, ...props }: { to: any; children: any }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}
