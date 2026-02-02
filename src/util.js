export const now = () => {
  const mock = process.env.REACT_APP_MOCK_DATE;
  return mock ? new Date(mock) : new Date();
};

export const mod = (n, m) => ((n % m) + m) % m;

export const getFirstWeekday = (month, year = now().getFullYear()) =>
  mod(new Date(year, month, 1).getDay() - 1, 7);

export const getDaysInMonth = (month, year = now().getFullYear()) => new Date(year, month + 1, 0).getDate();

export const dateToString = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // months are 0-indexed
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const validateEmail = (email, users, id=null) => {

  if (users.some(user => user.email === email && user.id !== id)) return "Email already in use"
  
  const trimmed = email.trim();

  const parts = trimmed.split('@');

  if (parts.length !== 2) return "Email must contain a single @";

  const [local, domain] = parts;

  if (!local) return "Email must have something before @";
  if (!domain) return "Email must have something after @";

  return null;
}

  export const validatePasswords = (password, passwordConfirmation) => {
    if (password.length < 8) {
      return "Password must have 8 characters minimum"
    }

    if (password !== passwordConfirmation){
      return "Passwords do not match"
    }

    return null
  }

  export const monthsBetween = (startDate, endDate) => {
    const startYear = startDate.getFullYear();
    const startMonth = startDate.getMonth();
    const endYear = endDate.getFullYear();
    const endMonth = endDate.getMonth();

    return (endYear - startYear) * 12 + (endMonth - startMonth);
  }