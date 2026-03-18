
import config from '@/config';
import { PermissionLevels } from './constants';
import { sign, verify, type JwtPayload } from 'jsonwebtoken';

class Permissions {
    public admin: boolean;
    public manager: boolean;
    public user: boolean;
    public perms: number[];

    constructor(permissions: number[]) {
        this.perms = permissions;
        this.admin = permissions.includes(PermissionLevels.Admin);
        this.manager = permissions.includes(PermissionLevels.Manager) || this.admin;
        this.user = true; // All users have basic user permissions
    }

    toJSON() {
        return {
            admin: this.admin,
            manager: this.manager,
            user: this.user,
            perms: this.perms,
        };
    }
}

interface TokenPayload {
    id?: string | null;
    name?: string | null;
    permissions?: number[] | null;
    expireAt?: number | null;
    jwt?: string | null;
}

export class Token {
    public id?: string | null;
    public name: string;
    public permissions: Permissions;
    public expireAt: number | string;
    public jwt?: string | null;

    constructor(object: TokenPayload) {
        this.id = object.id || null;
        this.name = object.name || 'Guest';
        this.expireAt = config.jwtExpiration;
        this.permissions = new Permissions(object.permissions || [PermissionLevels.User]);
        object.jwt && (this.jwt = object.jwt);
    }

    static fromToken(token: string) {
        try {
            const decoded = verify(token, config.jwtSecret) as JwtPayload;
            const _id = decoded._id || null;
            const name = String(decoded.name || 'Guest');
            const permissions = decoded.permissions || [PermissionLevels.User];
            const expireAt = decoded.expireAt || config.jwtExpiration;

            return new Token({
                id: _id,
                name,
                permissions,
                expireAt,
                jwt: token,
            });
        } catch (error: any) {
            throw new Error('Invalid token or token expired');
        }
    }

    save() {
        const _token = sign(
            this.toJSON(), 
            config.jwtSecret, 
            { expiresIn: typeof this.expireAt === 'number' ? this.expireAt : parseInt(this.expireAt as string) }
        );
        this.jwt = _token;
        return _token;
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            permissions: this.permissions.toJSON(),
            expireAt: this.expireAt,
            jwt: this.jwt || null,
        };
    }
}

interface UserVerifyLinkPayload {
    name: string;
    email: string;
    password: string;
    phone: number;
}

export class UserVerifyLink {
    public name: string | null;
    public password: string | null;
    public email: string | null;
    public phone: number | null;

    constructor(obj: UserVerifyLinkPayload) {
        this.name = obj.name || 'Guest';
        this.email = obj.email;
        this.password = obj.password;
        this.phone = obj.phone;
    }

    sign() {
        return sign(this.toJSON(), config.jwtSecret, { expiresIn: 10 * 60 * 1000 }); // 10 minutes
    }

    static fromToken(token: string) {
        try {
            const decoded = verify(token, config.jwtSecret) as JwtPayload;
            const name = String(decoded.name || 'Guest');
            const email = decoded.email || null;
            const password = decoded.password || null;
            const phone = decoded.phone || null;

            return new UserVerifyLink({
                name,
                email,
                password,
                phone,
            });
        } catch (error: any) {
            // Token verification failed
        }
    }

    toJSON() {
        return {
            name: this.name || 'Guest',
            email: this.email || null,
            password: this.password || null,
            phone: this.phone || null,
        };
    }
    toString() {
        return JSON.stringify(this.toJSON());
    }
}
