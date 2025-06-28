export function generateSlug(l = 6) {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  let slug = "";
  for (let i = 0; i < l; i++) {
    slug += charset[Math.floor(Math.random() * charset.length)];
  }
  return slug;
}
