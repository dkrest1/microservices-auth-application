import variables from "@/configs/constants.config";
import { _Request, _Response, _NextFunction } from "@/types";
import jwt from "jsonwebtoken"

const isAuthenticated = async (req: _Request, res: _Response, next: _NextFunction) =>  {
    try {
        if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer')) {
            return res.status(401).json({
                success: false,
                message: 'unauthorized: missing or invalid authorization header',
            });
        }
    
        const token = req.headers.authorization.split(' ')[1];
    
        if (!token) {
            return res.status(401).json({ 
                success: false, 
                message: "unauthorized, no token found",
            });
        }

        const decoded = jwt.verify(token, variables.QUEUE_NAME as jwt.Secret)
        req.user = decoded
        next()
        
    }catch (err) {
        return res.status(401).json({
            success: false,
            message: "unauthorized: access to resource denied",
        });
    }
}

export default isAuthenticated;