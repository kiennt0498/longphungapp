export function getStatusCount(leads, status) {
  if (status === 'all') return leads.length;
  return leads.filter(lead => lead.status === status).length;
}