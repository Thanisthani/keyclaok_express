import session from 'express-session';
import Keycloak from 'keycloak-connect';
import config from './index'

let _keycloak :any;

const keycloakConfig :any = {
  realm: config.realm,
  serverUrl: config.authServerUrl,
  bearerOnly: true,
  clientId: config.clientId,
  realmPublicKey: config.realmPublicKey,  
};

export function initKeycloak() {

  const memoryStore = new session.MemoryStore();
  _keycloak = new Keycloak({ store: memoryStore }, keycloakConfig);
console.log(_keycloak)
  return _keycloak;
}

export function getKeycloak() {
  return _keycloak;
}




