import { _Request, _Response, _NextFunction } from "@/types";
import { validateToken } from "@/utils/helper.util";

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

        const tokenValidationResult = await validateToken(token);

        if (tokenValidationResult.status !== 200) {
            return res.status(tokenValidationResult.status).json({
                status: tokenValidationResult.status,
                message: tokenValidationResult.message,
                data: null
            });
        }

        req.user = tokenValidationResult.data;
        next();
        
    }catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: "Internal server error"});
    }
}

export default isAuthenticated;