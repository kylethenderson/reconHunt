import jwt from 'jsonwebtoken'
import refreshTokens from './refreshTokens'
 
const startRefreshInterval = () => {
	// check every second for expired token,
	// once expired, get new ones
	return setInterval(() => {
		const decoded = jwt.decode(localStorage.rHToken);
		if (!decoded) {
			clearInterval(this.refreshInterval);
			return;
		}
		if (decoded.exp * 1000 < Date.now())
			refreshTokens(localStorage.rHRefreshToken);
	}, 1000);
}

export default startRefreshInterval;