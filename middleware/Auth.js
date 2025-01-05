function authorizeRole(role) {
    return (req, res, next) => {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).json({ error: 'Unauthorized' });

        try {
            const decoded = jwt.verify(token, 'your_secret_key');
            if (decoded.role !== role) {
                return res.status(403).json({ error: 'Forbidden' });
            }
            req.user = decoded;
            next();
        } catch (err) {
            res.status(401).json({ error: 'Invalid token' });
        }
    };
}

module.exports = authorizeRole;
