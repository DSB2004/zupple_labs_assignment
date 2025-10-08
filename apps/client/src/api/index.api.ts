import axios from "axios";

const VerificationAPI = axios.create({
  baseURL: import.meta.env.VITE_APP_VERIFICATION_SERVICE_URL,
});

const IssuanceAPI = axios.create({
  baseURL: import.meta.env.VITE_APP_ISSUANCE_SERVICE_URL,
});
export { VerificationAPI, IssuanceAPI };
