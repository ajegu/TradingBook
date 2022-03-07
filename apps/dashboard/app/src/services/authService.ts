import {promisify} from 'util';
import * as Axios from 'axios';
const jsonwebtoken = require('jsonwebtoken');
const jwkToPem = require('jwk-to-pem');

export interface ClaimVerifyRequest {
  readonly token?: string;
}

export interface ClaimVerifyResult {
  exp: number;
  authTime: number;
  readonly userId: string;
  readonly email: string;
  readonly lastname: string;
  readonly firstname: string;
  readonly isValid: boolean;
  readonly error?: any;
}

interface TokenHeader {
  kid: string;
  alg: string;
}
interface PublicKey {
  alg: string;
  e: string;
  kid: string;
  kty: string;
  n: string;
  use: string;
}
interface PublicKeyMeta {
  instance: PublicKey;
  pem: string;
}

interface PublicKeys {
  keys: PublicKey[];
}

interface MapOfKidToPublicKey {
  [key: string]: PublicKeyMeta;
}

interface Claim {
  token_use: string;
  auth_time: number;
  iss: string;
  exp: number;
  email: string;
  name: string;
  family_name: string;
  sub: string;
  client_id: string;
  username: string;
}

const cognitoPoolId = process.env.REACT_APP_COGNITO_POOL_ID || '';
if (!cognitoPoolId) {
  throw new Error('env var required for cognito pool');
}
const cognitoIssuer = `https://cognito-idp.eu-west-3.amazonaws.com/${cognitoPoolId}`;

let cacheKeys: MapOfKidToPublicKey | undefined;
const getPublicKeys = async (): Promise<MapOfKidToPublicKey> => {
  if (!cacheKeys) {
    const url = `${cognitoIssuer}/.well-known/jwks.json`;
    const publicKeys = await Axios.default.get<PublicKeys>(url);
    cacheKeys = publicKeys.data.keys.reduce((agg, current) => {
      const pem = jwkToPem(current);
      agg[current.kid] = {instance: current, pem};
      return agg;
    }, {} as MapOfKidToPublicKey);
    return cacheKeys;
  } else {
    return cacheKeys;
  }
};

const verifyPromised = promisify(jsonwebtoken.verify.bind(jsonwebtoken));

const isExpired = (exp: number, authTime: number): boolean => {
  const currentSeconds = Math.floor( (new Date()).valueOf() / 1000);
  return currentSeconds > exp || currentSeconds < authTime;


};

const handler = async (request: ClaimVerifyRequest): Promise<ClaimVerifyResult> => {
  let result: ClaimVerifyResult;
  try {
    console.log(`user claim verify invoked for ${JSON.stringify(request)}`);
    const token = request.token;
    const tokenSections = (token || '').split('.');
    if (tokenSections.length < 2) {
      throw new Error('requested token is invalid');
    }
    const headerJSON = Buffer.from(tokenSections[0], 'base64').toString('utf8');
    const header = JSON.parse(headerJSON) as TokenHeader;
    const keys = await getPublicKeys();
    const key = keys[header.kid];
    if (key === undefined) {
      throw new Error('claim made for unknown kid');
    }
    const claim = await verifyPromised(token, key.pem) as Claim;
    if (isExpired(claim.exp, claim.auth_time)) {
      throw new Error('claim is expired or invalid');
    }
    if (claim.iss !== cognitoIssuer) {
      throw new Error('claim issuer is invalid');
    }
    if (claim.token_use !== 'id') {
      throw new Error('claim use is not access');
    }
    console.log(claim)
    console.log(`claim confirmed for ${claim.email}`);
    result = {
      exp: claim.exp,
      authTime: claim.auth_time,
      firstname: claim.name,
      lastname: claim.family_name,
      email: claim.email,
      userId: claim.sub,
      isValid: true
    };
  } catch (error) {
    result = {
      exp: 0,
      authTime: 0,
      firstname: '',
      lastname: '',
      email: '',
      userId: '',
      error,
      isValid: false
    };
  }
  return result;
};

export {handler, isExpired};
