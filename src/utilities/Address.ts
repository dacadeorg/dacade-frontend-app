const aeAllowedChars = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
const ethRegex = /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/;
const aeRegex = new RegExp(`^(ak_)[${aeAllowedChars}]+$`);
const nearRegex = /^([a-fA-F0-9]{5})+([a-fA-F0-9]{49})+([a-fA-F0-9]{10})$/;
const algoRegex = /^([A-Z2-7]{6})+([A-Z2-7]{46})+([A-Z2-7]{6})$/;
const icpRegex = /^[a-fA-F0-9]{64}$/;

/**
 * Validates the regex pattern
 * @date 5/3/2023 - 11:19:24 AM
 *
 * @param {string} address
 * @param {RegExp} regex
 * @returns {Boolean}
 */
const validateRegex = (address: string, regex: RegExp) => {
  const match = address.match(regex);
  return Boolean(match);
};

/**
 * Transform address to truncated address
 * @date 3/21/2023 - 11:30:28 AM
 *
 * @param {string} address - address to truncate
 * @param {RegExp | string} regex - regex to match address
 * @param {(match: RegExpMatchArray | null) => string} callback - callback to return truncated address
 * @returns {string} truncated address
 */
const truncateHandler = (address: string, regex: RegExp | string, callback: (match: RegExpMatchArray | null) => string): string => {
  const match = address.match(regex);
  if (!match) return address;
  return callback(match);
};

/**
 * Truncate ethereum address
 * @date 3/21/2023 - 11:28:51 AM
 *
 * @param {string} address - address to truncate
 * @returns {string} truncated address
 */
export const truncateEthAddress = (address: string): string => {
  return truncateHandler(address, ethRegex, (match) => `${match?.[1]}…${match?.[2]}`);
};

/**
 * Truncate aeternity address
 * @date 3/21/2023 - 11:28:51 AM
 * @param {string} address - address to truncate
 * @returns {string} truncated address
 */

export const truncateAEAddress = (address: string): string => {
  return truncateHandler(address, aeRegex, () => `${address.slice(0, 8)}…${address.slice(address.length - 8, address.length)}`);
};

/**
 * Truncate near address
 * @date 3/21/2023 - 11:36:03 AM
 *
 * @param {string} address - address to truncate
 * @returns {string} truncated address
 */
export const truncateNearAddress = (address: string): string => {
  return truncateHandler(address, nearRegex, (match) => `${match?.[1]}…${match?.[3]}`);
};

/**
 * Truncate algo address
 * @date 3/21/2023 - 11:37:50 AM
 *
 * @param {string} address - address to truncate
 * @returns {string} truncated address
 */
export const truncateAlgoAddress = (address: string): string => {
  return truncateHandler(address, algoRegex, (match) => `${match?.[1]}…${match?.[3]}`);
};

/**
 * Truncate address
 * @date 3/21/2023 - 11:38:32 AM
 *
 * @param {string} rawAddress
 * @param {string} [token='eth']
 * @returns {string}
 */
export const truncateAddress = (rawAddress: string, token: string = "eth"): string | undefined => {
  if (!rawAddress) return;

  const address = rawAddress.trim();

  switch (token.trim().toLowerCase()) {
    case "near":
      return truncateNearAddress(address);
    case "ae":
      return truncateAEAddress(address);
    case "algo":
      return truncateAlgoAddress(address);
    default:
      return truncateEthAddress(address);
  }
};

/**
 * Validates wallet address
 * @date 5/3/2023 - 11:21:15 AM
 *
 * @param {string} address
 * @param {string} token
 * @returns {Boolean}
 */
export const validateAddress = (address?: string, token: string = "eth") => {
  console.log("The address validation", { address, token, icpRegex });
  if (!address) return false;

  const trimmedAddress = address.trim();
  const tokenLowerCase = token.toLowerCase();

  if (tokenLowerCase === "near") {
    return validateRegex(trimmedAddress, nearRegex);
  }

  if (tokenLowerCase === "ae") {
    return validateRegex(trimmedAddress, aeRegex);
  }

  if (["algo", "usdc"].includes(tokenLowerCase)) {
    return validateRegex(trimmedAddress, algoRegex);
  }

  if (tokenLowerCase === "icp") {
    return validateRegex(trimmedAddress, icpRegex);
  }

  return validateRegex(trimmedAddress, ethRegex);
};
