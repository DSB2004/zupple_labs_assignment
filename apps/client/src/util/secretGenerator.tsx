function GenerateSecret(length = 12) {
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const special = "!@#$%^&*()_+-=[]{}|;:,.<>?";

  let secret = "";
  secret += upper[Math.floor(Math.random() * upper.length)];
  secret += lower[Math.floor(Math.random() * lower.length)];
  secret += numbers[Math.floor(Math.random() * numbers.length)];
  secret += special[Math.floor(Math.random() * special.length)];
  const all = upper + lower + numbers + special;

  for (let i = secret.length; i < length; i++) {
    secret += all[Math.floor(Math.random() * all.length)];
  }

  secret = secret
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");

  return secret;
}

export { GenerateSecret };
