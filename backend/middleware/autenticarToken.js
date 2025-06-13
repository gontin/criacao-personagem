import jwt from 'jsonwebtoken'

export function autenticarToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) return res.sendStatus(401)

        jwt.verify(token, process.env.JWT_SECRET, (err, usuario) => {
            if (err) return res.sendStatus(403)
                req.user = usuario
                next()
        })
}