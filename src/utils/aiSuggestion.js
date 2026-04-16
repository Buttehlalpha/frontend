export const generateSuggestion = (sessions, modules) => {
  if (!modules || modules.length === 0) {
    return "Select modules to start your study journey 📚";
  }

  if (!sessions || sessions.length === 0) {
    return `Start your first session with ${modules[0]} for 25 mins 🚀`;
  }

  // Count sessions per module
  const counts = {};

  sessions.forEach((s) => {
    counts[s.module] = (counts[s.module] || 0) + 1;
  });

  // Find least studied module
  let weakest = modules[0];
  let min = Infinity;

  modules.forEach((m) => {
    const val = counts[m] || 0;
    if (val < min) {
      min = val;
      weakest = m;
    }
  });

  // Smart suggestion
  if (min === 0) {
    return `You haven't studied ${weakest} yet. Start now 📖`;
  }

  return `Focus on ${weakest} today for 30 mins 📘`;
};